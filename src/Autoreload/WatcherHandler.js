var WatcherHandler;
(function(){
    
    WatcherHandler = new (Class({
        Base: Class.EventEmitter,
        
        watch: function(file){
            var path = file.uri.toString();
            
            if (_watchers[path] != null) 
                return;
            
            var watcher
            watcher = new FileWatcher(path);
            watcher.bind(this.fileChanged);
            
            _watchers[path] = watcher;
        },
        unwatch: function(file, callback){
            var path = file.uri.toString();
            
            if (_watchers[path] == null) {
                logger.log('<watcher> No watchers', path);
                return
            }
            
            _watchers[path].unbind(callback);
            
            delete _watchers[path];
        },
        
        isWatching: function(file){
            var path = file.uri.toString();
            
            return _watchers[path] != null;
        },
        Self: {
            fileChanged: function(path, sender){
                
                if (sender === 'filewatcher') {
                    var rel = '/' + path.replace(rootFolder, '');
                    
                    if (include.getResource(rel) == null) 
                        this.trigger('fileChange', rel, path);
                    
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
            
            return this
                .on('fileChange', callback);
        },
        unbind: function(callback){
            
            return this
                .off('fileChange', callback);
        }
    }));
    
    var rootFolder = path_normalize(process.cwd() + '/');
    
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
                .watcher
                .watch(this.file.uri.toLocalFile(), this.fileChanged);
                
            this.active = true;
        },
        unbind: function(callback) {
            this.off('fileChange', callback);
            
            if (this._listeners.length === 0) {
                io
                    .watcher
                    .unwatch(this.file.uri.toLocalFile());
            }
        }
    });
    
   
    
    var _watchers = {};
   
    
}());