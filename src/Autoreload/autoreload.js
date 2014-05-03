var Autoreload = (function(){
    
    // import WatcherHandler.js
    // import Connection.js
    
    
    
    var rootUri = new net.Uri(process.cwd() + '/'),
        Autoreload
        ;
    
    return Autoreload = {
        watch: function(requestedUrl){
            var start = requestedUrl[0] === '/'
                    ? 1
                    : 0,
                query = requestedUrl.indexOf('?'),
                end = query === -1
                    ? requestedUrl.length
                    : query
                    ;
            
            requestedUrl = requestedUrl.substring(start, end);
            
            
            var uri = rootUri.combine(requestedUrl),
                file = new io.File(uri);
            
            if (!(file.uri && file.uri.file)) 
                return;
            
            if (WatcherHandler.isWatching(file)) 
                return;
            
            if (file.exists() === false)
                return;
            
            
            WatcherHandler.watch(file);
        },
        unwatch: function(path){
            
            WatcherHandler.unwatch(new io.File(path));
        },
        
        fileChanged: function(path, sender){
            
            WatcherHandler.fileChanged(path, sender);
        },
        
        isWatching: function(file){
            if (typeof file === 'string') 
                file = new io.File(file);
            
            return WatcherHandler.isWatching(file);
        },
        
        listenDirectory: function(dir, callback){
            new io
                .Directory(dir)
                .watch(callback)
                ;
        },
        
        enableForApp: function(app){
            
            WebSocket.registerHandler('/browser', ConnectionSocket);
            
            app.autoreloadEnabled = true;
            
            var configs = new io.Directory('server/config/');
            if (configs.exists()) 
                configs.watch(reloadConfigDelegate(app));
            
			include.cfg('autoreload', this);
            
            return this;
        },
        
        getWatcher: function(){
            return WatcherHandler;
        }
    };
    
    //= functional
    
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
    
    
}());
