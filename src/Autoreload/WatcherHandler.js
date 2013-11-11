var WatcherHandler = (function(){
    
    var rootFolder = net
        .Uri
        .combine(process.cwd(), '/')
        .replace(/\\/g, '/');
    
    var FileWatcher = Class({
        Base: Class.EventEmitter,
        Construct: function(path){
            
            this.active = false;
            this.file = new io.File(path);
        },
        Self: {
            fileChanged: function(path){
                logger.log('<watcher:changed>', path);
                
                this.trigger('fileChange', path, 'filewatcher')
            }
        },
        
        bind: function(callback){
            this.on('fileChange', callback);
            
            if (this.active) 
                return;
            
            io
                .File
                .watcher
                .watch(this.file, this.fileChanged);
                
            this.active = true;
        },
        unbind: function(callback) {
            this.off('fileChange', callback);
            
            if (this._listeners.length === 0) {
                io
                    .File
                    .watcher
                    .unwatch(this.file.uri.toLocalFile());
            }
        }
    });
    
   
    
    var _watchers = {};
    
    return new new Class({
        Base: Class.EventEmitter,
        
        watch: function(file){
            var path = file.uri.toLocalFile();
            
            if (_watchers[path] != null) 
                return;
            
            var watcher
            watcher = new FileWatcher(path);
            watcher.bind(this.fileChanged);
            
            _watchers[path] = watcher;
                
        },
        unwatch: function(file){
            var path = file.uri.toLocalFile();
            
            if (_watchers[path] == null) {
                logger.log('<watcher> No watchers', path);
                return
            }
            
            _watchers[path].unbind(callback);
            
            delete _watchers[path];
        },
        
        isWatching: function(file){
            var path = file.uri.toLocalFile();
            
            return _watchers[path] != null;
        },
        Self: {
            fileChanged: function(path, sender){
                
                if (sender === 'filewatcher') {
                    // @TODO
                    path = '/' + path.replace(rootFolder, '');
                    
                    if (include.getResource(path) == null) {
                        this.trigger('fileChange', path);
                    }
                    
                    return;
                }
                
                this.trigger('fileChange', path);
                
                //// --
                ////if (sender === 'include') {
                ////    this.trigger('fileChange', path);
                ////    return;
                ////}
                ////
                ////path = path.replace(rootFolder, '');
                ////
                ////////////////if (sender === 'filewatcher' && include.getResource(path)) {
                ////////////////    /**
                ////////////////     *  include.autoreload feature also listens for file changes
                ////////////////     *  and if the file is in includejs cache, then this function
                ////////////////     *  will be called by includejs immediately. This happens
                ////////////////     *  while Application enables autoreload via
                ////////////////     *   include.cfg('autoreload', {
                ////////////////     *      fileChanged: function(path) {
                ////////////////     *          Autoreload.fileChanged(path)
                ////////////////     *      }
                ////////////////     *   });
                ////////////////     */
                ////////////////    return;
                ////////////////}
                ////
                ////
                ////var that = this;
                ////include.bin_tryReload(path, function(){
                ////    that.trigger('fileChange', path);
                ////});
            }
        },
        
        
        bind: function(callback){
            this.on('fileChange', callback);
            
            return this;
        },
        unbind: function(callback){
            this.off('fileChange', callback);
            
            return this;
        }
    });
    
}());