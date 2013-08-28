var Resources = (function(){
	
	
	
	var Resources = {
		getScripts: function(envConfig){
			var scripts = get('scripts', envConfig).slice();
			
			if (this.data.controller) {
				scripts.push('/public/view/'
					+ this.data.view
					+ '/'
					+ this.data.controller
					+ '.js')
			}
			
			return scripts;
		},
		
		getStyles: function(envConfig){
			var styles =  get('styles', envConfig);
			
			return styles;
		}
	};
	
	
	
	
	var get = Class.Fn.memoize(function(type, env){
		
		var routes = new includeLib.Routes(),
			array = [];
		
		
		function register(obj) {
			if (obj == null) 
				return;
			
			for (var key in obj) {
				routes.register(key, obj[key]);
			}
		}
		
		function resolve(pckg) {
			if (pckg == null)
				return;
			
			routes.each('js', pckg, function(namespace, route){
				array.push(route.path);
			});
		}
		
		register(env.client.routes);
		register(env.both.routes);
		
		
		resolve(env.client[type]);
		resolve(env.both[type]);
		
		return array;
	});
	
	
	return Resources;
}());