
(function(){
	
	// import prod.js
	// import dev.js
	
	
	
	var Handler = app.config.debug || app.config.$get('app.debug')
		? Dev_Scripts
		: Prod_Sctipts
		;
	mask.registerHandler('atma:scripts', Handler);
}());
