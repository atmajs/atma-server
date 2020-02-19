declare var atma;

UTest({
	$config: <any> {
		'http.eval': function(){
			
			var FooService = atma
				.server
				.HttpService({
					'$get /': function(res, req){
						this.resolve({
							name: 'foo'
						});
					},
					
					'$get /baz': function(res, req){
						this.resolve({
							name: 'baz'
						})
					},
					
					'$post /echo': function(req, res){
						if (req.body.name == null) {
							this.reject(atma.server.HttpError('`name` expected'));
							return;
						}
						
						this.resolve({
							name: req.body.name
						});
					},
					
					'$get /many': [
						function(req, res, params, next){
							req.sum = 5;
							next();
						},
						
						function(req, res, params, next){
							this.resolve({
								sum: req.sum + 5
							});
						}
					]
				})
				;
			
			atma
				.server
				.app
				.handlers
				.registerService('^/foo', FooService);
		}
	},
	
	'http service root': function(done){
		
		UTest
			.server
			.request('/foo')
			.done(function(obj){
				notEq_(obj, null);
				
				eq_(obj.name, 'foo');
				done();
			});
	},
	
	
	'http service nested path': function(done){
		
		UTest
			.server
			.request('/foo/baz')
			.done(function(obj){
				notEq_(obj, null);
				
				eq_(obj.name, 'baz');
				done();
			})
			.fail(assert.avoid('nested path'));
	},
	
	'http service echo': function(done){
		UTest
			.server
			.request('/foo/echo', 'post', { name: 'echoservice' })
			.done(function(obj){
				notEq_(obj, null);
				
				eq_(obj.name, 'echoservice');
				done();
			})
			.fail(assert.avoid('service echo'))
			;
	},
	
	'http service echo - errored': function(done){
		UTest
			.server
			.request('/foo/echo', 'post', {})
			.done(assert.avoid('service - echo - success'))
			.fail(function(xhr){
				has_(xhr.responseText, '`name` expected');
				done();
			})
			;
	},
	
	
	'http service - no endpoint': function(done){
		UTest
			.server
			.request('/foo/daz')
			.done(assert.avoid('service - noendpoint - success'))
			.fail(function(xhr){
				has_(xhr.responseText.toLowerCase(), 'not found');
				done();
			})
			;
	},
	'http service - barricade': function(done){
		UTest
			.server
			.request('/foo/many')
			.done(function(obj){
				eq_(obj.sum, 10);
				done();
			})
			.fail(assert.avoid('barricade'));
			;
	},
	
});