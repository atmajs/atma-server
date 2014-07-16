var Autoreload;
(function(){
    Autoreload = {
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
				path = net.Uri.combine(root, requestedUrl),
            	file = new io.File(path)
				;
            file.requestedUrl = requestedUrl;
			
			this.watchFile(file);
		},
		watchFile: function(file){
			if (!(file.uri && file.uri.file))
				// virtual file?
				return;
			if (/\.map$/.test(file.uri.file))
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
    
    var root = path_resolveSystemUrl('/');
        
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
