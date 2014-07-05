var app_isDebug;
(function(){
	
	app_isDebug = function(){
		if (__app == null) 
			return false;
		
		var debug = Boolean(__app.args.debug || __app.config.debug);
		if (debug !== true) {
			var env = process.env.NODE_ENV || process.env.ENV;
			if (env) {
				debug = /^(test|debug)$/i.test(env);
			}
		}
		app_isDebug = function(){
			return debug;
		};
		return debug;
	};
	
}());