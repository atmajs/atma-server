require('atma-libs/globals-dev');
require('atma-logger/lib/global-dev');
require('atma-io');
require('../../lib/server.js');

var TestController = atma.server.HttpPage({
	masterPath: '/master.mask',
	templatePath: '/pages/hello.mask',
	onRenderStart: function(model, ctx){
		if (ctx.req.method === 'POST') 
			this.model = ctx.req.body;
		
	}
});

global.app = atma
	.server
	.Application({
		configs: null,
		
		config: {
			pages: {
				'/get/hello': {
					controller: TestController
				},
				'/post/echo': {
					controller: TestController
				}
			}
		}
	})
	.done(function(app){
		
		var bodyParser = require('body-parser'),
			server = require('http')
				.createServer(app.responder({
					middleware: [
						function (req, res, next) {
							logger.log('Request:', req.url);
							next()
						},
						bodyParser.json()
					]
				}));
			
		var port = app.config.port || 5778;
		server.listen(port);
		console.log('Server on', port);
	});