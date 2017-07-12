"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var WatcherHandler_1 = require("./WatcherHandler");
var ConnectionSocket_1 = require("./ConnectionSocket");
exports.default = {
    enabled: false,
    enable: function (app) {
        this.enabled = true;
        app
            .webSockets
            .registerHandler('/browser', ConnectionSocket_1.default);
        var configs = new dependency_1.io.Directory('server/config/');
        if (configs.exists())
            configs.watch(reloadConfigDelegate(app));
        dependency_1.include.cfg('autoreload', this);
        dependency_1.mask.cfg('allowCache', false);
        this.base = app.config.base;
        return this;
    },
    watch: function (requestedUrl, config) {
        if (/\.[\w]+$/.test(requestedUrl) === false) {
            // no extension
            return;
        }
        var q = requestedUrl.indexOf('?');
        if (q !== -1)
            requestedUrl = requestedUrl.substring(0, q);
        var root = config.static || config.base || '/', path = dependency_1.Uri.combine(root, requestedUrl), file = new dependency_1.io.File(path);
        file.requestedUrl = requestedUrl;
        this.watchFile(file);
    },
    watchFile: function (file) {
        if (!(file.uri && file.uri.file))
            // virtual file?
            return;
        if (/\.map$/.test(file.uri.file))
            return;
        if (WatcherHandler_1.default.isWatching(file))
            return;
        if (dependency_1.io.File.prototype.exists.call(file) === false)
            return;
        WatcherHandler_1.default.watch(file);
    },
    unwatch: function (path) {
        WatcherHandler_1.default.unwatch(new dependency_1.io.File(path));
    },
    fileChanged: function (path, sender) {
        WatcherHandler_1.default.fileChanged(path, sender, null, this.base);
    },
    isWatching: function (file) {
        if (typeof file === 'string')
            file = new dependency_1.io.File(file);
        return WatcherHandler_1.default.isWatching(file);
    },
    listenDirectory: function (dir, callback) {
        new dependency_1.io
            .Directory(dir)
            .watch(callback);
    },
    getWatcher: function () {
        return WatcherHandler_1.default;
    }
};
var root = path_resolveSystemUrl('/');
function reloadConfigDelegate(app) {
    return function (path) {
        app
            .defer()
            ._loadConfig()
            .done(function () {
            Autoreload.fileChanged(path);
        });
    };
}
