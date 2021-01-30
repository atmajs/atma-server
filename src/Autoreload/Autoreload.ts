import { io, include, mask, Uri } from '../dependency'
import Watcher from './WatcherHandler'
import ConnectionSocket from './ConnectionSocket'
import Application from '../HttpApplication/Application'

class AutoreloadInner {
    prepared = false
    enabled = false

    app: Application
    base: string

    watcher = Watcher

    prepare (app: Application, debug?: boolean) {
        if (app.config.debug || debug === true) {
            let configs = new io.Directory('server/config/');
            if (configs.exists()) {
                configs.watch(reloadConfigDelegate(app));
            }

            include.cfg('autoreload', this);
            mask.cfg('allowCache', false);

            this.watcher.on('fileChange', (path) => {
                app.emit('fileChange', path);
            });
            this.prepared = true;
        }
    }

    enable(app: Application) {
        if (this.enabled) {
            return;
        }
        if (this.prepared !== true) {
            this.prepare(app, true);
        }

        this.app = app;
        this.enabled = true;

        app
            .webSockets
            .registerHandler('/browser', ConnectionSocket)
            ;

        this.base = app.config.base;
        return this;
    }

    watch(requestedUrl, config) {
        if (/\.[\w]+$/.test(requestedUrl) === false) {
            // no extension
            return;
        }

        let q = requestedUrl.indexOf('?');
        if (q !== -1)
            requestedUrl = requestedUrl.substring(0, q);

        let root = config.static || config.base || '/',
            path = Uri.combine(root, requestedUrl),
            file = new io.File(path)
            ;
        (<any>file).requestedUrl = requestedUrl;

        this.watchFile(file);
    }
    watchFile(file: InstanceType<typeof io.File>) {
        if (!file.uri?.file) {
            // virtual file?
            return;
        }
        if (/\.map$/.test(file.uri.file)) {
            return;
        }
        if (this.watcher.isWatching(file)) {
            return;
        }
        if (io.File.prototype.exists.call(file) === false) {
            return;
        }

        this.watcher.watch(file);
    }
    unwatch(path) {
        this.watcher.unwatch(new io.File(path));
    }

    fileChanged(path, sender?) {
        this.watcher.fileChanged(path, sender, null, this.base);
    }

    isWatching(file: string | InstanceType<typeof io.File>) {
        if (typeof file === 'string') {
            file = new io.File(file);
        }
        return this.watcher.isWatching(file);
    }

    listenDirectory(dir, callback) {
        new io
            .Directory(dir)
            .watch(callback)
            ;
    }

    getWatcher() {
        return this.watcher;
    }
}

export const Autoreload = new AutoreloadInner;

//let root = path_resolveSystemUrl('/');

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
