import { logger } from './dependency'
import Application from './HttpApplication/Application'


export default class WebSocket {
    SocketListeners = {}
    io: any = null;
    ioSsl: any = null;

    constructor(public app: Application) {

    }

    listen(httpServer) {
        this.listen = doNothing;
        logger.log('Web socket opened'.green.bold);
        this.io = io_create(httpServer, this.SocketListeners);
    }
    listenSsl(httpsServer) {
        this.listenSsl = doNothing;
        logger.log('Wsl socket opened'.green.bold);
        this.ioSsl = io_create(httpsServer, this.SocketListeners);
    }
    hasHandlers() {
        return Object.keys(this.SocketListeners).length !== 0
    }
    getHandler(namespace) {
        return this.SocketListeners[namespace];
    }
    registerHandler(namespace, Handler) {
        this.SocketListeners[namespace] = Handler;

        if (this.io == null && this.ioSsl == null) {
            if (this.app != null) {
                if (this.app._server) {
                    this.listen(this.app._server);
                }
                if (this.app._sslServer) {
                    this.listenSsl(this.app._sslServer);
                }
            }
            return;
        }
        if (this.io) {
            io_listen(this.io, namespace, Handler);
        }
        if (this.ioSsl) {
            io_listen(this.ioSsl, namespace, Handler);
        }
    }
    clients(namespace) {
        let clients = [];
        if (this.io) {
            let nsp = this.io.of(namespace);
            for (let id in nsp.connected) {
                clients.push(nsp.connected[id]);
            }
        }
        if (this.ioSsl) {
            let nsp = this.ioSsl.of(namespace);
            for (let id in nsp.connected) {
                clients.push(nsp.connected[id]);
            }
        }
        return clients;
    }
    // of (namespace){
    // 	return this.io == null
    // 		? null
    // 		: this.io.of(namespace);
    // }
    emit(namespace, ...args) {
        let cb = args[args.length - 1];
        if (this.io == null && this.ioSsl === null) {
            console.error(
                'Emitting to the websockets (%s), but server is not started'
                , namespace
            );
            cb?.({ message: 'Server is not started' });
            return;
        }
        if (this.SocketListeners[namespace] == null) {
            console.error(
                'No handlers are bound to the namespace', namespace
            );
            cb?.({ message: 'No handlers' });
            return;
        }
        if (typeof cb === 'function') {
            args.pop();
            io_emitMany(this.clients(namespace), args, cb);
            return;
        }
        if (this.io != null) {
            let nsp = this.io.of(namespace);
            nsp.emit.apply(nsp, args);
        }
        if (this.ioSsl != null) {
            let nsp = this.ioSsl.of(namespace);
            nsp.emit.apply(nsp, args);
        }
    }

};

var io_create,
    io_handlerDelegate,
    io_listen,
    io_emitMany;
(function () {
    io_create = function (httpServer, listeners) {
        var io = require('socket.io')(httpServer, {
            'log level': 2
        });
        for (var nsp in listeners) {
            io_listen(io, nsp, listeners[nsp]);
        }
        return io;
    };
    io_listen = function (io, namespace, Handler) {
        io.of(namespace).on(
            'connection'
            , io_handlerDelegate(io, namespace, Handler)
        );
    };
    io_handlerDelegate = function (io, namespace, Handler) {
        return function (socket) {
            new Handler(socket, io);
        };
    };
    io_emitMany = function (clients, args, cb) {
        var count = clients.length,
            results = [];
        if (count === 0) {
            cb(null, results);
            return;
        }
        var imax = count,
            i = -1,
            x;
        args.push(complete);
        while (++i < count) {
            x = clients[i];
            x.emit.apply(x, args);
        }
        function complete(data) {
            results.push(data);
            if (--count < 1)
                cb(null, results);
        }
    };
}());

function doNothing() { }
