let server = require('../../lib/server.js');

server
	.Application.create({
        debug: true,
        configs: null,		
		config: {            
			page: {
                location: {
                    pageFiles: '/'
                }
            }
		}
	})
	.done(app => {
        app
            .processor({
                after: [
                    server.middleware.static
                ]
            })
            .listen(app.config.port || 5778);
    });