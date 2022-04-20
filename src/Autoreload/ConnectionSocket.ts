import { logger } from '../dependency'
import WatcherHandler from './WatcherHandler'

export default class ConnectionSocket {
    constructor (public socket) {
        logger.log('<autoreload> Socket connected');

        this.disconnected = this.disconnected.bind(this);
        this.fileChanged = this.fileChanged.bind(this);

        socket.on('disconnect', this.disconnected);
        WatcherHandler.on('fileChange', this.fileChanged);
    }

    fileChanged (path) {
        var socket = this.socket;
        setTimeout(function(){
            logger.log('<autoreload sockets> path', path);
            socket.emit('filechange', path);
        }, 50);
    }

    disconnected () {
        WatcherHandler.off('fileChange', this.fileChanged);
    }
}
