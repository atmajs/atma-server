import { mask, include, logger, Class, Uri, Routes, is_String, is_Function, is_Object, obj_extend } from '../dependency'
import { Request, Response } from './Message'
import { cli_arguments } from '../util/cli'
import { app_isDebug } from '../util/app'
import { HttpError } from '../HttpError/HttpError'
import HandlerFactory from '../HandlerFactory'
import WebSocket from '../WebSocket'
import Config from '../Config/Config'
import SubApp from './SubApp'
import MiddlewareRunner from '../Business/Middleware'
import Autoreload from '../Autoreload/Autoreload'
import { initilizeEmbeddedComponents } from '../compos/exports'



var _emitter = new Class.EventEmitter;

	
	interface IApplicationConfig {
		args?: {
			[key: string]: string
		}
	}
	

	class Application extends Class.Deferred<Application> {
		
		// <Boolean>, if instance is the root application, and not one of the subapps
		isRoot = false

		// <HandlerFactory>, stores all endpoints of this application
		handlers = null

		// <http.Server> , in case `listen` was called.
		_server = null

		// run this middlewares when the endpoint is found. (Runs before the endpoint handler)
		_innerPipe = null

		// run this middlewares by all requests. Conains also endpoint resolver
		_outerPipe = null

		//@obsolete
		_responder = null
		_responders = null
		middleware = null

		// Loaded server scripts from `config.env.scripts` and `config.env.both`
		resources = null

		// Stores all exports from `resources`
		lib = null

		// webSockets
		webSockets = null

		config: any
		args: {
			[key: string]: string
		}
		_baseConfig: IApplicationConfig

		constructor (proto:IApplicationConfig = {}){
			super();		

			// if a root application
			if (Application.current == null)
				Application.current = this;

			this.isRoot = this === Application.current;
			this.handlers = new HandlerFactory(this);
			this.webSockets = new WebSocket(this);

			this.args = obj_extend(proto.args, cli_arguments());
			this._baseConfig = proto;
			this._loadConfig();

			if (this.isRoot && app_isDebug() !== true)
				logger.cfg('color', 'none');

			this.process = this.process.bind(this);
			return this;
		}

		//@obsolete
		respond (req, res, next){
			this.process(req, res, next);
		}
		//@obsolete
		responder(data){
			this._innerPipe = MiddlewareRunner.create(data && data.middleware);
			return responder(this);
		}

		//> Generic HttpServer scenario, responder should be also used in the middleware
		//@obsolete
		responders(array){
			this._outerPipe = new MiddlewareRunner(array);
		}

		/**
		 * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
		 * :middleware - Arrat|Function - Middleware fns in INNER pipe, before the Handler
		 * :after - Array|Function - Middlewarefns in OUTER pipe, after the Handler
		 */
		processor(data: {before?: Function[], after?: Function[], middleware?: Function[]} = {}){
			
			var before = data.before,
				after = data.after,
				middleware = data.middleware;

			this._outerPipe = MiddlewareRunner.create(before || []);
			this._innerPipe = MiddlewareRunner.create(middleware);

			this._outerPipe.add(responder(this));
			this._outerPipe.add(after);
			return this;
		}
		process(req, res, next){
			if (this._outerPipe == null)
				this.processor();

			this._outerPipe.process(
				req
				, res
				, next || this._404
				, this.config
			);
		}
		execute(url, method, body, headers){
			var req = new Request(url, method, body, headers),
				res = new Response;

			// @TODO ? middleware pipeline in RAW requests
			//this._responders.process(
			//	req,
			//	res,
			//	respond,
			//	this.config
			//);
			//function respond() {
			//	responder_Raw(req, res);
			//}
			respond_Raw(this, req, res);
			return res;
		}
		autoreload(httpServer?){
			this._server = this._server || httpServer;
			if (this._server == null)
				return;

			Autoreload.enable(this);
		}
		listen(){
			var port, server;
			var i = arguments.length,
				mix;
			while (--i > -1){
				mix = arguments[i];
				if (mix == null)
					continue;

				switch(typeof mix){
					case 'number':
					case 'string':
						port = mix;
						break;
					default:
						if (mix.listen)
							server = mix;
						break;
				}
			}
			if (port == null)
				port = this.config.$get('port');

			if (port == null)
				throw Error('Port number is not defined');

			if (server == null)
				server = require('http').createServer();

			this._server = server
				.on('request', this.process)
				.listen(port)
				;

			if (this.webSockets.hasHandlers())
				this.webSockets.listen(this._server);

			if (app_isDebug())
				this.autoreload();

			_emitter.trigger('listen', this);
			return this._server;
		}
		getSubApp(path){
			var route = this.handlers.subapps.get(path);
			return route && route.value && route.value.app_;
		}

		//Self: {
			_loadConfig(){

				var definition = this._baseConfig;

				this.config = Config(
					definition
					, this
					, cfg_doneDelegate(this)
					, function(error){
						logger
							.warn('Configuration Error')
							.error(error);
					})
					;
				return this;
			}

			_404(error, req, res){
				error = error == null
					? HttpError('Endpoint not found: ' + req.url, 404)
					: HttpError.create(error)
					;

				var accept = req.headers['accept'];
				if (accept == null || accept.indexOf('text/html') !== -1) {
					server.HttpErrorPage.send(error, req, res, this.config);
					return;
				}

				// send json
				send_Error(res, error);
			}
		
		static current: Application = null
		static on = _emitter.on.bind(_emitter)
		static off = _emitter.off.bind(_emitter),
		static once = _emitter.once.bind(_emitter),
		static trigger = _emitter.trigger.bind(_emitter),
		static Config = Config,
		static clean () {
				Application.current = null;
				_emitter = new  Class.EventEmitter;
				return this;
			}
		}
	};

	server.clean = function () {
		server.Application.clean();
		return this;
	};


	function responder(app) {
		return function (req, res, next){

			if (Autoreload.enabled)
				Autoreload.watch(req.url, app.config);

			var callback = app._innerPipe != null
				? middleware_processDelegate(app._innerPipe)
				: handler_process
				;

			if (next == null)
				next = app._404;

			handler_resolve(
				app,
				req,
				res,
				next,
				callback
			);
		}
	}
	function respond_Raw(app, req, res) {
		handler_resolve(
			app
			, req
			, res
			, function(){
				res.writeHead(500);
				res.end('Not Found');
			}
			, handler_processRaw
		);
	}
	function middleware_processDelegate(middlewareRunner){
		return function(app, handler, req, res){

			middlewareRunner.process(req, res, done, app.config);
			function done(error){
				if (error) {
					send_Error(res, error);
					return;
				}
				handler_process(app, handler, req, res);
			}
		};
	}

	function handler_resolve(app, req, res, next, callback){
		//++ moved resource loading into inner function
		app
			.handlers
			.get(app, req, function(handler){
				if (handler == null) {
					next();
					return;
				}
				resources_load(app, function(){
					callback(app, handler, req, res);
				});
			});

	}
	function handler_process(app, handler, req, res) {
		logger(95)
			.log('<request>', req.url);

		handler.process(req, res, app.config);

		if (handler.done == null)
			// Handler responds to the request itself
			return;

		var headers__ = handler_resolveDefaultHeaders(app, handler);

		handler
			.done(function(content, statusCode, mimeType, headers){
				var send = handler.send || send_Content;
				if (headers__ != null) {
					headers = obj_defaults(headers, headers__);
				}
				send(res, content, statusCode, mimeType, headers);
			})
			.fail(function(error, statusCode){
				error = HttpError.create(error, statusCode);
				if (handler.sendError) {
					handler.sendError(error, req, res, app.config);
					return;
				}
				send_Error(res, error, headers__);
			});
	}
	function handler_resolveDefaultHeaders (app, handler) {
		var headers_Handler = handler.meta && handler.meta.headers,
			headers_App = app.config.headers;

		if (headers_Handler == null && headers_App == null) {
			return null;
		}

		var headers;
		headers = headers_Handler ? Object.create(headers_Handler) : null;
		headers = obj_defaults(headers, headers_App);
		return headers;
	}
	function handler_processRaw(app, handler, m_req, m_res) {
		if (handler instanceof server.HttpSubApplication) {
			handler.execute(m_req, m_res);
			return;
		}
		handler.process(m_req, m_res, app.config)
		if (handler.done == null)
			return;
		handler.pipe(m_res);
	}
	function cfg_doneDelegate(app) {
		return function() {
			_emitter.trigger('configurate', app);
			
			initilizeEmbeddedComponents(app);
			var cfg = app.config;
			app
				.handlers
				.registerPages(cfg.pages, cfg.page)
				.registerSubApps(cfg.subapps, cfg.subapp)
				.registerHandlers(cfg.handlers, cfg.handler)
				.registerServices(cfg.services, cfg.service)
				.registerWebsockets(cfg.websockets, cfg.websocket)
				;

			if (app_isDebug())
				include.cfg('autoreload', true);

			resources_load(app, function(){				
				app.resolve(app);
			});
		}
	}

	function resources_load(app, callback) {
		if (app_isDebug() !== true && app.resources != null) {
			callback();
			return;
		}

		var config = app.config,
			base = config.base,
			env = config.env
			;

		app.resources = include
			.instance(base)
			.setBase(base)
			.js(env.server.scripts)
			.js(env.both.scripts)
			;

		config.$getImports('server').forEach(function(x){
			if (x.type === 'script') {
				app.resources.js(x.path);
				return;
			}
			if (x.type === 'mask') {
				app.resources.mask(x.path);
				return;
			}
		});
		app
			.resources
			.done(function(resp){
				app.lib = resp;

				var projects = config.projects;
				if (projects) {
					for(var name in projects){
						var res = resp[name];
						if (res != null && typeof res.attach === 'function')
							res.attach(app);
					}
				}

				callback();
			});
	}

export default Application;