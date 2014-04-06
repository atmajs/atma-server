require('atma-libs/globals-dev');
require('atma-logger/lib/global-dev');
require('atma-io');
require('../../lib/server.js');


global.app = atma
	.server
	.Application({
		configs: null,
		
		config: {
			pages: {
				'/test': {
					controller: atma.server.HttpPage({
						masterPath: '/master.mask',
						templatePath: '/pages/test.mask'
					})
				}
			}
		}
	})
	.done(function(app){
		
		var server = require('http')
			.createServer(app.responder());
			
		server.listen(5778);
	});