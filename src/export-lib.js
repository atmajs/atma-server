require('tslib');

const server = require('./export.ts')['default'];

(function () {
	if (global.atma != null && typeof global.atma === 'object') {
		if (atma.server) {
			Object.assign(atma.server, server);			
		} else {
			atma.server = server;
		}		
	}

	Object.assign(exports, server);
}());
