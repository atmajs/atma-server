server.HttpSubApplication = (function(){
    
    var status_initial = '',
        status_loading = 'loading',
        status_loaded = 'loaded',
        status_errored = 'error'
        ;
    
    return Class({
        status: status_initial,
        app_: null,
        Construct: function(path, data){
            
            if (path[0] !== '/') 
                path = '/' + path;
            
            if (path[path.length - 1] !== '/') 
                path += '/';
            
            this.path_ = path;
            this.dfr = new Class.Deferred;
            
            if (data instanceof server.Application) {
                this.app_ = data;
                this.status = status_loaded;
                return;
            }
            
            var controller = data.controller || data,
                that = this;
                
            if (is_String(controller)) {
                this.status = status_loading;
                include
                    .instance()
                    .js(controller + '::App')
                    .done(function(resp){
                        
                        if (resp.App instanceof server.Application) {
                            
                            resp
                                .App
                                .done(function(app){
                                    that.app_ = app;
                                    that.process = that.pipe;
                                    that.status = status_loaded;
                                    that.dfr.resolve();
                                });
                            
                            return;
                        }
                        that.status = status_errored;
                    });
                    
                return;
            }
            
            var configs = data.configs,
                config = data.config
                ;
            
            if (config == null && configs == null) 
                configs = path;
            
            this.status = status_loading;
            server
                .Application({
                    configs: configs,
                    config: config
                })
                .done(function(app){
                    that.app_ = app;
                    that.process = that.pipe
                    that.status = status_loaded;
                    that.dfr.resolve();
                });
        },
        
        process: function(req, res){
            if (this.status === status_loading) {
                this
                    .dfr
                    .done(this.pipe.bind(this, req, res));
                return;
            }
            
            if (this.status === status_loaded) {
                this.pipe(req, res);
                return;
            }
            
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('<Sub Application Errored> ' + this.path_);
        },
        
        pipe: function(req, res){
            
            if (req.url.length < this.path_.length) {
                
                res.writeHead(301, {
                    'Location': this.path_
                });
                res.end();
                return;
            }
            
            req.url = req.url.replace(this.path_, '/');
            
            this.app_.process(req, res);
        }
    });

}());