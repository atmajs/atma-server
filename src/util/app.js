var app_isDebug;
(function(){
	
	app_isDebug = function(){
		var debug = Boolean(__app.args.debug || __app.config.debug);
		app_isDebug = function(){
			return debug;
		};
		return debug;
	};
	
}());