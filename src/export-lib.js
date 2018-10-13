require('tslib');

const server = require('./export.ts');

(function () {
	if (global.atma == null) { 
		global.atma = {}
	}
	if (global.atma.server) {
		Object.assign(global.atma.server, server);			
	} else {
		global.atma.server = server;
	}		


	Object.assign(exports, server);
}());
