"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var Message_1 = require("./Message");
var cli_1 = require("../util/cli");
var app_1 = require("../util/app");
var HttpError_1 = require("../HttpError/HttpError");
var HandlerFactory_1 = require("../HandlerFactory");
var WebSocket_1 = require("../WebSocket");
var Config_1 = require("../Config/Config");
var Middleware_1 = require("../Business/Middleware");
var Autoreload_1 = require("../Autoreload/Autoreload");
var HttpErrorPage_1 = require("../HttpPage/HttpErrorPage");
var exports_1 = require("../compos/exports");
var send_1 = require("../util/send");
var SubApp_1 = require("./SubApp");
var _emitter = new dependency_1.Class.EventEmitter;
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(proto) {
        if (proto === void 0) { proto = {}; }
        var _this = _super.call(this) || this;
        // <Boolean>, if instance is the root application, and not one of the subapps
        _this.isRoot = false;
        // <HandlerFactory>, stores all endpoints of this application
        _this.handlers = null;
        // <http.Server> , in case `listen` was called.
        _this._server = null;
        // run this middlewares when the endpoint is found. (Runs before the endpoint handler)
        _this._innerPipe = null;
        // run this middlewares by all requests. Conains also endpoint resolver
        _this._outerPipe = null;
        //@obsolete
        _this._responder = null;
        _this._responders = null;
        _this.middleware = null;
        // Loaded server scripts from `config.env.scripts` and `config.env.both`
        _this.resources = null;
        // Stores all exports from `resources`
        _this.lib = null;
        // webSockets
        _this.webSockets = null;
        _this._loadConfig = _this._loadConfig.bind(_this);
        _this._404 = _this._404.bind(_this);
        _this.process = _this.process.bind(_this);
        // if a root application
        if (Application.current == null)
            Application.current = _this;
        _this.isRoot = _this === Application.current;
        _this.handlers = new HandlerFactory_1.default(_this);
        _this.webSockets = new WebSocket_1.default(_this);
        _this.args = dependency_1.obj_extend(proto.args, cli_1.cli_arguments());
        _this._baseConfig = proto;
        _this._loadConfig();
        if (_this.isRoot && app_1.app_isDebug() !== true) {
            dependency_1.logger.cfg('color', 'none');
        }
        return _this;
    }
    //@obsolete
    Application.prototype.respond = function (req, res, next) {
        this.process(req, res, next);
    };
    //@obsolete
    Application.prototype.responder = function (data) {
        this._innerPipe = Middleware_1.default.create(data && data.middleware);
        return responder(this);
    };
    //> Generic HttpServer scenario, responder should be also used in the middleware
    //@obsolete
    Application.prototype.responders = function (array) {
        this._outerPipe = new Middleware_1.default(array);
    };
    /**
     * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
     * :middleware - Arrat|Function - Middleware fns in INNER pipe, before the Handler
     * :after - Array|Function - Middlewarefns in OUTER pipe, after the Handler
     */
    Application.prototype.processor = function (data) {
        if (data === void 0) { data = {}; }
        var before = data.before, after = data.after, middleware = data.middleware;
        this._outerPipe = Middleware_1.default.create(before || []);
        this._innerPipe = Middleware_1.default.create(middleware);
        this._outerPipe.add(responder(this));
        this._outerPipe.add(after);
        return this;
    };
    Application.prototype.process = function (req, res, next) {
        if (this._outerPipe == null)
            this.processor();
        this._outerPipe.process(req, res, next || this._404, this.config);
    };
    Application.prototype.execute = function (url, method, body, headers) {
        var req = new Message_1.Request(url, method, body, headers), res = new Message_1.Response;
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
    };
    Application.prototype.autoreload = function (httpServer) {
        this._server = this._server || httpServer;
        if (this._server == null)
            return;
        Autoreload_1.default.enable(this);
    };
    Application.prototype.listen = function () {
        var port, server;
        var i = arguments.length, mix;
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
            server = require('http').createServer();
        this._server = server
            .on('request', this.process)
            .listen(port);
        if (this.webSockets.hasHandlers())
            this.webSockets.listen(this._server);
        if (app_1.app_isDebug())
            this.autoreload();
        _emitter.trigger('listen', this);
        return this._server;
    };
    Application.prototype.getSubApp = function (path) {
        var route = this.handlers.subapps.get(path);
        return route && route.value && route.value.app_;
    };
    //Self: {
    Application.prototype._loadConfig = function () {
        var definition = this._baseConfig;
        this.config = Config_1.default(definition, this, cfg_doneDelegate(this), function (error) {
            dependency_1.logger
                .warn('Configuration Error')
                .error(error);
        });
        return this;
    };
    Application.prototype._404 = function (error, req, res) {
        error = error == null
            ? new HttpError_1.HttpError('Endpoint not found: ' + req.url, 404)
            : HttpError_1.HttpError.create(error);
        var accept = req.headers['accept'];
        if (accept == null || accept.indexOf('text/html') !== -1) {
            HttpErrorPage_1.default.send(error, req, res, this.config);
            return;
        }
        // send json
        send_1.send_Error(res, error);
    };
    Application.clean = function () {
        Application.current = null;
        _emitter = new dependency_1.Class.EventEmitter;
        return this;
    };
    return Application;
}(dependency_1.Class.Deferred));
Application.current = null;
Application.on = _emitter.on.bind(_emitter);
Application.off = _emitter.off.bind(_emitter);
Application.once = _emitter.once.bind(_emitter);
Application.trigger = _emitter.trigger.bind(_emitter);
Application.Config = Config_1.default;
;
function responder(app) {
    return function (req, res, next) {
        if (Autoreload_1.default.enabled)
            Autoreload_1.default.watch(req.url, app.config);
        var callback = app._innerPipe != null
            ? middleware_processDelegate(app._innerPipe)
            : handler_process;
        if (next == null)
            next = app._404;
        handler_resolve(app, req, res, next, callback);
    };
}
function respond_Raw(app, req, res) {
    handler_resolve(app, req, res, function () {
        res.writeHead(500);
        res.end('Not Found');
    }, handler_processRaw);
}
function middleware_processDelegate(middlewareRunner) {
    return function (app, handler, req, res) {
        middlewareRunner.process(req, res, done, app.config);
        function done(error) {
            if (error) {
                send_1.send_Error(res, error);
                return;
            }
            handler_process(app, handler, req, res);
        }
    };
}
function handler_resolve(app, req, res, next, callback) {
    //++ moved resource loading into inner function
    app
        .handlers
        .get(app, req, function (handler) {
        if (handler == null) {
            next();
            return;
        }
        resources_load(app, function () {
            callback(app, handler, req, res);
        });
    });
}
function handler_process(app, handler, req, res) {
    dependency_1.logger(95)
        .log('<request>', req.url);
    handler.process(req, res, app.config);
    if (handler.done == null)
        // Handler responds to the request itself
        return;
    var headers__ = handler_resolveDefaultHeaders(app, handler);
    handler
        .done(function (content, statusCode, mimeType, headers) {
        var send = handler.send || send_1.send_Content;
        if (headers__ != null) {
            headers = dependency_1.obj_extendDefaults(headers, headers__);
        }
        send(res, content, statusCode, mimeType, headers);
    })
        .fail(function (error, statusCode) {
        error = HttpError_1.HttpError.create(error, statusCode);
        if (handler.sendError) {
            handler.sendError(error, req, res, app.config);
            return;
        }
        send_1.send_Error(res, error, headers__);
    });
}
function handler_resolveDefaultHeaders(app, handler) {
    var headers_Handler = handler.meta && handler.meta.headers, headers_App = app.config.headers;
    if (headers_Handler == null && headers_App == null) {
        return null;
    }
    var headers;
    headers = headers_Handler ? Object.create(headers_Handler) : null;
    headers = dependency_1.obj_extendDefaults(headers, headers_App);
    return headers;
}
function handler_processRaw(app, handler, m_req, m_res) {
    if (handler instanceof SubApp_1.default) {
        handler.execute(m_req, m_res);
        return;
    }
    handler.process(m_req, m_res, app.config);
    if (handler.done == null)
        return;
    handler.pipe(m_res);
}
function cfg_doneDelegate(app) {
    return function () {
        _emitter.trigger('configurate', app);
        exports_1.initilizeEmbeddedComponents(app);
        var cfg = app.config;
        app
            .handlers
            .registerPages(cfg.pages, cfg.page)
            .registerSubApps(cfg.subapps, cfg.subapp)
            .registerHandlers(cfg.handlers, cfg.handler)
            .registerServices(cfg.services, cfg.service)
            .registerWebsockets(cfg.websockets, cfg.websocket);
        if (app_1.app_isDebug())
            dependency_1.include.cfg('autoreload', true);
        resources_load(app, function () {
            app.resolve(app);
        });
    };
}
function resources_load(app, callback) {
    if (app_1.app_isDebug() !== true && app.resources != null) {
        callback();
        return;
    }
    var config = app.config, base = config.base, env = config.env;
    app.resources = dependency_1.include
        .instance(base)
        .setBase(base)
        .js(env.server.scripts)
        .js(env.both.scripts);
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
    app
        .resources
        .done(function (resp) {
        app.lib = resp;
        var projects = config.projects;
        if (projects) {
            for (var name in projects) {
                var res = resp[name];
                if (res != null && typeof res.attach === 'function')
                    res.attach(app);
            }
        }
        callback();
    });
}
exports.default = Application;
