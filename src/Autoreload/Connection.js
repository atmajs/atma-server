

var ConnectionSocket = Class({
    Construct: function(socket) {
        
        logger.log('<autoreload> Socket connected');
        this.socket = socket;

        socket.on('disconnect', this.disconnected);

        WatcherHandler.on('fileChange', this.fileChanged);
    },
    Self: {
        fileChanged: function(path) {
            var socket = this.socket;
            setTimeout(function(){
                logger.log('<autoreload sockets> path', path);
                socket.emit('filechange', path);
            }, 50);   
        },
        disconnected: function() {
            WatcherHandler.off('fileChange', this.fileChanged);
        }
    }
});
