include
	.js('../../lib/server.js')
	.done(function(){

		
		atma
			.server
			.app
			.handlers
			.registerService('^/reject', atma.server.HttpService({
				'/string': function(){
					this.reject('String reject');
				},
				'/native': function(){
					this.reject(new TypeError('Native reject'));
				},
				'/http': function(){
					this.reject(atma.server.HttpError('Http reject'));
				}

			}));

	})
