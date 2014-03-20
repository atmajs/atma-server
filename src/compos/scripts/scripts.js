
var	DEBUG = app.config.debug || app.config.$get('app.debug'),
	handler = DEBUG
		? './dev.js'
		: './prod.js'
		;

include
	.js(handler + '::Handler')
	.done(function(resp){
		
		mask.registerHandler('atma:scripts', resp.Handler);
	});
	
