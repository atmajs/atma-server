"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("../util/path");
var dependency_1 = require("../dependency");
var WatcherHandler = new (dependency_1.Class({
    Base: dependency_1.Class.EventEmitter,
    watch: function (file) {
        var path = file.uri.toString();
        if (_watchers[path] != null)
            return;
        var watcher;
        watcher = new FileWatcher(file);
        watcher.bind(this.fileChanged);
        _watchers[path] = watcher;
    },
    unwatch: function (file, callback) {
        var path = file.uri.toString();
        if (_watchers[path] == null) {
            dependency_1.logger.log('<watcher> No watchers', path);
            return;
        }
        _watchers[path].unbind(callback);
        delete _watchers[path];
    },
    isWatching: function (file) {
        var path = file.uri.toString();
        return _watchers[path] != null;
    },
    Self: {
        fileChanged: function (path, sender, requestedUrl, base) {
            if (dependency_1.mask.Module.clearCache) {
                dependency_1.mask.Module.clearCache();
            }
            if (sender === 'filewatcher') {
                var rel = requestedUrl || ('/' + path.replace(rootFolder, ''));
                if (dependency_1.include.getResource(rel) == null)
                    this.trigger('fileChange', rel, path);
                return;
            }
            if (this.isWatching(new dependency_1.io.File(path))) {
                return;
            }
            if (base) {
                base = new dependency_1.Uri(base).toLocalFile();
                path = path.replace(base, '');
            }
            this.trigger('fileChange', path);
            /**
            *  include.autoreload feature also listens for file changes
            *  and if the file is in includejs cache, then this function
            *  will be called by includejs immediately. This happens
            *  while Application enables autoreload via
            *   include.cfg('autoreload', {
            *      fileChanged: function(path) {
            *          Autoreload.fileChanged(path)
            *      }
            *   });
            */
        }
    },
    bind: function (callback) {
        return this
            .on('fileChange', callback);
    },
    unbind: function (callback) {
        return this
            .off('fileChange', callback);
    }
}));
var rootFolder = path_1.path_normalize(process.cwd() + '/');
var FileWatcher = dependency_1.Class({
    Base: dependency_1.Class.EventEmitter,
    Construct: function (file) {
        this.active = false;
        this.file = file;
    },
    Self: {
        fileChanged: function (path) {
            dependency_1.logger.log('<watcher:changed>', path);
            this.trigger('fileChange', path, 'filewatcher', this.file.requestedUrl);
        }
    },
    bind: function (callback) {
        this.on('fileChange', callback);
        if (this.active)
            return;
        dependency_1.io
            .watcher
            .watch(this.file.uri.toLocalFile(), this.fileChanged);
        this.active = true;
    },
    unbind: function (callback) {
        this.off('fileChange', callback);
        if (this._listeners.length === 0) {
            dependency_1.io
                .watcher
                .unwatch(this.file.uri.toLocalFile());
        }
    }
});
var _watchers = {};
exports.default = WatcherHandler;
