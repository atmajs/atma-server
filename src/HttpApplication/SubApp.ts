import { include, Class, is_String } from '../dependency'	
import Application, { respond_Raw } from './Application'	
import { IApplicationDefinition, IApplicationConfig } from './IApplicationConfig'	

var status_initial = '',
    status_loading = 'loading',
    status_loaded = 'loaded',
    status_errored = 'error'
    ;



export default class HttpSubApplication extends Class.Deferred<HttpSubApplication> {
    status = status_initial
    app_: Application = null
    path_: string
    dfr: any

    constructor (path, mix: Application | string | (IApplicationDefinition & { controller: string}), parentApp) {
        super();

        if (path[0] !== '/') 
            path = '/' + path;
        
        if (path[path.length - 1] !== '/') 
            path += '/';
        
        this.path_ = path;
        this.dfr = new Class.Deferred;
        
        if (mix instanceof Application) {
            this.app_ = mix;
            this.status = status_loaded;
            return;
        }
        let controller;
        if (typeof mix === 'string') {
            controller = mix;
        } else {
            controller = mix.controller;
        }
        
        var that = this;
            
        if (is_String(controller)) {
            this.status = status_loading;
            
            var base = parentApp.config.base || parentApp.base || '/';
            include
                .instance(base)
                .setBase(base)
                .js(controller + '::App')
                .done(function(resp){
                    
                    if (resp.App instanceof Application) {
                        
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
        
        var configs = mix.configs,
            config = mix.config
            ;
        
        if (config == null && configs == null) 
            configs = path;
        
        this.status = status_loading;
        
        new Application({
            configs: configs,
            config: config
        })
        .done(function(app){
            that.app_ = app;
            that.process = that.pipe
            that.status = status_loaded;
            that.dfr.resolve();
        });
    }
    
    process (req, res){
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
    }
    
    pipe (req, res){
        
        if (req.url.length < this.path_.length) {
            
            res.writeHead(301, {
                'Location': this.path_
            });
            res.end();
            return;
        }
        
        prepairUrl(req, this);
        
        this.app_.process(req, res);
    }
    
    /* execute raw request */
    execute (req, res){
        prepairUrl(req, this);
        respond_Raw(this.app_, req, res);
    }
};

function prepairUrl(req, subapp){
    req.url = req.url.replace(subapp.path_, '/');
}