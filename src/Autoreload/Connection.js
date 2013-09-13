
SocketListeners['/browser'] = Class({
    Construct: function(socket) {
        
        logger.log('<socket> Connected');
        this.socket = socket;

        socket.on('disconnect', this.disconnected);

        WatcherHandler.bind(this.fileChanged);
    },
    Self: {
        fileChanged: function(path) {
            logger.log('<autoreload> path', path);
            
            this.socket.emit('filechange', path);    
        },
        disconnected: function() {
            WatcherHandler.unbind(this.fileChanged);
        }
    }
});
