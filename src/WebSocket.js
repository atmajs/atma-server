"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("./dependency");
var WebSocket = (function () {
    function WebSocket(app) {
        this.app = app;
        this.SocketListeners = {};
        this.io = null;
    }
    WebSocket.prototype.listen = function (httpServer) {
        this.listen = doNothing;
        dependency_1.logger.log('Web socket opened'.green.bold);
        this.io = io_create(httpServer, this.SocketListeners);
    };
    WebSocket.prototype.hasHandlers = function () {
        return Object.keys(this.SocketListeners).length !== 0;
    };
    WebSocket.prototype.getHandler = function (namespace) {
        return this.SocketListeners[namespace];
    };
    WebSocket.prototype.registerHandler = function (namespace, Handler) {
        this.SocketListeners[namespace] = Handler;
        if (this.io == null) {
            if (this.app != null && this.app._server)
                this.listen(this.app._server);
            return;
        }
        io_listen(this.io, namespace, Handler);
    };
    WebSocket.prototype.clients = function (namespace) {
        if (this.io == null)
            return [];
        var nsp = this.io.of(namespace), clients = [];
        for (var id in nsp.connected) {
            clients.push(nsp.connected[id]);
        }
        return clients;
    };
    WebSocket.prototype.of = function (namespace) {
        return this.io == null
            ? null
            : this.io.of(namespace);
    };
    WebSocket.prototype.emit = function (namespace) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cb = args[args.length - 1];
        if (this.io == null) {
            console.error('Emitting to the websockets (%s), but server is not started', namespace);
            cb && cb({ message: 'Server is not started' });
            return;
        }
        if (this.SocketListeners[namespace] == null) {
            console.error('No handlers are bound to the namespace', namespace);
            cb && cb({ message: 'No handlers' });
            return;
        }
        if (typeof cb === 'function') {
            args.pop();
            io_emitMany(this.clients(namespace), args, cb);
            return;
        }
        var nsp = this.io.of(namespace);
        nsp.emit.apply(nsp, args);
    };
    return WebSocket;
}());
exports.default = WebSocket;
;
var io_create, io_handlerDelegate, io_listen, io_emitMany;
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
        io.of(namespace).on('connection', io_handlerDelegate(io, namespace, Handler));
    };
    io_handlerDelegate = function (io, namespace, Handler) {
        return function (socket) {
            new Handler(socket, io);
        };
    };
    io_emitMany = function (clients, args, cb) {
        var count = clients.length, results = [];
        if (count === 0) {
            cb(null, results);
            return;
        }
        var imax = count, i = -1, x;
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
