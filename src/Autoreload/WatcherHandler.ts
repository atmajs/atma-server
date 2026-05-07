import { path_normalize } from '../util/path'
import { io, logger, mask, include, Uri } from '../dependency'
import { class_EventEmitter } from 'atma-utils';
import { type File } from 'atma-io';
interface IWatcherEvents {
    fileChange(rel, absPath?, reqPath?)
}

export class WatcherHandler extends class_EventEmitter<IWatcherEvents> {
    static get Instance (): WatcherHandler {
        return _instance ?? (_instance = new WatcherHandler);
    }
    constructor () {
        super();
        this.fileChanged = this.fileChanged.bind(this);
    }
    watch (file: InstanceType<typeof File>){
        let path = file.uri.toString();
        if (_watchers[path] != null) {
            return;
        }
        let watcher = new FileWatcher(file);
        watcher.bind(this.fileChanged);

        _watchers[path] = watcher;
    }
    unwatch (file, callback?){
        let path = file.uri.toString();

        if (_watchers[path] == null) {
            logger.log('<watcher> No watchers', path);
            return
        }

        _watchers[path].unbind(callback);

        delete _watchers[path];
    }

    isWatching (file){
        let path = file.uri.toString();

        return _watchers[path] != null;
    }

    fileChanged (absPath, sender, requestedUrl?: string, base?: string){
        if (mask.Module.clearCache) {
            mask.Module.clearCache();
        }
        if (sender === 'filewatcher') {
            let rel = requestedUrl ?? ('/' + absPath.replace(rootFolder, ''));

            if (include.getResource(rel) == null) {
                this.trigger('fileChange', rel, absPath);
            }

            return;
        }
        if (this.isWatching(new io.File(absPath))) {
            return;
        }
        if (base) {
            base = new Uri(base).toLocalFile();
            absPath = absPath.replace(base, '');
        }

        this.trigger('fileChange', absPath);

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



const rootFolder = path_normalize(process.cwd() + '/');

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
            .watch(this.file.uri.toLocalFile(), {}, this.fileChanged);

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



let _watchers = {} as { [path: string]: FileWatcher };
let _instance: WatcherHandler = null;

export default new WatcherHandler;
