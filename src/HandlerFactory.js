
var HandlerFactory = (function(){
		
	
	var fns_RESPONDERS = [
		'subapps',
		'handlers',
		'services',
		'pages'
	];
	
	var HandlerFactory = Class({
		
		Construct: function(app){
			this.app = app;
			
			var i = fns_RESPONDERS.length;
			while(--i > -1){
				this[fns_RESPONDERS[i]] = new Routes();
			}
		},
		
		registerPages: function(pages){
			var page, id;
			
			for (id in pages) {
				
				page = pages[id];
				
				if (page.controller == null) {
					page.controller = server.HttpPage;
				}
				else if (is_String(page.controller)) {
					page.controller = this
						.app
						.config
						.$getController(page)
						;
				}
				this.pages.add(page.route, page);
			}
			return this;
		},
		
		registerHandlers: function(routes, handlerCfg){
			for (var key in routes) {
				this.registerHandler(key, routes[key], handlerCfg);
			}
			return this;
		},
		registerHandler: function(path, handler, handlerCfg) {
			if (is_String(handler)) {
				handler = {
					controller: handler_path(handler, handlerCfg)
				};
			}
			
			this
				.handlers
				.add(path, handler)
				;
		},
		
		registerSubApps: function(routes, subAppCfg){
			for(var key in routes){
				this.registerSubApp(key, routes[key], subAppCfg);
			}
			return this;
		},
		registerSubApp: function(name, data, subAppCfg){
			var route = name;
			
			if (route[0] !== '^') {
				if (route[0] !== '/') 
					route = '/' + route;
				
				route = '^' + route;
			}
			
			this
				.subapps
				.add(route, new server.HttpSubApplication(name, data, this.app))
				;
		},
		
		registerServices: function(routes, serviceCfg){
			
			for (var key in routes) {
				this.registerService(key, routes[key], serviceCfg);
			}
			
			return this;
		},
		registerService: function(path, service, serviceCfg){
			if (is_Function(service)) {
				service = {
					controller: service
				};
			}
			
			else if (is_String(service)) {
				service = {
					controller: service
				};
			}
			
			if (is_String(service.controller)) 
				service.controller = handler_path(service.controller, serviceCfg);
			
			
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
		registerWebsocket: function(namespace, handler, handlerCfg){
			
			if (is_String(handler)) {
				var path = handler_path(handler, handlerCfg);
				include
					.instance()
					.js(Handler + '::Handler')
					.done(function(resp){
						
						WebSocket.registerHandler(namespace, resp.Handler);
					});
				return;
			}
			WebSocket.registerHandler(namespace, handler);
		},
		
		get: function(app, req, callback){
			
			var url = req.url,
				method = req.method,
				base = app.config.base,
				route;
				
			if (method === 'POST' && req.body && req.body._method) {
				method = req.body._method;
			}
			
			var imax = fns_RESPONDERS.length,
				i = -1,
				x
				;
			
			while( ++i < imax ){
			
				x = fns_RESPONDERS[i];
				if (processor_tryGet(this, this[x], url, method, base, callback)) 
					return;
			}
			
			if (this.app !== __app) {
				// check handlers of the root application
				var factory = __app.handlers,
					cfg = __app.config;
					
				var hasHandler = processor_tryGet(
						factory,
						factory.handlers,
						url,
						method,
						cfg.base || base,
						callback
					);
				
				if (hasHandler) 
					return;
			}
			
			callback(null);
		},
		
		has: function(url, method){
			
			var imax = fns_RESPONDERS.length,
				i = -1
				;
			while( ++i < imax ){
				
				if (this[fns_RESPONDERS[i]].get(url, method) != null) 
					return true;
			}
			
			return false;
		}
	});

	function processor_tryGet(factory, collection, url, method, base, callback){
		
		var route = collection.get(url, method),
			processor;
		
		if (route == null) 
			return false;
		
		var controller = route.value.controller || route.value;
		
		if (controller == null) {
			logger.error('<routing> no controller', url);
			return false;
		}
		
		if (is_Function(controller)) {
			callback(new controller(route, factory.app));
			return true;
		}
		
		if (is_String(controller)) {
			var path = path_hasProtocol(controller)
				? controller
				: net.Uri.combine(base, controller)
				;
			
			processor_loadAndInit(factory, path, route, callback);
			return true;
		}
	
		if (is_Function(controller.process)) {
			callback(controller);
			return true;
		}
		
		logger.error('<routing> invalid controller', controller);
		return false;
		
	}
	
	function processor_loadAndInit(factory, url, route, callback){
		
		factory
			.app
			.resources
			.js(url + '::Handler')
			.done(function(resp){
				
				var Handler = resp.Handler;
				if (Handler == null) {
					logger.error('<handler> invalid route', url);
					callback(new ErrorHandler('Invalid route: ' + url));
					return;
				}
				if (!is_Function(Handler.prototype.process)) {
					logger.error('<handler> invalid interface - process function not implemented');
					callback(new ErrorHandler('Invalid interface'));
					return;
				}
				if (app_isDebug() === false) 
					route.value.controller = Handler;
				
				if (is_Object(Handler) && is_Function(Handler.process)) {
					callback(Handler);
					return;
				}
				callback(new Handler(route, factory.app));
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
			return this.reject('Invalid Routing');
		}
	});
	
	
	
	return HandlerFactory;
}());