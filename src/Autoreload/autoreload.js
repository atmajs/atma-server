var Autoreload;
(function(){
    Autoreload = {
		enabled: false,
		enable: function(app){
            this.enabled = true;
            WebSocket.registerHandler('/browser', ConnectionSocket);
            
            var configs = new io.Directory('server/config/');
            if (configs.exists()) 
                configs.watch(reloadConfigDelegate(app));
            
			include.cfg('autoreload', this);
            
            return this;
        },
        
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
            
			if (/\.[\w]+$/.test(requestedUrl) === false) {
				// no extension
				return;
			}
            
            var uri = rootUri.combine(requestedUrl),
                file = new io.File(uri);
            
            if (!(file.uri && file.uri.file))
				// virtual file?
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
        
        getWatcher: function(){
            return WatcherHandler;
        }
    };

    // import WatcherHandler.js
    // import Connection.js
    
    var rootUri = new net.Uri(process.cwd() + '/');
        
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
