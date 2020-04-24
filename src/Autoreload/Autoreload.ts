import { io, include, mask, Uri } from '../dependency'
import Watcher from './WatcherHandler'
import ConnectionSocket from './ConnectionSocket'


export const Autoreload = {
    enabled: false,
    enable(app) {
        if (this.enabled) {
            return;
        }
        
        this.enabled = true;
        app
            .webSockets
            .registerHandler('/browser', ConnectionSocket)
            ;

        var configs = new io.Directory('server/config/');
        if (configs.exists())
            configs.watch(reloadConfigDelegate(app));

        include.cfg('autoreload', this);
        mask.cfg('allowCache', false);

        this.base = app.config.base;
        return this;
    },

    watch(requestedUrl, config) {
        if (/\.[\w]+$/.test(requestedUrl) === false) {
            // no extension
            return;
        }

        var q = requestedUrl.indexOf('?');
        if (q !== -1)
            requestedUrl = requestedUrl.substring(0, q);

        var root = config.static || config.base || '/',
            path = Uri.combine(root, requestedUrl),
            file = new io.File(path)
            ;
        (<any>file).requestedUrl = requestedUrl;

        this.watchFile(file);
    },
    watchFile(file) {
        if (!(file.uri && file.uri.file))
            // virtual file?
            return;
        if (/\.map$/.test(file.uri.file))
            return;

        if (Watcher.isWatching(file))
            return;

        if (io.File.prototype.exists.call(file) === false)
            return;

        Watcher.watch(file);
    },
    unwatch(path) {
        Watcher.unwatch(new io.File(path));
    },

    fileChanged(path, sender?) {
        Watcher.fileChanged(path, sender, null, this.base);
    },

    isWatching(file) {
        if (typeof file === 'string') {
            file = new io.File(file);
        }
        return Watcher.isWatching(file);
    },

    listenDirectory(dir, callback) {
        new io
            .Directory(dir)
            .watch(callback)
            ;
    },

    getWatcher() {
        return Watcher;
    }
};


//var root = path_resolveSystemUrl('/');

function reloadConfigDelegate(app) {

    return function (path) {
        app
            .defer()
            ._loadConfig()
            .done(function () {

                Autoreload.fileChanged(path);
            })
            ;
    };
}
