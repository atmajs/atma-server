"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var WatcherHandler_1 = require("./WatcherHandler");
var ConnectionSocket = (function () {
    function ConnectionSocket(socket) {
        this.socket = socket;
        dependency_1.logger.log('<autoreload> Socket connected');
        this.disconnected = this.disconnected.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
        socket.on('disconnect', this.disconnected);
        WatcherHandler_1.default.on('fileChange', this.fileChanged);
    }
    ConnectionSocket.prototype.fileChanged = function (path) {
        var socket = this.socket;
        setTimeout(function () {
            dependency_1.logger.log('<autoreload sockets> path', path);
            socket.emit('filechange', path);
        }, 50);
    };
    ConnectionSocket.prototype.disconnected = function () {
        WatcherHandler_1.default.off('fileChange', this.fileChanged);
    };
    return ConnectionSocket;
}());
exports.default = ConnectionSocket;
