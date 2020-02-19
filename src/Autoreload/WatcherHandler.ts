import { path_normalize } from '../util/path'
import { io, logger, mask, include, Uri } from '../dependency'
import { class_EventEmitter } from 'atma-utils';

export class WatcherHandler extends class_EventEmitter {
    static get Instance (): WatcherHandler {
        return _instance || (_instance = new WatcherHandler);
    }
    constructor () {
        super();
        this.fileChanged = this.fileChanged.bind(this);
    }
    watch (file){
        var path = file.uri.toString();

        if (_watchers[path] != null)
            return;

        var watcher
        watcher = new FileWatcher(file);
        watcher.bind(this.fileChanged);

        _watchers[path] = watcher;
    }
    unwatch (file, callback?){
        var path = file.uri.toString();

        if (_watchers[path] == null) {
            logger.log('<watcher> No watchers', path);
            return
        }

        _watchers[path].unbind(callback);

        delete _watchers[path];
    }

    isWatching (file){
        var path = file.uri.toString();

        return _watchers[path] != null;
    }

    fileChanged (path, sender, requestedUrl, base){
        if (mask.Module.clearCache) {
            mask.Module.clearCache();
        }
        if (sender === 'filewatcher') {
            var rel = requestedUrl || ('/' + path.replace(rootFolder, ''));

            if (include.getResource(rel) == null)
                this.trigger('fileChange', rel, path);

            return;
        }
        if (this.isWatching(new io.File(path))) {
            return;
        }
        if (base) {
            base = new Uri(base).toLocalFile();
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
    
    bind (callback){

        return this
            .on('fileChange', callback);
    }
    unbind (callback){

        return this
            .off('fileChange', callback);
    }
}



var rootFolder = path_normalize(process.cwd() + '/');

class FileWatcher extends class_EventEmitter {
    active = false
    constructor (public file){
        super();
        this.fileChanged = this.fileChanged.bind(this);
    }
    
    fileChanged (path){
        logger.log('<watcher:changed>', path);

        this.trigger('fileChange', path, 'filewatcher', (<any> this.file).requestedUrl);
    }

    bind (callback){
        this.on('fileChange', callback);
        if (this.active)
            return;

        io
            .watcher
            .watch(this.file.uri.toLocalFile(), this.fileChanged);

        this.active = true;
    }
    unbind (callback) {
        this.off('fileChange', callback);

        if ((<any>this)._listeners.length === 0) {
            io
                .watcher
                .unwatch(this.file.uri.toLocalFile());
        }
    }
}



var _watchers = {};
var _instance = null;
export default new WatcherHandler;