
var HandlerFactory = (function(){
		
	
	var fns_RESPONDERS = [
		'handlers',
		'services',
		'pages'
	];
	
	var HandlerFactory = Class({
		
		Construct: function(){
			this.handlers = new Routes();
			this.services = new Routes();
			this.pages = new Routes();
		},
		
		registerPages: function(pages){
			var page, key;
			
			for (key in pages) {
				
				page = pages[key];
				
				if (page.controller != null) {
					page.controller = __app
						.config
						.page
						.getController(page)
						;
				} else {
					
					page.controller = server.HttpPage;
				}
				
				this.pages.add(key, page);
			}
			
			
			
			return this;
		},
		
		registerHandlers: function(routes, appCfg){
			
			for (var key in routes) {
				this.registerHandler(key, routes[key], appCfg);
			}
			
			return this;
		},
		registerHandler: function(path, handler, appCfg) {
			if (typeof handler === 'string') {
				handler = {
					controller: handler_path(handler, appCfg)
				};
			}
			
			this
				.handlers
				.add(path, handler)
				;
		},
		
		registerServices: function(routes, appCfg){
			
			for (var key in routes) {
				this.registerService(key, routes[key]);
			}
			
			return this;
		},
		registerService: function(path, service, appCfg){
			if (typeof service !== 'function') {
				
				if (typeof service === 'string') {
					service = { controller: service };
				}
				
				service.controller = handler_path(service.controller, appCfg);
			}
			this
				.services
				.add(path, service)
				;
		},
		
		registerWebsockets: function(routes){
			for(var namespace in routes){
				this.registerWebsocket(namespace, routes[namespace]);
			}
			
			return this;
		},
		registerWebsocket: function(namespace, Handler){
			
			if (typeof Handler === 'string') {
				include
					.instance()
					.js(Handler + '::Handler')
					.done(function(resp){
						
						WebSocket.registerHandler(namespace, resp.Handler);
					});
				return;
			}
			WebSocket.registerHandler(namespace, Handler);
		},
		
		get: function(req, callback){
			
			var url = req.url,
				method = req.method,
				route;
				
			if (method === 'POST' && req.body && req.body._method) {
				method = req.body._method;
			}
			
			for (var i = 0, x, imax = fns_RESPONDERS.length; i < imax; i++){
				x = fns_RESPONDERS[i];
				
				if (processor_tryGet(this[x], url, method, callback)) 
					return;
			}
			
			callback(null);
		}
	});
	

	function processor_tryGet(collection, url, method, callback){
		
		var route = collection.get(url, method),
			processor;
		
		if (route == null) 
			return false;
		
		
		var controller = route.value.controller;
		if (typeof controller === 'string') {
			
			processor_loadAndInit(controller, route, callback);
			return true;
		}
		
		callback(new controller(route));
		return true;
	}
	
	function processor_loadAndInit(url, route, callback){
		
		include
			.instance()
			.js(url + '::Handler')
			.done(function(resp){
				
				if (resp.Handler == null) {
					logger.error('<handler> invalid route', url);
					
					return callback(new ErrorHandler());
				}
				
				if (typeof resp.Handler.prototype.process !== 'function') {
					logger.error('<handler> invalid interface - process function not implemented');
					
					return callback(new ErrorHandler());
				}
				
				
				callback(new resp.Handler(route));
			});
	}
	
	function get_service(factory, path) {
		var services = factory.services,
			route = services.get(path);
		
		return route;
	}
	
	function get_handler(factory, path) {
		
		return factory
			.handlers
			.get(path)
			;
	}
	
	
	function handler_path(path, config) {
		if (path.charCodeAt(0) === 47) {
			// /
			return path;
		}
		if (path.indexOf('://') !== -1) {
			return path;
		}
		
		var location = config && config.location;
		if (location == null) {
			logger
				.error('<Handler> Path is relative but no location. Set handler: {location: X} in config')
				.error(path, config)
				;
			return path;
		}
		
		var params,
			route,
			i,
			length,
			arr;
			
		var template = path.split('/'),
			route = location.split(/[\{\}]/g);
		
		
		path = route[0];
		
		for (i = 1; i < route.length; i++) {
			if (i % 2 === 0) {
				path += route[i];
			} else {
				/** if template provides less "breadcrumbs" than needed -
				 * take always the last one for failed peaces */
				
				var index = route[i] << 0;
				if (index > template.length - 1) {
					index = template.length - 1;
				}
				
				
				
				path += template[index];
				
				if (i === route.length - 2){
					for(index++; index < template.length; index++){
						path += '/' + template[index];
					}
				}
			}
		}
	
		return path;
	}
	
	function rgx_fromString(str, flags) {
		return new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), flags);
	}

	
	
	var ErrorHandler = Class({
		Base: Class.Deferred,
		process: function(){
			this.reject('Invalid Routing');
			return this;
		}
	});
	
	
	
	return HandlerFactory;
}());