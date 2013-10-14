
server.HttpService = (function(){
	
	var HttpServiceProto = Class({
		Extends: Class.Deferred,
		
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
		},
		process: function(req, res){
			
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
	
	
}());