var WebSocket;
(function(){
	
	WebSocket = function (app){
		var io, SocketListeners = {};
		
		return {
			listen: function(httpServer){
				this.listen = doNothing;
				logger.log('Web socket opened'.green.bold);
				
				io = io_create(httpServer, SocketListeners);
			},
			hasHandlers: function(){
				return Object.keys(SocketListeners).length !== 0
			},
			getHandler: function(namespace) {
				return SocketListeners[namespace];
			},
			registerHandler: function(namespace, Handler){
				SocketListeners[namespace] = Handler;
				
				if (io == null) {
					if (app != null && app._server) 
						this.listen(app._server);
					
					return;
				}
				io_listen(io, namespace, Handler);
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
			of: function(namespace){
				return io == null
					? null
					: io.of(namespace);
			},
			emit: function(namespace /* ..args */){
				if (io == null) {
					console.error(
						'Emitting to the websockets (%s), but server is not started'
						, namesace
					);
					return;
				}
				if (SocketListeners[namespace] == null) {
					console.error(
						'No handlers are bound to the namespace', namespace
					);
					return;
				}
				var args = _Array_slice.call(arguments, 1),
					nsp = io.of(namespace);
				nsp.emit.apply(nsp, args);
			}
		}
	};
	
	var io_create,
		io_handlerDelegate,
		io_listen;
	(function(){
		io_create = function(httpServer, listeners) {
			var io = require('socket.io')(httpServer, {
				'log level': 2
			});
			for (var nsp in listeners) {
				io_listen(io, nsp, listeners[nsp]);
			}
			return io;
		};
		io_listen = function(io, namespace, Handler){
			io.of(namespace).on(
				'connection'
				, io_handlerDelegate(namespace, Handler)
			);
		};
		io_handlerDelegate = function(namespace, Handler) {
			return function(socket) {
				new Handler(socket, io);
			};
		};
	}());
	
	function doNothing(){}
}());
