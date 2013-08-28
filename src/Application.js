
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
			
			var path_CONFIGS = proto.configs || 'server/config/';
			
			var configs = proto.configs;
			if (configs == null)
				configs = Config.getList(path_CONFIGS);
				
			this.config = Config(configs, cfg_doneDelegate(this));
			this.args = cli_arguments();
			
			return this;
		},
		
		
		responder: function(){
			
			return responder(this);
		}
		
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
					
					if (handler == null) {
						next();
						return;
					}
					
					logger(95)
						.log('<request>', req.url);
					
					handler
						.process(req, res)
						.done(function(content, statusCode, mimeType, headers){
							
							if (statusCode) 
								res.statusCode = statusCode;
							
							if (typeof mimeType === 'string') 
								res.setHeader('Content-Type', mimeType);
							
							
							if (headers) {
								for (var key in headers) {
									res.setHeader(key, headers[key]);
								}
							}
							
							res.end(content);
						})
						.fail(function(message, statusCode){
							
							res.statusCode = statusCode;
							res.end(message);
						});
				});
			});
		}
	}
	
	function cfg_doneDelegate(app) {
		return function(error) {
			
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
	
}());