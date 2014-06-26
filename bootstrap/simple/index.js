require('atma-libs/globals-dev');
require('atma-logger');
require('atma-io');
require('atma-server');

global.app = atma

	.server
	.Application()
	.done(function(app) {
		
		var connect = require('connect'),
			passport = require('passport'),
			port = process.env.PORT || 5777;
	
		
		var responder = app.processor({
			// midds are always called
			before: [
				connect.favicon()
			],
			
			// midds are only called if application endpoint handler is found
			middleware: [
				connect.query(),
				connect.cookieParser(),
				connect.session({ secret: 'key' }),
				passport.initialize(),
				passport.session()
			],
			
			// midds are always called, if not already responded in midds before
			after: [
				atma.server.StaticContent.respond
			]
		});
		
		
		var server = connect()
			.use(responder)
			.listen(port);
		
		
		if (app.args.debug) {
			app.autoreload(server);
			mask.cfg('allowCache', false);
		}
		
		logger.log('Listen %s'.green.bold, port);
	});	


