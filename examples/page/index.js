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
		app.processor({
			before: [
				function (req, res, next) {
					logger.log('Request:', req.url);
					next()
				},
				require('body-parser').json()
			]
		});
		
		require('http')
			.createServer(app.process)
			.listen(app.config.port || 5778)
			;
		console.log('Server on', app.config.port || 5778);
	});