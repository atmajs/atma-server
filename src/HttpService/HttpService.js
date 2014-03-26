
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
					path: endpoint.definition
				};
				
				meta = endpoint.value.meta;
				if (meta) {
					info.description = meta.description;
					info.arguments = meta.arguments;
					info.response = meta.response;
					
					if ('secure' in endpoint.value) 
						info.secure = endpoint.value.secure || true;
				}
				
				endpoints.push(info);
			}
			
			return endpoints;
		},
		process: function(req, res){
			
			var iQuery = req.url.indexOf('?');
			if (iQuery !== -1
				&& /\bhelp\b/.test(req.url.substring(iQuery))) {
				
				return this.resolve(this.help());
			}
			
			if (secure_canAccess(req, this.secure) === false) {
				return this
					.reject(SecurityError('Access Denied'));
			}
			
			var path = req.url.substring(this.rootCharCount),
				entry = this.routes.get(path, req.method);
			
			
			if (entry == null) {
				var name = this.name || '<service>',
					url = path || '/';
				return this
					.reject(NotFoundError(name
						+ ': endpoint not Found: <'
						+ req.method
						+ '> '
						+ url));
			}
				
			var endpoint = entry.value,
				meta = endpoint.meta,
				args = meta && meta.arguments
				;
			
			if (meta != null && secure_canAccess(req, meta.secure) === false) {
				return this
					.reject(SecurityError('Access Denied'));
			}
			
			if (args != null) {
				var error = service_validateArgs(req, args);
				if (error) 
					return this.reject(RequestError(error));
				
			}
			
			endpoint
				.process
				.call(this, req, res, entry.current.params);
				
			return this;
		}
	});
	
	
	function HttpService(mix){
		var name, args;
		
		if (typeof mix === 'string') {
			name = mix;
			args = _Array_slice.call(arguments, 1);
		} else {
			args = _Array_slice.call(arguments);
		}
		
		var proto = endpoints_merge(args);
		
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
		if (name != null) 
			proto.name = name;
			
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
	
	
	function endpoints_merge(array) {
		if (array.length === 1) 
			return array[0];
		
		var proto = array[0],
			ruta = proto.ruta || proto;
		
		var imax = array.length,
			i = 0,
			x,
			xruta;
		while ( ++i < imax ){
			x = array[i];
			xruta = x.ruta || x;
			
			for(var key in xruta){
				if (xruta[key] != null) 
					ruta[key] = xruta[key];
			}
			
			if (x.ruta == null) 
				continue;
			
			for(var key in x){
				if (key === 'ruta') 
					continue;
				
				if (x[key] != null) 
					proto[key] = x[key];
			}
		}
		
		return proto;
	}
	
	return HttpService;
}());