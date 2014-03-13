
server.HttpService = (function(){
	
	// import utils.js
	// import Barricade.js
	// import CrudWrapper.js
	// import static.js
	
	var HttpServiceProto = Class({
		Extends: Class.Deferred,
		secure: null,
		
		Construct: function(route){
			
			if (route == null) 
				return;
			
			var pathParts = route.path,
				i = 0,
				imax = pathParts.length,
				count = 0;
			for (; i < imax; i++){
				if (typeof pathParts[i] !== 'string') 
					break;
				
				count += pathParts[i].length + 1;
			}
			
			this.rootCharCount = count;
			
			if ('secure' in route.value) {
				this.secure = route.value.secure || {};	
			}
			
		},
		help: function(){
			var routes = this.routes.routes,
				endpoints = []
				;
			
			
			var i = -1,
				imax = routes.length,
				endpoint, info, meta;
			while ( ++i < imax ){
				endpoint = routes[i];
				info = {
					method: endpoint.method || '*',
					path: endpoint.definition,
					description: null,
					args: null
				};
				
				meta = endpoint.value.meta;
				if (meta) {
					info.description = meta.description;
					info.args = meta.args;
				}
				
				endpoints.push(info);
			}
			
			return endpoints;
		},
		process: function(req, res){
			
			var iQuery = req.url.indexOf('?');
			if (iQuery !== -1
				&& /\bhelp\b/.test(req.url.substring(iQuery))) {
				
				this.resolve(this.help());
			}
			
			if (secure_canAccess(req, this.secure) === false) {
				
				return this
					.reject(SecurityError('Access Denied'));
			}
			
			var path = req.url.substring(this.rootCharCount),
				entry = this.routes.get(path, req.method);
			
			
			if (entry == null) 
				return this
					.reject(NotFoundError('Service method not Found: <'
						+ req.method
						+ '> '
						+ path));
				
			
			entry
				.value
				.process
				.call(this, req, res, entry.current.params);
				
			return this;
		}
	});
	
	
	function HttpService(proto){
		
		var routes = new ruta.Collection,
			defs = proto.ruta || proto,
			path, responder, x
			;
		for (path in defs) {
			x = defs[path];
			responder = null;
			
			if (is_Function(x)) {
				responder = {
					process: x
				};
			}
			
			if (responder == null && is_Array(x)) {
				responder = {
					process: new Barricade(x)
				}
			}
			
			if (responder == null && is_Object(x)) {
				responder = x;
			}
			
			if (responder != null && is_Array(responder.process)) 
				responder.process = new Barricade(responder.process);
			
			if (responder == null || is_Function(responder.process) === false) {
				logger.warn('<HttpService> `process` is not a function'
							+ path 
							+ (typeof responder.process));
				continue;
			}
			
			routes.add(path, responder);
		}
		
		proto.routes = routes;
		
		if (proto.Extends == null) {
			
			proto.Extends = HttpServiceProto;
			
		} else if (Array.isArray(proto.Extends)) {
			
			proto.Extends.push(HttpServiceProto);
		} else {
			
			proto.Extends = [HttpServiceProto, proto.Extends];
		}
		
		return Class(proto);
	}
	
	HttpService.Barricade = Barricade;
	
	return HttpService;
}());