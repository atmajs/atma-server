
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
			this.handlers = new HandlerFactory(this);
			this.args = obj_extend(proto.args, cli_arguments());
			
			this._baseConfig = proto;
			this._loadConfig();
			
		
			if (this.isRoot && this.args.debug !== true) 
				logger.cfg('color', 'none');
				
			return this;
		},
		
		
		respond: function(req, res, next){
			if (this._responder == null) 
				this.responder();
				
			this._responder(req, res, next);
		},
		
		responder: function(data){
			
			this.middleware = new MiddlewareRunner(data && data.middleware);
			return (this._responder = responder(this));
		},
		
		responders: function(array){
			this._responders = new MiddlewareRunner(array);
		},
		
		process: function(req, res, next){
			
			if (this._responders == null) {
				this.responders([
					this.responder()
				]);
			}
			
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
		
		getSubApp: function(path){
			var route = this.handlers.subapps.get(path);
			
			return route && route.value && route.value._app;
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
		app.resources = include
			.instance(app.config.base)
			.js(app.config.env.server.scripts)
			.js(app.config.env.both.scripts)
			;
		app
			.resources
			.done(function(resp){
				
				if (app.config.projects) {
					app
						.config
						.projects.forEach(function(name){
							var res = resp[name];
							if (res != null && typeof res.attach === 'function')
								res.attach(app);
						});
				}
				
				callback();
			});
	}
	
	function resource_loadEmpty(app, callback){
		callback();
	}
	
	function response_notProcessed(req, res){
	
		send_Content(
			res,
			HttpError('Request not processed ' + req.url, 422)
		);
	}
	
}());