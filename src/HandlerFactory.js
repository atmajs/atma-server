
var HandlerFactory = (function(){
		
	
	return Class({
		
		Construct: function(){
			this.handlers = [];
			this.services = new Routes();
			
			this.pages = new Routes();
		},
		
		registerPages: function(routes){
			var page, key;
			
			for (key in routes) {
				
				page = routes[key];
				this.pages.add(page.path, page);
			}
			
			return this;
		},
		
		registerHandlers: function(routes, config){
			
			for (var key in routes) {
				this.handlers.push({
					matcher: rgx_fromString(key),
					handler: handler_path(routes[key], config)
				});
			}
			
			return this;
		},
		
		registerServices: function(services, config){
			for (var key in services) {
				this.services.add(key, handler_path(services[key], config));
			}
			
			return this;
		},
		
		get: function(req, callback){
			
			var handler = get_handler(this, req.url);
			if (handler) {
				
				if (typeof handler === 'string') {
					include
						.instance()
						.js(handler + '::Handler')
						.done(function(resp){
							
							callback(new resp.Handler());
						});
					return;
				}
				
				callback(handler);
				return;
			}
			
			
			var route = get_service(this, req.url);
			
			if (route) {
				
				
				var service = route.value;
				
				if (typeof service === 'string') {
					include
						.instance()
						.js(service + '::Service')
						.done(function(resp){
							
							callback(new resp.Service());
						});
					return;
				}
				
				callback(service);
				return;
			}
			
			
			var route = this.pages.get(req.url);
			if (route) {
				
				var pageData = route.value;
				callback(new server.Page(pageData));
				
				return;
			}
			
			
			callback(null);
		}
	});
	
	
	function get_handler(factory, path) {
		
		var handlers = factory.handlers;
		
		for (var i = 0, x, imax = handlers.length; i < imax; i++){
			x = handlers[i];
			
			if (x.matcher.test(path)) {
				return x.handler;
			}
		}
		
		return null;
	}
	
	function get_service(factory, path) {
		var services = factory.services,
			route = services.get(path);
		
		return route;
	}
	
	function handler_path(path, config) {
		if (path.charCodeAt(0) === 47) {
			// /
			return path;
		}
		
		var location = config && config.location;
		if (location == null) {
			console.error('[Handler] Path is relative but no location. Set handler: {location: X} in config');
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

	
}());