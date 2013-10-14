
(function(){

	// import Config/Config.js
	


	server.Application = Class({
		Extends: Class.Deferred,
		Construct: function(proto){
			if (proto == null) 
				proto = {};
			
			if (this instanceof server.Application === false) {
				return new server.Application(proto);
			}
			
			__app = this;
			
			this.handlers = new HandlerFactory();
			this.args = obj_extend(proto.args, cli_arguments());
			this.config = Config({
					buildDirectory : proto.buildDirectory,
					configs: proto.configs
				},
				cfg_doneDelegate(this)
			);
			
		
			if (this.args.debug !== true) 
				logger.cfg('color', 'none');
				
			return this;
		},
		
		
		responder: function(){
			
			return responder(this);
		},
		
		
		autoreload: function(httpServer){
			this.autoreloadEnabled = true;
			Autoreload.listen(httpServer);
			
			include.cfg('autoreload', Autoreload);
		},
		autoreloadEnabled: false,
		
	});
	
	
	function responder(app) {
		return function (req, res, next){
			include
				.instance()
				.js(app.config.env.server.scripts)
				.js(app.config.env.both.scripts)
				.done(function(){
			
			app
				.handlers
				.get(req, function(handler){
					
					if (app.autoreloadEnabled) {
						Autoreload.watch(req.url);
					}
					
					if (handler == null) {
						next();
						return;
					}
					
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
				});
			});
		}
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
				
			
			app.resolve(app);
		}
	}
	
	function response_end(res, content, statusCode, mimeType, headers) {
		
		if (typeof content !== 'string' && content instanceof Buffer === false) {
			try {
				
				content = JSON.stringify(content);
				mimeType = 'application/json';
				
			}catch(error){
				
				logger.error('<responder> invalid json object', error);
				content = '{ error: "invalid json object" }';
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