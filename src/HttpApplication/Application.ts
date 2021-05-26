import { include, logger, obj_extend } from '../dependency'
import { Request, Response } from './Message'
import { cli_arguments } from '../util/cli'
import { app_isDebug } from '../util/app'
import { HttpError, HttpErrorUtil } from '../HttpError/HttpError'
import HandlerFactory from '../HandlerFactory'
import WebSocket from '../WebSocket'
import Config from '../Config/Config'
import MiddlewareRunner from '../Business/Middleware'
import { Autoreload } from '../Autoreload/Autoreload'
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
import { class_EventEmitter, class_Dfr, mixin } from 'atma-utils'
import { LifecycleEvents } from './LifecycleEvents'
import { HttpEndpointUtils } from '../HttpService/HttpEndpoint'

let _emitter = new class_EventEmitter();

class Application extends class_EventEmitter {

    private startedAt = Date.now();

    promise = new class_Dfr();

    lifecycle = LifecycleEvents.Instance

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
    lib: { [key: string]: any } = {}

    // webSockets
    webSockets: WebSocket = null

    config: IAppConfigExtended & IApplicationConfig
    args: {
        [key: string]: string
    }
    _baseConfig: IApplicationConfig

    rewriter = new HttpRewriter
    redirects = new HttpRewriter

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
        if (this.redirects) {
            let responded = this.redirects.redirect(req, res);
            if (responded) {
                return;
            }
        }
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
        let req = new Request(url, method, body, headers);
        let res = new Response;

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
    autoreload(httpServer?: net.Server) {
        this._server = this._server || httpServer;
        if (this._server == null)
            return;

        Autoreload.enable(this);
        Autoreload.getWatcher().on('fileChange', (relPath: string, absPath: string) => {
            Application.trigger('autoreload', relPath, absPath);
        });
    }

    done (fn) {
        this.promise.then(fn);
    }
    fail (fn) {
        this.promise.then(null, fn);
    }

    listen()
    listen(port: number)
    listen(server: net.Server | { listen: Function })
    listen(...args) {
        let port, server;
        let i = args.length;
        let mix;
        while (--i > -1) {
            mix = args[i];
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

        this.lifecycle.completeAppStart(this.startedAt);

        if (app_isDebug()) {
            this.autoreload();
        }
        return this._server;
    }
    getSubApp(path) {
        let route = this.handlers.subapps.get(path);
        return route && route.value && route.value.app_;
    }


    private _loadConfig() {

        let definition = this._baseConfig;
        Config(definition, this).then(cfg_doneDelegate(this), (error) => {
            logger
                .warn('Configuration Error')
                .error(error);
        });
        return this;
    }

    private _404(error: Error | any, req: IncomingMessage, res: ServerResponse) {

        error = error == null
            ? new HttpError('Endpoint not found: ' + req.url, 404)
            : HttpErrorUtil.create(error)
            ;

        let accept = req.headers['accept'];
        if (accept == null || accept.indexOf('text/html') !== -1) {
            HttpErrorPage.send(error, req, res, this.config);
            return;
        }

        // send json
        send_Error(req, res, error, null, this, Date.now());
    }

    static current: Application = null
    static on = _emitter.on.bind(_emitter)
    static off = _emitter.off.bind(_emitter)
    static once = _emitter.once.bind(_emitter)
    static trigger = _emitter.trigger.bind(_emitter)
    static Config = Config
    static clean() {
        Application.current = null;
        _emitter = new class_EventEmitter;
        return this;
    }
    static create(config: IApplicationConfig): Promise<Application> {
        return new Promise((resolve, reject) => {
            new Application(config)
                .promise
                .then(resolve, reject);
        });;
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
        const startedAt = Date.now();

        middlewareRunner.process(req, res, done, app.config);
        function done(error) {
            if (error) {
                let headers = handler.meta?.headers;
                send_Error(req, res, error, headers, app, startedAt);
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
function handler_process(app: Application, handler: IHttpHandler, req: http.IncomingMessage, res) {
    logger(95)
        .log('<request>', req.url);

    let result = null;
    let startedAt = Date.now();
    try {
        result = handler.process(req, res, app.config);
    } catch (error) {
        handler_await(app, handler, req, res, Promise.reject(error), startedAt);
        return;
    }
    if (result != null) {
        if (typeof result.then === 'function') {
            handler_await(app, handler, req, res, result, startedAt);
            return;
        }
        handler_complete(app, handler, req, res, result, null, null, null, startedAt);
        return;
    }

    if (handler.then == null) {
        // Handler responds to the request itself
        return;
    }
    handler_await(app, handler, req, res, handler, startedAt);
}
function handler_await(app: Application
    , handler: IHttpHandler
    , req: http.IncomingMessage
    , res
    , dfr
    , startedAt: number
) {
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
            handler_complete(
                app
                , handler
                , req
                , res
                , content
                , statusCode
                , mimeType
                , headers
                , startedAt
            );
        },
        function onError(error, statusCode) {
            error = HttpErrorUtil.create(error, statusCode);
            if (handler.sendError) {
                handler.sendError(error, req, res, app.config);
                return;
            }
            let headers = null;
            let origins = handler?.meta?.origins;
            if (origins) {
                headers = HttpEndpointUtils.getCorsHeaders(req, handler);
            }
            let allHeaders = handler_resolveHeaders(app, handler, headers);
            send_Error(req, res, error, allHeaders, app, startedAt);
        }
    );
}
function handler_complete(
    app: Application,
    handler: IHttpHandler,
    req: IncomingMessage,
    res: ServerResponse,
    content: string | Buffer | any,
    statusCode: number,
    mimeType: string,
    headers,
    startedAt: number)
{
    let send = handler.send ?? send_Content;
    let allHeaders = handler_resolveHeaders(app, handler, headers);
    send(req, res, content, statusCode, mimeType, allHeaders, app, startedAt);
}
function handler_resolveHeaders(app, handler: IHttpHandler, overrides = null) {
    let headers_Handler = handler.meta?.headers;
    let headers_App = app.config?.headers;
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
    return function (cfg) {
        app.config = cfg;

        _emitter.trigger('configurate', app);

        Autoreload.prepare(app);

        initilizeEmbeddedComponents(app);
        app
            .handlers
            .registerPages(cfg.pages, cfg.page)
            .registerSubApps(cfg.subapps, cfg.subapp)
            .registerHandlers(cfg.handlers, cfg.handler)
            .registerServices(cfg.services, cfg.service)
            .registerWebsockets(cfg.websockets, cfg.websocket)
            ;

        app.rewriter.addRules(cfg.rewriteRules);
        app.redirects.addRules(cfg.redirectRules);

        Promise.all([
            HttpEndpointExplorer.find(app.config.service.endpoints, app.config.base),
            resources_load(app)
        ]).then(function ([ endpoints ]) {

            if (endpoints) {
                app.handlers.registerServices(endpoints, cfg.handler);
            }
            app.promise.resolve(app);
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
                app.lib = obj_extend(app.lib, resp);

                let projects = config.projects;
                if (projects) {
                    for (let name in projects) {
                        let res = resp[name];
                        if (res != null && typeof res.attach === 'function')
                            res.attach(app);
                    }
                }

                resolve(null);
            });
    });
}

export default Application;
