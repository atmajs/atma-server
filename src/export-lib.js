require('tslib');

const server = require('./export.ts');

(function () {
	if (exports.atma != null && typeof exports.atma === 'object') {
		if (exports.atma.server) {
			obj_extend(exports.atma.server, server);
			return;
		}
		exports.atma.server = server;
		return;
	}


	exports.atma = {
		server: server
	};
}());
