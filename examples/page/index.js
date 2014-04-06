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
		
		var connect = require('connect'),
			server = require('http')
				.createServer(app.responder({
					middleware: [
						function (req, res, next) {
							logger.log(req.url);
							next()
						},
						connect.json()
					]
				}));
			
		server.listen(app.config.port || 5778);
	});