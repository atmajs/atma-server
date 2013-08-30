var WebSocket = {
	listen: function(httpServer) {

		logger.log('<Autoreload> Socket opened'.green.bold);

		// socket.io bug workaround
		var _io = global.io;
		delete global.io;

		var io = require('socket.io')
			.listen(httpServer, {
				'log level': 0
			});

		global.io = _io;

		function listen(namespace, Handler) {
			return function(socket) {
				new Handler(socket, io);
			};
		}

		for (var key in SocketListeners) {
			io
				.of(key)
				.on('connection', listen(key, SocketListeners[key]));
		}
	},

	getConnectionHandler: function(namespace) {
		return SocketListeners[namespace];
	}
};