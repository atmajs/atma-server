
server.HttpService = (function(){
	
	// import utils.js
	// import Barricade.js
	// import static.js
	
	var HttpServiceProto = Class({
		Extends: Class.Deferred,
		secure: null,
		
		Construct: function(route){
			
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
		process: function(req, res){
			
			if (secure_canAccess(req, this.secure) === false) {
				
				return this
					.reject({ error: 'Access Denied' }, 401);
			}
			
			var path = req.url.substring(this.rootCharCount),
				entry = this.routes.get(path, req.method);
			
			
			if (entry == null) 
				return this
					.reject('Service method not Found: ' + path, 404);
				
			
			entry
				.value
				.call(this, req, res, entry.current.params);
				
			return this;
		}
	});
	
	
	function HttpService(proto){
		
		var routes = new ruta.Collection,
			defs = proto.ruta || proto,
			path, responder
			;
		for (path in defs) {
			responder = defs[path];
			
			if (arr_isArray(responder)) 
				responder = new Barricade(responder);
			
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