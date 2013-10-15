
server.HttpService = (function(){
	
	var HttpServiceProto = Class({
		Extends: Class.Deferred,
		secure: null,
		
		Construct: function(route){
			
			var i = 0,
				imax = route.parts.length,
				count = 0;
			for (; i < imax; i++){
				if (typeof route.parts[i] !== 'string') 
					break;
				
				count += route.parts[i].length + 1;
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
	
	
	return function HttpService(proto){
		
		var routes = new ruta.Collection;
		
		var defs = proto.ruta || proto;
		for (var key in defs) {
			
			routes.add(key, defs[key]);
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
	
	
	function secure_canAccess(req, secureObj){
		
		if (secureObj == null) 
			return true;
		
		var user = req.user,
			role = secureObj.role
			;
		
		return user != null && (role == null || user.isInRole(role));
	}
	
}());