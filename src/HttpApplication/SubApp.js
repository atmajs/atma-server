server.HttpSubApplication = (function(){
    
    
    return Class({
        
        _app: null,
        _res: null,
        Construct: function(path, data){
            
            if (path[0] !== '/') 
                path = '/' + path;
            
            if (path[path.length - 1] !== '/') 
                path += '/';
            
            this._path = path;
            
            if (data instanceof server.Application) {
                this._app = data;
                return;
            }
            
            var controller = data.controller || data,
                that = this;
                
            if (is_String(controller)) {
                this._res = include
                    .instance()
                    .js(controller + '::App')
                    .done(function(resp){
                        
                        if (resp.App instanceof server.Application) {
                            
                            resp.App.done(function(){
                                that.process = that.pipe;
                            });
                            
                            that._app = resp.App;
                        }
                        
                        that._res = null;
                        
                    });
                    
                return;
            }
            
            var configs = data.configs,
                config = data.config
                ;
            
            if (config == null && configs == null) 
                configs = path;
            
            this._app = new server
                .Application({
                    configs: configs,
                    config: config
                })
                .done(function(){
                    that.process = that.pipe
                });
        },
        
        process: function(req, res){
            var that = this;
            
            if (this._res) {
                
                this._res.done(function(){
                    
                    that._res = null;
                    that.process(req, res);
                });
                
                return;
            }
            
            if (this._app) {
                
                this._app.done(function(){
                    that.pipe(req, res);
                });
                return;
            }
            
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('<Invalid Sub Application> ' + this._path);
            return;
        },
        
        pipe: function(req, res){
            
            if (req.url.length < this._path.length) {
                
                res.writeHead(301, {
                    'Location': this._path
                });
                res.end();
                return;
            }
            
            req.url = req.url.replace(this._path, '/');
            
            this._app.process(req, res);
        }
    });

}());