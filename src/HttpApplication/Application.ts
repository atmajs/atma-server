import { include, logger, Class, obj_extend } from '../dependency'
import { Request, Response } from './Message'
import { cli_arguments } from '../util/cli'
import { app_isDebug } from '../util/app'
import { HttpError } from '../HttpError/HttpError'
import HandlerFactory from '../HandlerFactory'
import WebSocket from '../WebSocket'
import Config from '../Config/Config'
import MiddlewareRunner from '../Business/Middleware'
import Autoreload from '../Autoreload/Autoreload'
import HttpErrorPage from '../HttpPage/HttpErrorPage'
import { initilizeEmbeddedComponents } from '../compos/exports'
import { send_Error, send_Content } from '../util/send'
import HttpSubApplication from './SubApp'
import { IApplicationDefinition, IApplicationConfig, IAppConfigExtended } from './IApplicationConfig'
import HttpRewriter from '../HttpRewrites/HttpRewriter'
import { obj_assign } from '../util/obj'
import { ServerResponse, IncomingMessage } from 'http';
import { IHttpHandler } from '../export';
import { HttpResponse } from '../IHttpHandler';
import { io } from '../dependency'

import * as http from 'http'
import * as https from 'https'
import * as net from 'net'
import { HttpEndpointExplorer } from '../HttpService/HttpEndpointExplorer'

let _emitter = new Class.EventEmitter();

class Application extends Class.Deferred {

    // <Boolean>, if instance is the root application, and not one of the subapps
    isRoot = false

    isHttpsForced = false

    // <HandlerFactory>, stores all endpoints of this application
    handlers: HandlerFactory = null

    // <http.Server> , in case `listen` was called.
    _server: net.Server = null
    _sslServer: net.Server = null;

    // run this middlewares when the endpoint is found. (Runs before the endpoint handler)
    _innerPipe: MiddlewareRunner = null

    // run this middlewares by all requests. Contains also endpoint resolver
    _outerPipe: MiddlewareRunner = null

    //@obsolete
    _responder = null
    _responders = null
    middleware = null

    // Loaded server scripts from `config.env.scripts` and `config.env.both`
    resources = null

    // Stores all exports from `resources`
    lib = null

    // webSockets
    webSockets = null

    config: IAppConfigExtended & IApplicationConfig
    args: {
        [key: string]: string
    }
    _baseConfig: IApplicationConfig

    rewriter = new HttpRewriter

    constructor(proto: IApplicationDefinition = {}) {
        super();

        if (this instanceof Application === false) {
            throw Error('Application must be created with the `new` keywoard');
        }

        this._loadConfig = this._loadConfig.bind(this);
        this._404 = this._404.bind(this);
        this.process = this.process.bind(this);

        // if a root application
        if (Application.current == null) {
            Application.current = this;
        }

        this.isRoot = this === Application.current;
        this.handlers = new HandlerFactory(this);
        this.webSockets = new WebSocket(this);

        this.args = obj_extend(proto.args, cli_arguments());
        this._baseConfig = proto;
        this._loadConfig();

        if (this.isRoot && app_isDebug() !== true) {
            logger.cfg('color', 'none');
        }


        return this;
    }

    //@obsolete
    respond(req, res, next) {
        this.process(req, res, next);
    }
    //@obsolete
    responder(data) {
        this._innerPipe = MiddlewareRunner.create(data && data.middleware);
        return responder(this);
    }

    //> Generic HttpServer scenario, responder should be also used in the middleware
    //@obsolete
    responders(array) {
        this._outerPipe = new MiddlewareRunner(array);
    }

