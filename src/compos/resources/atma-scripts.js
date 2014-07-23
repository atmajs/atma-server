(function(){
	
	// import ./compo-prod.js
	// import ./compo-dev.js
	
	var Handler = app.config.$is('debug')
		? Dev_Scripts
		: Prod_Scripts
		;
	
	mask.registerHandler('atma:scripts', Handler);
}());
