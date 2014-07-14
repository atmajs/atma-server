
var WebSocket = (function(){
	
	var SocketListeners = {},
		doNothing = function(){}
		;
	var io;
	
	var WebSocket = {
		listen: function(httpServer) {
			this.listen = doNothing;
			
			logger.log('Web socket opened'.green.bold);
			io = require('socket.io')(httpServer, {
				'log level': 2
			});
			
			for (var key in SocketListeners) {
				io
					.of(key)
					.on('connection', createHandler(key, SocketListeners[key]));
			}
		},
		hasHandlers: function(){
			return Object.keys(SocketListeners).length !== 0;
		},
		getHandler: function(namespace) {
			return SocketListeners[namespace];
		},
		registerHandler: function(namespace, Handler){
			SocketListeners[namespace] = Handler;
			
			if (io == null) {
				if (__app != null && __app._server) {
					WebSocket.listen(__app._server);
					return;
				}
				return;
			}
			io
				.of(namespace)
				.on('connection', createHandler(namespace, Handler))
				;
		},
		of: function(namespace){
			if (io == null) 
				return null;
			
			return io.of(namespace);
		},
		clients: function(namespace){
			if (io == null) 
				return [];
			
			var nsp = io.of(namespace),
				clients = []
				;
			for(var id in nsp.connected){
				clients.push(nsp.connected[id]);
			}
			return clients;
		},
		emit: function(namespace /* ..args */){
			if (io == null) {
				console.error(
					'Emitting to the websockets (%s), but server is not started'
					, namesace
				);
				return;
			}
			var args = _Array_slice.call(arguments, 1),
				nsp = io.of(namespace);
			nsp.emit.apply(nsp, args);
		}
	};
	
	function createHandler(namespace, Handler) {
		return function(socket) {
			new Handler(socket, io);
		};
	}
	
	return WebSocket;
}());