	/**
	 * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
	 * :middleware - Arrat|Function - Middleware fns in INNER pipe, before the Handler
	 * :after - Array|Function - Middlewarefns in OUTER pipe, after the Handler
	 */
    processor(data: { before?: Function[], after?: Function[], middleware?: Function[] } = {}) {

        let before = data.before,
            after = data.after,
            middleware = data.middleware;

        this._outerPipe = MiddlewareRunner.create(before || []);
        this._innerPipe = MiddlewareRunner.create(middleware);

        this._outerPipe.add(responder(this));
        this._outerPipe.add(after);
        return this;
    }
    process(req: IncomingMessage, res: ServerResponse, next?) {
        if (this.rewriter) {
            this.rewriter.rewrite(req);
        }
        if (this._outerPipe == null) {
            this.processor();
        }
        this._outerPipe.process(
            req
            , res
            , next || this._404
            , this.config
        );
    }
    execute(url, method, body, headers) {
        let req = new Request(url, method, body, headers),
            res = new Response;

        // @TODO ? middleware pipeline in RAW requests
        //this._responders.process(
        //	req,
        //	res,
        //	respond,
        //	this.config
        //);
        //function respond() {
        //	responder_Raw(req, res);
        //}
        respond_Raw(this, req, res);
        return res;
    }
    autoreload(httpServer?) {
        this._server = this._server || httpServer;
        if (this._server == null)
            return;

        Autoreload.enable(this);
    }
    listen() {
        let port, server;
        let i = arguments.length,
            mix;
        while (--i > -1) {
            mix = arguments[i];
            if (mix == null)
                continue;

            switch (typeof mix) {
                case 'number':
                case 'string':
                    port = mix;
                    break;
                default:
                    if (mix.listen)
                        server = mix;
                    break;
            }
        }
        if (port == null)
            port = this.config.$get('port');

        if (port == null)
            throw Error('Port number is not defined');

        if (server == null)
            server = http.createServer();

        if (this.webSockets.hasHandlers()) {
            this.webSockets.listen(this._server);
        }

        if (app_isDebug()) {
            this.autoreload();
        }

        let processFn = this.process;

        let ssl = this.config.$get('server.ssl');
        if (ssl && ssl.enabled === true) {
            let { forced, port, certFile, keyFile, caFile } = ssl;
            this.isHttpsForced = forced == null ? false : forced;

            let readFile = path => {
                return path && io.File.exists(path) && io.File.read(path, { encoding: 'buffer' }) || void 0;
            };
            let options = {
                key: readFile(keyFile),
                cert: readFile(certFile),
                ca: readFile(caFile),
            };

            this._sslServer = https
                .createServer(options, this.process)
                .listen(port);

            if (forced === true) {
                processFn = (req, res, next?) => {
                    let allow = req.url.indexOf('/.well-known/') !== -1;

                    let proto = req.headers['x-forwarded-proto'];
                    if (proto !== 'https' && allow !== true) {
                        let host = req.headers['host'] as string;
                        if (host) {
                            // clear original port
                            host = host.replace(/:.+$/, '');
                        }
                        let portStr = port === 443 ? '' : `:${port}`;
                        let path = `https://${host}${portStr}${req.url}`;
                        res.writeHead(301, { 'Location': path });
                        res.end();
                        return;
                    }
                    this.process(req, res, next);
                };
            }
        }

        this._server = server
            .on('request', processFn)
            .listen(port)
            ;

        _emitter.trigger('listen', this);
        return this._server;
    }
    getSubApp(path) {
        let route = this.handlers.subapps.get(path);
        return route && route.value && route.value.app_;
    }


    private _loadConfig() {

        let definition = this._baseConfig;
        this.config = Config(
            definition
            , this
            , cfg_doneDelegate(this)
            , function (error) {
                logger
                    .warn('Configuration Error')
                    .error(error);
            })
            ;
        return this;
    }

    private _404(error: Error | any, req: IncomingMessage, res: ServerResponse) {

        error = error == null
            ? new HttpError('Endpoint not found: ' + req.url, 404)
            : (<any>HttpError).create(error)
            ;

        let accept = req.headers['accept'];
        if (accept == null || accept.indexOf('text/html') !== -1) {
            (<any>HttpErrorPage).send(error, req, res, this.config);
            return;
        }

        // send json
        send_Error(req, res, error);
    }

    static current: Application = null
    static on = _emitter.on.bind(_emitter)
    static off = _emitter.off.bind(_emitter)
    static once = _emitter.once.bind(_emitter)
    static trigger = _emitter.trigger.bind(_emitter)
    static Config = Config
    static clean() {
        Application.current = null;
        _emitter = new Class.EventEmitter;
        return this;
    }
    static create(config: IApplicationConfig): Application {
        return new Application(config);
    }
};


function responder(app) {
    return function (req, res, next) {

        if (Autoreload.enabled) {
            Autoreload.watch(req.url, app.config);
        }

        let callback = app._innerPipe != null
            ? middleware_processDelegate(app._innerPipe)
            : handler_process
            ;

        if (next == null)
            next = app._404;

        handler_resolve(
            app,
            req,
            res,
            next,
            callback
        );
    }
}
export function respond_Raw(app, req, res) {
    handler_resolve(
        app
        , req
        , res
        , function () {
            res.writeHead(500);
            res.end('Not Found');
        }
        , handler_processRaw
    );
}
function middleware_processDelegate(middlewareRunner) {
    return function (app, handler: IHttpHandler, req, res) {

        middlewareRunner.process(req, res, done, app.config);
        function done(error) {
            if (error) {
                let headers = handler.meta && handler.meta.headers;
                send_Error(req, res, error, headers);
                return;
            }
            handler_process(app, handler, req, res);
        }
    };
}

