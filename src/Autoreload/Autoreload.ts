import { io, logger, include, mask, Uri } from '../dependency'
import { path_resolveSystemUrl } from '../util/path'
import Watcher, { WatcherHandler }  from './WatcherHandler'
import ConnectionSocket from './ConnectionSocket'


const Autoreload = {
    enabled: false,
    enable: function(app){
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
    
    watch: function(requestedUrl, config){
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
    watchFile: function(file){
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
    unwatch: function(path){
        
        Watcher.unwatch(new io.File(path));
    },
    
    fileChanged: function(path, sender?){
        
        Watcher.fileChanged(path, sender, null, this.base);
    },
    
    isWatching: function(file){
        if (typeof file === 'string') 
            file = new io.File(file);
        
        return Watcher.isWatching(file);
    },
    
    listenDirectory: function(dir, callback){
        new io
            .Directory(dir)
            .watch(callback)
            ;
    },
    
    getWatcher () {
        return Watcher;
    }
};


//var root = path_resolveSystemUrl('/');
    
function reloadConfigDelegate(app){
    
    return function(path){
        app
            .defer()
            ._loadConfig()
            .done(function(){
                
                Autoreload.fileChanged(path);
            })
            ;
    };
}


export default Autoreload;