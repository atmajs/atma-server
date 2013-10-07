
server.HttpService = (function(){
	
	var HttpServiceProto = {
		Extends: Class.Deferred,
		process: function(req, res){
			
			var path = req.url,
				entry = this.routes.get(path);
			
			if (entry == null) {
				this.reject('Service Endpoint not Found: ' + path, 404);
				return this;
			}
			
			var value = entry.value;
			
			
			value.call(this, req, res, entry.current.params);
			
			return this;
		}
	};
	
	
	return function HttpService(proto){
		
		var routes = new ruta.Collection,
			key,
			c;
		
		for (key in proto) {
			
			c = key[0];
			if ('/' === c || '!' === c) {
				
				routes.add(key, proto[key]);
			}
		}
		
		proto.routes = routes;
		
		for (key in HttpServiceProto) {
			proto[key] = HttpServiceProto[key];
		}
		
		return Class(proto);
	}
	
	
}());