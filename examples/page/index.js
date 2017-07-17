let server = require('../../lib/server.js');

class TestController extends server.HttpPage {
	constructor (...args) {
		super(...args);
		this.masterPath = '/master.mask';
		this.templatePath = '/pages/hello.mask';
	}

	onRenderStart (model, ctx) {
		if (ctx.req.method === 'POST') 
			this.model = ctx.req.body;
		
	}
}; 

server
	.Application.create({
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
	.fail(function (error){		
		console.error(error);
	})
	.done(function(app){
		app.processor({
			before: [
				function (req, res, next) {
					console.log('Request:', req.url);
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