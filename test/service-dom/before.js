include
	.cfg('extentionDefault', { js: 'ts' })
	.cfg('amd', true);
	
var resume = include.pause();
UTest.configurate({
	'http.eval': function(done){
		global.Class = require(process.cwd() + '/node_modules/atma-class/lib/class.node.js');

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