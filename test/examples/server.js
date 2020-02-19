var spawnServer,
	shutdownServer
	;

(function(){
	
	spawnServer = function(name, cb){
		var Process = require('child_process'),
			Path = require('path');
			
		if (global.testServer) {
			global.testServer.on('close', function(error){
				global.testServer = null;
				spawnServer(name, cb);
			});
			
			try {
				global.testServer.kill('SIGINT');
			} catch(error){
				
				logger.error('kill error', error);
			}
			return;
		}
		
		global.testServer = Process.spawn('node', [
			'index.js',
			'--port',
			'5888'
		], {
			cwd: Path.resolve(process.cwd(), 'examples/' + name),
			stdio: [process.stdin, process.stdout, process.stderr]
		});
		
		testServer.on('error', function(error){
			logger.error(error);
		});
		
		setTimeout(()=> cb(), 500);
	}
}());
