var resume = include.pause();
UTest.configurate({
	'http.eval': function(done){
		Class.MongoStore.settings({
			db: 'test-atma-server'
		});
		
		include
			.js('/lib/server.js')
			.done(function(){
				done();
			});
	}
}, resume);