
(function(){

	// import ../Config/Config.js
	// import ../connect/Middleware.js
    // import SubApp.js

	server.Application = Class({
		Extends: Class.Deferred,
		
		_responder: null,
		_responders: null,
		
		middleware: null,
		
		Construct: function(proto){
			if (proto == null) 
				proto = {};
			
			if (this instanceof server.Application === false) {
				return new server.Application(proto);
			}
			
			// if a root application
			if (__app == null) 
				__app = this;
			
			this.isRoot = this === __app;
			this.handlers = new HandlerFactory();
			this.args = obj_extend(proto.args, cli_arguments());
			
			this._baseConfig = proto;
			this._loadConfig();
			
		
			if (this.isRoot && this.args.debug !== true) 
				logger.cfg('color', 'none');
				
			return this;
		},
		
		
		responder: function(data){
			
			this.middleware = new MiddlewareRunner(data && data.middleware);
			
			
			return (this._responder = responder(this));
		},
		
		respond: function(req, res, next){
			if (this._responder == null) 
				this.responder();
				
			this._responder(req, res, next);
		},
		
		
		responders: function(array){
			this._responders = new MiddlewareRunner(array);
		},
		
		process: function(req, res, next){
			
			this
				._responders
				.process(req, res, next || response_notProcessed, this.config);
		},
		
		webSockets: WebSocket,
		autoreload: function(httpServer){
			
			WebSocket.listen(httpServer);
			
			return Autoreload.enableForApp(this);
		},
		autoreloadEnabled: false,
		
		Self: {
			_loadConfig: function(){
				
				var proto = this._baseConfig;
				
				//this.config = Config({
				//		buildDirectory : proto.buildDirectory,
				//		configs: proto.configs
				//	},
				//	proto.config,
				//	cfg_doneDelegate(this)
				//);
				this.config = Config(proto.confing);
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
			
			if (app.autoreloadEnabled) 
				Autoreload.watch(req.url);
			
			var callback = app.middleware
				? middleware_processDelegate(app.middleware)
				: handler_process
				;
			
			handler_resolve(app, req, res, next, callback);
		}
	}
	
	function middleware_processDelegate(middlewareRunner){
		
		return function(app, handler, req, res){
			
			middlewareRunner
				.process(req, res, function(){
				
					handler_process(app, handler, req, res);
				});
		};
	}
	
	function handler_resolve(app, req, res, next, callback){
		resources_load(app, function(){
			app
				.handlers
				.get(req, function(handler){
					
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
			return;
		
		handler
			.done(function(content, statusCode, mimeType, headers){
				
				response_end(res, content, statusCode, mimeType, headers);
			})
			.fail(function(message, statusCode){
				
				response_end(res, message, statusCode || 500, 'text/plain');
			});
	}
	
	
	
	function cfg_doneDelegate(app) {
		return function() {
				
			var cfg = app.config;
			
			
			logger(90)
				.log('<app.config>', cfg);
			
			app
				.handlers
				.registerSubApps(cfg.subapps, cfg.subapp)
				.registerHandlers(cfg.handlers, cfg.handler)
				.registerServices(cfg.services, cfg.service)
				.registerPages(cfg.pages)
				;
			
			
			if (app.args.debug) {
				
				app.resolve(app);
				return;
			}
			
			
			resources_load(app, function(){
				
				resources_load = resource_loadEmpty;
				app.resolve(app);
			});
		}
	}
	
	function resources_load(app, callback) {
		return include
				.instance()
				.js(app.config.env.server.scripts)
				.js(app.config.env.both.scripts)
				.done(callback);
	}
	
	function resource_loadEmpty(app, callback){
		callback();
	}
	
	function response_end(res, content, statusCode, mimeType, headers) {
		
		if (typeof content !== 'string' && content instanceof Buffer === false) {
			try {
				
				mimeType = 'application/json';
				content = JSON.stringify(content);
				
			}catch(error){
				
				logger.error('<responder> invalid json object', error);
				content = '{ error: "JSON stringify failed" }';
			}
		}
		
		if (headers) {
			for (var key in headers) {
				res.setHeader(key, headers[key]);
			}
		}
		
		res.setHeader('Content-Type', mimeType || 'text/html');
		res.statusCode = statusCode || 200;
		
		res.end(content);
	}
	
	function response_notProcessed(req, res){
	
		response_end(
			res,
			'Error: Request was not processed ' + req.url,
			500
		);
	}
	
}());