function handler_resolve(app: Application, req, res, next, callback) {
    //++ moved resource loading into inner function
    app
        .handlers
        .get(app, req, function (handler) {
            if (handler == null) {
                next();
                return;
            }
            //resources_load(app), function () {
                callback(app, handler, req, res);
            //});
        });

}
function handler_process(app, handler, req, res) {
    logger(95)
        .log('<request>', req.url);

    let result = null;
    try {
        result = handler.process(req, res, app.config);
    } catch (error) {
        handler_await(app, handler, req, res, Promise.reject(error));
        return;
    }
    if (result != null) {
        if (typeof result.then === 'function') {
            handler_await(app, handler, req, res, result);
            return;
        }
        handler_complete(app, handler, req, res, result);
        return;
    }

    if (handler.done == null) {
        // Handler responds to the request itself
        return;
    }
    handler_await(app, handler, req, res, handler);
}
function handler_await(app, handler, req, res, dfr) {
    dfr.then(
        function onSuccess(mix: string | Buffer | HttpResponse | any, statusCode, mimeType, headers) {
            let content = null;
            if (mix instanceof HttpResponse) {
                content = mix.content;
                statusCode = mix.statucCode;
                mimeType = mix.mimeType;
                headers = mix.headers;
            } else {
                content = mix;
            }
            handler_complete(app, handler, req, res, content, statusCode, mimeType, headers);
        },
        function onError(error, statusCode) {
            error = (<any>HttpError).create(error, statusCode);
            if (handler.sendError) {
                handler.sendError(error, req, res, app.config);
                return;
            }
            let allHeaders = handler_resolveHeaders(app, handler);
            send_Error(req, res, error, allHeaders);
        }
    );
}
function handler_complete(
    app,
    handler: IHttpHandler,
    req: IncomingMessage,
    res: ServerResponse,
    content: string | Buffer | any,
    statusCode = null,
    mimeType = null,
    headers = null) {
    let send = handler.send || send_Content;
    let allHeaders = handler_resolveHeaders(app, handler, headers);
    send(req, res, content, statusCode, mimeType, allHeaders);
}
function handler_resolveHeaders(app, handler: IHttpHandler, overrides = null) {
    let headers_Handler = handler.meta && handler.meta.headers,
        headers_App = app.config.headers;

    if (headers_Handler == null && headers_App == null) {
        return overrides;
    }
    return obj_assign({}, headers_App, headers_Handler, overrides);
}
function handler_processRaw(app: Application, handler, m_req, m_res) {
    if (handler instanceof HttpSubApplication) {
        handler.execute(m_req, m_res);
        return;
    }
    handler.process(m_req, m_res, app.config)
    if (handler.done == null)
        return;
    handler.pipe(m_res);
}
function cfg_doneDelegate(app: Application) {
    return function () {
        _emitter.trigger('configurate', app);

        initilizeEmbeddedComponents(app);
        let cfg = app.config;
        app
            .handlers
            .registerPages(cfg.pages, cfg.page)
            .registerSubApps(cfg.subapps, cfg.subapp)
            .registerHandlers(cfg.handlers, cfg.handler)
            .registerServices(cfg.services, cfg.service)
            .registerWebsockets(cfg.websockets, cfg.websocket)
            ;

        app.rewriter.addRules(cfg.rewriteRules);
        if (app_isDebug()) {
            include.cfg('autoreload', true);
        }
        Promise.all([
            HttpEndpointExplorer.find(app.config.service.endpoints),
            resources_load(app)
        ]).then(function ([endpoints]) {

            if (endpoints) {
                app.handlers.registerServices(endpoints, cfg.handler);
            }
            app.resolve(app);
        });
    }
}

function resources_load(app: Application) {
    if (app_isDebug() !== true && app.resources != null) {
        return;
    }

    let config = app.config;
    let base = config.base;
    let env = config.env;

    app.resources = include
        .instance(base)
        .setBase(base)
        .js(env.server.scripts)
        .js(env.both.scripts)
        ;

    config.$getImports('server').forEach(function (x) {
        if (x.type === 'script') {
            app.resources.js(x.path);
            return;
        }
        if (x.type === 'mask') {
            app.resources.mask(x.path);
            return;
        }
    });
    return new Promise((resolve) => {
        app
            .resources
            .done(function (resp) {
                app.lib = resp;

                let projects = config.projects;
                if (projects) {
                    for (let name in projects) {
                        let res = resp[name];
                        if (res != null && typeof res.attach === 'function')
                            res.attach(app);
                    }
                }

                resolve();
            });
    });
}

export default Application;