
(function(){

	// import Config/Config.js
	// import connect/Middleware.js


	server.Application = Class({
		Extends: Class.Deferred,
		
		middleware: null,
		
		Construct: function(proto){
			if (proto == null) 
				proto = {};
			
			if (this instanceof server.Application === false) {
				return new server.Application(proto);
			}
			
			__app = this;
			
			this.handlers = new HandlerFactory();
			this.args = obj_extend(proto.args, cli_arguments());
			this._loadConfig();
			
		
			if (this.args.debug !== true) 
				logger.cfg('color', 'none');
				
			return this;
		},
		
		
		responder: function(data){
			if (data){
				this.middleware = data.middleware;
			}
			
			return responder(this);
		},
		
		
		autoreload: function(httpServer){
			
			Autoreload.enableForApp(this, httpServer);
		},
		autoreloadEnabled: false,
		
		Self: {
			_loadConfig: function(){
				this.config = Config({
						buildDirectory : proto.buildDirectory,
						configs: proto.configs
					},
					cfg_doneDelegate(this)
				);
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
	
	function middleware_processDelegate(middleware){
		
		return function(handler, req, res){
			
			new MiddlewareRunner(middleware)
				.process(req, res, function(){
				
					handler_process(handler, req, res);
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
					
					callback(handler, req, res);
				});
		});
	}
	
	
	
	function handler_process(handler, req, res) {
		logger(95)
			.log('<request>', req.url);
		
		handler
			.process(req, res)
			.done(function(content, statusCode, mimeType, headers){
				
				response_end(res, content, statusCode, mimeType, headers);
			})
			.fail(function(message, statusCode){
				res.statusCode = statusCode || 500;
				
				response_end(res, message, statusCode || 500, 'text/plain');
			});
	}
	
	
	
	function cfg_doneDelegate(app) {
		return function(error) {
			if (error)
				logger.error(error);
				
			var cfg = app.config;
			
			
			logger(90)
				.log('<app.config>', cfg);
			
			app
				.handlers
				.registerHandlers(cfg.handlers, cfg.handler)
				.registerServices(cfg.services, cfg.service)
				.registerPages(cfg.pages)
				;
				
			
			if (app.args.debug) {
				
				app.resolve(app);
				return;
			}
			
			
			resources_load(app, function(){
				
				resource_load = resource_loadEmpty;
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
}());