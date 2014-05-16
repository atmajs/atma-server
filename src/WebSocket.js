
var WebSocket = (function(){
	
	var SocketListeners = {},
		doNothing = function(){}
		;
	var io;
	
	var WebSocket = {
		listen: function(httpServer) {
			this.listen = doNothing;
			
			logger.log('Web socket opened'.green.bold);
	
			// socket.io bug workaround
			var _io = global.io;
			delete global.io;
	
			io = require('socket.io').listen(httpServer, {
				'log level': 2
			});
	
			global.io = _io;
	
			
			for (var key in SocketListeners) {
				io
					.of(key)
					.on('connection', createHandler(key, SocketListeners[key]));
			}
		},
	
		getHandler: function(namespace) {
			return SocketListeners[namespace];
		},
		
		registerHandler: function(namespace, Handler){
			SocketListeners[namespace] = Handler;
			
			if (io == null) 
				return;
			
			io
				.of(namespace)
				.on('connection', createHandler(namespace, Handler))
				;
		},
		
		of: function(namespace){
			if (io == null) 
				return null;
			
			return io.of(namespace);
		}
	};
	
	function createHandler(namespace, Handler) {
		return function(socket) {
			new Handler(socket, io);
		};
	}
	
	return WebSocket;
}());
