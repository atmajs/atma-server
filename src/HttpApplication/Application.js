
(function(){

	// import ../Config/Config.js
	// import ../Business/Middleware.js
    // import SubApp.js
	// import Message.js

	server.Application = Class({
		Extends: Class.Deferred,
		
		_innerPipe: null,
		_outerPipe: null,
		
		//@obsolete
		_responder: null,
		_responders: null,
		middleware: null,
		
		// Loaded server scripts from `config.env.scripts` and `config.env.both`
		resources: null,
		
		// Stores all exports from `resources`
		lib: null,
		
		Construct: function(proto){
			if (proto == null) 
				proto = {};
			
			if (this instanceof server.Application === false) 
				return new server.Application(proto);
			
			
			// if a root application
			if (__app == null) 
				__app = this;
			
			this.isRoot = this === __app;
			this.handlers = new HandlerFactory(this);
			this.args = obj_extend(proto.args, cli_arguments());
			
			this._baseConfig = proto;
			this._loadConfig();
			
			if (this.isRoot && app_isDebug() !== true) 
				logger.cfg('color', 'none');
			
			this.process = this.process.bind(this);
			return this;
		},
		
		//@obsolete
		respond: function(req, res, next){
			this.process(req, res, next);
		},
		//@obsolete
		responder: function(data){
			this._innerPipe = MiddlewareRunner.create(data && data.middleware);
			return responder(this);
		},
		
		//> Generic HttpServer scenario, responder should be also used in the middleware
		//@obsolete
		responders: function(array){
			this._outerPipe = new MiddlewareRunner(array);
		},
		
		/**
		 * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
		 * :middleware - Arrat|Function - Middleware fns in INNER pipe, before the Handler
		 * :after - Array|Function - Middlewarefns in OUTER pipe, after the Handler
		 */
		processor: function(data){
			data = data || {};
			
			var before = data.before,
				after = data.after,
				middleware = data.middleware;
				
			this._outerPipe = MiddlewareRunner.create(before || []);
			this._innerPipe = MiddlewareRunner.create(middleware);
			
			this._outerPipe.add(responder(this));
			this._outerPipe.add(after);
			
			return this.process;
		},
		process: function(req, res, next){
			if (this._outerPipe == null) 
				this.processor();
			
			this._outerPipe.process(
				req
				, res
				, next || response_notProcessed
				, this.config
			);
		},
		//process: function(req, res, next){
		//	
		//	if (this._responders == null) {
		//		this.responders([
		//			this.responder()
		//		]);
		//	}
		//	
		//	this._responders.process(
		//		req,
		//		res,
		//		next || response_notProcessed,
		//		this.config
		//	);
		//},
		execute: function(url, method, body, headers){
			var req = new Message.Request(url, method, body, headers),
				res = new Message.Response;
			
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
		},
		webSockets: WebSocket,
		autoreload: function(httpServer){
			
			WebSocket.listen(httpServer);
			
			return Autoreload.enable(this);
		},
		
		getSubApp: function(path){
			var route = this.handlers.subapps.get(path);
			
			return route && route.value && route.value.app_;
		},
		
		Self: {
			_loadConfig: function(){
				
				var proto = this._baseConfig;
				
				this.config = Config(proto, this);
				this
					.config
					.done(cfg_doneDelegate(this))
					.fail(function(error){
						
						logger
							.warn('Configuration Error')
							.error(error);
					})
					;
				return this;
			}
		}
	});
	
	
	function responder(app) {
		return function (req, res, next){
			
			if (Autoreload.enabled) 
				Autoreload.watch(req.url);
			
			var callback = app._innerPipe != null
				? middleware_processDelegate(app._innerPipe)
				: handler_process
				;
			
			if (next == null) 
				next = fn_delegate(response_notProcessed, null, req, res);
			
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
			app, req, res, null, handler_processRaw
		);
	}
	function middleware_processDelegate(middlewareRunner){
		return function(app, handler, req, res){
			
			middlewareRunner.process(req, res, done);
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
		resources_load(app, function(){
			app
				.handlers
				.get(app, req, function(handler){
					
					if (handler == null) 
						return next();
					
					
					callback(app, handler, req, res);
				});
		});
	}
	function handler_process(app, handler, req, res) {
		logger(95)
			.log('<request>', req.url);
		
		handler
			.process(req, res, app.config);
			
		if (handler.done == null)
			// Handler responds to the request itself
			return;
		
		handler
			.done(function(content, statusCode, mimeType, headers){
				
				var send = handler.send || send_Content;
				
				send(res, content, statusCode, mimeType, headers);
			})
			.fail(function(error, statusCode){
				
				var send = handler.sendError || send_Error;
				
				send(res, error, statusCode || 500);
			});
	}
	function handler_processRaw(app, handler, m_req, m_res) {
		handler
			.process(m_req, m_res, app.config)
		if (handler.done == null) 
			return;
		handler.pipe(m_res);
	}
	
	
	
	function cfg_doneDelegate(app) {
		return function() {
			
			var cfg = app.config;	
			logger(90)
				.log('<app.config>', cfg);
			
			initilizeEmbeddedComponents(app);
			
			app
				.handlers
				.registerSubApps(cfg.subapps, cfg.subapp)
				.registerHandlers(cfg.handlers, cfg.handler)
				.registerServices(cfg.services, cfg.service)
				.registerPages(cfg.pages)
				;
			
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
		app
			.resources
			.done(function(resp){
				app.lib = resp;
				
				if (config.projects) {
					config
						.projects
						.forEach(function(name){
							var res = resp[name];
							if (res != null && typeof res.attach === 'function')
								res.attach(app);
						});
				}
				
				callback();
			});
	}
	
	//@deprecate
	function resource_loadEmpty(app, callback){
		callback();
	}
	
	function response_notProcessed(error, req, res){
		if (error == null)
			error = HttpError('Request not handled: ' + req.url, 404);
		
		send_Error(res, error);
	}
	
}());