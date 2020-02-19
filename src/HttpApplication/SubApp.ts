import { include, is_String } from '../dependency'	
import Application, { respond_Raw } from './Application'	
import { IApplicationDefinition, IApplicationConfig } from './IApplicationConfig'	
import { IncomingMessage, ServerResponse } from 'http';
import { class_Dfr } from 'atma-utils';

const status_initial = '';
const status_loading = 'loading';
const status_loaded = 'loaded';
const status_errored = 'error';

export default class HttpSubApplication extends class_Dfr {
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
        this.dfr = new class_Dfr;
        
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
                .done((resp) => {
                    
                    if (resp.App instanceof Application) {
                        
                        resp
                            .App
                            .done(app => {
                                this.app_ = app;
                                this.process = this.handle;
                                this.status = status_loaded;
                                this.dfr.resolve();
                            });
                        
                        return;
                    }
                    that.status = status_errored;
                });
                
            return;
        }

        
        var definition = mix as IApplicationDefinition,
            configs = definition.configs,
            config = definition.config
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
            that.process = that.handle
            that.status = status_loaded;
            that.dfr.resolve();
        });
    }
    
    process (req: IncomingMessage, res: ServerResponse){
        if (this.status === status_loading) {
            this
                .dfr
                .done(this.handle.bind(this, req, res));
            return;
        }
        
        if (this.status === status_loaded) {
            this.handle(req, res);
            return;
        }
        
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('<Sub Application Errored> ' + this.path_);
    }
    
    handle (req: IncomingMessage, res: ServerResponse){
        
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