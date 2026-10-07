(function (root, factory) {
    'use strict';


    factory(global, module, module.exports);

    const server = module.exports;

    if (global.atma == null) {
        global.atma = {}
    }
    if (global.atma.server == null) {
        global.atma.server = {};
    }
    // just-in-case, copy the lib to globals
    for (let key in server) {
        global.atma.server[key] = server[key];
    }

}(this, function (global, module, exports) {
    'use strict';

    var _node_modules_memd_lib_umd_memd = {};
var _src_Autoreload_Autoreload = {};
var _src_Autoreload_ConnectionSocket = {};
var _src_Autoreload_WatcherHandler = {};
var _src_Business_Middleware = {};
var _src_Config_Config = {};
var _src_Config_ConfigDefaults = {};
var _src_Config_ConfigUtils = {};
var _src_Config_EnvUtils = {};
var _src_Config_IncludeUtils = {};
var _src_Config_PathUtils = {};
var _src_HandlerFactory = {};
var _src_HttpApplication_Application = {};
var _src_HttpApplication_LifecycleEvents = {};
var _src_HttpApplication_Message = {};
var _src_HttpApplication_SubApp = {};
var _src_HttpError_HttpError = {};
var _src_HttpPage_HttpContext = {};
var _src_HttpPage_HttpErrorPage = {};
var _src_HttpPage_HttpPage = {};
var _src_HttpPage_HttpPageBase = {};
var _src_HttpPage_page_utils = {};
var _src_HttpRewrites_HttpRewriter = {};
var _src_HttpService_Barricade = {};
var _src_HttpService_BarricadeExt = {};
var _src_HttpService_HttpEndpoint = {};
var _src_HttpService_HttpEndpointDecos = {};
var _src_HttpService_HttpEndpointExplorer = {};
var _src_HttpService_HttpEndpointParamUtils = {};
var _src_HttpService_HttpService = {};
var _src_HttpService_utils = {};
var _src_IHttpHandler = {};
var _src_Plugins_Static = {};
var _src_WebSocket = {};
var _src_compos_exports = {};
var _src_const_mime = {};
var _src_dependency = {};
var _src_env_overrides = {};
var _src_handlers_MaskHtml = {};
var _src_handlers_MaskRunner = {};
var _src_handlers_export = {};
var _src_middleware_bodyJson = {};
var _src_middleware_export = {};
var _src_middleware_query = {};
var _src_middleware_static = {};
var _src_util_FormDataUtil = {};
var _src_util__format = {};
var _src_util__network = {};
var _src_util_app = {};
var _src_util_cli = {};
var _src_util_cors = {};
var _src_util_fn = {};
var _src_util_fs = {};
var _src_util_obj = {};
var _src_util_page = {};
var _src_util_path = {};
var _src_util_send = {};
var _src_vars = {};

// source ./ModuleSimplified.js
var _src_dependency;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_dependency != null ? _src_dependency : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.AppConfig = exports.includeLib = exports.include = exports.obj_extendDefaults = exports.obj_extend = exports.is_Object = exports.is_Array = exports.is_Function = exports.is_String = exports.Uri = exports.io = exports.Compo = exports.jmask = exports.mask = void 0;
const logger = require("atma-logger");
exports.logger = logger;
const Utils = require("atma-utils");
const AppConfig = require("appcfg");
exports.AppConfig = AppConfig;
let root = global;
if (root.include == null) {
    require('includejs');
}
exports.mask = root.mask || require('maskjs');
exports.jmask = exports.mask.jmask;
exports.Compo = exports.mask.Compo;
exports.io = root.io && root.io.File ? root.io : require('atma-io');
exports.Uri = Utils.class_Uri;
exports.is_String = Utils.is_String, exports.is_Function = Utils.is_Function, exports.is_Array = Utils.is_Array, exports.is_Object = Utils.is_Object;
exports.obj_extend = Utils.obj_extend, exports.obj_extendDefaults = Utils.obj_extendDefaults;
exports.include = root.include;
exports.includeLib = root.includeLib;
//# sourceMappingURL=dependency.js.map
//# sourceMappingURL=dependency.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_dependency === module.exports) {
        // do nothing if
    } else if (__isObj(_src_dependency) && __isObj(module.exports)) {
        Object.assign(_src_dependency, module.exports);
    } else {
        _src_dependency = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_Message;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpApplication_Message != null ? _src_HttpApplication_Message : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.Request = void 0;
const atma_utils_1 = require("atma-utils");
const dependency_1 = _src_dependency;
/*
    * Very basic implementation of ClientRequest and -Response.
    * Is used when not the socket but direct request is made
    *
    * app
    *     .execute('service/user/foo', 'get')
    *     .done(function(obj:Any))
    *     .fail(function(err))
    */
class Request {
    constructor(url, method, body, headers) {
        this.url = url;
        this.method = (method || 'GET').toUpperCase();
        this.body = body;
        this.headers = headers ?? {};
    }
}
exports.Request = Request;
;
class Response extends (0, atma_utils_1.mixin)(atma_utils_1.class_EventEmitter, atma_utils_1.class_Dfr) {
    constructor() {
        super(...arguments);
        this.writable = true;
        this.finished = false;
        this.body = '';
        this.headers = {};
    }
    resolve(body, code, mimeType, headers) {
        return super.resolve(body ?? this.body, code ?? this.statusCode ?? 200, mimeType, headers ?? this.headers);
    }
    reject(error, code) {
        return super.reject(error ?? this.body, code ?? error.statusCode ?? this.statusCode ?? 500);
    }
    writeHead(code, arg1, arg2) {
        if (this.writable === false)
            return;
        var reason, headers;
        if (3 === arguments.length) {
            reason = arguments[1];
            headers = arguments[2];
        }
        if (2 === arguments.length) {
            headers = arguments[1];
        }
        this.statusCode = code;
        (0, dependency_1.obj_extend)(this.headers, headers);
    }
    setHeader() {
        // do_Nothing
    }
    end(content) {
        if (this.finished === true) {
            return;
        }
        this.write(content);
        this.finished = true;
        this.writable = false;
        this.resolve(this.body, this.statusCode, null, this.headers);
    }
    /*
        * support String|Buffer|Object
        */
    write(content) {
        if (this.writable === false)
            return;
        if (content == null)
            return;
        if (this.body == null) {
            this.body = content;
            return;
        }
        if ((0, dependency_1.is_Function)(this.body.concat)) {
            this.body = this.body.concat(content);
            return;
        }
        this.body = [this.body, content];
    }
}
exports.Response = Response;
;
//# sourceMappingURL=Message.js.map
//# sourceMappingURL=Message.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpApplication_Message === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpApplication_Message) && __isObj(module.exports)) {
        Object.assign(_src_HttpApplication_Message, module.exports);
    } else {
        _src_HttpApplication_Message = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cli;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_cli != null ? _src_util_cli : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli_arguments = void 0;
function cli_arguments() {
    var argv = process.argv, imax = argv.length, i = 2, args = {
        args: []
    }, x;
    for (; i < imax; i++) {
        x = argv[i];
        if (x[0] === '-') {
            args[x.replace(/^[\-]+/, '')] = true;
            continue;
        }
        var eq = x.indexOf('=');
        if (eq !== -1) {
            args[x.substring(0, eq)] = x.substring(eq + 1);
            continue;
        }
        args.args.push(x);
    }
    return args;
}
exports.cli_arguments = cli_arguments;
;
//# sourceMappingURL=cli.js.map
//# sourceMappingURL=cli.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_cli === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_cli) && __isObj(module.exports)) {
        Object.assign(_src_util_cli, module.exports);
    } else {
        _src_util_cli = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_SubApp;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpApplication_SubApp != null ? _src_HttpApplication_SubApp : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const Application_1 = _src_HttpApplication_Application;
const atma_utils_1 = require("atma-utils");
const status_initial = '';
const status_loading = 'loading';
const status_loaded = 'loaded';
const status_errored = 'error';
class HttpSubApplication extends atma_utils_1.class_Dfr {
    constructor(path, mix, parentApp) {
        super();
        this.status = status_initial;
        this.app_ = null;
        if (path[0] !== '/')
            path = '/' + path;
        if (path[path.length - 1] !== '/')
            path += '/';
        this.path_ = path;
        this.dfr = new atma_utils_1.class_Dfr;
        if (Application_1.default.isApplication(mix)) {
            this.app_ = mix;
            this.status = status_loaded;
            return;
        }
        let controller;
        if (typeof mix === 'string') {
            controller = mix;
        }
        else {
            controller = mix.controller;
        }
        if ((0, dependency_1.is_String)(controller)) {
            this.status = status_loading;
            let base = parentApp.config.base || parentApp.base || '/';
            dependency_1.include
                .instance(base)
                .setBase(base)
                .js(controller + '::App')
                .done((resp) => {
                if (typeof resp.App?.done === 'function') {
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
                this.status = status_errored;
            });
            return;
        }
        let definition = mix;
        let configs = definition.configs;
        let config = definition.config;
        if (config == null && configs == null) {
            configs = path;
        }
        this.status = status_loading;
        new Application_1.default({
            configs: configs,
            config: config
        })
            .done(app => {
            this.app_ = app;
            this.process = this.handle;
            this.status = status_loaded;
            this.dfr.resolve();
        });
    }
    process(req, res) {
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
    handle(req, res) {
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
    execute(req, res) {
        prepairUrl(req, this);
        (0, Application_1.respond_Raw)(this.app_, req, res);
    }
}
exports.default = HttpSubApplication;
;
function prepairUrl(req, subapp) {
    req.url = req.url.replace(subapp.path_, '/');
}
//# sourceMappingURL=SubApp.js.map
//# sourceMappingURL=SubApp.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpApplication_SubApp === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpApplication_SubApp) && __isObj(module.exports)) {
        Object.assign(_src_HttpApplication_SubApp, module.exports);
    } else {
        _src_HttpApplication_SubApp = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_fn;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_fn != null ? _src_util_fn : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_delegate = exports.fn_proxy = void 0;
const fn_proxy = function (fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments);
    };
};
exports.fn_proxy = fn_proxy;
const fn_delegate = function (fn, ...args) {
    return function (...args2) {
        fn.apply(null, 
        /* args_1 + args_2 */
        args.concat(args2));
    };
};
exports.fn_delegate = fn_delegate;
//# sourceMappingURL=fn.js.map
//# sourceMappingURL=fn.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_fn === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_fn) && __isObj(module.exports)) {
        Object.assign(_src_util_fn, module.exports);
    } else {
        _src_util_fn = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpPageBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpPage_HttpPageBase != null ? _src_HttpPage_HttpPageBase : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atma_utils_1 = require("atma-utils");
class HttpPageBase extends atma_utils_1.class_Dfr {
    constructor(route, app) {
        super();
        this.route = route;
        this.app = app;
        this.data = {
            id: null,
            env: null
        };
        this.isHtmlPage = false;
    }
    //mimeType = mime_HTML
    getScripts(config) {
        return config.$getScripts(this.data.id);
    }
    getStyles(config) {
        return config.$getStyles(this.data.id);
    }
}
exports.default = HttpPageBase;
;
//# sourceMappingURL=HttpPageBase.js.map
//# sourceMappingURL=HttpPageBase.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpPage_HttpPageBase === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpPage_HttpPageBase) && __isObj(module.exports)) {
        Object.assign(_src_HttpPage_HttpPageBase, module.exports);
    } else {
        _src_HttpPage_HttpPageBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_vars;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_vars != null ? _src_vars : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIB_DIR = void 0;
const dependency_1 = _src_dependency;
const dirname = typeof __dirname === 'undefined' ? process.cwd() : __dirname;
exports.LIB_DIR = new dependency_1.Uri(`file://${dirname}/`);
//# sourceMappingURL=vars.js.map
//# sourceMappingURL=vars.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_vars === module.exports) {
        // do nothing if
    } else if (__isObj(_src_vars) && __isObj(module.exports)) {
        Object.assign(_src_vars, module.exports);
    } else {
        _src_vars = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_const_mime;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_const_mime != null ? _src_const_mime : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mime_PLAIN = exports.mime_HTML = exports.mime_JSON = void 0;
var utf8 = ';charset=utf-8';
exports.mime_JSON = 'application/json' + utf8;
exports.mime_HTML = 'text/html' + utf8;
exports.mime_PLAIN = 'text/plain' + utf8;
//# sourceMappingURL=mime.js.map
//# sourceMappingURL=mime.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_const_mime === module.exports) {
        // do nothing if
    } else if (__isObj(_src_const_mime) && __isObj(module.exports)) {
        Object.assign(_src_const_mime, module.exports);
    } else {
        _src_const_mime = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cors;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_cors != null ? _src_util_cors : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors_rewriteAllowedOrigins = exports.cors_ensure = void 0;
const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
const HEADER_ALLOW_HEADERS = 'Access-Control-Allow-Headers';
const DEFAULT = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
};
const delimiter = /[ ,]+/g;
function cors_ensure(req, headers) {
    if (headers == null) {
        return;
    }
    let allowOrigin = headers[HEADER_ALLOW_ORIGIN];
    if (allowOrigin == null) {
        return;
    }
    let allowHeaders = headers[HEADER_ALLOW_HEADERS];
    if (allowHeaders == null) {
        headers[HEADER_ALLOW_HEADERS] = req.headers['access-control-request-headers'] || 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';
    }
    let current = req.headers['host'];
    if (current == null) {
        return;
    }
    if (allowOrigin === '*' || delimiter.test(allowOrigin) === false) {
        return;
    }
    let hosts = allowOrigin.split(delimiter);
    for (let i = 0; i < hosts.length; i++) {
        let host = hosts[i];
        let globIndex = host.indexOf('*');
        if (globIndex > -1) {
            host = host.substring(globIndex + 2);
        }
        let index = current.toLowerCase().indexOf(host.toLowerCase());
        if (index + host.length === current.length) {
            headers[HEADER_ALLOW_ORIGIN] = host;
            return;
        }
    }
}
exports.cors_ensure = cors_ensure;
function cors_rewriteAllowedOrigins(req, headers) {
    let origin = req.headers['origin'];
    if (origin == null || origin === '') {
        return;
    }
    let allowedOrigin = headers[HEADER_ALLOW_ORIGIN];
    if (allowedOrigin == null || allowedOrigin === '') {
        return;
    }
    if (allowedOrigin === '*') {
        headers[HEADER_ALLOW_ORIGIN] = origin;
        return;
    }
    let hosts = allowedOrigin.split(' ');
    for (let i = 0; i < hosts.length; i++) {
        let host = hosts[i];
        let globIndex = host.indexOf('*');
        if (globIndex > -1) {
            host = host.substring(globIndex + 2);
        }
        let index = origin.toLowerCase().indexOf(host.toLowerCase());
        if (index + host.length === origin.length) {
            headers[HEADER_ALLOW_ORIGIN] = host;
            return;
        }
    }
}
exports.cors_rewriteAllowedOrigins = cors_rewriteAllowedOrigins;
//# sourceMappingURL=cors.js.map
//# sourceMappingURL=cors.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_cors === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_cors) && __isObj(module.exports)) {
        Object.assign(_src_util_cors, module.exports);
    } else {
        _src_util_cors = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_IHttpHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_IHttpHandler != null ? _src_IHttpHandler : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
;
class HttpResponse {
    constructor(json) {
        if (json != null) {
            Object.assign(this, json);
        }
    }
    static ensure(result, statusCode) {
        if (result instanceof HttpResponse) {
            if (result.statusCode == null) {
                result.statusCode = 200;
            }
            return result;
        }
        if (result instanceof Error) {
            return new HttpResponse({
                content: result,
                statusCode: statusCode ?? 500
            });
        }
        return new HttpResponse({
            content: result,
            statusCode: 200
        });
    }
    static pipe(dfr, result) {
        if (typeof result.then === 'function') {
            result.then(x => {
                dfr.resolve(HttpResponse.ensure(x));
            }, err => {
                dfr.reject(HttpResponse.ensure(err));
            });
            return;
        }
        dfr.resolve(HttpResponse.ensure(result));
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=IHttpHandler.js.map
//# sourceMappingURL=IHttpHandler.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_IHttpHandler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_IHttpHandler) && __isObj(module.exports)) {
        Object.assign(_src_IHttpHandler, module.exports);
    } else {
        _src_IHttpHandler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_send;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_send != null ? _src_util_send : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_Content = exports.send_Error = exports.send_JSON = exports.send_REDIRECT = void 0;
const atma_utils_1 = require("atma-utils");
const mime_1 = _src_const_mime;
const HttpError_1 = _src_HttpError_HttpError;
const cors_1 = _src_util_cors;
const IHttpHandler_1 = _src_IHttpHandler;
function send_REDIRECT(res, url, code = 302) {
    res.statusCode = code;
    res.setHeader('Location', url);
    res.setHeader('Content-Length', '0');
    res.end();
}
exports.send_REDIRECT = send_REDIRECT;
function send_JSON(req, res, response, app, startedAt) {
    let { content } = response;
    let str;
    try {
        let formatted = app.config.debug || app.config.serializer?.json?.formatted;
        str = JSON.stringify(content, null, formatted ? 2 : 0);
    }
    catch (error) {
        return send_Error(req, res, new HttpError_1.RuntimeError(`Json Serialization: ${error.message}`), null, app, startedAt);
    }
    response.content = str;
    response.mimeType = mime_1.mime_JSON;
    send_Content(req, res, response, app, startedAt);
}
exports.send_JSON = send_JSON;
;
function send_Error(req, res, error, headers, app, startedAt) {
    if (error != null && 'toJSON' in error === false) {
        // indirect check if error is the HttpError instance
        error = HttpError_1.HttpErrorUtil.create(error);
    }
    let response = new IHttpHandler_1.HttpResponse({
        content: JSON.stringify(error),
        statusCode: error.statusCode ?? 500,
        headers: headers,
        mimeType: mime_1.mime_JSON,
    });
    send_Content(req, res, response, app, startedAt, error);
}
exports.send_Error = send_Error;
;
function send_Content(req, res, response, app, startedAt, error) {
    let { content, statusCode, mimeType, headers } = response;
    if (typeof content !== 'string' && content instanceof Buffer === false) {
        if (content instanceof Error) {
            send_Error(req, res, content, headers, app, startedAt);
            return;
        }
        if ((0, atma_utils_1.is_Object)(content)) {
            send_JSON(req, res, response, app, startedAt);
            return;
        }
        send_Error(req, res, new HttpError_1.RuntimeError('Unexpected content response'), headers, app, startedAt);
        return;
    }
    res.setHeader('Content-Type', mimeType || mime_1.mime_HTML);
    res.statusCode = statusCode ?? 200;
    if (headers != null) {
        (0, cors_1.cors_ensure)(req, headers);
        for (var key in headers) {
            if (key === 'Content-Type' && mimeType != null) {
                continue;
            }
            res.setHeader(key, headers[key]);
        }
    }
    if (app != null) {
        if (res.statusCode < 400) {
            app?.lifecycle.completeHandlerSuccess(startedAt, req, res);
        }
        else {
            if (error == null && typeof content === 'string') {
                error = new Error(`Undefined error: ${content.substring(0, 400)}`);
            }
            app?.lifecycle.completeHandlerError(startedAt, req, res, error);
        }
    }
    res.end(content);
}
exports.send_Content = send_Content;
;
//# sourceMappingURL=send.js.map
//# sourceMappingURL=send.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_send === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_send) && __isObj(module.exports)) {
        Object.assign(_src_util_send, module.exports);
    } else {
        _src_util_send = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpContext;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpPage_HttpContext != null ? _src_HttpPage_HttpContext : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const send_1 = _src_util_send;
class HttpContext {
    constructor(page, config, req, res) {
        this.page = page;
        this.config = config;
        this.req = req;
        this.res = res;
    }
    redirect(url, code = 302) {
        (0, send_1.send_REDIRECT)(this.res, url, code);
        this._redirect = url;
    }
    rewrite(url) {
        this._rewrite = url;
    }
}
exports.default = HttpContext;
//# sourceMappingURL=HttpContext.js.map
//# sourceMappingURL=HttpContext.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpPage_HttpContext === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpPage_HttpContext) && __isObj(module.exports)) {
        Object.assign(_src_HttpPage_HttpContext, module.exports);
    } else {
        _src_HttpPage_HttpContext = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_page_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpPage_page_utils != null ? _src_HttpPage_page_utils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageError_failDelegate = exports.pageError_sendDelegate = exports.page_processPartial = exports.page_process = exports.page_pathAddAlias = exports.page_resolve = exports.page_processRequest = exports.page_processRequestDelegate = exports.page_rewriteDelegate = void 0;
const Application_1 = _src_HttpApplication_Application;
const HttpContext_1 = _src_HttpPage_HttpContext;
const dependency_1 = _src_dependency;
const send_1 = _src_util_send;
const mime_1 = _src_const_mime;
const ruta_1 = require("ruta");
const IHttpHandler_1 = _src_IHttpHandler;
const page_rewriteDelegate = function (page) {
    let ctx = page.ctx;
    if (ctx.rewriteCount == null)
        ctx.rewriteCount = 1;
    if (++ctx.rewriteCount > 5) {
        page.reject('Too much rewrites, last path: ' + ctx._rewrite);
        return;
    }
    return function (rewrittenHandler) {
        if (rewrittenHandler == null) {
            page.reject('Rewritten Path is not valid: ' + ctx._rewrite);
            return;
        }
        rewrittenHandler
            .process(ctx.req, ctx.res, ctx.config)
            .then((...args) => page.resolve(...args), (...args) => page.reject(...args));
    };
};
exports.page_rewriteDelegate = page_rewriteDelegate;
const page_processRequestDelegate = function (page, req, res, config) {
    return function (error) {
        if (error) {
            page.reject(error);
            return;
        }
        (0, exports.page_processRequest)(page, req, res, config);
    };
};
exports.page_processRequestDelegate = page_processRequestDelegate;
const page_processRequest = function (page, req, res, config) {
    if (page.pattern) {
        let query = (0, ruta_1.parse)(page.pattern, req.url).params;
        for (let key in query) {
            if (page.query[key] == null)
                page.query[key] = query[key];
        }
    }
    page.ctx = new HttpContext_1.default(page, config, req, res);
    if (page.data.redirect != null) {
        page.ctx.redirect(page.data.redirect);
        return page;
    }
    if (page.data.rewrite != null) {
        req.url = page.data.rewrite;
        page.app.handlers.get(page.app, req, (0, exports.page_rewriteDelegate)(page));
        return page;
    }
    if (page.data.secure != null) {
        let user = req.user, secure = page.data.secure, role = typeof secure === 'object' && secure.role || null;
        if (user == null || (role && user.isInRole(role)) === false) {
            page.ctx.redirect(Application_1.default.current.config.page.urls.login);
            return page;
        }
    }
    return page._load();
};
exports.page_processRequest = page_processRequest;
const page_resolve = function (page, data) {
    if (page.ctx._redirect != null) {
        // response was already flushed
        return;
    }
    page.resolve(data);
};
exports.page_resolve = page_resolve;
const page_pathAddAlias = function (path, alias) {
    if (path == null || path === '')
        return null;
    let i = path.indexOf('::');
    if (i !== -1)
        path = path.slice(0, -i);
    return path + '::' + alias;
};
exports.page_pathAddAlias = page_pathAddAlias;
const page_process = function (page, nodes, onSuccess) {
    dependency_1.mask
        .renderAsync(nodes, page.model, page.ctx, null, page)
        .then(function (html) {
        if (page.ctx._rewrite != null) {
            Application_1.default
                .current
                .handlers
                .get(page.ctx._rewrite, {}, (0, exports.page_rewriteDelegate)(page));
            return;
        }
        onSuccess(html);
    }, page.rejectDelegate());
};
exports.page_process = page_process;
let page_processPartial;
exports.page_processPartial = page_processPartial;
(function () {
    exports.page_processPartial = page_processPartial = function (page, nodes, selectors) {
        nodes = __getTemplate(page, nodes, selectors);
        __getResources(page, page.ctx.config, function (meta) {
            if (meta.templates) {
                let node = dependency_1.mask.jmask(':html').text(meta.templates);
                nodes.push(node);
            }
            (0, exports.page_process)(page, nodes, function (html) {
                let json = {
                    type: 'partial',
                    html: html,
                    scripts: meta.scripts,
                    styles: meta.styles
                };
                (0, exports.page_resolve)(page, json);
            });
        });
    };
    function __getTemplate(page, nodes, selector) {
        let arr = [], selectors = selector.split(';'), imax = selectors.length, i = -1, x;
        while (++i < imax) {
            selector = selectors[i];
            if (selector === '')
                continue;
            x = dependency_1.mask.jmask(nodes).find(selector);
            if (x == null) {
                dependency_1.logger.warn('<HttpPage.partial> Not found `%s`', selectors[i]);
                continue;
            }
            arr.push(x);
        }
        return arr;
    }
    function __getResources(page, config, cb) {
        if (Scripts == null)
            Scripts = dependency_1.mask.getHandler('atma:scripts');
        if (Styles == null)
            Styles = dependency_1.mask.getHandler('atma:styles');
        let styles = Styles.getModel(page, config, true);
        Scripts.getModel(page, config, true, function (scripts) {
            cb({
                scripts: scripts.scripts,
                styles: styles
            });
        });
    }
    let Scripts, Styles;
}());
const pageError_sendDelegate = function (req, res, error, app) {
    return function (html) {
        let response = new IHttpHandler_1.HttpResponse({
            content: html,
            statusCode: error.statusCode ?? 500,
            mimeType: mime_1.mime_HTML,
        });
        (0, send_1.send_Content)(req, res, response, app, 0);
    };
};
exports.pageError_sendDelegate = pageError_sendDelegate;
const pageError_failDelegate = function (req, res, error, app) {
    return function (internalError) {
        let str = (0, dependency_1.is_Object)(internalError)
            ? JSON.stringify(internalError)
            : internalError;
        str += '\nError: ' + error.message;
        let response = new IHttpHandler_1.HttpResponse({
            content: 'ErrorPage Failed: ' + str,
            statusCode: 500,
            mimeType: mime_1.mime_PLAIN,
        });
        (0, send_1.send_Content)(req, res, response, app, 0);
    };
};
exports.pageError_failDelegate = pageError_failDelegate;
//# sourceMappingURL=page-utils.js.map
//# sourceMappingURL=page-utils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpPage_page_utils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpPage_page_utils) && __isObj(module.exports)) {
        Object.assign(_src_HttpPage_page_utils, module.exports);
    } else {
        _src_HttpPage_page_utils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpErrorPage;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpPage_HttpErrorPage != null ? _src_HttpPage_HttpErrorPage : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const HttpError_1 = _src_HttpError_HttpError;
const vars_1 = _src_vars;
const fn_1 = _src_util_fn;
const HttpPageBase_1 = _src_HttpPage_HttpPageBase;
const page_utils_1 = _src_HttpPage_page_utils;
class HttpErrorPage extends HttpPageBase_1.default {
    constructor(error, pageData, config) {
        super(null, null);
        this._setPageData(pageData, config);
        this.model = error;
    }
    _setPageData(data, cfg) {
        this.data = data;
        if (data.masterPath != null)
            this.masterPath = data.masterPath;
        if (data.templatePath != null)
            this.templatePath = data.templatePath;
        if (data.master)
            this.masterPath = cfg.$getMaster(data);
        if (data.template)
            this.templatePath = cfg.$getTemplate(data);
        if (data.compo)
            this.compoPath = cfg.$getCompo(data);
        if (this.template == null && this.compoPath == null && this.templatePath == null)
            this.templatePath = cfg.$getTemplate(data);
        if (this.master == null && this.masterPath == null)
            this.masterPath = cfg.$getMaster(data);
    }
    static send(error, req, res, config) {
        var pageCfg = config.page, errorPages = pageCfg.errors, genericPage = pageCfg.error;
        var pageData = (errorPages && errorPages[error.statusCode]) || genericPage;
        if (pageData == null) {
            pageData = {
                masterPath: '',
                templatePath: vars_1.LIB_DIR.combine('../pages/error/error.mask').toString()
            };
        }
        return new HttpErrorPage(error, pageData, config).process(req, res, config);
    }
    process(req, res, config) {
        this
            .done((0, page_utils_1.pageError_sendDelegate)(req, res, this.model, this.app))
            .fail((0, page_utils_1.pageError_failDelegate)(req, res, this.model, this.app));
        (0, page_utils_1.page_processRequest)(this, req, res, config);
    }
    _load() {
        this.resource = dependency_1.include
            .instance()
            .load((0, page_utils_1.page_pathAddAlias)(this.masterPath, 'Master'), (0, page_utils_1.page_pathAddAlias)(this.templatePath, 'Template'))
            .js((0, page_utils_1.page_pathAddAlias)(this.compoPath, 'Compo'))
            .done((0, fn_1.fn_proxy)(this._response, this));
        return this;
    }
    _response(resp) {
        var master = resp.load && resp.load.Master || this.master, template = resp.load && resp.load.Template || this.template, nodes = this.nodes || template;
        if (master == null && this.masterPath !== '') {
            this.reject(new HttpError_1.HttpError('Page: Masterpage not found'));
            return;
        }
        if (nodes == null) {
            this.reject(new HttpError_1.HttpError('Page: Template not found'));
            return;
        }
        if (master)
            dependency_1.mask.render(dependency_1.mask.parse(master));
        (0, page_utils_1.page_process)(this, nodes, (0, fn_1.fn_delegate)(page_utils_1.page_resolve, this));
    }
}
;
exports.default = HttpErrorPage;
//# sourceMappingURL=HttpErrorPage.js.map
//# sourceMappingURL=HttpErrorPage.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpPage_HttpErrorPage === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpPage_HttpErrorPage) && __isObj(module.exports)) {
        Object.assign(_src_HttpPage_HttpErrorPage, module.exports);
    } else {
        _src_HttpPage_HttpErrorPage = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpPage;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpPage_HttpPage != null ? _src_HttpPage_HttpPage : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const HttpError_1 = _src_HttpError_HttpError;
const fn_1 = _src_util_fn;
const HttpPageBase_1 = _src_HttpPage_HttpPageBase;
const HttpErrorPage_1 = _src_HttpPage_HttpErrorPage;
const page_utils_1 = _src_HttpPage_page_utils;
class HttpPage extends HttpPageBase_1.default {
    constructor(route, app) {
        super(route, app);
        if (route == null || route.value == null) {
            dependency_1.logger.error('<HttpPage> Route value is undefined');
            return this;
        }
        var cfg = app.config, data = route.value;
        this.query = route.current && route.current.params;
        this._setPageData(data, cfg);
        return this;
    }
    _setPageData(data, cfg) {
        this.data = data;
        if (data.masterPath != null)
            this.masterPath = data.masterPath;
        if (data.templatePath != null)
            this.templatePath = data.templatePath;
        if (data.master)
            this.masterPath = cfg.$getMaster(data);
        if (data.template)
            this.templatePath = cfg.$getTemplate(data);
        if (data.compo)
            this.compoPath = cfg.$getCompo(data);
        if (data.isHtmlPage != null) {
            this.isHtmlPage = data.isHtmlPage;
        }
        // Generate default template path
        if (this.template == null && this.compoPath == null && this.templatePath == null) {
            this.templatePath = cfg.$getTemplate(data);
        }
        if (this.templatePath) {
            this.location = this.templatePath.replace(/[^/]+$/, '');
        }
    }
    process(req, res, config) {
        if (this.middleware == null)
            return (0, page_utils_1.page_processRequest)(this, req, res, config);
        this.middleware.process(req, res, (0, page_utils_1.page_processRequestDelegate)(this, req, res, config), config);
        return this;
    }
    sendError(error, req, res, config) {
        HttpErrorPage_1.default.send(error, req, res, config);
    }
    _load() {
        var env = this.data.env, env_server, env_both;
        if (env != null) {
            env_both = env.both;
            env_server = env.server;
        }
        var base = this.ctx.config.base, parent = this.app.resources;
        this.resource = dependency_1.include
            .instance(base, parent)
            .setBase(base)
            .load((0, page_utils_1.page_pathAddAlias)(this.masterPath, 'Master'), (0, page_utils_1.page_pathAddAlias)(this.templatePath, 'Template'))
            .js((0, page_utils_1.page_pathAddAlias)(this.compoPath, 'Compo'))
            .js(env_both)
            .js(env_server)
            .done((0, fn_1.fn_proxy)(this._response, this));
        return this;
    }
    _response(resp) {
        var master = resp.load && resp.load.Master || this.master, template = resp.load && resp.load.Template || this.template, Component = resp.Compo;
        if (master == null && this.masterPath) {
            this.reject(new HttpError_1.HttpError('Page: Masterpage not found'));
            return;
        }
        if (template == null && Component == null) {
            this.reject(new HttpError_1.HttpError('Page: Template not found'));
            return;
        }
        if ('master' === this.query.debug) {
            this.resolve(master);
            return;
        }
        if ('template' === this.query.debug) {
            this.resolve(template);
            return;
        }
        if (this.query.breakOn) {
            this.ctx.debug = { breakOn: this.query.breakOn };
        }
        if (master)
            dependency_1.mask.render(dependency_1.mask.parse(master));
        if (Component != null) {
            if (template && Component.template == null)
                Component.template = template;
            if (Component.mode == null)
                Component.mode = 'server';
            this.nodes = new dependency_1.mask
                .Dom
                .Component('', null, Component);
        }
        if ((0, dependency_1.is_Function)(this.onRenderStart))
            this.onRenderStart(this.model, this.ctx);
        var nodes = this.nodes || template;
        if (this.query.partial) {
            (0, page_utils_1.page_processPartial)(this, nodes, this.query.partial);
            return;
        }
        if (this.isHtmlPage) {
            dependency_1.mask
                .renderPageAsync(nodes, this.model, this.ctx)
                .then(html => this.resolve(html), error => this.reject(error));
            return;
        }
        (0, page_utils_1.page_process)(this, nodes, (0, fn_1.fn_delegate)(page_utils_1.page_resolve, this));
    }
}
exports.default = HttpPage;
//# sourceMappingURL=HttpPage.js.map
//# sourceMappingURL=HttpPage.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpPage_HttpPage === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpPage_HttpPage) && __isObj(module.exports)) {
        Object.assign(_src_HttpPage_HttpPage, module.exports);
    } else {
        _src_HttpPage_HttpPage = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_page;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_page != null ? _src_util_page : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page_flatternPageViewRoutes = void 0;
const page_flatternPageViewRoutes = function (pages, pageCfg) {
    var out = {}, key, page;
    for (key in pages) {
        page = pages[key];
        addPage(out, key, page, pages, pageCfg);
    }
    return out;
};
exports.page_flatternPageViewRoutes = page_flatternPageViewRoutes;
function addPage(out, key, page, pages, pageCfg) {
    if (page.route == null) {
        page.route = key;
    }
    if (page.id == null) {
        page.id = key;
    }
    var pattern = page.pattern || pageCfg.pattern || page.route;
    var segments = getSegments(pattern);
    var arr = split(page, segments);
    arr.forEach(function (x) {
        out[x.route] = x;
    });
}
function split(page, segments, prevSegment = null) {
    if (segments.length === 0) {
        return [page];
    }
    var segment = segments.shift();
    var sub = page[segment];
    if (sub == null) {
        return [page];
    }
    var arr = [];
    for (var key in sub) {
        var subPage = merge(page, key, sub[key], prevSegment, segment);
        var subArr = split(subPage, segments.slice(), segment);
        if (subArr) {
            arr = arr.concat(subArr);
        }
    }
    return arr;
}
function merge(pageData, subPagePath, subPage, prevSegment, currentSegment) {
    var page = Object.create(pageData);
    var path = subPagePath;
    if (path[0] !== '/') {
        path = pageData.route + '/' + path;
    }
    page[currentSegment] = subPage.view;
    page.route = page.id = path;
    for (var key in subPage) {
        if (key === 'view' || key === 'route' || key === 'id')
            continue;
        page[key] = subPage[key];
    }
    return page;
}
function getSegments(pattern) {
    return pattern
        .split('/')
        .filter(function (path) {
        return path !== '';
    })
        .map(function (path) {
        return path.replace(':', '');
    })
        .slice(1);
}
//# sourceMappingURL=page.js.map
//# sourceMappingURL=page.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_page === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_page) && __isObj(module.exports)) {
        Object.assign(_src_util_page, module.exports);
    } else {
        _src_util_page = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_path;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_path != null ? _src_util_path : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path_resolveSystemUrl = exports.path_normalize = exports.path_hasProtocol = void 0;
const { class_Uri: Uri } = require('atma-utils');
const path_hasProtocol = function (path) {
    return /^(file|https?):/.test(path);
};
exports.path_hasProtocol = path_hasProtocol;
const path_normalize = function (path) {
    return path
        .replace(/\\/g, '/')
        // remove double slashes, but not near protocol
        .replace(/([^:\/])\/{2,}/g, '$1/');
};
exports.path_normalize = path_normalize;
const path_resolveSystemUrl = function (path, base = null) {
    path = (0, exports.path_normalize)(path);
    if ((0, exports.path_hasProtocol)(path))
        return path;
    if (path[0] === '.' && path[1] === '/')
        path = path.substring(2);
    if (hasSystemRoot(path))
        return 'file://' + path;
    if (base_ == null)
        ensureBase();
    return Uri.combine(base || base_, path);
};
exports.path_resolveSystemUrl = path_resolveSystemUrl;
var base_;
function ensureBase() {
    base_ = 'file://' + (0, exports.path_normalize)(process.cwd() + '/');
}
function hasSystemRoot(path) {
    if (path[0] === '/')
        return true;
    return /^[A-Za-z]:[\/\\]/.test(path);
}
//# sourceMappingURL=path.js.map
//# sourceMappingURL=path.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_path === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_path) && __isObj(module.exports)) {
        Object.assign(_src_util_path, module.exports);
    } else {
        _src_util_path = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_fs;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_fs != null ? _src_util_fs : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs_exploreFiles = void 0;
const atma_io_1 = require("atma-io");
function fs_exploreFiles(mix) {
    return new Promise((resolve, reject) => {
        atma_io_1.glob.readAsync(mix, (error, entries) => {
            if (error) {
                reject(error);
                return;
            }
            let files = entries.filter(isFile);
            resolve(files);
        });
    });
}
exports.fs_exploreFiles = fs_exploreFiles;
function isFile(f) {
    return Boolean(f.uri?.extension);
}
//# sourceMappingURL=fs.js.map
//# sourceMappingURL=fs.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_fs === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_fs) && __isObj(module.exports)) {
        Object.assign(_src_util_fs, module.exports);
    } else {
        _src_util_fs = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_obj != null ? _src_util_obj : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_validate = exports.obj_assign = exports.obj_getKeys = exports.obj_lazyProperty = void 0;
const dependency_1 = _src_dependency;
const obj_lazyProperty = function (obj, xpath, init) {
    var arr = xpath.split('.'), imax = arr.length - 1, i = -1, key;
    while (++i < imax) {
        key = arr[i];
        if (obj[key] == null)
            obj[key] = {};
        obj = obj[key];
    }
    key = arr[imax];
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            var val = init();
            Object.defineProperty(obj, key, {
                enumerable: true,
                writable: true,
                value: val
            });
            return val;
        },
        set: function (val) {
            Object.defineProperty(obj, key, {
                enumerable: true,
                writable: true,
                value: val
            });
        }
    });
};
exports.obj_lazyProperty = obj_lazyProperty;
function obj_getKeys(x) {
    let keys = [];
    let proto = x;
    while (proto != null && proto != Object.prototype) {
        keys.push(...Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return keys;
}
exports.obj_getKeys = obj_getKeys;
/**
 * Max 4 args
 */
exports.obj_assign = Object.assign || function (target, a, b, c, d) {
    if (a != null)
        target = (0, dependency_1.obj_extend)(target, a);
    if (b != null)
        target = (0, dependency_1.obj_extend)(target, b);
    if (c != null)
        target = (0, dependency_1.obj_extend)(target, c);
    if (d != null)
        target = (0, dependency_1.obj_extend)(target, d);
    return target;
};
let obj_validate;
exports.obj_validate = obj_validate;
(function () {
    exports.obj_validate = obj_validate = function (a /*, b , ?isStrict, ?property, ... */) {
        if (a == null)
            return Err_Invalid('object');
        _props = null;
        _strict = false;
        var i = arguments.length, validator, x;
        while (--i > 0) {
            x = arguments[i];
            switch (typeof x) {
                case 'string':
                    if (_props == null)
                        _props = {};
                    _props[x] = 1;
                    continue;
                case 'boolean':
                    _strict = x;
                    continue;
                case 'undefined':
                    continue;
                default:
                    if (i !== 1) {
                        return Err_Invalid('validation argument at ' + i);
                    }
                    validator = x;
                    continue;
            }
        }
        if (validator == null)
            validator = a.Validate;
        if (validator == null)
            // if no validation object - accept any.
            return null;
        return checkObject(a, validator, a);
    };
    // private
    // unexpect in `a` if not in `b`
    var _strict = false, 
    // validate only specified properties
    _props = null;
    // a** - payload
    // b** - expect
    // strict -
    function checkObject(a, b, ctx) {
        var error, optional, key, aVal, aKey;
        for (key in b) {
            if (_props != null && a === ctx && _props.hasOwnProperty(key) === false) {
                continue;
            }
            switch (key.charCodeAt(0)) {
                case 63:
                    // ? (optional)
                    aKey = key.substring(1);
                    aVal = a[aKey];
                    //! accept falsy value
                    if (!aVal)
                        continue;
                    error = checkProperty(aVal, b[key], ctx);
                    if (error != null) {
                        error.setInvalidProperty(aKey);
                        return error;
                    }
                    continue;
                case 45:
                    // - (unexpect)
                    aKey = key.substring(1);
                    if (typeof a === 'object' && aKey in a)
                        return Err_Unexpect(aKey);
                    continue;
            }
            aVal = a[key];
            if (aVal == null)
                return Err_Expect(key);
            error = checkProperty(aVal, b[key], ctx);
            if (error != null) {
                error.setInvalidProperty(key);
                return error;
            }
        }
        if (_strict) {
            for (key in a) {
                if (key in b || '?' + key in b)
                    continue;
                return Err_Unexpect(key);
            }
        }
    }
    function checkProperty(aVal, bVal, ctx) {
        if (bVal == null)
            return null;
        if (typeof bVal === 'function') {
            var error = bVal.call(ctx, aVal);
            if (error == null || error === true)
                return null;
            if (error === false)
                return Err_Invalid();
            return Err_Custom(error);
        }
        if (aVal == null)
            return Err_Expect();
        if (typeof bVal === 'string') {
            var str = 'string', num = 'number', bool = 'boolean';
            switch (bVal) {
                case str:
                    return typeof aVal !== str || aVal.length === 0
                        ? Err_Type(str)
                        : null;
                case num:
                    return typeof aVal !== num
                        ? Err_Type(num)
                        : null;
                case bool:
                    return typeof aVal !== bool
                        ? Err_Type(bool)
                        : null;
            }
        }
        if (bVal instanceof RegExp) {
            return bVal.test(aVal) === false
                ? Err_Invalid()
                : null;
        }
        if (Array.isArray(bVal)) {
            if (Array.isArray(aVal) === false)
                return Err_Type('array');
            var i = -1, imax = aVal.length, error;
            while (++i < imax) {
                error = checkObject(aVal[i], bVal[0]);
                if (error) {
                    error.setInvalidProperty(i);
                    return error;
                }
            }
            return null;
        }
        if (typeof aVal !== typeof bVal)
            return Err_Type(typeof aVal);
        if (typeof aVal === 'object')
            return checkObject(aVal, bVal);
        return null;
    }
    var Err_Type, Err_Expect, Err_Unexpect, Err_Custom, Err_Invalid;
    (function () {
        Err_Type = create('type', function TypeErr(expect) {
            this.expect = expect;
        }, {
            toString: function () {
                return 'Invalid type.'
                    + (this.expect
                        ? ' Expect: ' + this.expect
                        : '')
                    + (this.property
                        ? ' Property: ' + this.property
                        : '');
            }
        });
        Err_Expect = create('expect', function ExpectErr(property) {
            this.property = property;
        }, {
            toString: function () {
                return 'Property expected.'
                    + (this.property
                        ? '`' + this.property + '`'
                        : '');
            }
        });
        Err_Unexpect = create('unexpect', function UnexpectErr(property) {
            this.property = property;
        }, {
            toString: function () {
                return 'Unexpected property'
                    + (this.property
                        ? '`' + this.property + '`'
                        : '');
            }
        });
        Err_Custom = create('custom', function CustomErr(error) {
            this.error = error;
        }, {
            toString: function () {
                return 'Custom validation: '
                    + this.error
                    + (this.property
                        ? ' Property: ' + this.property
                        : '');
            }
        });
        Err_Invalid = create('invalid', function InvalidErr(expect) {
            this.expect = expect;
        }, {
            toString: function () {
                return 'Invalid.'
                    + (this.expect
                        ? ' Expect: ' + this.expect
                        : '')
                    + (this.property
                        ? ' Property: ' + this.property
                        : '');
            }
        });
        function create(type, Ctor, proto) {
            proto.type = type;
            proto.property = null;
            proto.setInvalidProperty = setInvalidProperty;
            Ctor.prototype = proto;
            return function (mix) {
                return new Ctor(mix);
            };
        }
        function setInvalidProperty(prop) {
            if (this.property == null) {
                this.property = prop;
                return;
            }
            this.property = prop + '.' + this.property;
        }
    }()); /*< Errors */
}());
//# sourceMappingURL=obj.js.map
//# sourceMappingURL=obj.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_obj === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_obj) && __isObj(module.exports)) {
        Object.assign(_src_util_obj, module.exports);
    } else {
        _src_util_obj = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpointExplorer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_HttpEndpointExplorer != null ? _src_HttpService_HttpEndpointExplorer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointExplorer = void 0;
const atma_io_1 = require("atma-io");
const atma_utils_1 = require("atma-utils");
const alot_1 = require("alot");
const fs_1 = _src_util_fs;
const class_json_1 = require("class-json");
const obj_1 = _src_util_obj;
var HttpEndpointExplorer;
(function (HttpEndpointExplorer) {
    function getMeta(Type) {
        let jsonMeta = class_json_1.JsonUtils.pickModelMeta(Type);
        let meta = Type.prototype.meta ?? {};
        let output = {
            path: meta.path,
            description: meta.description ?? jsonMeta?.description,
            paths: []
        };
        const Proto = Type.prototype;
        const rgxPath = /^\$([a-z]+) (.+)$/i;
        const keys = (0, obj_1.obj_getKeys)(Proto);
        for (let key of keys) {
            let val = Proto[key];
            if (val == null) {
                continue;
            }
            let methodMeta = val.meta;
            if (methodMeta == null) {
                if (rgxPath.test(key) === false) {
                    continue;
                }
                methodMeta = { path: key };
            }
            let route = rgxPath.exec(methodMeta.path);
            if (route == null) {
                output.paths.push({
                    path: methodMeta.path,
                    description: 'Invalid route'
                });
                continue;
            }
            const methodParamsMeta = meta.endpointsParams?.[key];
            const apiParams = methodParamsMeta?.map(methodParamMeta => {
                return {
                    in: methodParamMeta.from === 'uri' ? 'query' : 'body',
                    name: methodParamMeta.name,
                    description: methodParamMeta.description ?? methodParamMeta.Type?.name,
                    schema: getSchema(methodParamMeta.Type),
                    required: methodParamMeta.optional === true ? false : true
                };
            }) ?? [];
            const apiResponses = methodMeta.responses?.map(resp => {
                return {
                    statusCode: resp.status,
                    description: resp.description ?? resp.Type?.name,
                    schema: getSchema(resp.Type)
                };
            }) ?? [];
            const apiRoute = {
                path: route[2],
                method: route[1],
                operationId: key,
                description: methodMeta.description ?? jsonMeta?.properties?.[key]?.description,
                parameters: apiParams,
                responses: apiResponses
            };
            if (methodMeta.secure != null) {
                if (methodMeta.secure === true) {
                    apiRoute.security = {
                        authorized: true
                    };
                }
                if (typeof methodMeta.secure === 'object') {
                    apiRoute.security = {
                        authorized: true,
                        roles: methodMeta.secure.roles,
                        claims: methodMeta.secure.claims,
                    };
                }
            }
            output.paths.push(apiRoute);
        }
        return output;
    }
    HttpEndpointExplorer.getMeta = getMeta;
    function getSchema(Type) {
        let schema = class_json_1.JsonSchema.getSchema(Type);
        // if (typeof Type === 'function' && schema.description == null)  {
        //     schema.description = Type.name;
        // }
        return schema;
    }
    async function find(path, base) {
        if (path == null || path === '') {
            return null;
        }
        if (typeof path === 'string') {
            return findByPath(path, base);
        }
        if ((0, atma_utils_1.is_Array)(path)) {
            let arr = await Promise.all(path.map(x => findByPath(x)));
            return arr.reduce((aggr, x) => {
                return Object.assign(aggr, x);
            }, Object.create(null));
        }
        return null;
    }
    HttpEndpointExplorer.find = find;
    async function findByPath(path, base) {
        if (path.endsWith('/')) {
            path = `${path}**Endpoint*`;
        }
        if (path.startsWith('.') || path.startsWith('/')) {
            if (base == null) {
                base = atma_io_1.env.currentDir.toString();
            }
            path = atma_utils_1.class_Uri.combine(base, path);
        }
        let files = await (0, fs_1.fs_exploreFiles)(path);
        let keyValues = await (0, alot_1.default)(files).mapAsync(async ($file) => {
            let file = new atma_io_1.File($file.uri.toString(), { cached: false });
            let str = await file.readAsync({ skipHooks: true });
            let rgx = /@([\w\.]+\.)?route\s*\(\s*['"]([^'"]+)['"]/;
            let match = rgx.exec(str);
            if (match == null) {
                return null;
            }
            let urlPattern = match[2];
            if (/^\$/.test(urlPattern)) {
                // Endpoint Classes must have no METHOD definition
                // This one, the first matched route, has METHOD, and look like `$get /foo`
                return null;
            }
            return [`^${urlPattern}`, file.uri.toString()];
        }).toArrayAsync({ threads: 4 });
        return (0, alot_1.default)(keyValues).filter(Boolean).toDictionary(arr => arr[0], arr => arr[1]);
    }
})(HttpEndpointExplorer = exports.HttpEndpointExplorer || (exports.HttpEndpointExplorer = {}));
//# sourceMappingURL=HttpEndpointExplorer.js.map
//# sourceMappingURL=HttpEndpointExplorer.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_HttpEndpointExplorer === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_HttpEndpointExplorer) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_HttpEndpointExplorer, module.exports);
    } else {
        _src_HttpService_HttpEndpointExplorer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HandlerFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HandlerFactory != null ? _src_HandlerFactory : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = _src_HttpApplication_Application;
const SubApp_1 = _src_HttpApplication_SubApp;
const HttpPage_1 = _src_HttpPage_HttpPage;
const dependency_1 = _src_dependency;
const page_1 = _src_util_page;
const path_1 = _src_util_path;
const app_1 = _src_util_app;
const atma_utils_1 = require("atma-utils");
const ruta_1 = require("ruta");
const HttpEndpointExplorer_1 = _src_HttpService_HttpEndpointExplorer;
const fns_RESPONDERS = [
    'subapps',
    'handlers',
    'services',
    'pages'
];
class HandlerFactory {
    constructor(app) {
        this.app = app;
        this.subapps = new ruta_1.Collection();
        this.handlers = new ruta_1.Collection();
        this.services = new ruta_1.Collection();
        this.pages = new ruta_1.Collection();
    }
    registerPages(pages_, pageCfg) {
        let pages = (0, page_1.page_flatternPageViewRoutes)(pages_, pageCfg), id, page;
        for (id in pages) {
            page = pages[id];
            if (page.controller == null) {
                page.controller = HttpPage_1.default;
            }
            else if ((0, dependency_1.is_String)(page.controller)) {
                page.controller = this
                    .app
                    .config
                    .$getController(page);
            }
            this.pages.add(page.route, page);
        }
        return this;
    }
    registerHandlers(routes, handlerCfg) {
        for (let key in routes) {
            this.registerHandler(key, routes[key], handlerCfg);
        }
        return this;
    }
    registerHandler(path, handler, handlerCfg) {
        if ((0, dependency_1.is_String)(handler)) {
            handler = {
                controller: handler_path(handler, handlerCfg)
            };
        }
        this
            .handlers
            .add(path, handler);
    }
    registerSubApps(routes, subAppCfg) {
        for (let key in routes) {
            this.registerSubApp(key, routes[key], subAppCfg);
        }
        return this;
    }
    registerSubApp(name, data, subAppCfg) {
        let route = name;
        if (route[0] !== '^') {
            if (route[0] !== '/')
                route = '/' + route;
            route = '^' + route;
        }
        this
            .subapps
            .add(route, new SubApp_1.default(name, data, this.app));
    }
    registerServices(routes, serviceCfg) {
        for (let key in routes) {
            this.registerService(key, routes[key], serviceCfg);
        }
        return this;
    }
    registerService(path, service, serviceCfg) {
        if ((0, dependency_1.is_Function)(service)) {
            service = {
                controller: service
            };
        }
        else if ((0, dependency_1.is_String)(service)) {
            service = {
                controller: service
            };
        }
        if ((0, dependency_1.is_String)(service.controller)) {
            service.controller = handler_path(service.controller, serviceCfg);
        }
        this
            .services
            .add(path, service);
    }
    registerWebsockets(routes, websocketCfg) {
        for (let namespace in routes) {
            this.registerWebsocket(namespace, routes[namespace]);
        }
        return this;
    }
    registerWebsocket(namespace, handler, handlerCfg = null) {
        let socket = this.app.webSockets;
        if ((0, dependency_1.is_String)(handler)) {
            let path = handler_path(handler, handlerCfg);
            dependency_1.include
                .instance()
                .js(handler + '::Handler')
                .done(function (resp) {
                socket.registerHandler(namespace, resp.Handler);
            });
            return;
        }
        socket.registerHandler(namespace, handler);
    }
    registerEndpoints(endpoints) {
        endpoints?.forEach(Ctor => this.registerEndpoint(Ctor));
        return this;
    }
    registerEndpoint(Type) {
        let meta = HttpEndpointExplorer_1.HttpEndpointExplorer.getMeta(Type);
        if (meta == null || meta.path == null) {
            throw new Error(`Meta information not extracted from ${Type}`);
        }
        this.registerService(meta.path, Type);
        return this;
    }
    get(app, req, callback) {
        let url = req.url;
        let method = req.method;
        let base = app.config.base;
        if (method === 'POST' && req.body && req.body._method) {
            method = req.body._method;
        }
        let imax = fns_RESPONDERS.length, i = -1;
        while (++i < imax) {
            let x = fns_RESPONDERS[i];
            if (processor_tryGet(this, this[x], url, method, base, callback)) {
                return;
            }
        }
        if (Application_1.default.current != null && this.app !== Application_1.default.current) {
            // check handlers of the root application
            let factory = Application_1.default.current.handlers, cfg = Application_1.default.current.config;
            let hasHandler = processor_tryGet(factory, factory.handlers, url, method, cfg.base || base, callback);
            if (hasHandler) {
                return;
            }
        }
        callback(null);
    }
    has(url, method) {
        let imax = fns_RESPONDERS.length, i = -1;
        while (++i < imax) {
            if (this[fns_RESPONDERS[i]].get(url, method) != null)
                return true;
        }
        return false;
    }
}
exports.default = HandlerFactory;
HandlerFactory.Handlers = {};
;
function processor_tryGet(factory, collection, url, method, base, callback) {
    let route = collection.get(url, method);
    if (route == null) {
        return false;
    }
    let controller = route.value.controller || route.value;
    if (controller == null) {
        dependency_1.logger.error('<routing> no controller', url);
        return false;
    }
    if ((0, dependency_1.is_Function)(controller)) {
        callback(new controller(route, factory.app));
        return true;
    }
    if ((0, dependency_1.is_String)(controller)) {
        let path = (0, path_1.path_hasProtocol)(controller)
            ? controller
            : dependency_1.Uri.combine(base, controller);
        processor_loadAndInit(factory, path, route, callback);
        return true;
    }
    if ((0, dependency_1.is_Function)(controller.process)) {
        callback(controller);
        return true;
    }
    dependency_1.logger.error('<routing> invalid controller', controller);
    return false;
}
let COUNTER = 0;
function processor_loadAndInit(factory, url, route, callback) {
    if (memory_canResolve(url)) {
        memory_resolve(factory, url, route, callback);
        return;
    }
    const key = `Handler${++COUNTER}`;
    factory
        .app
        .resources
        .js(url + `::${key}`)
        .done(function (resp) {
        let Handler = resp[key];
        if (Handler == null) {
            dependency_1.logger.error('<handler> invalid route', url);
            callback(new ErrorHandler('Invalid route: ' + url));
            return;
        }
        if (typeof Handler.default === 'function') {
            Handler = Handler.default;
        }
        if (!(0, dependency_1.is_Function)(Handler.prototype?.process)) {
            let msg = `
                    Invalid default exported interface from ${url}. Did you used default export/inherited the HttpEndpoint
                `.trim();
            dependency_1.logger.error(`<handler> ${msg}`);
            callback(new ErrorHandler(msg));
            return;
        }
        if ((0, app_1.app_isDebug)() === false)
            route.value.controller = Handler;
        if ((0, dependency_1.is_Object)(Handler) && (0, dependency_1.is_Function)(Handler.process)) {
            callback(Handler);
            return;
        }
        callback(new Handler(route, factory.app));
    });
}
let memory_canResolve, memory_resolve;
(function () {
    let rgx = /\/\{(self|global)\}.?/;
    memory_canResolve = function (url) {
        return rgx.test(url);
    };
    memory_resolve = function (factory, url, route, callback) {
        let match = rgx.exec(url), str = match[0], type = match[1], path = url.substring(match.index + match[0].length), memory = getContext(type), Handler = (0, atma_utils_1.obj_getProperty)(memory, path);
        if (Handler == null) {
            dependency_1.logger.error('<handler> invalid route', url);
            callback(new ErrorHandler('Invalid route: ' + url));
            return;
        }
        if ((0, dependency_1.is_Object)(Handler)) {
            callback(Handler);
            return;
        }
        callback(new Handler(route, factory.app));
    };
    function getContext(type) {
        switch (type.toLowerCase()) {
            case 'self':
                return HandlerFactory.Handlers;
            case 'global':
                return global;
        }
        return null;
    }
}());
function handler_path(path, config) {
    if (path.charCodeAt(0) === 47) {
        // /
        return path;
    }
    if (path.indexOf('://') !== -1) {
        return path;
    }
    let location = config && config.location;
    if (location == null) {
        dependency_1.logger
            .error('<Handler> Path is relative but no location. Set handler: {location: X} in config')
            .error(path, config);
        return path;
    }
    let template = path.split('/');
    let route = location.split(/[\{\}]/g);
    path = route[0];
    for (let i = 1; i < route.length; i++) {
        if (i % 2 === 0) {
            path += route[i];
            continue;
        }
        /** if template provides less "breadcrumbs" than needed -
         * take always the last one for failed peaces */
        let index = route[i] << 0;
        if (index > template.length - 1) {
            index = template.length - 1;
        }
        path += template[index];
        if (i === route.length - 2) {
            for (index++; index < template.length; index++) {
                path += '/' + template[index];
            }
        }
    }
    return path;
}
function rgx_fromString(str, flags) {
    return new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), flags);
}
class ErrorHandler extends atma_utils_1.class_Dfr {
    constructor(message) {
        super();
        this.message = message;
    }
    process() {
        return this.reject(this.message ?? 'Invalid Routing');
    }
}
;
//# sourceMappingURL=HandlerFactory.js.map
//# sourceMappingURL=HandlerFactory.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HandlerFactory === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HandlerFactory) && __isObj(module.exports)) {
        Object.assign(_src_HandlerFactory, module.exports);
    } else {
        _src_HandlerFactory = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_WebSocket;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_WebSocket != null ? _src_WebSocket : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
class WebSocket {
    constructor(app) {
        this.app = app;
        this.SocketListeners = {};
        this.io = null;
        this.ioSsl = null;
    }
    listen(httpServer) {
        this.listen = doNothing;
        dependency_1.logger.log('Web socket opened'.green.bold);
        this.io = io_create(httpServer, this.SocketListeners);
    }
    listenSsl(httpsServer) {
        this.listenSsl = doNothing;
        dependency_1.logger.log('Wsl socket opened'.green.bold);
        this.ioSsl = io_create(httpsServer, this.SocketListeners);
    }
    hasHandlers() {
        return Object.keys(this.SocketListeners).length !== 0;
    }
    getHandler(namespace) {
        return this.SocketListeners[namespace];
    }
    registerHandler(namespace, Handler) {
        this.SocketListeners[namespace] = Handler;
        if (this.io == null && this.ioSsl == null) {
            if (this.app != null) {
                if (this.app._server) {
                    this.listen(this.app._server);
                }
                if (this.app._sslServer) {
                    this.listenSsl(this.app._sslServer);
                }
            }
            return;
        }
        if (this.io) {
            io_listen(this.io, namespace, Handler);
        }
        if (this.ioSsl) {
            io_listen(this.ioSsl, namespace, Handler);
        }
    }
    clients(namespace) {
        let clients = [];
        if (this.io) {
            let nsp = this.io.of(namespace);
            for (let id in nsp.connected) {
                clients.push(nsp.connected[id]);
            }
        }
        if (this.ioSsl) {
            let nsp = this.ioSsl.of(namespace);
            for (let id in nsp.connected) {
                clients.push(nsp.connected[id]);
            }
        }
        return clients;
    }
    // of (namespace){
    // 	return this.io == null
    // 		? null
    // 		: this.io.of(namespace);
    // }
    emit(namespace, ...args) {
        let cb = args[args.length - 1];
        if (this.io == null && this.ioSsl === null) {
            console.error('Emitting to the websockets (%s), but server is not started', namespace);
            cb?.({ message: 'Server is not started' });
            return;
        }
        if (this.SocketListeners[namespace] == null) {
            console.error('No handlers are bound to the namespace', namespace);
            cb?.({ message: 'No handlers' });
            return;
        }
        if (typeof cb === 'function') {
            args.pop();
            io_emitMany(this.clients(namespace), args, cb);
            return;
        }
        if (this.io != null) {
            let nsp = this.io.of(namespace);
            nsp.emit.apply(nsp, args);
        }
        if (this.ioSsl != null) {
            let nsp = this.ioSsl.of(namespace);
            nsp.emit.apply(nsp, args);
        }
    }
}
exports.default = WebSocket;
;
var io_create, io_handlerDelegate, io_listen, io_emitMany;
(function () {
    io_create = function (httpServer, listeners) {
        var io = require('socket.io')(httpServer, {
            'log level': 2
        });
        for (var nsp in listeners) {
            io_listen(io, nsp, listeners[nsp]);
        }
        return io;
    };
    io_listen = function (io, namespace, Handler) {
        io.of(namespace).on('connection', io_handlerDelegate(io, namespace, Handler));
    };
    io_handlerDelegate = function (io, namespace, Handler) {
        return function (socket) {
            new Handler(socket, io);
        };
    };
    io_emitMany = function (clients, args, cb) {
        var count = clients.length, results = [];
        if (count === 0) {
            cb(null, results);
            return;
        }
        var imax = count, i = -1, x;
        args.push(complete);
        while (++i < count) {
            x = clients[i];
            x.emit.apply(x, args);
        }
        function complete(data) {
            results.push(data);
            if (--count < 1)
                cb(null, results);
        }
    };
}());
function doNothing() { }
//# sourceMappingURL=WebSocket.js.map
//# sourceMappingURL=WebSocket.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_WebSocket === module.exports) {
        // do nothing if
    } else if (__isObj(_src_WebSocket) && __isObj(module.exports)) {
        Object.assign(_src_WebSocket, module.exports);
    } else {
        _src_WebSocket = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_memd_lib_umd_memd;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_memd_lib_umd_memd != null ? _node_modules_memd_lib_umd_memd : {};
    var module = { exports: exports };

    
// source ./UMD.js
(function (factory) {

    var _name = 'memd',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _src_Cache = {};
var _src_deco_debounce = {};
var _src_deco_memoize = {};
var _src_deco_queued = {};
var _src_deco_throttle = {};
var _src_fn_Args = {};
var _src_fn_memoize = {};
var _src_fn_queued = {};
var _src_model_Deferred = {};
var _src_persistence_FsTransport = {};
var _src_persistence_LocalStorageTransport = {};
var _src_persistence_StoreWorker = {};
var _src_persistence_TransportWorker = {};
var _src_utils_requireLib = {};
var _src_workers_CachedWorker = {};

// source ./ModuleSimplified.js
var _src_fn_Args;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fn_Args != null ? _src_fn_Args : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
var Args;
(function (Args) {
    function getKey(args, keyOptions, selector, ctx) {
        if (ctx == null) {
            ctx = { level: 0, refs: [] };
        }
        if (keyOptions == null) {
            keyOptions = {};
        }
        if (keyOptions.deep == null) {
            keyOptions.deep = 3;
        }
        if (selector == null) {
            selector = '';
        }
        let key = '';
        for (let i = 0; i < args.length; i++) {
            if (i > 0) {
                key += '.';
            }
            ctx.level++;
            key += getKeySingle(args[i], `${selector}.${i}`, keyOptions, ctx);
            ctx.level--;
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc, selector, keyOptions, ctx) {
        if (keyOptions.deep != null && ctx.level > keyOptions.deep) {
            return '';
        }
        if (keyOptions.serialize != null && keyOptions.serialize[selector.substring(1) /* cut trailing '.'*/] != null) {
            return keyOptions.serialize[selector.substring(1)](misc);
        }
        if (misc == null) {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc, keyOptions, selector, ctx);
        }
        let str = '';
        for (let key in misc) {
            ctx.level++;
            str += '.' + getKeySingle(misc[key], `${selector}.${key}`, keyOptions, ctx);
            ctx.level--;
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
//# sourceMappingURL=Args.js.map
//# sourceMappingURL=Args.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fn_Args === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fn_Args) && __isObj(module.exports)) {
        Object.assign(_src_fn_Args, module.exports);
    } else {
        _src_fn_Args = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistence_TransportWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_persistence_TransportWorker != null ? _src_persistence_TransportWorker : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportWorker = void 0;
class TransportWorker {
    cache;
    transport;
    isReady = false;
    isAsync = false;
    lastModified = null;
    restorePromise = null;
    // We duplicate collection, as Cache collections can store also promises.
    coll = {};
    flushRunner;
    constructor(cache, transport) {
        this.cache = cache;
        this.transport = transport;
        this.isAsync = Boolean(this.transport.isAsync);
        this.flushRunner = new AsyncRunner(() => this.flushInner(), this.transport.debounceMs ?? 500);
    }
    restore() {
        if (this.isReady) {
            return;
        }
        if (this.isAsync) {
            throw new Error('Transport is Async');
        }
        let coll = this.transport.restore();
        this.cache.setRestored(coll);
        this.coll = coll ?? {};
        this.isReady = true;
    }
    async restoreAsync() {
        return this.restorePromise ?? (this.restorePromise = (async () => {
            if (this.isReady) {
                return;
            }
            if (this.isAsync === false) {
                this.restore();
                return;
            }
            let coll = await this.transport.restoreAsync();
            if (this.isReady) {
                return;
            }
            this.cache.setRestored(coll);
            this.coll = coll ?? {};
            this.isReady = true;
        })());
    }
    flush(key, entry) {
        this.isReady = true;
        this.lastModified = new Date();
        this.coll[key] = entry;
        if (this.transport.debounceMs === 0) {
            this.transport.flush(this.coll);
            return;
        }
        this.flushRunner.run();
    }
    async flushAsync(key, entry, force) {
        if (this.isReady === false) {
            await this.restoreAsync();
        }
        this.lastModified = new Date();
        this.coll[key] = entry;
        return this.flushRunner.run();
    }
    async flushAllAsync(force) {
        if (this.isReady === false) {
            await this.restoreAsync();
        }
        this.lastModified = new Date();
        return this.flushRunner.run(force);
    }
    clear() {
        return this.flushRunner.run();
    }
    async clearAsync() {
        return this.clear();
    }
    flushInner() {
        let coll = this.coll;
        if (this.transport.isAsync) {
            return this.transport.flushAsync(coll);
        }
        this.transport.flush(coll);
    }
}
exports.TransportWorker = TransportWorker;
class AsyncRunner {
    fn;
    debounce;
    isWaiting = false;
    isBusy = false;
    timeout = null;
    dfr;
    shouldRunNext = false;
    constructor(fn, debounce) {
        this.fn = fn;
        this.debounce = debounce;
    }
    async run(force) {
        if (this.isWaiting && !this.isBusy) {
            this.defer(force);
            return this.dfr.promise;
        }
        if (this.isBusy) {
            this.shouldRunNext = true;
            return this.dfr.promise;
        }
        this.isWaiting = true;
        this.isBusy = false;
        this.dfr = new Deferred;
        this.defer(force);
        return this.dfr.promise;
    }
    defer(force) {
        if (this.isWaiting) {
            clearTimeout(this.timeout);
        }
        if (force === true) {
            this.runInner();
            return;
        }
        this.timeout = setTimeout(() => this.runInner(), this.debounce);
    }
    reset() {
        clearTimeout(this.timeout);
        this.isWaiting = false;
        this.isBusy = false;
        this.shouldRunNext = false;
    }
    async runInner() {
        this.isWaiting = false;
        this.isBusy = true;
        try {
            await this.fn();
        }
        catch (error) {
            console.error('Transport error', error);
        }
        const runNext = this.shouldRunNext;
        this.dfr.resolve(null);
        this.reset();
        if (runNext) {
            this.run();
        }
    }
}
class Deferred {
    promise;
    resolve;
    reject;
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
//# sourceMappingURL=TransportWorker.js.map
//# sourceMappingURL=TransportWorker.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_persistence_TransportWorker === module.exports) {
        // do nothing if
    } else if (__isObj(_src_persistence_TransportWorker) && __isObj(module.exports)) {
        Object.assign(_src_persistence_TransportWorker, module.exports);
    } else {
        _src_persistence_TransportWorker = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistence_StoreWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_persistence_StoreWorker != null ? _src_persistence_StoreWorker : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreWorker = void 0;
class StoreWorker {
    store;
    options;
    isAsync = false;
    doNotWaitSave = false;
    constructor(store, options = {}) {
        this.store = store;
        this.options = options;
        this.isAsync = this.store.getAsync != null;
        this.doNotWaitSave = options?.doNotWaitSave === true;
    }
    get(key, ...args) {
        return this.store.get(key);
    }
    getAsync(key, ...args) {
        return this.store.getAsync(key, ...args);
    }
    save(key, val) {
        this.store.save(key, val);
    }
    saveAsync(key, val) {
        let promise = this.store.saveAsync(key, val);
        if (this.doNotWaitSave === true) {
            return null;
        }
        return promise;
    }
    clear(key) {
        this.store.clear(key);
    }
    clearAsync(key) {
        return this.store.clearAsync(key);
    }
}
exports.StoreWorker = StoreWorker;
//# sourceMappingURL=StoreWorker.js.map
//# sourceMappingURL=StoreWorker.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_persistence_StoreWorker === module.exports) {
        // do nothing if
    } else if (__isObj(_src_persistence_StoreWorker) && __isObj(module.exports)) {
        Object.assign(_src_persistence_StoreWorker, module.exports);
    } else {
        _src_persistence_StoreWorker = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Cache;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Cache != null ? _src_Cache : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const Args_1 = _src_fn_Args;
const TransportWorker_1 = _src_persistence_TransportWorker;
const StoreWorker_1 = _src_persistence_StoreWorker;
class Cache {
    options;
    static caches = [];
    _cache = {};
    /** We save/read ALL cached object to the backed store */
    _transport;
    /** We save/read single key based values to the backed store */
    _store;
    isAsync = false;
    constructor(options = {}) {
        this.options = options;
        if (this.options.monitors) {
            this.onChanged = this.onChanged.bind(this);
            options.monitors.forEach(x => x.on('change', this.onChanged));
        }
        if (this.options.persistence) {
            this._transport = new TransportWorker_1.TransportWorker(this, this.options.persistence);
            this.isAsync = this._transport.isAsync;
        }
        if (this.options.store) {
            this._store = new StoreWorker_1.StoreWorker(this.options.store, options);
            this.isAsync = this._store.isAsync;
        }
        if (options.trackRef) {
            Cache.caches.push(this);
        }
    }
    resolveKey(args, keyOptions) {
        let key = this.options?.keyResolver?.(...args);
        return key ?? Args_1.Args.getKey(args, keyOptions);
    }
    get(key, ...args) {
        if (this._transport != null && this._transport.isReady === false) {
            this._transport.restore();
        }
        let entry = this._cache[key];
        if (entry == null) {
            if (this._store == null) {
                return null;
            }
            entry = this._store.get(key, ...args);
            if (entry == null) {
                return null;
            }
        }
        if (this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge) {
            this.clear(key);
            return null;
        }
        return entry.value;
    }
    async getAsync(key, ...args) {
        if (this._transport != null && this._transport.isReady === false) {
            await this._transport.restoreAsync();
        }
        let entry = this._cache[key];
        if (entry == null) {
            if (this._store == null) {
                return null;
            }
            entry = await this._store.getAsync(key, ...args);
            if (entry == null) {
                return null;
            }
        }
        if (this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge) {
            await this.clearAsync(key);
            return null;
        }
        return entry.value;
    }
    set(key, val) {
        const cached = {
            timestamp: Date.now(),
            value: val
        };
        this._cache[key] = cached;
        this.persist(key, cached, false);
        return val;
    }
    async persist(key, entry, isAsync) {
        const transport = this._transport;
        const store = this._store;
        if (transport == null && store == null) {
            return;
        }
        let val = entry.value;
        let isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
        if (isPromise) {
            try {
                val = await val;
            }
            catch (error) {
                // do nothing on rejection
                return;
            }
            entry = {
                value: val,
                timestamp: entry.timestamp,
            };
        }
        if (isAsync) {
            await this._transport?.flushAsync(key, entry);
            await this._store?.saveAsync(key, entry);
        }
        else {
            this._transport?.flush(key, entry);
            this._store?.save(key, entry);
        }
    }
    async setAsync(key, val) {
        const cached = {
            timestamp: Date.now(),
            value: val
        };
        this._cache[key] = cached;
        this.persist(key, cached, true);
        return val;
    }
    setRestored(coll) {
        this._cache = {
            ...(coll ?? {}),
            ...(this._cache ?? {}),
        };
    }
    clear(key) {
        if (typeof key === 'string') {
            this._cache[key] = null;
        }
        else {
            this._cache = {};
        }
        this._transport?.clear();
        this._store?.clear(key);
    }
    async clearAsync(key) {
        if (typeof key === 'string') {
            this._cache[key] = null;
        }
        else {
            this._cache = {};
        }
        await this._transport?.clearAsync();
        this._store?.clearAsync(key);
    }
    destroy() {
        this.clear();
        this.options.monitors?.forEach(x => x.off('change', this.onChanged));
    }
    onChanged(key) {
        this.clear(key);
    }
    async flushAsync(force) {
        await this._transport?.flushAllAsync(force);
    }
    static async flushAllAsync() {
        await Promise.all(Cache.caches.map(cache => cache.flushAsync(true)));
    }
    static async resolve(cache, resolver, key = '') {
        let value = await cache.getAsync(key);
        if (value != null) {
            return value;
        }
        let promise = resolver();
        cache.set(key, promise);
        try {
            value = await promise;
        }
        catch (error) {
            cache.clear(key);
            throw error;
        }
        await cache.flushAsync();
        return value;
    }
}
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map
//# sourceMappingURL=Cache.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Cache === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Cache) && __isObj(module.exports)) {
        Object.assign(_src_Cache, module.exports);
    } else {
        _src_Cache = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fn_memoize != null ? _src_fn_memoize : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_clearMemoized = exports.fn_memoize = void 0;
const Cache_1 = _src_Cache;
function fn_memoize(fn, opts = {}, key) {
    let _cache = new Cache_1.Cache(opts);
    if (_cache.isAsync) {
        return fn_memoizeAsync(_cache, fn, opts, key);
    }
    let _perInstance = opts?.perInstance ?? false;
    let _clearOnReady = opts?.clearOnReady ?? false;
    let _clearOnReject = opts?.clearOnReject ?? false;
    let _clearOn = opts?.clearOn ?? null;
    let _caches = [];
    let _thisArg = opts?.thisArg;
    const Wrapper = function (...args) {
        let cache = _cache;
        if (_perInstance === true) {
            const prop = `__$mem_${key}`;
            cache = this[prop];
            if (cache == null) {
                cache = new Cache_1.Cache(opts);
                Object.defineProperty(this, prop, {
                    value: cache,
                    enumerable: false
                });
                _caches.push(cache);
            }
        }
        const thisArg = _thisArg ?? this;
        const id = (opts?.keyPfx?.(thisArg) ?? '') + (opts?.key?.({ this: thisArg }, ...args) ?? cache.resolveKey(args, opts?.keyOptions));
        const cached = cache.get(id);
        if (cached != null) {
            return cached;
        }
        let isPromise = null;
        let val = fn.apply(thisArg, args);
        if (_clearOnReject === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(null, err => {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOnReady === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(result => {
                    cache.clear(id);
                    return Promise.resolve(result);
                }, err => {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOn != null) {
            isPromise = isPromise ?? (val != null && typeof val === 'object' && typeof val.then === 'function');
            if (isPromise) {
                val = val.then(result => {
                    if (_clearOn(result)) {
                        cache.clear(id);
                    }
                    return result;
                });
            }
            else if (_clearOn(val)) {
                // don't even set to cache
                return val;
            }
        }
        return cache.set(id, val);
    };
    Wrapper.clearArgs = function (...args) {
        const id = _cache.resolveKey(args);
        _cache.clear(id);
        _caches.forEach(x => x.clear(id));
    };
    Wrapper.clearAll = function () {
        _cache.clear();
        _caches.forEach(x => x.clear());
    };
    return Wrapper;
}
exports.fn_memoize = fn_memoize;
;
function fn_memoizeAsync(_cache, fn, opts = {}, key) {
    let _perInstance = opts?.perInstance ?? false;
    let _clearOnReady = opts?.clearOnReady ?? false;
    let _clearOnReject = opts?.clearOnReject ?? false;
    let _clearOn = opts?.clearOn ?? null;
    let _caches = [];
    let _thisArg = opts?.thisArg;
    const Wrapper = async function (...args) {
        let cache = _cache;
        if (_perInstance === true) {
            let prop = `__$mem_${key}`;
            cache = this[prop];
            if (cache == null) {
                cache = new Cache_1.Cache(opts);
                Object.defineProperty(this, prop, {
                    value: cache,
                    enumerable: false
                });
                _caches.push(cache);
            }
        }
        const thisArg = _thisArg ?? this;
        const id = opts?.key?.({ this: thisArg }, ...args) ?? cache.resolveKey(args, opts?.keyOptions);
        const cached = await cache.getAsync(id, ...args);
        if (cached != null) {
            return cached;
        }
        let isPromise = null;
        let val = fn.apply(thisArg, args);
        if (_clearOnReject === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(null, err => {
                    cache.clearAsync(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOnReady === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(result => {
                    cache.clearAsync(id);
                    return Promise.resolve(result);
                }, err => {
                    cache.clearAsync(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOn != null) {
            isPromise = isPromise ?? (val != null && typeof val === 'object' && typeof val.then === 'function');
            if (isPromise) {
                val = val.then(result => {
                    if (_clearOn(result)) {
                        cache.clearAsync(id);
                    }
                    return result;
                });
            }
            else if (_clearOn(val)) {
                // don't even set to cache
                return val;
            }
        }
        return cache.setAsync(id, val);
    };
    Wrapper.clearArgs = function (...args) {
        const id = _cache.resolveKey(args);
        _cache.clearAsync(id);
        _caches.forEach(x => x.clearAsync(id));
    };
    Wrapper.clearAll = function () {
        _cache.clearAsync();
        _caches.forEach(x => x.clearAsync());
    };
    return Wrapper;
}
function fn_clearMemoized(fn, ...args) {
    if (args.length === 0) {
        fn?.clearAll?.();
        return;
    }
    fn?.clearArgs?.(...args);
    return;
}
exports.fn_clearMemoized = fn_clearMemoized;
//# sourceMappingURL=memoize.js.map
//# sourceMappingURL=memoize.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fn_memoize === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fn_memoize) && __isObj(module.exports)) {
        Object.assign(_src_fn_memoize, module.exports);
    } else {
        _src_fn_memoize = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_deco_memoize != null ? _src_deco_memoize : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_memoize = void 0;
const memoize_1 = _src_fn_memoize;
function deco_memoize(opts) {
    return function (target, propertyKey, descriptor) {
        const viaProperty = descriptor == null;
        const isGetter = !viaProperty && typeof descriptor.get === 'function';
        const innerFn = viaProperty
            ? target[propertyKey]
            : (isGetter ? descriptor.get : descriptor.value);
        const fn = (0, memoize_1.fn_memoize)(innerFn, opts, propertyKey);
        if (viaProperty) {
            target[propertyKey] = fn;
            return;
        }
        if (isGetter) {
            descriptor.get = fn;
        }
        else {
            descriptor.value = fn;
        }
        return descriptor;
    };
}
exports.deco_memoize = deco_memoize;
//# sourceMappingURL=memoize.js.map
//# sourceMappingURL=memoize.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_deco_memoize === module.exports) {
        // do nothing if
    } else if (__isObj(_src_deco_memoize) && __isObj(module.exports)) {
        Object.assign(_src_deco_memoize, module.exports);
    } else {
        _src_deco_memoize = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_debounce;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_deco_debounce != null ? _src_deco_debounce : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_debounce = void 0;
const requestFn = typeof requestAnimationFrame === 'undefined' ? setImmediate : requestAnimationFrame;
const clearRequest = typeof requestAnimationFrame === 'undefined' ? clearImmediate : cancelAnimationFrame;
/**
 *
 * @param timeoutMs ms to wait before calling inner fn
 */
function deco_debounce(timeoutMs) {
    return function (target, propertyKey, descriptor) {
        let viaProperty = descriptor == null;
        if (viaProperty) {
            descriptor = {
                configurable: true,
                value: target[propertyKey]
            };
        }
        let fn = descriptor.value;
        if (timeoutMs == null || timeoutMs === 0) {
            let frame = 0;
            descriptor.value = function (...args) {
                const self = this;
                if (frame !== 0) {
                    clearRequest(frame);
                }
                frame = requestFn(function () {
                    frame = 0;
                    fn.apply(self, args);
                });
            };
        }
        else {
            let timer = 0;
            descriptor.value = function (...args) {
                const self = this;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(self, args);
                }, timeoutMs);
            };
        }
        if (viaProperty) {
            target[propertyKey] = descriptor.value;
            return;
        }
        return descriptor;
    };
}
exports.deco_debounce = deco_debounce;
;
//# sourceMappingURL=debounce.js.map
//# sourceMappingURL=debounce.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_deco_debounce === module.exports) {
        // do nothing if
    } else if (__isObj(_src_deco_debounce) && __isObj(module.exports)) {
        Object.assign(_src_deco_debounce, module.exports);
    } else {
        _src_deco_debounce = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_model_Deferred;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_model_Deferred != null ? _src_model_Deferred : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
class Deferred {
    isResolved = false;
    isRejected = false;
    resolvedArg;
    rejectedArg;
    resolveFn;
    rejectFn;
    promise = new Promise((resolve, reject) => {
        this.resolveFn = resolve;
        this.rejectFn = reject;
        if (this.isResolved === true) {
            resolve(this.resolvedArg);
        }
        if (this.isRejected === true) {
            reject(this.rejectedArg);
        }
    });
    resolve(arg) {
        if (this.resolveFn) {
            this.resolveFn(arg);
            return;
        }
        this.isResolved = true;
        this.resolvedArg = arg;
    }
    reject(arg) {
        if (this.rejectFn) {
            this.rejectFn(arg);
            return;
        }
        this.isRejected = true;
        this.rejectedArg = arg;
    }
    then(fnA, fnB) {
        this.promise.then(fnA, fnB);
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=Deferred.js.map
//# sourceMappingURL=Deferred.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_model_Deferred === module.exports) {
        // do nothing if
    } else if (__isObj(_src_model_Deferred) && __isObj(module.exports)) {
        Object.assign(_src_model_Deferred, module.exports);
    } else {
        _src_model_Deferred = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_throttle;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_deco_throttle != null ? _src_deco_throttle : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_throttle = void 0;
const Args_1 = _src_fn_Args;
const Deferred_1 = _src_model_Deferred;
function deco_throttle(timeWindow, mix) {
    let options = typeof mix === 'boolean'
        ? { shouldCallLater: mix }
        : mix;
    let shouldCallLater = options?.shouldCallLater ?? false;
    let perArguments = options?.perArguments ?? false;
    let perArgumentInfos = perArguments ? Object.create(null) : null;
    return function (target, propertyKey, descriptor) {
        let viaProperty = descriptor == null;
        let fn = viaProperty ? target[propertyKey] : descriptor.value;
        let timer = 0;
        let latestArgs = null;
        let latestCall = 0;
        let promise = null;
        let resultFn = function (...args) {
            let _key = perArguments !== true ? null : Args_1.Args.getKey(args);
            let _meta = perArguments !== true ? null : (perArgumentInfos[_key] ?? (perArgumentInfos[_key] = {
                latestCall: 0,
                latestArgs: null,
                promise: null,
                timer: 0
            }));
            let _latestCall = perArguments ? _meta.latestCall : latestCall;
            let _timer = perArguments ? _meta.timer : timer;
            let self = this;
            let now = Date.now();
            let diff = now - _latestCall;
            if (diff >= timeWindow) {
                latestCall = now;
                if (perArguments) {
                    _meta.latestCall = now;
                }
                if (shouldCallLater !== true) {
                    return fn.apply(self, args);
                }
            }
            latestArgs = args;
            if (perArguments) {
                _meta.latestArgs = args;
            }
            let _promise = perArguments ? _meta.promise : promise;
            if (_timer === 0) {
                _promise = promise = new Deferred_1.Deferred();
                if (perArguments) {
                    _meta.promise = _promise;
                }
                _timer = setTimeout(function () {
                    latestCall = Date.now();
                    timer = 0;
                    if (perArguments) {
                        _meta.latestCall = latestCall;
                        _meta.timer = 0;
                    }
                    let args = perArguments ? _meta.latestArgs : latestArgs;
                    let r = fn.apply(self, args);
                    promise.resolve(r);
                }, diff >= timeWindow ? timeWindow : timeWindow - diff);
                timer = _timer;
                if (perArguments) {
                    _meta.timer = _timer;
                }
            }
            return _promise;
        };
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_throttle = deco_throttle;
//# sourceMappingURL=throttle.js.map
//# sourceMappingURL=throttle.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_deco_throttle === module.exports) {
        // do nothing if
    } else if (__isObj(_src_deco_throttle) && __isObj(module.exports)) {
        Object.assign(_src_deco_throttle, module.exports);
    } else {
        _src_deco_throttle = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fn_queued != null ? _src_fn_queued : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_queued = void 0;
const Deferred_1 = _src_model_Deferred;
/** For original async method - ensure it is called one after another  */
function fn_queued(fn, opts = {}) {
    let queue = [];
    let busy = false;
    let lastResultAt = 0;
    let throttle = opts?.throttle;
    let resultFn = function (...args) {
        if (opts != null && opts.single === true && queue.length > 0) {
            return queue[0].promise;
        }
        let wrapped = Queued.prepair(fn, this, args, opts);
        if (opts != null && opts.trimQueue && queue.length > 0) {
            queue.splice(0);
        }
        queue.push(wrapped);
        if (busy === false) {
            busy = true;
            tick();
        }
        return wrapped.promise;
    };
    let tick = function () {
        if (queue.length === 0) {
            busy = false;
            return;
        }
        if (throttle != null) {
            let ms = throttle - (Date.now() - lastResultAt);
            if (ms > 0) {
                setTimeout(tick, ms);
                return;
            }
        }
        let x = queue.shift();
        x.always(next);
        x.run();
    };
    let next = function () {
        lastResultAt = Date.now();
        tick();
    };
    return resultFn;
}
exports.fn_queued = fn_queued;
const Queued = {
    prepair(innerFn, ctx, args, opts) {
        let dfr = new Deferred_1.Deferred;
        let completed = false;
        let timeout = null;
        return {
            promise: dfr,
            run() {
                let result = innerFn.apply(ctx, args);
                if ('then' in result === false) {
                    dfr.resolve(result);
                }
                else {
                    if (opts?.timeout > 0) {
                        timeout = setTimeout(() => {
                            if (completed) {
                                return;
                            }
                            dfr.reject(new Error(`Queue Worker: the inner function ${innerFn.name} timeouted: ${opts.timeout}`));
                        }, opts.timeout);
                    }
                    result.then(_result => {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.resolve(_result);
                    }, _error => {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.reject(_error);
                    });
                }
                return result;
            },
            always(fn) {
                dfr.then(fn, fn);
            }
        };
    }
};
//# sourceMappingURL=queued.js.map
//# sourceMappingURL=queued.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fn_queued === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fn_queued) && __isObj(module.exports)) {
        Object.assign(_src_fn_queued, module.exports);
    } else {
        _src_fn_queued = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_deco_queued != null ? _src_deco_queued : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_queued = void 0;
const queued_1 = _src_fn_queued;
function deco_queued(opts = null) {
    return function (target, propertyKey, descriptor) {
        let viaProperty = descriptor == null;
        let fn = viaProperty ? target[propertyKey] : descriptor.value;
        let resultFn = (0, queued_1.fn_queued)(fn, opts);
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_queued = deco_queued;
//# sourceMappingURL=queued.js.map
//# sourceMappingURL=queued.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_deco_queued === module.exports) {
        // do nothing if
    } else if (__isObj(_src_deco_queued) && __isObj(module.exports)) {
        Object.assign(_src_deco_queued, module.exports);
    } else {
        _src_deco_queued = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_requireLib;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_requireLib != null ? _src_utils_requireLib : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLib = void 0;
var requireLib;
(function (requireLib) {
    async function load(name) {
        //#if (CJS)
        const r = require;
        return Promise.resolve(r(name));
        //#endif
    }
    requireLib.load = load;
})(requireLib = exports.requireLib || (exports.requireLib = {}));
//# sourceMappingURL=requireLib.js.map
//# sourceMappingURL=requireLib.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_requireLib === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_requireLib) && __isObj(module.exports)) {
        Object.assign(_src_utils_requireLib, module.exports);
    } else {
        _src_utils_requireLib = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistence_FsTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_persistence_FsTransport != null ? _src_persistence_FsTransport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsTransport = void 0;
const requireLib_1 = _src_utils_requireLib;
class FsTransport {
    opts;
    _file = null;
    isAsync = true;
    constructor(opts) {
        this.opts = opts;
    }
    async restoreAsync() {
        let file = await this.getFileSafeCtor();
        if (file == null) {
            return;
        }
        try {
            let json = await file.readAsync();
            return typeof json === 'string'
                ? JSON.parse(json)
                : json;
        }
        catch (error) {
            return {};
        }
    }
    async flushAsync(coll) {
        let file = await this.getFileSafeCtor();
        if (file == null) {
            return;
        }
        let json = JSON.stringify(coll);
        return await file.writeAsync(json);
    }
    async getFileSafeCtor() {
        let isBrowser = typeof process === 'undefined' || typeof process.exit !== 'function';
        if (isBrowser) {
            let useLocalStorage = this.opts?.browser?.localStorage;
            if (useLocalStorage) {
                this._file = new LocalStorageFile(this.opts.path);
            }
            return null;
        }
        const { path } = this.opts;
        if (path in CACHED_STORAGES) {
            this._file = CACHED_STORAGES[path];
        }
        else {
            /** lazy load require and preventing bundler's build */
            const module = await requireLib_1.requireLib.load('atma-io');
            const FileSafeCtor = module.FileSafe;
            this._file = new FileSafeCtor(this.opts.path, { threadSafe: true });
            CACHED_STORAGES[path] = this._file;
        }
        return this._file;
    }
}
exports.FsTransport = FsTransport;
class LocalStorageFile {
    path;
    key = `memd:fs:${this.path}`;
    constructor(path) {
        this.path = path;
    }
    async readAsync() {
        return localStorage.getItem(this.key);
    }
    async writeAsync(content) {
        localStorage.setItem(this.key, content);
    }
}
const CACHED_STORAGES = {};
//# sourceMappingURL=FsTransport.js.map
//# sourceMappingURL=FsTransport.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_persistence_FsTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_src_persistence_FsTransport) && __isObj(module.exports)) {
        Object.assign(_src_persistence_FsTransport, module.exports);
    } else {
        _src_persistence_FsTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistence_LocalStorageTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_persistence_LocalStorageTransport != null ? _src_persistence_LocalStorageTransport : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageTransport = void 0;
class LocalStorageTransport {
    opts;
    isAsync = false;
    constructor(opts) {
        this.opts = opts;
        if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
            throw new Error('Browser expected');
        }
    }
    restore() {
        try {
            return JSON.parse(localStorage.getItem(this.opts.key));
        }
        catch (error) {
        }
    }
    flush(coll) {
        try {
            localStorage.getItem(JSON.stringify(this.opts.key));
        }
        catch (error) {
        }
    }
}
exports.LocalStorageTransport = LocalStorageTransport;
//# sourceMappingURL=LocalStorageTransport.js.map
//# sourceMappingURL=LocalStorageTransport.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_persistence_LocalStorageTransport === module.exports) {
        // do nothing if
    } else if (__isObj(_src_persistence_LocalStorageTransport) && __isObj(module.exports)) {
        Object.assign(_src_persistence_LocalStorageTransport, module.exports);
    } else {
        _src_persistence_LocalStorageTransport = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_workers_CachedWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_workers_CachedWorker != null ? _src_workers_CachedWorker : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedWorker = void 0;
const FsTransport_1 = _src_persistence_FsTransport;
const LocalStorageTransport_1 = _src_persistence_LocalStorageTransport;
const Cache_1 = _src_Cache;
class CachedWorker {
    opts;
    cache;
    worker;
    workerDfr;
    constructor(opts) {
        this.opts = opts;
        const persistence = opts.persistence ?? /* typo fallback */ opts.persistance ?? this.getTransport();
        if (persistence) {
            persistence.debounceMs = 0;
        }
        this.cache = new Cache_1.Cache({
            persistence: persistence,
            maxAge: opts.maxAge,
            monitors: opts.monitors,
        });
        this.worker = opts.worker;
    }
    getTransport() {
        let t = this.opts.transport;
        if (t == null) {
            return null;
        }
        if ('path' in t) {
            return new FsTransport_1.FsTransport(t);
        }
        if ('key' in t) {
            return new LocalStorageTransport_1.LocalStorageTransport(t);
        }
        throw new Error('Invalid transport options');
    }
    run() {
        let result = this.cache.get('result');
        if (result != null) {
            return result;
        }
        result = this.worker();
        this.cache.set('result', result);
        return result;
    }
    async runAsync() {
        return this.workerDfr ?? (this.workerDfr = (async () => {
            let result = await this.cache.getAsync('result');
            if (result) {
                return result;
            }
            result = await this.opts.worker();
            await this.cache.setAsync('result', result);
            return result;
        })());
    }
    static run(opts) {
        return new CachedWorker(opts).run();
    }
    static runAsync(opts) {
        return new CachedWorker(opts).runAsync();
    }
}
exports.CachedWorker = CachedWorker;
//# sourceMappingURL=CachedWorker.js.map
//# sourceMappingURL=CachedWorker.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_workers_CachedWorker === module.exports) {
        // do nothing if
    } else if (__isObj(_src_workers_CachedWorker) && __isObj(module.exports)) {
        Object.assign(_src_workers_CachedWorker, module.exports);
    } else {
        _src_workers_CachedWorker = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
const memoize_1 = _src_deco_memoize;
const debounce_1 = _src_deco_debounce;
const throttle_1 = _src_deco_throttle;
const queued_1 = _src_deco_queued;
const memoize_2 = _src_fn_memoize;
const Cache_1 = _src_Cache;
const FsTransport_1 = _src_persistence_FsTransport;
const LocalStorageTransport_1 = _src_persistence_LocalStorageTransport;
const CachedWorker_1 = _src_workers_CachedWorker;
const queued_2 = _src_fn_queued;
class Memd {
    static Cache = Cache_1.Cache;
    static fn = {
        memoize: memoize_2.fn_memoize,
        queued: queued_2.fn_queued,
        clearMemoized: memoize_2.fn_clearMemoized
    };
    static deco = {
        memoize: memoize_1.deco_memoize,
        throttle: throttle_1.deco_throttle,
        debounce: debounce_1.deco_debounce,
        queued: queued_1.deco_queued
    };
    static FsTransport = FsTransport_1.FsTransport;
    static LocalStorageTransport = LocalStorageTransport_1.LocalStorageTransport;
    static CachedWorker = CachedWorker_1.CachedWorker;
    static default;
}
Memd.default = Memd;
module.exports = Memd;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map

}));

// end:source ./UMD.js
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_memd_lib_umd_memd === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_memd_lib_umd_memd) && __isObj(module.exports)) {
        Object.assign(_node_modules_memd_lib_umd_memd, module.exports);
    } else {
        _node_modules_memd_lib_umd_memd = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_EnvUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Config_EnvUtils != null ? _src_Config_EnvUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const memd_1 = _node_modules_memd_lib_umd_memd;
exports.default = {
    $getScripts: memd_1.default.fn.memoize(function (pageID) {
        let scripts = getResources('scripts', this.env).slice();
        if (pageID)
            scripts = scripts.concat(this.$getScriptsForPageOnly(pageID));
        return scripts;
    }),
    $getScriptsForPageOnly: memd_1.default.fn.memoize(function (pageID) {
        let page = this.pages[pageID], scripts = [];
        if (page == null) {
            return scripts;
        }
        if (page.scripts != null) {
            scripts = scripts.concat(getResources('page', this.env, page.scripts, page.routes));
        }
        if (page.env != null) {
            scripts = scripts.concat(getResources('scripts', this.env, page.env));
        }
        if (page.view && page.view.controller) {
            let path = this.$formatPath(this.page.location.viewController, page.view.controller);
            scripts.push(path);
        }
        return scripts;
    }),
    $getStyles: function (pageID) {
        let cfg = this, styles = getResources('styles', cfg.env).slice();
        if (pageID)
            styles = styles.concat(this.$getStylesForPageOnly(pageID));
        return styles;
    },
    $getStylesForPageOnly: function (pageID) {
        let cfg = this, page = cfg.pages[pageID], styles = [];
        if (page == null) {
            return styles;
        }
        if (page.styles) {
            styles = styles.concat(getResources('page', cfg.env, page.styles, page.routes));
        }
        if (page.env) {
            styles = styles.concat(getResources('styles', cfg.env, page.env));
        }
        if (page.compo) {
            let path = this.$getCompo(page), resource = dependency_1.include.getResource(path);
            if (resource != null) {
                resource.includes.forEach(function (x) {
                    if (x.resource.type === 'css')
                        styles.push(x.resource.url);
                });
            }
            else {
                dependency_1.logger
                    .error('<page:styles> compo resource is undefined', path);
            }
        }
        if (page.view && page.view.style) {
            let path = this.$formatPath(this.page.location.viewStyle, page.view.style);
            styles.push(path);
        }
        return styles;
    },
    $getInclude: function () {
        let env = this.env, include = {
            src: '',
            routes: {},
            cfg: {}
        };
        incl_extend(include, env.both.include);
        incl_extend(include, env.client.include);
        if (!include.src) {
            include.src = '/node_modules/includejs/lib/include.js';
        }
        incl_extend(include, {
            routes: env.both.routes
        });
        incl_extend(include, {
            routes: env.client.routes
        });
        return include;
    },
    $getIncludeForPageOnly: function (pageID) {
        let page = this.pages[pageID], include = {};
        return page && page.include ? incl_extend(include, page.include) : include;
    },
    $getTemplate: function (pageData) {
        let template = pageData.template ?? this.page.index?.template;
        if (template == null) {
            return null;
        }
        let location = this.page.location.template;
        let path = this.$formatPath(location, template);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getMaster: function (pageData) {
        let master = pageData.master || this.page.index.master, location = this.page.location.master, path = this.$formatPath(location, master);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getController: function (pageData) {
        let controller = pageData.controller || this.page.index.controller;
        if (controller == null)
            return null;
        let location = this.page.location.controller, path = this.$formatPath(location, controller);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getCompo: function (pageData) {
        let compo = pageData.compo;
        if (compo == null)
            return null;
        let location = this.page.location.compo || this.page.location.controller, path = this.$formatPath(location, compo);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getImports: function (targetEnv) {
        let both = this.env.both.imports, target = this.env[targetEnv].imports;
        let types = {
            'mask': ' mask ',
            'script': ' js es6 jsx ts',
            'style': ' css less sass scss '
        };
        function getType(path) {
            let ext = /\w+$/.exec(path);
            if (ext == null) {
                dependency_1.logger.error('Not parsable extension', path);
                return 'unknown';
            }
            for (let type in types) {
                if (types[type].indexOf(ext) > -1) {
                    return type;
                }
            }
            dependency_1.logger.error('Unknown extension', path);
            return 'uknown';
        }
        return _flatternResources(both).concat(_flatternResources(target))
            .map(function (path) {
            return {
                path: path,
                type: getType(path)
            };
        });
    }
};
const getResources = memd_1.default.fn.memoize(function (type, env, pckg, routes) {
    let Routes = new dependency_1.includeLib.Routes();
    let array = [];
    function register(obj) {
        if (obj == null)
            return;
        for (let key in obj) {
            Routes.register(key, obj[key]);
        }
    }
    function resolve(pckg) {
        if (pckg == null)
            return;
        Routes.each('js', pckg, function (namespace, route) {
            array.push(route.path);
        });
    }
    register(env.client && env.client.routes);
    register(env.both && env.both.routes);
    register(routes);
    switch (type) {
        case 'page':
            resolve(pckg);
            break;
        case 'debug':
            resolve(env.client.debug);
            break;
        case 'scripts':
        case 'styles':
            let obj = pckg || env;
            resolve(obj.client && obj.client[type]);
            resolve(obj.both && obj.both[type]);
            break;
        default:
            dependency_1.logger.error('Unsupported type', type);
            break;
    }
    return array;
});
function incl_extend(include, source) {
    if (source == null)
        return include;
    if (typeof source === 'string') {
        include.src = source;
        return include;
    }
    if (source.src)
        include.src = source.src;
    if (source.cfg) {
        include.cfg = obj_extend(include.cfg, source.cfg, 'loader');
        if (source.cfg.loader)
            include.cfg.loader = obj_extend(include.cfg.loader, source.cfg.loader);
    }
    if (source.routes)
        obj_extend(include.routes, source.routes);
    return include;
}
function obj_extend(target, source, dismissKey = null) {
    if (source == null)
        return target;
    if (target == null)
        target = {};
    for (let key in source) {
        if (key === dismissKey)
            continue;
        target[key] = source[key];
    }
    return target;
}
let _flatternResources;
(function () {
    _flatternResources = function (mix, base) {
        if (mix == null) {
            return [];
        }
        if (typeof mix === 'string') {
            return _combinePath(base, mix);
        }
        if (dependency_1.mask.is.Array(mix)) {
            return _fromArray(mix, base);
        }
        if (dependency_1.mask.is.Object(mix)) {
            return _fromObj(mix, base);
        }
    };
    function _fromObj(json, base) {
        let arr = [];
        for (let key in json) {
            arr = arr.concat(_flatternResources(json[key], _combinePath(base, key)));
        }
        return arr;
    }
    function _fromArray(arr, base) {
        let out = [], imax = arr.length, i = -1;
        while (++i < imax) {
            out = out.concat(_flatternResources(arr[i], base));
        }
        return out;
    }
    function _combinePath(a, b) {
        if (a == null || b == null) {
            return a || b;
        }
        return dependency_1.Uri.combine(a, b);
    }
}());
//# sourceMappingURL=EnvUtils.js.map
//# sourceMappingURL=EnvUtils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Config_EnvUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Config_EnvUtils) && __isObj(module.exports)) {
        Object.assign(_src_Config_EnvUtils, module.exports);
    } else {
        _src_Config_EnvUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_IncludeUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Config_IncludeUtils != null ? _src_Config_IncludeUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = _src_HttpApplication_Application;
exports.default = {
    prepair: function (pckg) {
        incl_prepair(pckg);
    }
};
function incl_prepair(mix) {
    if (mix == null)
        return;
    if (Array.isArray(mix)) {
        var array = mix, imax = mix.length, i = 0, x;
        for (; i < imax; i++) {
            x = array[i];
            if (x == null || typeof x === 'string')
                continue;
            var cond = cond_getCondition(x);
            if (cond == null) {
                incl_prepair(x);
                continue;
            }
            if (cond_match(cond)) {
                var diff = mod_arrayAdd(array, i, cond.value);
                imax += diff;
                i += diff;
                continue;
            }
            array.splice(i, 1);
            i--;
            imax--;
        }
        return;
    }
    if (typeof mix === 'object') {
        for (var key in mix) {
            incl_prepair(mix[key]);
        }
    }
}
function mod_arrayAdd(array, at, value) {
    if (Array.isArray(value)) {
        Array.prototype.splice.apply(array, [at, 1].concat(value));
        return value.length;
    }
    array.splice(at, 1, value);
    return 1;
}
function cond_getCondition(object) {
    for (var key in object) {
        if (key.substring(0, 3) !== 'if#')
            return null;
        return {
            key: key.substring(3),
            value: object[key]
        };
    }
    return null;
}
function cond_match(cond) {
    return Application_1.default.current.args[cond.key];
}
//# sourceMappingURL=IncludeUtils.js.map
//# sourceMappingURL=IncludeUtils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Config_IncludeUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Config_IncludeUtils) && __isObj(module.exports)) {
        Object.assign(_src_Config_IncludeUtils, module.exports);
    } else {
        _src_Config_IncludeUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_PathUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Config_PathUtils != null ? _src_Config_PathUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    /**
     *	Format Path / location as in IncludeJS
     */
    format(location, path) {
        if (path.charCodeAt(0) === 47) {
            // /
            if (/\.\w{1,7}$/.test(path) === false) {
                path += '.mask';
            }
            return path;
        }
        var template = path.split('/'), route = location.split(/[\{\}]/g);
        path = route[0];
        for (let i = 1; i < route.length; i++) {
            if (i % 2 === 0) {
                path += route[i];
            }
            else {
                /** if template provides less "breadcrumbs" than needed -
                 * take always the last one for failed peaces */
                var index = parseFloat(route[i]);
                if (index > template.length - 1) {
                    index = template.length - 1;
                }
                path += template[index];
                if (i === route.length - 2) {
                    for (index++; index < template.length; index++) {
                        path += '/' + template[index];
                    }
                }
            }
        }
        return path;
    }
};
//# sourceMappingURL=PathUtils.js.map
//# sourceMappingURL=PathUtils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Config_PathUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Config_PathUtils) && __isObj(module.exports)) {
        Object.assign(_src_Config_PathUtils, module.exports);
    } else {
        _src_Config_PathUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_ConfigUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Config_ConfigUtils != null ? _src_Config_ConfigUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurate_BowerAndCommonJS = exports.configurate_Plugins = exports.configurate_PageFiles = exports.configurate_Pages = exports.configurate_Mask = exports.configurate_Include = exports.cfg_prepair = void 0;
const dependency_1 = _src_dependency;
const path_1 = _src_util_path;
const IncludeUtils_1 = _src_Config_IncludeUtils;
const PathUtils_1 = _src_Config_PathUtils;
const atma_utils_1 = require("atma-utils");
exports.default = {
    $formatPath: PathUtils_1.default.format
};
function cfg_prepair(base, configs, defaults) {
    if (configs == null && configs !== void 0)
        return null;
    if (configs === void 0)
        return [prepair(defaults)];
    if (typeof configs === 'string')
        return [prepair(configs)];
    return configs.map(prepair);
    // private
    function prepair(config) {
        if (typeof config !== 'string') {
            return {
                config: config
            };
        }
        var path = (0, path_1.path_hasProtocol)(config)
            ? config
            : dependency_1.Uri.combine(base, config);
        return { path: path };
    }
}
exports.cfg_prepair = cfg_prepair;
;
const configurate_Include = async function (cfg) {
    var resource = dependency_1.include.instance(cfg.base);
    cfg.env.both.routes
        && resource.routes(cfg.env.both.routes);
    cfg.env.both.include
        && resource.cfg(cfg.env.both.include.cfg);
    cfg.env.server.include
        && resource.cfg(cfg.env.server.include.cfg);
    cfg.env.server.routes
        && resource.routes(cfg.env.server.routes);
    IncludeUtils_1.default.prepair(cfg.env.server.scripts);
    IncludeUtils_1.default.prepair(cfg.env.client.scripts);
};
exports.configurate_Include = configurate_Include;
const configurate_Mask = function (cfg) {
    var maskCfg = cfg.mask;
    if (maskCfg == null)
        return;
    dependency_1.mask.compoDefinitions(maskCfg.compos, maskCfg.utils, maskCfg.attributes);
};
exports.configurate_Mask = configurate_Mask;
const configurate_Pages = function (cfg, app) {
    var pages = cfg.pages;
    if (pages == null)
        return;
    var page, key;
    for (key in pages) {
        page = pages[key];
        /* TODO should we store both versions in pages hash: by key and id? */
        if (page.id == null) {
            page.id = key;
        }
        else {
            pages[page.id] = page;
        }
        if (page.route == null) {
            page.route = key;
        }
        //if (pages[page.id] && pages[page.id] !== page)
        //	logger.error('<page:register> overwrite existed ID',
        //		key.bold,
        //		pages[page.id] === page);
        //
        //pages[page.id] = page;
        //
        //delete pages[key];
    }
};
exports.configurate_Pages = configurate_Pages;
const configurate_PageFiles = function (cfg, app) {
    var folder = cfg.page.location.pageFiles;
    var base = cfg.$get('base');
    var pageFilesFolder = dependency_1.Uri.combine(base, folder);
    if (dependency_1.io.Directory.exists(pageFilesFolder) === false) {
        return;
    }
    return dependency_1.io
        .Directory
        .readFilesAsync(pageFilesFolder, '**.html.mask')
        .then(function (files) {
        files.forEach(file => {
            var rel = file.uri.toRelativeString(pageFilesFolder);
            var i = /\.|\//g.exec(rel).index;
            var name = rel.substring(0, i);
            i = rel.lastIndexOf('/');
            var path = rel.substring(0, i);
            let ruleIndex = {
                rule: `^/${name}/?($|\\?.+) ${dependency_1.Uri.combine(folder, path)}/index.html.mask$1`
            };
            let ruleAssets = {
                rule: `^/${name}/(.+) ${dependency_1.Uri.combine(folder, path)}/$1`
            };
            if (cfg.rewriteRules == null) {
                cfg.rewriteRules = [];
            }
            cfg.rewriteRules.push(ruleIndex, ruleAssets);
        });
    });
};
exports.configurate_PageFiles = configurate_PageFiles;
const configurate_Plugins = function (cfg, app) {
    if (cfg.plugins == null) {
        return null;
    }
    if (app.isRoot === false) {
        return null;
    }
    const dfr = new atma_utils_1.class_Dfr;
    const sources = cfg.plugins.map(function (name) {
        var base = new dependency_1.Uri(cfg.base), path = name[0] === '.' || name[0] === '/'
            ? name
            : 'node_modules/' + name + '/index.js', x;
        while (true) {
            x = base.combine(path);
            if (dependency_1.io.File.exists(x)) {
                path = x.toString();
                break;
            }
            base = base.combine('../');
            if (base.path === '' || base.path === '/')
                break;
        }
        return path + '::' + name;
    });
    dependency_1.include
        .instance(cfg.base)
        .js(sources)
        .done(function (resp) {
        for (var key in resp) {
            if (resp[key] && typeof resp[key].attach === 'function')
                resp[key].attach(app);
        }
        dfr.resolve();
    });
    return dfr;
};
exports.configurate_Plugins = configurate_Plugins;
/* Resolve CommonJS, Bower resource paths */
let configurate_BowerAndCommonJS;
exports.configurate_BowerAndCommonJS = configurate_BowerAndCommonJS;
(function () {
    exports.configurate_BowerAndCommonJS = configurate_BowerAndCommonJS = function (cfg, app) {
        return Promise.all([
            handleAllEnvironments(cfg, 'npm'),
            handleAllEnvironments(cfg, 'bower')
        ]);
    };
    var _types = {
        'bower': {
            'dir': 'bower_components',
            'package': 'bower.json',
            'alternate': 'component.json'
        },
        'npm': {
            'dir': 'node_modules',
            'package': 'package.json',
            'alternate': null
        }
    };
    var _resourceTypeExtensions = {
        'scripts': 'js',
        'styles': 'css'
    };
    var _extensionTypes = {
        'js': 'scripts',
        'css': 'styles'
    };
    function handleAllEnvironments(config, packageSystem) {
        return Promise.all([
            handleEnvironments(config, packageSystem, 'scripts'),
            handleEnvironments(config, packageSystem, 'styles')
        ]);
    }
    function handleEnvironments(config, packageSystem, resourceType) {
        return Promise.all([
            handleEnvironment(config, packageSystem, resourceType, 'client'),
            handleEnvironment(config, packageSystem, resourceType, 'server'),
            handleEnvironment(config, packageSystem, resourceType, 'both')
        ]);
    }
    function handleEnvironment(config, packageSystem, resourceType, envType) {
        var env = config.env[envType], resources = env[resourceType], paths = resources && resources[packageSystem];
        if (paths == null)
            return null;
        var dfr = new atma_utils_1.class_Dfr;
        resolvePaths(config, resourceType, packageSystem, paths, function (mappings) {
            var arr = resources[packageSystem], imax = arr.length, i = -1, j = -1, x;
            while (++i < imax) {
                x = mappings[arr[i]];
                if ((0, dependency_1.is_String)(x)) {
                    arr[i] = x;
                    continue;
                }
                if ((0, dependency_1.is_Array)(x)) {
                    arr.splice.apply(arr, [i, 1].concat(x));
                    i += x.length - 1;
                    imax += x.length - 1;
                    continue;
                }
                dependency_1.logger.error('Module path mapping is not defined', arr[i]);
            }
            dfr.resolve();
        });
        return dfr;
    }
    async function resolvePaths(config, resourceType, packageSystem, arr, cb) {
        var base = new dependency_1.Uri(config.base), paths = [], mappings = {};
        var data = _types[packageSystem];
        if (data == null)
            throw Error('Support:' + Object.keys(_types) + ' Got:' + packageSystem);
        var dirName = data.dir, packageName = data.package;
        let promises = arr.map(async function (name) {
            if (name == null) {
                // could be when conditional configuration item is falsy
                return;
            }
            var map = name;
            var aliasIndex = name.indexOf('::'), alias = '';
            if (aliasIndex !== -1) {
                alias = name.substring(aliasIndex);
                name = name.substring(0, aliasIndex);
            }
            if (name.indexOf('/') !== -1) {
                if (/\.\w+$/.test(name) === false)
                    name += '.' + _resourceTypeExtensions[resourceType];
                mappings[map] = '/'
                    + dirName
                    + '/'
                    + name
                    + alias;
                return;
            }
            let pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + packageName);
            if (pckgPath == null) {
                if (data.alternate) {
                    pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + data.alternate);
                }
                if (pckgPath == null) {
                    dependency_1.logger.error('<Module is not resolved>', name);
                    return;
                }
            }
            try {
                let pckg = await dependency_1.io.File.readAsync(pckgPath);
                var pckgbase = '/' + dirName + '/' + name + '/', main = pckg?.main;
                if (main == null) {
                    main = 'index.js';
                }
                if ((0, dependency_1.is_String)(main)) {
                    mapPath(mappings, map, main, pckgbase, alias);
                    return;
                }
                if ((0, dependency_1.is_Array)(main)) {
                    mapPathMany(mappings, map, main, pckgbase, alias, resourceType);
                    return;
                }
                dependency_1.logger.error('Main is not defined', pckgPath);
            }
            catch (error) {
                dependency_1.logger.error(`Scripts via configuration. Path error: ${error.message}`);
            }
        });
        await Promise.all(promises).then(() => {
            cb(mappings);
        }, error => {
            dependency_1.logger.error(`Scripts via configuration. Path error: ${error.message}`);
        });
    }
    function mapPathMany(mappings, str, mainArr, base, alias, resourceType) {
        var imax = mainArr.length, i = -1, ext, arr = [];
        while (++i < imax) {
            ext = _file_getExt(mainArr[i]);
            if (_extensionTypes[ext] === resourceType)
                arr.push(base + mainArr[i] + alias);
        }
        mappings[str] = arr;
    }
    function mapPath(mappings, str, main, base, alias) {
        mappings[str] = base + main + alias;
    }
    function resolveModulePath(base, path) {
        var x;
        while (true) {
            x = base.combine(path);
            if (dependency_1.io.File.exists(x)) {
                path = x.toString();
                break;
            }
            base = base.combine('../');
            if (base.path === '' || base.path === '/')
                return null;
        }
        return path;
    }
    function _file_getExt(path) {
        var i = path.lastIndexOf('.');
        return i === -1
            ? ''
            : path.substring(i + 1);
    }
}());
//# sourceMappingURL=ConfigUtils.js.map
//# sourceMappingURL=ConfigUtils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Config_ConfigUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Config_ConfigUtils) && __isObj(module.exports)) {
        Object.assign(_src_Config_ConfigUtils, module.exports);
    } else {
        _src_Config_ConfigUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_ConfigDefaults;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Config_ConfigDefaults != null ? _src_Config_ConfigDefaults : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigDefaults = void 0;
exports.ConfigDefaults = {
    env: {
        both: {
            include: {
                cfg: {}
            },
            routes: null,
            scripts: null
        },
        client: {
            include: {
                src: '/node_modules/includejs/lib/include.js'
            },
            mask: {
                cfg: null,
                src: null
            },
            scripts: null,
            styles: null,
            routes: null,
        },
        server: {
            routes: null,
            scripts: null
        }
    },
    handler: {
        location: '/server/http/handler/{0}.js'
    },
    handlers: {
        '(\\.mr$|\\.mr\\?.+)': '/{self}.MaskRunner',
        '(\\.html\\.mask$|\\.html\\.mask\\?.+)': '/{self}.MaskHtml'
    },
    mask: {
        compos: {
            ':scripts': {
                mode: 'server:all'
            },
            ':styles': {
                mode: 'server:all'
            },
            ':template': {
                mode: 'server'
            },
            'layout:master': {
                mode: 'server'
            },
            'layout:view': {
                mode: 'server'
            },
            ':animation': {
                mode: 'client'
            },
        },
        attributes: null
    },
    service: {
        location: '/server/http/service/{0}.js',
        endpoints: null
    },
    services: {
    //routePattern: path
    },
    page: {
        location: {
            controller: '/server/http/page/{0}/{1}.js',
            template: '/server/http/page/{0}/{1}.mask',
            master: '/server/http/master/{0}.mask',
            viewTemplate: '/public/view/{0}/{1}.mask',
            viewController: '/public/view/{0}/{1}.js',
            viewStyle: '/public/view/{0}/{1}.less',
            pageFiles: '/public/pages/',
        },
        extension: {
            javascript: 'js',
            style: 'less',
            template: 'mask'
        },
        index: {
            template: 'index',
            master: 'default'
        },
        urls: {
            login: '/login'
        },
        pattern: '/:view/:category/:section'
    },
    pages: {},
    server: {
        ssl: {
            forced: false,
            enabled: false,
            port: 443,
            keyFile: null,
            certFile: null,
            caFile: null,
        }
    },
    view: {
        location: {
            template: '/public/view/{0}/{1}.mask',
            controller: '/public/view/{0}/{1}.js',
            style: '/public/view/{0}/{1}.less',
        }
    },
    websocket: {
        location: '/server/http/websocket/{0}.js'
    },
    websockets: {}
};
//# sourceMappingURL=ConfigDefaults.js.map
//# sourceMappingURL=ConfigDefaults.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Config_ConfigDefaults === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Config_ConfigDefaults) && __isObj(module.exports)) {
        Object.assign(_src_Config_ConfigDefaults, module.exports);
    } else {
        _src_Config_ConfigDefaults = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_Config;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Config_Config != null ? _src_Config_Config : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const path_1 = _src_util_path;
const EnvUtils_1 = _src_Config_EnvUtils;
const ConfigUtils_1 = _src_Config_ConfigUtils;
const ConfigDefaults_1 = _src_Config_ConfigDefaults;
const PATH = 'server/config/**.yml';
const BUILD_PATH = 'public/build/stats.json';
function Config(params, app) {
    params = params || {};
    let path_base = params.base;
    let configPaths = params.configs;
    let disablePackageJson = params.disablePackageJson === true;
    let path_Build;
    let appConfig;
    path_base = path_base == null
        ? 'file://' + (0, path_1.path_normalize)(process.cwd()) + '/'
        : (0, path_1.path_resolveSystemUrl)(path_base + '/');
    let configs = (0, ConfigUtils_1.cfg_prepair)(path_base, configPaths, PATH);
    if (configs) {
        // if `configs` null, do not load also build values
        path_Build = path_base + (params.buildDirectory || BUILD_PATH);
    }
    if (params.config) {
        appConfig = { config: params.config };
    }
    let $sources = [
        {
            config: ConfigDefaults_1.ConfigDefaults
        },
        path_Build
            ? {
                path: path_Build,
                optional: true
            }
            : null,
        {
            config: ConfigUtils_1.default
        },
        disablePackageJson
            ? null
            : {
                path: path_base + 'package.json',
                getterProperty: 'atma',
                optional: true
            },
        {
            config: EnvUtils_1.default
        },
        appConfig
    ];
    if (configs) {
        $sources = $sources.concat(configs);
    }
    if (Array.isArray(params.sources))
        $sources = $sources.concat(params.sources);
    // do not allow to override `base` option in configuration.
    $sources.push({
        config: {
            base: path_base
        }
    });
    return dependency_1.AppConfig
        .fetch($sources)
        .then(function (cfg) {
        if (app != null) {
            // Setting current app to global, sothat plugins can read their configurations (if any)
            if (global.app == null) {
                global.app = app;
            }
            app.config = cfg;
        }
        return Promise.all([
            (0, ConfigUtils_1.configurate_Mask)(cfg),
            (0, ConfigUtils_1.configurate_Include)(cfg),
            (0, ConfigUtils_1.configurate_PageFiles)(cfg, app),
            (0, ConfigUtils_1.configurate_Pages)(cfg, app),
            (0, ConfigUtils_1.configurate_Plugins)(cfg, app),
            (0, ConfigUtils_1.configurate_BowerAndCommonJS)(cfg, app)
        ])
            .then(() => Promise.resolve(cfg));
    }, function (error) {
        error.message = '<app:configuration> ' + error.message;
        throw error;
    });
}
exports.default = Config;
;
//# sourceMappingURL=Config.js.map
//# sourceMappingURL=Config.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Config_Config === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Config_Config) && __isObj(module.exports)) {
        Object.assign(_src_Config_Config, module.exports);
    } else {
        _src_Config_Config = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Business_Middleware;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Business_Middleware != null ? _src_Business_Middleware : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
class MiddlewareRunner {
    constructor(arr) {
        this.arr = arr;
        this.arr = arr;
    }
    process(req, res, callback, config) {
        next(this, req, res, callback, config, 0);
    }
    add(mix) {
        if (mix == null) {
            return this;
        }
        if (typeof mix === 'function') {
            this.arr.push(mix);
            return this;
        }
        if (Array.isArray(mix)) {
            mix.forEach(midd => this.add(midd));
            return this;
        }
        throw new Error(`Middleware must be a function.`);
    }
    static create(arr) {
        if (arr == null) {
            return null;
        }
        return new MiddlewareRunner(arr);
    }
}
exports.default = MiddlewareRunner;
;
// private
function next(runner, req, res, callback, config, index) {
    if (index >= runner.arr.length)
        return callback(null, req, res);
    var middleware = runner.arr[index];
    if (middleware == null) {
        return next(runner, req, res, callback, config, ++index);
    }
    middleware(req, res, nextDelegate(runner, req, res, callback, config, index), config);
}
function nextDelegate(runner, req, res, callback, config, index) {
    return function (error, result) {
        if (error) {
            dependency_1.logger
                .debug('<app:middleware:nextDelegate>'.red, error);
            callback(error, req, res);
            return;
        }
        if (result?.done) {
            callback(null, req, res);
            return;
        }
        next(runner, req, res, callback, config, ++index);
    };
}
//# sourceMappingURL=Middleware.js.map
//# sourceMappingURL=Middleware.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Business_Middleware === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Business_Middleware) && __isObj(module.exports)) {
        Object.assign(_src_Business_Middleware, module.exports);
    } else {
        _src_Business_Middleware = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Autoreload_WatcherHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Autoreload_WatcherHandler != null ? _src_Autoreload_WatcherHandler : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatcherHandler = void 0;
const path_1 = _src_util_path;
const dependency_1 = _src_dependency;
const atma_utils_1 = require("atma-utils");
class WatcherHandler extends atma_utils_1.class_EventEmitter {
    static get Instance() {
        return _instance ?? (_instance = new WatcherHandler);
    }
    constructor() {
        super();
        this.fileChanged = this.fileChanged.bind(this);
    }
    watch(file) {
        let path = file.uri.toString();
        if (_watchers[path] != null) {
            return;
        }
        let watcher = new FileWatcher(file);
        watcher.bind(this.fileChanged);
        _watchers[path] = watcher;
    }
    unwatch(file, callback) {
        let path = file.uri.toString();
        if (_watchers[path] == null) {
            dependency_1.logger.log('<watcher> No watchers', path);
            return;
        }
        _watchers[path].unbind(callback);
        delete _watchers[path];
    }
    isWatching(file) {
        let path = file.uri.toString();
        return _watchers[path] != null;
    }
    fileChanged(absPath, sender, requestedUrl, base) {
        if (dependency_1.mask.Module.clearCache) {
            dependency_1.mask.Module.clearCache();
        }
        if (sender === 'filewatcher') {
            let rel = requestedUrl ?? ('/' + absPath.replace(rootFolder, ''));
            if (dependency_1.include.getResource(rel) == null) {
                this.trigger('fileChange', rel, absPath);
            }
            return;
        }
        if (this.isWatching(new dependency_1.io.File(absPath))) {
            return;
        }
        if (base) {
            base = new dependency_1.Uri(base).toLocalFile();
            absPath = absPath.replace(base, '');
        }
        this.trigger('fileChange', absPath);
        /**
        *  include.autoreload feature also listens for file changes
        *  and if the file is in includejs cache, then this function
        *  will be called by includejs immediately. This happens
        *  while Application enables autoreload via
        *   include.cfg('autoreload', {
        *      fileChanged: function(path) {
        *          Autoreload.fileChanged(path)
        *      }
        *   });
        */
    }
    bind(callback) {
        return this
            .on('fileChange', callback);
    }
    unbind(callback) {
        return this
            .off('fileChange', callback);
    }
}
exports.WatcherHandler = WatcherHandler;
const rootFolder = (0, path_1.path_normalize)(process.cwd() + '/');
class FileWatcher extends atma_utils_1.class_EventEmitter {
    constructor(file) {
        super();
        this.file = file;
        this.active = false;
        this.fileChanged = this.fileChanged.bind(this);
    }
    fileChanged(path) {
        dependency_1.logger.log('<watcher:changed>', path);
        this.trigger('fileChange', path, 'filewatcher', this.file.requestedUrl);
    }
    bind(callback) {
        this.on('fileChange', callback);
        if (this.active)
            return;
        dependency_1.io
            .watcher
            .watch(this.file.uri.toLocalFile(), {}, this.fileChanged);
        this.active = true;
    }
    unbind(callback) {
        this.off('fileChange', callback);
        if (this._listeners.length === 0) {
            dependency_1.io
                .watcher
                .unwatch(this.file.uri.toLocalFile());
        }
    }
}
let _watchers = {};
let _instance = null;
exports.default = new WatcherHandler;
//# sourceMappingURL=WatcherHandler.js.map
//# sourceMappingURL=WatcherHandler.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Autoreload_WatcherHandler === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Autoreload_WatcherHandler) && __isObj(module.exports)) {
        Object.assign(_src_Autoreload_WatcherHandler, module.exports);
    } else {
        _src_Autoreload_WatcherHandler = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Autoreload_ConnectionSocket;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Autoreload_ConnectionSocket != null ? _src_Autoreload_ConnectionSocket : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const WatcherHandler_1 = _src_Autoreload_WatcherHandler;
class ConnectionSocket {
    constructor(socket) {
        this.socket = socket;
        dependency_1.logger.log('<autoreload> Socket connected');
        this.disconnected = this.disconnected.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
        socket.on('disconnect', this.disconnected);
        WatcherHandler_1.default.on('fileChange', this.fileChanged);
    }
    fileChanged(path) {
        var socket = this.socket;
        setTimeout(function () {
            dependency_1.logger.log('<autoreload sockets> path', path);
            socket.emit('filechange', path);
        }, 50);
    }
    disconnected() {
        WatcherHandler_1.default.off('fileChange', this.fileChanged);
    }
}
exports.default = ConnectionSocket;
//# sourceMappingURL=ConnectionSocket.js.map
//# sourceMappingURL=ConnectionSocket.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Autoreload_ConnectionSocket === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Autoreload_ConnectionSocket) && __isObj(module.exports)) {
        Object.assign(_src_Autoreload_ConnectionSocket, module.exports);
    } else {
        _src_Autoreload_ConnectionSocket = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Autoreload_Autoreload;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Autoreload_Autoreload != null ? _src_Autoreload_Autoreload : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autoreload = void 0;
const dependency_1 = _src_dependency;
const WatcherHandler_1 = _src_Autoreload_WatcherHandler;
const ConnectionSocket_1 = _src_Autoreload_ConnectionSocket;
class AutoreloadInner {
    constructor() {
        this.prepared = false;
        this.enabled = false;
        this.watcher = WatcherHandler_1.default;
    }
    prepare(app, debug) {
        if (app.config.debug || debug === true) {
            let configs = new dependency_1.io.Directory('server/config/');
            if (configs.exists()) {
                configs.watch(reloadConfigDelegate(app));
            }
            dependency_1.include.cfg('autoreload', this);
            dependency_1.mask.cfg('allowCache', false);
            this.watcher.on('fileChange', (path) => {
                app.emit('fileChange', path);
            });
            this.prepared = true;
        }
    }
    enable(app) {
        if (this.enabled) {
            return;
        }
        if (this.prepared !== true) {
            this.prepare(app, true);
        }
        this.app = app;
        this.enabled = true;
        app
            .webSockets
            .registerHandler('/browser', ConnectionSocket_1.default);
        this.base = app.config.base;
        return this;
    }
    watch(requestedUrl, config) {
        if (/\.[\w]+$/.test(requestedUrl) === false) {
            // no extension
            return;
        }
        let q = requestedUrl.indexOf('?');
        if (q !== -1)
            requestedUrl = requestedUrl.substring(0, q);
        let root = config.static || config.base || '/', path = dependency_1.Uri.combine(root, requestedUrl), file = new dependency_1.io.File(path);
        file.requestedUrl = requestedUrl;
        this.watchFile(file);
    }
    watchFile(file) {
        if (!file.uri?.file) {
            // virtual file?
            return;
        }
        if (/\.map$/.test(file.uri.file)) {
            return;
        }
        if (this.watcher.isWatching(file)) {
            return;
        }
        if (dependency_1.io.File.prototype.exists.call(file) === false) {
            return;
        }
        this.watcher.watch(file);
    }
    unwatch(path) {
        this.watcher.unwatch(new dependency_1.io.File(path));
    }
    fileChanged(path, sender) {
        this.watcher.fileChanged(path, sender, null, this.base);
    }
    isWatching(file) {
        if (typeof file === 'string') {
            file = new dependency_1.io.File(file);
        }
        return this.watcher.isWatching(file);
    }
    listenDirectory(dir, callback) {
        new dependency_1.io
            .Directory(dir)
            .watch(callback);
    }
    getWatcher() {
        return this.watcher;
    }
}
exports.Autoreload = new AutoreloadInner;
//let root = path_resolveSystemUrl('/');
function reloadConfigDelegate(app) {
    return function (path) {
        app
            .defer()
            ._loadConfig()
            .then(function () {
            exports.Autoreload.fileChanged(path);
        });
    };
}
//# sourceMappingURL=Autoreload.js.map
//# sourceMappingURL=Autoreload.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Autoreload_Autoreload === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Autoreload_Autoreload) && __isObj(module.exports)) {
        Object.assign(_src_Autoreload_Autoreload, module.exports);
    } else {
        _src_Autoreload_Autoreload = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_compos_exports;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_compos_exports != null ? _src_compos_exports : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeEmbeddedComponents = void 0;
const dependency_1 = _src_dependency;
let initializeEmbeddedComponents = function (app) {
    exports.initializeEmbeddedComponents = initializeEmbeddedComponents = function () { };
    let DEBUG = app.config.$is('debug'), BUILD_DIR = '/public/build/';
    // source resources/exports.js
    (function () {
        // source ./util.js
        var model_getScripts, model_getStyles;
        (function () {
            model_getStyles = function (page, config, partial) {
                var pageId = _getPageId(page);
                if (DEBUG) {
                    return partial !== true
                        ? config.$getStyles(pageId)
                        : config.$getStylesForPageOnly(pageId);
                }
                var array = partial !== true
                    ? [_formatPagePath('styles.css', config)]
                    : [];
                var buildData = _getBuildData(pageId, config);
                if (buildData == null)
                    return array;
                if (buildData.styles)
                    array.push(_formatPagePath(pageId + '/styles.css', config));
                return array;
            };
            model_getScripts = function (page, config, partial, cb) {
                var pageId = _getPageId(page), model = {
                    scripts: [],
                    templates: '',
                    include: {
                        src: '',
                        cfg: null,
                        routes: null
                    },
                    mask: config.env.client.mask,
                    buildVersion: config.buildVersion,
                };
                if (DEBUG) {
                    // includejs information
                    var includeMeta = config.$getInclude();
                    if (includeMeta)
                        model.include = includeMeta;
                    model.scripts = partial !== true
                        ? config.$getScripts(pageId)
                        : config.$getScriptsForPageOnly(pageId);
                    cb && cb(model);
                    return model;
                }
                var base = config.static || config.base, tmpls = [];
                if (partial !== true) {
                    model.scripts.push(_formatPagePath('scripts.js', config));
                    tmpls.push(combine_(base, BUILD_DIR, 'load.html::App'));
                }
                var buildData = _getBuildData(pageId, config);
                if (buildData != null) {
                    if (buildData.load === true) {
                        tmpls.push(combine_(base, buildData, pageId, 'load.html::Page'));
                    }
                    if (buildData.scripts) {
                        model.scripts.push(_formatPagePath(pageId + '/scripts.js', config));
                    }
                }
                include
                    .instance()
                    .load(tmpls)
                    .done(function (resp) {
                    model.templates = (resp.load.App || '') + (resp.load.Page || '');
                    cb && cb(model);
                });
                return model;
            };
            var combine_ = dependency_1.Uri.combine;
            function _getPageId(page) {
                var id = page.data && page.data.id;
                if (id == null) {
                    logger.error('<page-resources> PageData and the ID is not defined');
                }
                return id;
            }
            function _getBuildData(pageId, config) {
                if (config.build == null) {
                    logger
                        .error('<Application is not built>')
                        .warn('To execute the DEV version use `--debug` flag: `node index --debug`'.bold)
                        .warn('To build the application run `atma custom node_modules/atma-server/tools/build`');
                    return null;
                }
                var buildData = config.build[pageId];
                if (buildData == null) {
                    logger.error('<page-resources> No page info', pageId, 'Build could be faily');
                    return null;
                }
                return buildData;
            }
            function _formatPagePath(path, config) {
                path = combine_(BUILD_DIR, path);
                if (config.buildVersion) {
                    path += '?v=' + config.buildVersion;
                }
                return path;
            }
        }());
        // end:source ./util.js
        // source ./atma-styles.js
        var Styles = dependency_1.mask.Compo({
            meta: {
                mode: 'server:all',
            },
            nodes: dependency_1.mask.parse("each (.) > link type='text/css' rel='stylesheet' href='~[.]';"),
            cache: DEBUG
                ? { byProperty: 'ctx.page.id' }
                : null,
            renderStart: function (model, ctx) {
                this.model = model_getStyles(ctx.page, ctx.config, false);
            }
        });
        Styles.getModel = model_getStyles;
        dependency_1.mask.registerHandler('atma:styles', Styles);
        // end:source ./atma-styles.js
        // source ./atma-scripts.js
        (function () {
            // source ./compo-prod.js
            var Prod_Scripts = dependency_1.mask.Compo({
                template: [
                    // source:string tmpl-prod.mask
                    "		if (templates) {\n\n			:html > '~[templates]'\n\n		}\n\n		\n\n		each(scripts){\n\n			script type='text/javascript' src='~[.]';\n\n		}\n\n		\n\n		script {	\n\n			include.allDone(function(){\n\n				window.app = Compo.bootstrap(document.body);\n\n			});\n\n		}"
                    // end:source:string tmpl-prod.mask
                ][0],
                mode: 'server:all',
                cache: {
                    byProperty: 'ctx.page.id'
                },
                onRenderStart: function (model, ctx) {
                    var resume = Compo.pause(this, ctx), self = this;
                    model_getScripts(ctx.page, ctx.config, false, function (model) {
                        self.model = model;
                        resume();
                    });
                }
            });
            Prod_Scripts.getModel = model_getScripts;
            // end:source ./compo-prod.js
            // source ./compo-dev.js
            var Dev_Scripts = dependency_1.mask.Compo({
                template: [
                    // source:string tmpl-dev.mask
                    "		script type='text/javascript' src='~[include.src]';\n\n		if (mask.src) {\n\n			script type='text/javascript' src='~[mask.src]';\n\n		}\n\n		script type='text/javascript' > <:html>\n\n			window.DEBUG = true;\n\n		\n\n			include\n\n				.cfg(~[include.config])\n\n				.routes(~[include.routes])\n\n				.js(~[scripts])\n\n		\n\n				~[imports || '']\n\n		\n\n				.done(function(){\n\n					window.app =  mask.Compo.bootstrap(document.body);\n\n				});\n\n		</:html>"
                    // end:source:string tmpl-dev.mask
                ][0],
                meta: {
                    mode: 'server',
                },
                onRenderStart: function (model, ctx) {
                    model = model_getScripts(ctx.page, ctx.config);
                    var importsArr = ctx.config.$getImports('client');
                    var importsStr;
                    if (importsArr.length) {
                        importsStr = importsArr.map(function (x) {
                            if (x.type === 'script') {
                                return ".js('" + x.path + "')";
                            }
                            if (x.type === 'style') {
                                return ".css('" + x.path + "')";
                            }
                            if (x.type === 'mask') {
                                return ".mask('" + x.path + "')";
                            }
                        }).join('\n');
                    }
                    this.model = {
                        include: {
                            src: model.include.src,
                            routes: JSON.stringify(model.include.routes, null, 4),
                            config: JSON.stringify(model.include.cfg, null, 4),
                            maskSrc: model.mask.src
                        },
                        scripts: model.scripts
                            .map(function (x) {
                            return "'" + x + "'";
                        })
                            .join(',\n'),
                        imports: importsStr,
                        mask: model.mask
                    };
                }
            });
            Dev_Scripts.getModel = model_getScripts;
            // end:source ./compo-dev.js
            var Handler = app.config.$is('debug')
                ? Dev_Scripts
                : Prod_Scripts;
            dependency_1.mask.registerHandler('atma:scripts', Handler);
        }());
        // end:source ./atma-scripts.js
    }());
    // end:source resources/exports.js
};
exports.initializeEmbeddedComponents = initializeEmbeddedComponents;
//# sourceMappingURL=exports.js.map
//# sourceMappingURL=exports.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_compos_exports === module.exports) {
        // do nothing if
    } else if (__isObj(_src_compos_exports) && __isObj(module.exports)) {
        Object.assign(_src_compos_exports, module.exports);
    } else {
        _src_compos_exports = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpRewrites_HttpRewriter;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpRewrites_HttpRewriter != null ? _src_HttpRewrites_HttpRewriter : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleCondition = exports.Rule = void 0;
const send_1 = _src_util_send;
class Rewriter {
    constructor() {
        this.rules = [];
    }
    addRules(rules) {
        if (rules == null) {
            return;
        }
        this.rules.push(...rules.map(x => new Rule(x)));
    }
    rewrite(req) {
        let arr = this.rules;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].rewrite(req)) {
                return;
            }
        }
    }
    redirect(req, res) {
        let arr = this.rules;
        for (let i = 0; i < arr.length; i++) {
            let path = arr[i].redirect(req);
            if (path == null) {
                continue;
            }
            (0, send_1.send_REDIRECT)(res, path);
            return true;
        }
        return false;
    }
}
exports.default = Rewriter;
class Rule {
    constructor(cond) {
        this.parse(cond.rule);
    }
    parse(rule) {
        let [pattern, rewriter] = rule.split(' ');
        this.rewriter = rewriter;
        this.matcher = new RegExp(pattern);
    }
    isMatch(req) {
        return this.matcher.test(req.url);
    }
    rewrite(req) {
        if (this.isMatch(req) === false) {
            return false;
        }
        req.url = req.url.replace(this.matcher, this.rewriter);
        return true;
    }
    redirect(req) {
        if (this.isMatch(req) === false) {
            return null;
        }
        return req.url.replace(this.matcher, this.rewriter);
    }
}
exports.Rule = Rule;
class RuleCondition {
    constructor(cond) {
        this.parse(cond.condition);
    }
    parse(condition) {
        let [text, pattern] = condition.split(' ');
        let arr = text.split('%{');
        this.textParts = arr
            .slice(1)
            .map(x => x.split('}'))
            .reduce((aggr, x) => aggr.concat(x), [arr[0]]);
        this.matcher = new RegExp(pattern);
    }
    isMatch(req) {
        return this.matcher.test(this.interpolate(req));
    }
    interpolate(req) {
        return this.textParts.map((x, i) => {
            if (i % 2 === 0) {
                return x;
            }
            return this.getValue(req, x);
        }).join();
    }
    getValue(req, name) {
        if (name.substring(0, 5) === 'HTTP_') {
            return req.headers[name.substring(5)] || '';
        }
        return RuleCondition.resolvers[name].get(req);
    }
}
exports.RuleCondition = RuleCondition;
RuleCondition.resolvers = {
    REMOTE_ADDR(req) {
        return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    },
    REMOTE_HOST(req) {
        return req.headers['host'] || '';
    },
    SERVER_ADDR(req) {
        return req.socket.localAddress || '';
    }
};
//# sourceMappingURL=HttpRewriter.js.map
//# sourceMappingURL=HttpRewriter.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpRewrites_HttpRewriter === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpRewrites_HttpRewriter) && __isObj(module.exports)) {
        Object.assign(_src_HttpRewrites_HttpRewriter, module.exports);
    } else {
        _src_HttpRewrites_HttpRewriter = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_LifecycleEvents;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpApplication_LifecycleEvents != null ? _src_HttpApplication_LifecycleEvents : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleEvent = exports.LifecycleSpan = exports.LifecycleEvents = void 0;
const atma_utils_1 = require("atma-utils");
class LifecycleEvents extends atma_utils_1.class_EventEmitter {
    on(event, cb) {
        return super.on(event, cb);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    emitEvent(event, req, res) {
        LifecycleEvents
            .Instance
            .emit(event.type, event, req, res);
    }
    completeAppStart(start) {
        EVENT.define('AppStart', Date.now() - start, `Application started`);
        this.emitEvent(EVENT);
    }
    completeHandlerSuccess(start, req, res) {
        const time = Date.now() - start;
        EVENT.define('HandlerSuccess', time, `${req.url} completed in ${time}ms`, req.method, req.url, res.statusCode, null, req.user?.email, req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        this.emitEvent(EVENT, req, res);
    }
    completeHandlerError(start, req, res, error) {
        const time = Date.now() - start;
        const message = `[${req.method}] ${req.url} completed in ${time}ms with error[${res.statusCode}]: ${error}`;
        EVENT.define('HandlerError', time, message, req.method, req.url, res.statusCode, error, req.user?.email, req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        this.emitEvent(EVENT, req, res);
    }
    emitError(error, req) {
        const message = `${error}`;
        EVENT.define('Error', 0, message, req?.method, req?.url, 0, error, req?.user?.email, req?.headers['x-forwarded-for'] || req?.connection.remoteAddress);
        this.emitEvent(EVENT);
    }
}
exports.LifecycleEvents = LifecycleEvents;
LifecycleEvents.Instance = new LifecycleEvents();
class LifecycleSpan {
    constructor() {
        this.start = Date.now();
    }
}
exports.LifecycleSpan = LifecycleSpan;
class LifecycleEvent {
    /** Do NOT create event objects to prevent GC */
    define(type, time, message, method, url, status, error, user, ip) {
        this.time = time;
        this.type = type;
        this.message = message;
        this.user = user;
        this.method = method;
        this.url = url;
        this.error = error;
        this.status = status;
        this.ip = ip;
    }
}
exports.LifecycleEvent = LifecycleEvent;
// Use singleton to prevent GC
const EVENT = new LifecycleEvent();
//# sourceMappingURL=LifecycleEvents.js.map
//# sourceMappingURL=LifecycleEvents.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpApplication_LifecycleEvents === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpApplication_LifecycleEvents) && __isObj(module.exports)) {
        Object.assign(_src_HttpApplication_LifecycleEvents, module.exports);
    } else {
        _src_HttpApplication_LifecycleEvents = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_utils != null ? _src_HttpService_utils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service_validateArgs = exports.secure_canAccess = void 0;
const obj_1 = _src_util_obj;
function secure_canAccess(req, secure) {
    if (secure == null || req.method === 'OPTIONS') {
        return true;
    }
    if (typeof secure === 'boolean') {
        return secure === false ? true : (req.session != null || req.user != null);
    }
    let user = req.user;
    if (user == null) {
        return false;
    }
    if (secure.role != null && isInRole(req, user, secure.role) === false) {
        return false;
    }
    if (secure.roles != null && isInRoleAny(req, user, secure.roles) === false) {
        return false;
    }
    if (secure.claim != null && hasClaim(req, user, secure.claim) === false) {
        return false;
    }
    if (secure.claims != null && hasClaimAny(req, user, secure.claims) === false) {
        return false;
    }
    return true;
}
exports.secure_canAccess = secure_canAccess;
;
function isInRole(req, user, role) {
    if (typeof role === 'function') {
        return role(req);
    }
    if (typeof user.isInRole === 'function') {
        return user.isInRole(role);
    }
    let roles = user.roles;
    if (roles == null) {
        return false;
    }
    for (let i = 0; i < roles.length; i++) {
        let x = roles[i];
        if (typeof x === 'string') {
            if (x === role) {
                return true;
            }
            continue;
        }
        if (x.name === role) {
            return true;
        }
    }
    return false;
}
function isInRoleAny(req, user, roles) {
    for (let i = 0; i < roles.length; i++) {
        if (isInRole(req, user, roles[i])) {
            return true;
        }
    }
    return false;
}
function hasClaim(req, user, claim) {
    if (typeof claim === 'function') {
        return claim(req);
    }
    if (typeof user.hasClaim === 'function') {
        return user.hasClaim(claim);
    }
    let claims = user.claims;
    if (claims == null) {
        return false;
    }
    for (let i = 0; i < claims.length; i++) {
        let x = claims[i];
        if (typeof x === 'string') {
            if (x === claim) {
                return true;
            }
            continue;
        }
        if (x.name === claim) {
            return true;
        }
    }
    return false;
}
function hasClaimAny(req, user, claims) {
    for (let i = 0; i < claims.length; i++) {
        if (hasClaim(req, user, claims[i])) {
            return true;
        }
    }
    return false;
}
const service_validateArgs = function (body, args, isStrict) {
    if (body == null) {
        return new Error('Message Body is not defined');
    }
    return (0, obj_1.obj_validate)(body, args, isStrict);
};
exports.service_validateArgs = service_validateArgs;
//# sourceMappingURL=utils.js.map
//# sourceMappingURL=utils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_utils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_utils) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_utils, module.exports);
    } else {
        _src_HttpService_utils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_BarricadeExt;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_BarricadeExt != null ? _src_HttpService_BarricadeExt : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarricadeExt = void 0;
const atma_utils_1 = require("atma-utils");
const HttpError_1 = _src_HttpError_HttpError;
class Runner {
    constructor(middlewares) {
        this.middlewares = middlewares;
    }
    process(service, req, res, params) {
        let dfr = new atma_utils_1.class_Dfr;
        next(this, dfr, service, req, res, params, 0);
        return dfr;
    }
}
function next(runner, dfr, service, req, res, params, index) {
    let middlewareFn = runner.middlewares[index];
    let nextFn = nextDelegate(runner, dfr, service, req, res, params, index);
    let result;
    try {
        result = middlewareFn.call(service, req, res, params);
    }
    catch (error) {
        nextFn(error);
        return;
    }
    if (result == null || 'then' in result === false) {
        nextFn(null, result);
        return;
    }
    result.then((...args) => nextFn(null, ...args), (error) => nextFn(error));
}
function nextDelegate(runner, dfr, service, req, res, params, index) {
    return function (error, ...args) {
        if (error) {
            reject(dfr, error);
            return;
        }
        if (index >= runner.middlewares.length - 1) {
            dfr.resolve(...args);
            return;
        }
        next(runner, dfr, service, req, res, params, ++index);
    };
}
function reject(service, error) {
    if (typeof error === 'string')
        error = new HttpError_1.HttpError(error);
    service.reject(error);
}
const BarricadeExt = function (middlewares) {
    let barricade = new Runner(middlewares);
    return function (req, res, params) {
        return barricade.process(this, req, res, params);
    };
};
exports.BarricadeExt = BarricadeExt;
//# sourceMappingURL=BarricadeExt.js.map
//# sourceMappingURL=BarricadeExt.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_BarricadeExt === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_BarricadeExt) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_BarricadeExt, module.exports);
    } else {
        _src_HttpService_BarricadeExt = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_FormDataUtil;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_FormDataUtil != null ? _src_util_FormDataUtil : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataUtil = void 0;
var FormDataUtil;
(function (FormDataUtil) {
    function map(body, files) {
        let json = null;
        if (body) {
            for (let key in body) {
                let val = body[key];
                json = setVal(json, key, val);
            }
        }
        if (files) {
            for (let key in files) {
                let val = files[key];
                json = setVal(json, key, val);
            }
        }
        return json;
    }
    FormDataUtil.map = map;
    /**
     * key:
     *  foo[1]name
     *  foo.[1].name
     *  [0].url.foo
     *  [0]url.foo
     */
    function setVal(json, path, val) {
        if (json == null) {
            json = nextIsArray(path) ? [] : {};
        }
        let ctx = json;
        do {
            let [prop, rest] = getAccessor(path);
            if (prop[0] === '[') {
                let endI = prop.indexOf(']', 1);
                let idx = Number(prop.substring(1, endI).trim());
                if (rest == null) {
                    ctx[idx] = val;
                    break;
                }
                let x = ctx[idx];
                if (x == null) {
                    x = nextIsArray(rest) ? [] : {};
                    ctx[idx] = x;
                }
                ctx = x;
                path = rest;
                continue;
            }
            if (rest == null) {
                ctx[prop] = val;
                break;
            }
            let x = ctx[prop];
            if (x == null) {
                x = nextIsArray(rest) ? [] : {};
                ctx[prop] = x;
            }
            ctx = x;
            path = rest;
        } while (path != null);
        return json;
    }
    function nextIsArray(path) {
        if (path[0] === '[') {
            return true;
        }
        return false;
    }
    function getAccessor(path) {
        // Start from second position, as [ can be part of current accessor
        let bracketI = path.indexOf('[', 1);
        let dotI = path.indexOf('.');
        if (dotI === -1 && bracketI === -1) {
            return [path, null];
        }
        if (dotI > -1 && bracketI > -1) {
            let min = Math.min(dotI, bracketI);
            let prop = path.substring(0, min);
            let rest = path.substring(min === dotI ? (min + 1) : (min));
            return [prop, rest];
        }
        if (dotI > -1) {
            let prop = path.substring(0, dotI);
            let rest = path.substring(dotI + 1);
            return [prop, rest];
        }
        if (bracketI > -1) {
            let prop = path.substring(0, bracketI);
            let rest = path.substring(bracketI);
            return [prop, rest];
        }
    }
})(FormDataUtil = exports.FormDataUtil || (exports.FormDataUtil = {}));
//# sourceMappingURL=FormDataUtil.js.map
//# sourceMappingURL=FormDataUtil.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_FormDataUtil === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_FormDataUtil) && __isObj(module.exports)) {
        Object.assign(_src_util_FormDataUtil, module.exports);
    } else {
        _src_util_FormDataUtil = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpointParamUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_HttpEndpointParamUtils != null ? _src_HttpService_HttpEndpointParamUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointParamUtils = exports.Types = void 0;
const atma_utils_1 = require("atma-utils");
const HttpError_1 = _src_HttpError_HttpError;
const class_json_1 = require("class-json");
const FormDataUtil_1 = _src_util_FormDataUtil;
var Types;
(function (Types) {
    class ArrayOfString {
    }
    Types.ArrayOfString = ArrayOfString;
    class ArrayOfNumber {
    }
    Types.ArrayOfNumber = ArrayOfNumber;
    function ArrayOf(Type) {
        return new ArrayOfInner(Type);
    }
    Types.ArrayOf = ArrayOf;
    class Json extends class_json_1.Serializable {
    }
    Types.Json = Json;
})(Types = exports.Types || (exports.Types = {}));
class ArrayOfInner {
    constructor(Type) {
        this.Type = Type;
    }
}
var HttpEndpointParamUtils;
(function (HttpEndpointParamUtils) {
    function resolveParam(req, params, meta) {
        if (meta.from === 'uri') {
            return UriExtractor.get(params, meta);
        }
        let body = req.body;
        if (req.headers['content-type']?.includes?.('multipart/form-data')) {
            body = FormDataUtil_1.FormDataUtil.map(body, req.files);
        }
        return BodyExtractor.get(body, meta);
    }
    HttpEndpointParamUtils.resolveParam = resolveParam;
})(HttpEndpointParamUtils = exports.HttpEndpointParamUtils || (exports.HttpEndpointParamUtils = {}));
var BodyExtractor;
(function (BodyExtractor) {
    function get(body, meta) {
        return TypeConverter.fromType(body, meta.Type);
    }
    BodyExtractor.get = get;
})(BodyExtractor || (BodyExtractor = {}));
var UriExtractor;
(function (UriExtractor) {
    function get(params, meta) {
        if (meta.name) {
            let val = params[meta.name];
            if (val == null) {
                if (meta.default != null) {
                    return meta.default;
                }
                if (meta.optional !== true) {
                    throw new HttpError_1.HttpError(`URI Parameter '${meta.name}' is undefined`, 400);
                }
                return null;
            }
            let str = val;
            let converter = getConverter(meta.Type ?? String);
            if (converter != null) {
                val = converter.convert(val);
            }
            if (meta.validate || converter.validate) {
                let error = (meta.validate ?? converter.validate)(val);
                if (error) {
                    throw new HttpError_1.HttpError(`Invalid URI Parameter '${meta.name}' with value '${str}': ${error}`, 400);
                }
            }
            return val;
        }
        let obj = toTree(params);
        let json = TypeConverter.fromType(obj, meta.Type);
        if (meta.validate) {
            let error = meta.validate(json);
            if (error) {
                throw new HttpError_1.HttpError(`Invalid URI Parameters: ${error}`, 400);
            }
        }
        return json;
    }
    UriExtractor.get = get;
    function toTree(params) {
        let obj = {};
        for (let key in params) {
            let val = params[key];
            if (isJson(val)) {
                try {
                    val = JSON.parse(val);
                }
                catch (error) {
                    console.error('400: Unexpected URI JSON');
                }
            }
            (0, atma_utils_1.obj_setProperty)(obj, key, val);
        }
        return obj;
    }
    function isJson(str) {
        if (typeof str !== 'string') {
            return false;
        }
        let c = str[0];
        if (c === '{') {
            return str[str.length - 1] === '}';
        }
        if (c === '[') {
            return str[str.length - 1] === ']';
        }
        return false;
    }
    function getConverter(Type) {
        for (let i = 0; i < Converters.length; i++) {
            if (Converters[i].Type === Type) {
                return Converters[i];
            }
        }
        return null;
    }
    let Converters = [
        {
            Type: String,
            convert(val) {
                return val;
            }
        },
        {
            Type: Number,
            convert(val) {
                if (val == null || val === '') {
                    return null;
                }
                return parseFloat(val);
            },
            validate(val) {
                if (isNaN(val)) {
                    return `Is not a number`;
                }
                return null;
            }
        },
        {
            Type: Date,
            convert(val) {
                if (val == null) {
                    return val;
                }
                return new Date(val);
            }
        },
        {
            Type: Boolean,
            convert(val) {
                if (val == null) {
                    return null;
                }
                if (val === 'true' || val === '1' || val === 'yes') {
                    return true;
                }
                return false;
            }
        },
        {
            Type: Types.ArrayOfString,
            convert(val) {
                if (val == null) {
                    return val;
                }
                return val.split(',');
            }
        },
        {
            Type: Types.ArrayOfNumber,
            convert(val) {
                if (val == null) {
                    return val;
                }
                return val.split(',').map(parseFloat);
            },
            validate(arr) {
                if (arr.some(isNaN)) {
                    return `Contains invalid number`;
                }
                return null;
            }
        },
        {
            Type: Types.Json,
            convert(val) {
                if (val == null) {
                    return val;
                }
                try {
                    return JSON.parse(val);
                }
                catch (error) {
                    throw new HttpError_1.HttpError(`Invalid json data: ${val}`);
                }
            },
            validate(arr) {
            }
        },
    ];
})(UriExtractor || (UriExtractor = {}));
var TypeConverter;
(function (TypeConverter) {
    function fromType(json, Type) {
        if (Type == null) {
            return json;
        }
        if (typeof Type !== 'function') {
            if (Type instanceof ArrayOfInner && Array.isArray(json)) {
                return json.map(x => fromType(x, Type.Type));
            }
        }
        let instance = Type.fromJSON?.(json) ?? class_json_1.JsonConvert.fromJSON(json, { Type });
        let error = Type.validate != null
            ? Type.validate(instance)
            : class_json_1.JsonValidate.validate(instance, { Type });
        if (error != null && error.length !== 0) {
            // Try handle different cases
            let message = error;
            if (Array.isArray(error)) {
                message = error[0];
            }
            if (typeof message === 'object') {
                if (message.message) {
                    message = message.message;
                }
                else {
                    message = JSON.stringify(message);
                }
            }
            throw new HttpError_1.HttpError(`Invalid Parameter: ${message} `, 400);
        }
        return instance;
    }
    TypeConverter.fromType = fromType;
})(TypeConverter || (TypeConverter = {}));
//# sourceMappingURL=HttpEndpointParamUtils.js.map
//# sourceMappingURL=HttpEndpointParamUtils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_HttpEndpointParamUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_HttpEndpointParamUtils) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_HttpEndpointParamUtils, module.exports);
    } else {
        _src_HttpService_HttpEndpointParamUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpointDecos;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_HttpEndpointDecos != null ? _src_HttpService_HttpEndpointDecos : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointDecos = void 0;
const HttpEndpointParamUtils_1 = _src_HttpService_HttpEndpointParamUtils;
var HttpEndpointDecos;
(function (HttpEndpointDecos) {
    function middleware(fn) {
        return function (target, propertyKey, descriptor) {
            let viaProperty = descriptor == null;
            let current = viaProperty ? target[propertyKey] : descriptor.value;
            let result = mergeMiddleware(current, fn);
            if (viaProperty) {
                target[propertyKey] = result;
                return;
            }
            descriptor.value = result;
            return descriptor;
        };
    }
    HttpEndpointDecos.middleware = middleware;
    ;
    function isAuthorized() {
        return createDecorator({
            forCtor(Ctor, meta) {
                meta.secure = true;
            },
            forMethod(Proto, method) {
                method.meta.secure = true;
            }
        });
    }
    HttpEndpointDecos.isAuthorized = isAuthorized;
    ;
    function isInRole(...roles) {
        return createDecorator({
            forCtor(Ctor, meta) {
                meta.secure = { roles };
            },
            forMethod(Proto, method) {
                method.meta.secure = { roles };
            }
        });
    }
    HttpEndpointDecos.isInRole = isInRole;
    ;
    function hasClaim(...claims) {
        return createDecorator({
            forCtor(Ctor, meta) {
                meta.secure = { claims };
            },
            forMethod(Proto, method) {
                method.meta.secure = { claims };
            }
        });
    }
    HttpEndpointDecos.hasClaim = hasClaim;
    ;
    function origin(origin) {
        return createDecorator({
            forCtor(Ctor, meta) {
                meta.origins = origin;
            },
            forMethod(Proto, method) {
                method.meta.origins = origin;
            }
        });
    }
    HttpEndpointDecos.origin = origin;
    ;
    function route(route) {
        return createDecorator({
            forCtor(Ctor, meta) {
                // ensure we add ^ to the class, as the route is just a starting path for the methods
                if (route.startsWith('^') === false) {
                    route = '^' + route;
                }
                // files are dynamically parsed and the content resolved
                meta.path = route;
            },
            forMethod(Proto, method) {
                method.meta.path = route;
            }
        });
    }
    HttpEndpointDecos.route = route;
    ;
    function description(txt) {
        return createDecorator({
            forCtor(Ctor, meta) {
                meta.description = txt;
            },
            forMethod(Proto, method) {
                method.meta.description = txt;
            }
        });
    }
    HttpEndpointDecos.description = description;
    ;
    function response(response) {
        return createDecorator({
            forCtor(Ctor, meta) {
                throw new Error('Only the endpoint routes support response decorator');
            },
            forMethod(Proto, method) {
                if (method.meta.responses == null) {
                    method.meta.responses = [];
                }
                if (response.status == null) {
                    response.status = 200;
                }
                method.meta.responses.push(response);
            }
        });
    }
    HttpEndpointDecos.response = response;
    ;
    function fromUri(mix, Type) {
        let opts;
        if (mix == null) {
            opts = {
                Type: HttpEndpointParamUtils_1.Types.Json
            };
        }
        else if (typeof mix === 'string') {
            opts = {
                name: mix,
                Type: Type ?? String
            };
        }
        else if (typeof mix === 'object') {
            opts = mix;
        }
        return function (target, propertyKey, index) {
            ensureEndpointArgsMeta(target, propertyKey, 'uri', index, opts);
        };
    }
    HttpEndpointDecos.fromUri = fromUri;
    function fromBody(mix) {
        let opts;
        if (mix == null) {
            opts = {
                Type: HttpEndpointParamUtils_1.Types.Json
            };
        }
        else if (typeof mix === 'function') {
            opts = {
                Type: mix
            };
        }
        else if (typeof mix === 'object') {
            opts = mix;
        }
        if (opts.ArrayType != null) {
            opts.Type = HttpEndpointParamUtils_1.Types.ArrayOf(opts.ArrayType);
        }
        return function (target, propertyKey, index) {
            ensureEndpointArgsMeta(target, propertyKey, 'body', index, opts);
        };
    }
    HttpEndpointDecos.fromBody = fromBody;
    function ensureEndpointArgsMeta(proto, methodName, paramFrom, paramIndex, opts) {
        let meta = proto.meta ?? (proto.meta = {});
        if (meta.endpointsParams == null) {
            meta.endpointsParams = {};
        }
        let params = meta.endpointsParams[methodName];
        if (params == null) {
            params = meta.endpointsParams[methodName] = [];
        }
        let Type = opts.Type;
        if (Type == null && opts.default != null) {
            let type = typeof opts.default;
            if (type === 'string') {
                Type = String;
            }
            else if (type === 'number') {
                Type = Number;
            }
            else if (type === 'boolean') {
                Type = Boolean;
            }
        }
        let name = opts.name;
        if (name == null && (Type === Number || Type === Boolean || Type === String)) {
            // primitives
            //- no way to get the param name? decorator provides only method name?
            //- name = methodName;
            console.error(`URI Param in ${methodName} is primitive but the query name is not set.`);
        }
        let paramMeta = {
            from: paramFrom,
            Type: Type,
            name: name,
            default: opts.default,
            validate: opts.validate,
            optional: opts.optional
        };
        params[paramIndex] = paramMeta;
        return params;
    }
    function ensureEndpointMeta(mix) {
        let proto = typeof mix === 'function'
            ? mix.prototype
            : Object.getPrototypeOf(mix);
        let meta = proto.meta;
        if (meta == null) {
            meta = proto.meta = {};
        }
        return meta;
    }
    function ensureEndpointMethod(current) {
        if (current == null) {
            return null;
        }
        if (typeof current === 'function' || Array.isArray(current)) {
            return {
                meta: {},
                process: current
            };
        }
        if (current.meta == null) {
            current.meta = {};
        }
        return current;
    }
    function createDecorator(opts) {
        return function (target, propertyKey, descriptor) {
            if (typeof target === 'function') {
                let meta = ensureEndpointMeta(target);
                return opts.forCtor(target, meta) || target;
            }
            let viaProperty = descriptor == null;
            let current = viaProperty ? target[propertyKey] : descriptor.value;
            let result = ensureEndpointMethod(current);
            result = opts.forMethod(target, result) || result;
            if (viaProperty) {
                target[propertyKey] = result;
                return;
            }
            descriptor.value = result;
            return descriptor;
        };
    }
    HttpEndpointDecos.createDecorator = createDecorator;
    function mergeMiddleware(currentVal, fn) {
        if (currentVal == null) {
            return fn;
        }
        if (typeof currentVal === 'function') {
            return [fn, currentVal];
        }
        if (Array.isArray(currentVal)) {
            return [fn, ...currentVal];
        }
        currentVal.process = mergeMiddleware(currentVal.process, fn);
    }
})(HttpEndpointDecos = exports.HttpEndpointDecos || (exports.HttpEndpointDecos = {}));
//# sourceMappingURL=HttpEndpointDecos.js.map
//# sourceMappingURL=HttpEndpointDecos.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_HttpEndpointDecos === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_HttpEndpointDecos) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_HttpEndpointDecos, module.exports);
    } else {
        _src_HttpService_HttpEndpointDecos = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpoint;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_HttpEndpoint != null ? _src_HttpService_HttpEndpoint : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteUtils = exports.HttpEndpointUtils = exports.HttpEndpoint = void 0;
const HttpError_1 = _src_HttpError_HttpError;
const dependency_1 = _src_dependency;
const utils_1 = _src_HttpService_utils;
const atma_utils_1 = require("atma-utils");
const IHttpHandler_1 = _src_IHttpHandler;
const BarricadeExt_1 = _src_HttpService_BarricadeExt;
const HttpEndpointDecos_1 = _src_HttpService_HttpEndpointDecos;
const HttpEndpointParamUtils_1 = _src_HttpService_HttpEndpointParamUtils;
const HttpEndpointExplorer_1 = _src_HttpService_HttpEndpointExplorer;
const cors_1 = _src_util_cors;
const ruta_1 = require("ruta");
const METHOD_META_DEFAULT = {
    secure: null,
    arguments: null
};
class HttpEndpoint {
    constructor(route, app) {
        this.app = app;
        if (this.routes == null) {
            //Create ROUTES once
            Object.getPrototypeOf(this).routes = RouteUtils.resolveFromType(this);
        }
        if (route == null) {
            return;
        }
        let count = 0;
        for (let i = 0; i < route.path.length; i++) {
            let x = route.path[i];
            if (typeof x !== 'string') {
                break;
            }
            count += x.length + 1;
        }
        this.rootCharCount = count;
    }
    process(req, res) {
        let iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return Promise.resolve(HttpEndpointUtils.getHelpModel(this));
        }
        if (this.meta != null) {
            if ((0, utils_1.secure_canAccess)(req, this.meta.secure) === false) {
                return Promise.reject(new HttpError_1.SecurityError('Access Denied'));
            }
        }
        let path = req.url.substring(this.rootCharCount);
        let entry = this.routes.get(path, req.method);
        if (entry == null) {
            if (req.method === 'OPTIONS') {
                let headers = HttpEndpointUtils.getOptionsHeaders(this, path, req);
                if (headers) {
                    res.writeHead(200, headers);
                    res.end();
                    // Return nothing back to application
                    return void 0;
                }
            }
            if (req.method === 'HEAD') {
                entry = this.routes.get(path, 'GET');
                if (entry) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end();
                    // Return nothing back to application
                    return void 0;
                }
            }
            let name = this.constructor.name || '<service>';
            let url = path || '/';
            let error = new HttpError_1.NotFoundError(`${name}: endpoint not Found: <${req.method}> ${url}`);
            return Promise.reject(error);
        }
        let endpoint = entry.value;
        let meta = endpoint.meta;
        if (meta != null) {
            if (meta.secure != null && (0, utils_1.secure_canAccess)(req, meta.secure) === false) {
                let error = new HttpError_1.SecurityError('Access Denied');
                return Promise.reject(error);
            }
            if (meta.arguments != null) {
                let args = meta.arguments;
                let isGet = req.method === 'GET';
                let isStrict = isGet === false && meta.strict;
                let body = isGet
                    ? entry.current.params
                    : req.body;
                let error = (0, utils_1.service_validateArgs)(body, args, isStrict);
                if (error) {
                    return Promise.reject(new HttpError_1.RequestError(error.message));
                }
            }
        }
        let params = null;
        let paramsMeta = this.meta?.endpointsParams?.[endpoint.key];
        if (paramsMeta != null) {
            params = [];
            for (let i = 0; i < paramsMeta.length; i++) {
                params[i] = HttpEndpointParamUtils_1.HttpEndpointParamUtils.resolveParam(req, entry.current.params, paramsMeta[i]);
            }
            params.push(req, res);
        }
        let result = params == null
            ? endpoint.process.call(this, req, res, entry.current.params)
            : endpoint.process.apply(this, params);
        if (result == null) {
            return void 0;
        }
        let promise = this.dfr = new atma_utils_1.class_Dfr();
        if (typeof result.then !== 'function') {
            HttpEndpointUtils.onComplete(path, req, res, this, endpoint, promise, result);
            return promise;
        }
        let hasCatch = typeof result.catch === 'function';
        let catchable = result.then((mix, statusCode, mimeType, headers) => {
            HttpEndpointUtils.onComplete(path, req, res, this, endpoint, promise, mix, statusCode, mimeType, headers);
        }, hasCatch ? void 0 : error => promise.reject(error));
        if (hasCatch) {
            catchable.catch(err => {
                promise.reject(err);
            });
        }
        return promise;
    }
    resolve(...args) {
        this.dfr.resolve(...args);
    }
    reject(error) {
        this.dfr.reject(error);
    }
}
exports.HttpEndpoint = HttpEndpoint;
HttpEndpoint.route = HttpEndpointDecos_1.HttpEndpointDecos.route;
HttpEndpoint.origin = HttpEndpointDecos_1.HttpEndpointDecos.origin;
HttpEndpoint.middleware = HttpEndpointDecos_1.HttpEndpointDecos.middleware;
HttpEndpoint.isAuthorized = HttpEndpointDecos_1.HttpEndpointDecos.isAuthorized;
HttpEndpoint.isInRole = HttpEndpointDecos_1.HttpEndpointDecos.isInRole;
HttpEndpoint.hasClaim = HttpEndpointDecos_1.HttpEndpointDecos.hasClaim;
HttpEndpoint.fromUri = HttpEndpointDecos_1.HttpEndpointDecos.fromUri;
HttpEndpoint.fromBody = HttpEndpointDecos_1.HttpEndpointDecos.fromBody;
HttpEndpoint.response = HttpEndpointDecos_1.HttpEndpointDecos.response;
HttpEndpoint.description = HttpEndpointDecos_1.HttpEndpointDecos.description;
HttpEndpoint.createDecorator = HttpEndpointDecos_1.HttpEndpointDecos.createDecorator;
HttpEndpoint.Types = HttpEndpointParamUtils_1.Types;
var HttpEndpointUtils;
(function (HttpEndpointUtils) {
    const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
    const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
    function onComplete(path, req, res, endpoint, endpointMethod, promise, mix, statusCode, mimeType, headers) {
        let response;
        if (mix instanceof IHttpHandler_1.HttpResponse === false) {
            response = new IHttpHandler_1.HttpResponse({
                content: mix,
                //@Obsolete - this callback shouldn't support multiple arguments.
                statusCode: statusCode,
                mimeType: mimeType,
                headers: headers,
            });
        }
        else {
            response = mix;
        }
        if (endpoint.meta?.origins) {
            let corsHeaders = getOptionsHeaders(endpoint, path, req);
            response.headers = (0, dependency_1.obj_extend)(response.headers, corsHeaders);
        }
        promise.resolve(response);
    }
    HttpEndpointUtils.onComplete = onComplete;
    function getHelpModel(service) {
        return HttpEndpointExplorer_1.HttpEndpointExplorer.getMeta(service.constructor);
    }
    HttpEndpointUtils.getHelpModel = getHelpModel;
    ;
    function getCorsHeaders(req, handler) {
        let headers = {
            'Access-Control-Allow-Methods': [req.method],
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': handler.meta?.origins ?? '',
            'Vary': 'Origin',
        };
        (0, cors_1.cors_rewriteAllowedOrigins)(req, headers);
        return headers;
    }
    HttpEndpointUtils.getCorsHeaders = getCorsHeaders;
    function getOptionsHeaders(endpoint, path, req) {
        let headers = {}, allowedMethods = [], allowedOrigins = '', i = METHODS.length;
        if (endpoint.meta) {
            if (endpoint.meta.headers != null) {
                headers = (0, dependency_1.obj_extend)(headers, endpoint.meta.headers);
            }
            if (endpoint.meta.origins != null) {
                allowedOrigins = endpoint.meta.origins;
            }
        }
        while (--i > -1) {
            let method = METHODS[i];
            let route = endpoint.routes.get(path, method);
            if (route != null) {
                allowedMethods.push(method);
                let endpointMethod = route.value;
                if (endpointMethod.meta) {
                    if (endpointMethod.meta.headers != null) {
                        headers = (0, dependency_1.obj_extend)(headers, endpointMethod.meta.headers);
                    }
                    if (endpointMethod.meta.origins != null) {
                        allowedOrigins = endpointMethod.meta.origins;
                    }
                }
            }
        }
        if (allowedMethods.length === 0) {
            return null;
        }
        let methods = allowedMethods.join(',');
        if (methods.includes('OPTIONS') === false) {
            methods += ',OPTIONS';
        }
        let cors = {
            'Content-Type': 'application/json;charset=utf-8',
            'Allow': methods,
            'Access-Control-Allow-Methods': methods,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': allowedOrigins,
            'Vary': 'Origin',
        };
        (0, dependency_1.obj_extendDefaults)(headers, cors);
        (0, cors_1.cors_rewriteAllowedOrigins)(req, headers);
        return headers;
    }
    HttpEndpointUtils.getOptionsHeaders = getOptionsHeaders;
    ;
})(HttpEndpointUtils = exports.HttpEndpointUtils || (exports.HttpEndpointUtils = {}));
var RouteUtils;
(function (RouteUtils) {
    function define(defs, routes) {
        for (let path in defs) {
            if (path[0] !== '$') {
                continue;
            }
            let x = defs[path];
            let responder = null;
            if ((0, dependency_1.is_Function)(x)) {
                responder = {
                    process: x
                };
            }
            if (responder == null && (0, dependency_1.is_Array)(x)) {
                responder = {
                    process: (0, BarricadeExt_1.BarricadeExt)(x)
                };
            }
            if (responder == null && (0, dependency_1.is_Object)(x)) {
                responder = x;
            }
            if (responder != null && (0, dependency_1.is_Array)(responder.process))
                responder.process = (0, BarricadeExt_1.BarricadeExt)(responder.process);
            if (responder == null || (0, dependency_1.is_Function)(responder.process) === false) {
                dependency_1.logger.warn('<HttpService> `process` is not a function'
                    + path
                    + (typeof responder.process));
                continue;
            }
            responder.key = path;
            routes.add(path, responder);
        }
    }
    function fillProtoHash(proto, hash) {
        let keys = Object.getOwnPropertyNames(proto);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (null != hash[key]) {
                continue;
            }
            hash[key] = proto[key];
        }
        let next = Object.getPrototypeOf(proto);
        if (null == next || next === Object.prototype) {
            return hash;
        }
        return fillProtoHash(next, hash);
    }
    function resolveFromType(endpoint) {
        let prototype = Object.getPrototypeOf(endpoint);
        return resolveFromProto(prototype);
    }
    RouteUtils.resolveFromType = resolveFromType;
    function resolveFromProto(prototype) {
        let routes = new ruta_1.Collection;
        let properties = fillProtoHash(prototype, Object.create(null));
        define(properties, routes);
        define(prototype.ruta, routes);
        return routes;
    }
    RouteUtils.resolveFromProto = resolveFromProto;
})(RouteUtils = exports.RouteUtils || (exports.RouteUtils = {}));
//# sourceMappingURL=HttpEndpoint.js.map
//# sourceMappingURL=HttpEndpoint.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_HttpEndpoint === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_HttpEndpoint) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_HttpEndpoint, module.exports);
    } else {
        _src_HttpService_HttpEndpoint = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util__network;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util__network != null ? _src_util__network : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$network = void 0;
const alot_1 = require("alot");
var $network;
(function ($network) {
    function getHosts() {
        let os = require('os');
        let dict = os.networkInterfaces();
        let networks = alot_1.default
            .fromObject(dict)
            .mapMany(group => {
            return (0, alot_1.default)(group.value)
                .filter(x => x.family === 'IPv4' && x.address !== '127.0.0.1')
                .map(x => {
                return {
                    name: group.key,
                    host: x.address
                };
            })
                .toArray();
        })
            .toArray();
        return [
            { name: 'Local', host: 'localhost' },
            ...networks
        ];
    }
    $network.getHosts = getHosts;
})($network = exports.$network || (exports.$network = {}));
//# sourceMappingURL=$network.js.map
//# sourceMappingURL=$network.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util__network === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util__network) && __isObj(module.exports)) {
        Object.assign(_src_util__network, module.exports);
    } else {
        _src_util__network = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_Application;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpApplication_Application != null ? _src_HttpApplication_Application : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respond_Raw = void 0;
const http = require("http");
const https = require("https");
const dependency_1 = _src_dependency;
const Message_1 = _src_HttpApplication_Message;
const cli_1 = _src_util_cli;
const app_1 = _src_util_app;
const HttpError_1 = _src_HttpError_HttpError;
const HandlerFactory_1 = _src_HandlerFactory;
const WebSocket_1 = _src_WebSocket;
const Config_1 = _src_Config_Config;
const Middleware_1 = _src_Business_Middleware;
const Autoreload_1 = _src_Autoreload_Autoreload;
const HttpErrorPage_1 = _src_HttpPage_HttpErrorPage;
const exports_1 = _src_compos_exports;
const send_1 = _src_util_send;
const SubApp_1 = _src_HttpApplication_SubApp;
const HttpRewriter_1 = _src_HttpRewrites_HttpRewriter;
const obj_1 = _src_util_obj;
const IHttpHandler_1 = _src_IHttpHandler;
const HttpEndpointExplorer_1 = _src_HttpService_HttpEndpointExplorer;
const atma_utils_1 = require("atma-utils");
const LifecycleEvents_1 = _src_HttpApplication_LifecycleEvents;
const HttpEndpoint_1 = _src_HttpService_HttpEndpoint;
const _network_1 = _src_util__network;
let _emitter = new atma_utils_1.class_EventEmitter();
class Application extends atma_utils_1.class_EventEmitter {
    constructor(proto = {}) {
        super();
        this.startedAt = Date.now();
        this.promise = new atma_utils_1.class_Dfr();
        this.lifecycle = LifecycleEvents_1.LifecycleEvents.Instance;
        // <Boolean>, if instance is the root application, and not one of the subapps
        this.isRoot = false;
        this.isHttpsForced = false;
        // <HandlerFactory>, stores all endpoints of this application
        this.handlers = null;
        // <http.Server> , in case `listen` was called.
        this._server = null;
        this._sslServer = null;
        // run this middlewares when the endpoint is found. (Runs before the endpoint handler)
        this._innerPipe = null;
        // run this middlewares by all requests. Contains also endpoint resolver
        this._outerPipe = null;
        //@obsolete
        this._responder = null;
        this._responders = null;
        this.middleware = null;
        // Loaded server scripts from `config.env.scripts` and `config.env.both`
        this.resources = null;
        // Stores all exports from `resources`
        this.lib = {};
        // webSockets
        this.webSockets = null;
        this.rewriter = new HttpRewriter_1.default;
        this.redirects = new HttpRewriter_1.default;
        if (this instanceof Application === false) {
            throw Error('Application must be created with the `new` keyword');
        }
        this._loadConfig = this._loadConfig.bind(this);
        this._404 = this._404.bind(this);
        this.process = this.process.bind(this);
        // if a root application
        if (Application.current == null) {
            Application.current = this;
        }
        this.isRoot = this === Application.current;
        this.handlers = new HandlerFactory_1.default(this);
        this.webSockets = new WebSocket_1.default(this);
        if (proto.endpoints) {
            this.handlers.registerEndpoints(proto.endpoints);
        }
        this.args = (0, dependency_1.obj_extend)(proto.args, (0, cli_1.cli_arguments)());
        this._baseConfig = proto;
        this._loadConfig();
    }
    //@obsolete
    respond(req, res, next) {
        this.process(req, res, next);
    }
    //@obsolete
    responder(data) {
        this._innerPipe = Middleware_1.default.create(data && data.middleware);
        return responder(this);
    }
    //> Generic HttpServer scenario, responder should be also used in the middleware
    //@obsolete
    responders(array) {
        this._outerPipe = new Middleware_1.default(array);
    }
    /**
     * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
     * :middleware - Array|Function - Middleware fns in INNER pipe, before the Handler
     * :after - Array|Function - Middleware fns in OUTER pipe, after the Handler
     */
    processor(data = {}) {
        let before = data.before;
        let after = data.after;
        let middleware = data.middleware;
        this._outerPipe = Middleware_1.default.create(before || []);
        this._innerPipe = Middleware_1.default.create(middleware);
        this._outerPipe.add(responder(this));
        this._outerPipe.add(after);
        return this;
    }
    process(req, res, next) {
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
        this._outerPipe.process(req, res, next || this._404, this.config);
    }
    execute(url, method, body, headers) {
        let req = new Message_1.Request(url, method.toLowerCase(), body, headers);
        let res = new Message_1.Response;
        // @TODO ? middleware pipeline in RAW requests
        //this._responders.process(
        //    req,
        //    res,
        //    respond,
        //    this.config
        //);
        //function respond() {
        //    responder_Raw(req, res);
        //}
        respond_Raw(this, req, res);
        return res;
    }
    autoreload(httpServer) {
        this._server = this._server || httpServer;
        if (this._server == null)
            return;
        Autoreload_1.Autoreload.enable(this);
        Autoreload_1.Autoreload.getWatcher().on('fileChange', (relPath, absPath) => {
            Application.trigger('autoreload', relPath, absPath);
        });
    }
    done(fn) {
        this.promise.then(fn);
    }
    fail(fn) {
        this.promise.then(null, fn);
    }
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
        if (port == null) {
            port = this.config.$get('port');
        }
        if (port == null) {
            throw Error('Port number is not defined');
        }
        if (server == null) {
            server = http.createServer();
        }
        if (this.webSockets.hasHandlers()) {
            this.webSockets.listen(this._server);
        }
        let processFn = this.process;
        let ssl = this.config.$get('server.ssl');
        if (ssl && ssl.enabled === true) {
            let { forced, port, certFile, keyFile, caFile } = ssl;
            this.isHttpsForced = forced == null ? false : forced;
            let readFile = path => {
                return path && dependency_1.io.File.exists(path) && dependency_1.io.File.read(path, { encoding: 'binary' }) || void 0;
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
                processFn = (req, res, next) => {
                    let allow = req.url.indexOf('/.well-known/') !== -1;
                    let proto = req.headers['x-forwarded-proto'];
                    if (proto !== 'https' && allow !== true) {
                        let host = req.headers['host'];
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
            this._printServerInfo('http', port);
        }
        this._server = server
            .on('request', processFn)
            .listen(port);
        this._printServerInfo('http', port);
        _emitter.trigger('listen', this);
        this.lifecycle.completeAppStart(this.startedAt);
        if ((0, app_1.app_isDebug)()) {
            this.autoreload();
        }
        return this._server;
    }
    getHttpPort() {
        let address = this._server?.address();
        return address != null && typeof address === 'object' ? address.port : null;
    }
    getSslPort() {
        let address = this._sslServer?.address();
        return address != null && typeof address === 'object' ? address.port : null;
    }
    getSubApp(path) {
        let route = this.handlers.subapps.get(path);
        return route && route.value && route.value.app_;
    }
    _loadConfig() {
        let definition = this._baseConfig;
        (0, Config_1.default)(definition, this).then(cfg_doneDelegate(this), (error) => {
            dependency_1.logger
                .warn('Configuration Error')
                .error(error);
        });
        return this;
    }
    _404(error, req, res) {
        error = error == null
            ? new HttpError_1.HttpError('Endpoint not found: ' + req.url, 404)
            : HttpError_1.HttpErrorUtil.create(error);
        let accept = req.headers['accept'];
        if (accept == null || accept.indexOf('text/html') !== -1) {
            HttpErrorPage_1.default.send(error, req, res, this.config);
            return;
        }
        // send json
        (0, send_1.send_Error)(req, res, error, null, this, Date.now());
    }
    _printServerInfo(protocol, port) {
        _network_1.$network
            .getHosts()
            .forEach(info => {
            let url = `${protocol}://${info.host}:${port}`;
            dependency_1.logger.log(`${info.name}: \t ${url}`);
        });
    }
    static clean() {
        Application.current = null;
        _emitter = new atma_utils_1.class_EventEmitter;
        return this;
    }
    static create(config) {
        return new Promise((resolve, reject) => {
            new Application(config)
                .promise
                .then(resolve, reject);
        });
        ;
    }
    static isApplication(app) {
        if (app == null || typeof app !== 'object') {
            return false;
        }
        if (typeof app.process === 'function') {
            return true;
        }
        return false;
    }
}
Application.current = null;
Application.on = _emitter.on.bind(_emitter);
Application.off = _emitter.off.bind(_emitter);
Application.once = _emitter.once.bind(_emitter);
Application.trigger = _emitter.trigger.bind(_emitter);
Application.Config = Config_1.default;
;
function responder(app) {
    return function (req, res, next) {
        if (Autoreload_1.Autoreload.enabled) {
            Autoreload_1.Autoreload.watch(req.url, app.config);
        }
        let callback = app._innerPipe != null
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
exports.respond_Raw = respond_Raw;
// function handler_processRaw(app: Application, handler, m_req: Request, m_res: Response) {
//     if (handler instanceof HttpSubApplication) {
//         handler.execute(m_req, m_res);
//         return;
//     }
//     handler.process(m_req, m_res, app.config)
//     if (handler.done == null) {
//         return;
//     }
//     handler.pipe(m_res);
// }
function middleware_processDelegate(middlewareRunner) {
    return function (app, handler, req, res) {
        const startedAt = Date.now();
        middlewareRunner.process(req, res, done, app.config);
        function done(error) {
            if (error) {
                let headers = handler.meta?.headers;
                (0, send_1.send_Error)(req, res, error, headers, app, startedAt);
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
        //resources_load(app), function () {
        callback(app, handler, req, res);
        //});
    });
}
function handler_process(app, handler, req, res) {
    (0, dependency_1.logger)(95)
        .log('<request>', req.url);
    let result = null;
    let startedAt = Date.now();
    try {
        result = handler.process(req, res, app.config);
    }
    catch (error) {
        handler_await(app, handler, req, res, Promise.reject(error), startedAt);
        return;
    }
    if (result != null) {
        if (typeof result.then === 'function') {
            handler_await(app, handler, req, res, result, startedAt);
            return;
        }
        handler_complete(app, handler, req, res, result, startedAt);
        return;
    }
    if (handler.then == null) {
        // Handler responds to the request itself
        return;
    }
    handler_await(app, handler, req, res, handler, startedAt);
}
function handler_processRaw(app, handler, mockReq, mockRes) {
    if (handler instanceof SubApp_1.default) {
        handler.execute(mockReq, mockRes);
        return;
    }
    let result = null;
    try {
        result = handler.process(mockReq, mockRes, app.config);
    }
    catch (error) {
        mockRes.reject(IHttpHandler_1.HttpResponse.ensure(error));
        return;
    }
    if (result != null) {
        IHttpHandler_1.HttpResponse.pipe(mockRes, result);
        return;
    }
    if (handler.then == null) {
        return;
    }
    handler.pipe(mockRes);
}
function handler_await(app, handler, req, res, dfr, startedAt) {
    dfr.then(function onSuccess(mix, statusCode, mimeType, headers) {
        let response;
        if (mix instanceof IHttpHandler_1.HttpResponse === false) {
            response = new IHttpHandler_1.HttpResponse({
                content: mix,
                //@Obsolete - this callback shouldn't support multiple arguments.
                statusCode: statusCode,
                mimeType: mimeType,
                headers: headers,
            });
        }
        else {
            response = mix;
        }
        handler_complete(app, handler, req, res, response, startedAt);
    }, function onError(error, statusCode) {
        error = HttpError_1.HttpErrorUtil.create(error, statusCode);
        if (handler.sendError) {
            handler.sendError(error, req, res, app.config);
            return;
        }
        let headers = null;
        let origins = handler?.meta?.origins;
        if (origins) {
            headers = HttpEndpoint_1.HttpEndpointUtils.getCorsHeaders(req, handler);
        }
        let allHeaders = handler_resolveHeaders(app, handler, headers);
        (0, send_1.send_Error)(req, res, error, allHeaders, app, startedAt);
    });
}
function handler_complete(app, handler, req, res, response, startedAt) {
    let send = handler.send ?? send_1.send_Content;
    let allHeaders = handler_resolveHeaders(app, handler, response.headers);
    response.headers = allHeaders;
    send(req, res, response, app, startedAt);
}
function handler_resolveHeaders(app, handler, overrides = null) {
    let headers_Handler = handler.meta?.headers;
    let headers_App = app.config?.headers;
    if (headers_Handler == null && headers_App == null) {
        return overrides;
    }
    return (0, obj_1.obj_assign)({}, headers_App, headers_Handler, overrides);
}
function cfg_doneDelegate(app) {
    return function (cfg) {
        app.config = cfg;
        if (app.isRoot && (0, app_1.app_isDebug)() !== true) {
            dependency_1.logger.cfg('color', 'none');
        }
        _emitter.trigger('configure', app);
        Autoreload_1.Autoreload.prepare(app);
        (0, exports_1.initializeEmbeddedComponents)(app);
        app
            .handlers
            .registerPages(cfg.pages, cfg.page)
            .registerSubApps(cfg.subapps, cfg.subapp)
            .registerHandlers(cfg.handlers, cfg.handler)
            .registerServices(cfg.services, cfg.service)
            .registerWebsockets(cfg.websockets, cfg.websocket)
            .registerEndpoints(cfg.endpoints);
        app.rewriter.addRules(cfg.rewriteRules);
        app.redirects.addRules(cfg.redirectRules);
        if (app._baseConfig?.processor) {
            app.processor(app._baseConfig.processor);
        }
        Promise.all([
            HttpEndpointExplorer_1.HttpEndpointExplorer.find(app.config.service.endpoints, app.config.base),
            resources_load(app)
        ]).then(function ([endpoints]) {
            if (endpoints) {
                app.handlers.registerServices(endpoints, cfg.handler);
            }
            app.promise.resolve(app);
        });
    };
}
function resources_load(app) {
    if ((0, app_1.app_isDebug)() !== true && app.resources != null) {
        return;
    }
    let config = app.config;
    let base = config.base;
    let env = config.env;
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
    return new Promise((resolve) => {
        app
            .resources
            .done(function (resp) {
            app.lib = (0, dependency_1.obj_extend)(app.lib, resp);
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
exports.default = Application;
//# sourceMappingURL=Application.js.map
//# sourceMappingURL=Application.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpApplication_Application === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpApplication_Application) && __isObj(module.exports)) {
        Object.assign(_src_HttpApplication_Application, module.exports);
    } else {
        _src_HttpApplication_Application = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_app;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_app != null ? _src_util_app : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app_isDebug = void 0;
const Application_1 = _src_HttpApplication_Application;
var Debug;
(function (Debug) {
    Debug[Debug["Unknown"] = 0] = "Unknown";
    Debug[Debug["Yes"] = 1] = "Yes";
    Debug[Debug["No"] = 2] = "No";
})(Debug || (Debug = {}));
let debug = Debug.Unknown;
function app_isDebug() {
    if (debug !== Debug.Unknown) {
        return debug === Debug.Yes;
    }
    const app = Application_1.default.current;
    if (app == null)
        return false;
    var isDebug = Boolean(app.args.debug || app.config.debug);
    if (isDebug !== true) {
        var env = process.env.NODE_ENV || process.env.ENV;
        if (env) {
            isDebug = /^(test|debug)$/i.test(env);
        }
    }
    debug = isDebug ? Debug.Yes : Debug.No;
    return isDebug;
}
exports.app_isDebug = app_isDebug;
;
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util_app === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util_app) && __isObj(module.exports)) {
        Object.assign(_src_util_app, module.exports);
    } else {
        _src_util_app = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpError_HttpError;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpError_HttpError != null ? _src_HttpError_HttpError : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeError = exports.NotFoundError = exports.SecurityError = exports.RequestError = exports.HttpErrorUtil = exports.HttpError = void 0;
const dependency_1 = _src_dependency;
const app_1 = _src_util_app;
class HttpError extends Error {
    constructor(mix, statusCode) {
        super(mix);
        this._error = null;
        this._json = null;
        this.name = 'HttpError';
        this.statusCode = 500;
        this._error = typeof mix === 'string'
            ? new Error(mix)
            : mix;
        this.message = String(this._error.message);
        if (statusCode != null) {
            this.statusCode = statusCode;
        }
        if (this.toJSON == null) {
            Object.assign(this, Methods);
        }
        if (this.toJSON == null) {
            Object.assign(this, Methods);
            this.stack = this._error.stack;
        }
        this.stack = HttpErrorUtil.parseStackTrace(this._error);
    }
    toString() {
        return this.message
            ? this.name + ': ' + this.message
            : this.name;
    }
    toJSON() {
        if (this._json != null)
            return this._json;
        return {
            name: this.name,
            error: this.message,
            code: this.statusCode,
            stack: (0, app_1.app_isDebug)() ? this.stack : void 0
        };
    }
}
exports.HttpError = HttpError;
;
const Methods = {
    toString: function () {
        return this.message
            ? this.name + ': ' + this.message
            : this.name;
    },
    toJSON: function () {
        if (this._json != null)
            return this._json;
        return {
            name: this.name,
            error: this.message,
            code: this.statusCode,
            stack: (0, app_1.app_isDebug)() ? this.stack : void 0
        };
    }
};
var HttpErrorUtil;
(function (HttpErrorUtil) {
    function parseStackTrace(error) {
        if (error == null) {
            return;
        }
        let stack = error.stack.split('\n');
        let imax = stack.length;
        let start = 1;
        let end = imax;
        let cursor = 0;
        let before = true;
        let atmaRgx = /node_modules[\\\/]atma\-/;
        while (++cursor < imax) {
            if (atmaRgx.test(stack[cursor])) {
                if (before) {
                    start = cursor + 1;
                    continue;
                }
                if (before === false) {
                    end = cursor;
                    break;
                }
            }
            before = false;
        }
        return stack[0] + '\n' + stack.slice(start, end).join('\n');
    }
    HttpErrorUtil.parseStackTrace = parseStackTrace;
    function create(mix, statusCode) {
        if ((0, dependency_1.is_String)(mix))
            return new HttpError(mix, statusCode);
        if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/
            return mix;
        if (mix instanceof Error) {
            return new HttpError(mix, statusCode || 500);
        }
        if ((0, dependency_1.is_Object)(mix)) {
            if (mix.toString !== _obj_toString) {
                return new HttpError(mix.toString(), statusCode || mix.statusCode || mix.status);
            }
            let msg = mix.message || mix.error;
            let code = statusCode || mix.statusCode || mix.status;
            let error;
            error = new HttpError(msg, code);
            error._json = mix;
            return error;
        }
        return new exports.RuntimeError('Invalid error object: ' + mix);
    }
    HttpErrorUtil.create = create;
})(HttpErrorUtil = exports.HttpErrorUtil || (exports.HttpErrorUtil = {}));
exports.RequestError = createError('RequestError', 400);
exports.SecurityError = createError('SecurityError', 403);
exports.NotFoundError = createError('NotFoundError', 404);
exports.RuntimeError = createError('RuntimeError', 500);
// PRIVATE
var _obj_toString = Object.prototype.toString;
function createError(id, code) {
    return class extends HttpError {
        constructor(mix, status) {
            super(mix, status);
            this.statusCode = code;
            this.name = id;
        }
    };
}
// export class HttpError {
// 	name = 'HttpError'
// 	_error: Error = null
// 	_json: any = null
// 	constructor (public message, public statusCode = 500){
// 		this._error = Error(message);
// 	}
// 	get stack() {
// 		if (this._error == null)
// 			return;
// 		var stack = this._error.stack.split('\n'),
// 			imax = stack.length,
// 			start = 1,
// 			end = 1;
// 		var rgx = /\[as \w+Error\]/;
// 		while (++end < imax) {
// 			if (rgx.test(stack[end]))
// 				break;
// 		}
// 		stack.splice(1, end - start + 1);
// 		return stack.join('\n');
// 	}
// 	toString () {
// 		return this.message
// 			? this.name + ': ' + this.message
// 			: this.name
// 			;
// 	}
// 	toJSON () {
// 		if (this._json != null)
// 			return this._json;
// 		return {
// 			name: this.name,
// 			error: this.message,
// 			code: this.statusCode
// 		};
// 	}
// 	static create (mix, statusCode?){
// 		if (is_String(mix))
// 			return new HttpError(mix, statusCode);
// 		if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/
// 			return mix;
// 		if (mix instanceof Error) {
// 			let error = new HttpError(mix.message, statusCode || 500);
// 			error._error = mix;
// 			return error;
// 		}
// 		if (is_Object(mix)) {
// 			if (mix.toString !== _obj_toString) {
// 				return new HttpError(
// 					mix.toString() , statusCode || mix.statusCode || mix.status
// 				);
// 			}
// 			var msg = mix.message,
// 				code = statusCode || mix.statusCode || mix.status;
// 			let error = new HttpError(msg, code);
// 			error._json = mix;
// 			return error;
// 		}
// 		return new RuntimeError('Invalid error object: ' + mix);
// 	}
// }
// export class RequestError extends HttpError {
// 	name = 'RequestError'
// 	statusCode = 400
// }
// export class SecurityError extends HttpError {
// 	name = 'SecurityError'
// 	statusCode = 403
// }
// export class NotFoundError extends HttpError {
// 	name = 'NotFoundError'
// 	statusCode = 404
// }
// export class RuntimeError extends HttpError {
// 	name = 'RuntimeError'
// 	statusCode = 500
// }
// const _obj_toString = Object.prototype.toString;
//# sourceMappingURL=HttpError.js.map
//# sourceMappingURL=HttpError.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpError_HttpError === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpError_HttpError) && __isObj(module.exports)) {
        Object.assign(_src_HttpError_HttpError, module.exports);
    } else {
        _src_HttpError_HttpError = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_Barricade;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_Barricade != null ? _src_HttpService_Barricade : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barricade = void 0;
const HttpError_1 = _src_HttpError_HttpError;
class Runner {
    constructor(middlewares) {
        this.middlewares = middlewares;
    }
    process(service, req, res, params) {
        next(this, service, req, res, params, 0);
    }
}
function next(runner, service, req, res, params, index) {
    if (index >= runner.middlewares.length)
        return;
    const fn = runner.middlewares[index];
    const error = fn.call(service, req, res, params, nextDelegate(runner, service, req, res, params, index));
    if (error)
        reject(service, error);
}
function nextDelegate(runner, service, req, res, params, index) {
    return function (error) {
        if (error) {
            reject(service, error);
            return;
        }
        next(runner, service, req, res, params, ++index);
    };
}
function reject(service, error) {
    if (typeof error === 'string')
        error = new HttpError_1.HttpError(error);
    service.reject(error);
}
function Barricade(middlewares) {
    const barricade = new Runner(middlewares);
    return function (req, res, params) {
        barricade.process(this, req, res, params);
    };
}
exports.Barricade = Barricade;
;
//# sourceMappingURL=Barricade.js.map
//# sourceMappingURL=Barricade.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_Barricade === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_Barricade) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_Barricade, module.exports);
    } else {
        _src_HttpService_Barricade = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_HttpService != null ? _src_HttpService_HttpService : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependency_1 = _src_dependency;
const HttpError_1 = _src_HttpError_HttpError;
const utils_1 = _src_HttpService_utils;
const Barricade_1 = _src_HttpService_Barricade;
const atma_utils_1 = require("atma-utils");
const IHttpHandler_1 = _src_IHttpHandler;
const cors_1 = _src_util_cors;
const ruta_1 = require("ruta");
class HttpServiceProto extends atma_utils_1.class_Dfr {
    constructor(route) {
        super();
        if (route == null)
            return;
        let pathParts = route.path, i = 0, imax = pathParts.length, count = 0;
        for (; i < imax; i++) {
            if (typeof pathParts[i] !== 'string')
                break;
            count += pathParts[i].length + 1;
        }
        this.rootCharCount = count;
        if ('secure' in route.value) {
            this.secure = route.value.secure || {};
        }
    }
    help() {
        let routes = this.routes.routes, endpoints = [];
        let i = -1, imax = routes.length, endpoint, info, meta;
        while (++i < imax) {
            endpoint = routes[i];
            info = {
                method: endpoint.method || '*',
                path: endpoint.definition
            };
            if (info.path[0] === '$') {
                info.path = info.path.substring(info.path.indexOf(' ') + 1);
            }
            meta = endpoint.value.meta;
            if (meta) {
                info.description = meta.description;
                info.arguments = meta.arguments;
                info.response = meta.response;
                if ('secure' in endpoint.value)
                    info.secure = endpoint.value.secure || true;
            }
            endpoints.push(info);
        }
        return endpoints;
    }
    process(req, res) {
        let iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return Promise.resolve(this.help());
        }
        if ((0, utils_1.secure_canAccess)(req, this.secure) === false) {
            return Promise.reject(new HttpError_1.SecurityError('Access Denied'));
        }
        let path = req.url.substring(this.rootCharCount), entry = this.routes.get(path, req.method);
        if (entry == null && req.method === 'OPTIONS') {
            let headers = this.getOptions(path, req);
            if (headers) {
                res.writeHead(200, headers);
                res.end();
                // Return nothing back to application
                return void 0;
            }
        }
        if (entry == null) {
            let name = this.name || '<service>';
            let url = path || '/';
            let message = `${name}: endpoint not Found: <${req.method}> ${url}`;
            return Promise.reject(new HttpError_1.NotFoundError(message));
        }
        let endpoint = entry.value;
        let meta = endpoint.meta;
        let args = meta && meta.arguments;
        if (meta != null && (0, utils_1.secure_canAccess)(req, meta.secure) === false) {
            return Promise.reject(new HttpError_1.SecurityError('Access Denied'));
        }
        if (args != null) {
            let isGet = req.method === 'GET';
            let isStrict = isGet === false && meta.strict;
            let body = isGet
                ? entry.current.params
                : req.body;
            let error = (0, utils_1.service_validateArgs)(body, args, isStrict);
            if (error) {
                return Promise.reject(new HttpError_1.RequestError(error.message ?? error.toString()));
            }
        }
        let result = endpoint
            .process
            .call(this, req, res, entry.current.params);
        let dfr = result ?? this;
        let promise = new atma_utils_1.class_Dfr();
        dfr.then((mix, statusCode, mimeType, headers) => {
            let response;
            if (mix instanceof IHttpHandler_1.HttpResponse === false) {
                response = new IHttpHandler_1.HttpResponse({
                    content: mix,
                    //@Obsolete - this callback shouldn't support multiple arguments.
                    statusCode: statusCode,
                    mimeType: mimeType,
                    headers: headers,
                });
            }
            else {
                response = mix;
            }
            if (meta != null && meta.origins) {
                let corsHeaders = this.getOptions(path, req);
                response.headers = (0, dependency_1.obj_extend)(response.headers, corsHeaders);
            }
            promise.resolve(response);
        }, error => {
            promise.reject(error);
        });
        return promise;
    }
    getOptions(path, req) {
        let headers = {}, allowedMethods = [], allowedOrigins = '', i = METHODS.length;
        if (this.meta) {
            if (this.meta.headers != null) {
                headers = (0, dependency_1.obj_extend)(headers, this.meta.headers);
            }
            if (this.meta.origins != null) {
                allowedOrigins = this.meta.origins;
            }
        }
        while (--i > -1) {
            let method = METHODS[i];
            let route = this.routes.get(path, method);
            if (route != null) {
                allowedMethods.push(method);
                let endpoint = route.value;
                if (endpoint.meta) {
                    if (endpoint.meta.headers != null) {
                        headers = (0, dependency_1.obj_extend)(headers, endpoint.meta.headers);
                    }
                    if (endpoint.meta.origins != null) {
                        allowedOrigins = endpoint.meta.origins;
                    }
                }
            }
        }
        if (allowedMethods.length === 0) {
            return null;
        }
        let methods = allowedMethods.join(',');
        if (methods.indexOf('OPTIONS') === -1) {
            methods += ',OPTIONS';
        }
        let cors = {
            'Content-Type': 'application/json;charset=utf-8',
            'Allow': methods,
            'Access-Control-Allow-Methods': methods,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': allowedOrigins,
            'Vary': 'Origin',
        };
        (0, dependency_1.obj_extendDefaults)(headers, cors);
        (0, cors_1.cors_rewriteAllowedOrigins)(req, headers);
        return headers;
    }
}
;
const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
function HttpService(mix, ...params) {
    let name, args;
    if (typeof mix === 'string') {
        name = mix;
        args = params;
    }
    else {
        args = [mix, ...params];
    }
    let proto = endpoints_merge(args);
    let routes = new ruta_1.Collection, defs = proto.ruta || proto.routes || proto, path, responder, x;
    for (path in defs) {
        x = defs[path];
        responder = null;
        if ((0, dependency_1.is_Function)(x)) {
            responder = {
                process: x
            };
        }
        if (responder == null && (0, dependency_1.is_Array)(x)) {
            responder = {
                process: (0, Barricade_1.Barricade)(x)
            };
        }
        if (responder == null && (0, dependency_1.is_Object)(x)) {
            responder = x;
        }
        if (responder != null && (0, dependency_1.is_Array)(responder.process))
            responder.process = (0, Barricade_1.Barricade)(responder.process);
        if (responder == null || (0, dependency_1.is_Function)(responder.process) === false) {
            dependency_1.logger.warn('<HttpService> `process` is not a function'
                + path
                + (typeof responder.process));
            continue;
        }
        routes.add(path, responder);
    }
    proto.routes = routes;
    if (name != null) {
        proto.name = name;
    }
    let extendsArr = proto.Extends;
    if (extendsArr) {
        console.warn(`Obsolete: HttpService.Extends is deprecated. Use class instead.`);
        if (Array.isArray(extendsArr)) {
            extendsArr.push(HttpServiceProto);
        }
        else {
            extendsArr = [HttpServiceProto, extendsArr];
        }
    }
    else {
        extendsArr = [HttpServiceProto];
    }
    extendsArr.push(proto);
    return class extends (0, atma_utils_1.mixin)(...extendsArr) {
    };
}
exports.default = HttpService;
HttpService.Barricade = Barricade_1.Barricade;
function endpoints_merge(array) {
    if (array.length === 1)
        return array[0];
    let proto = array[0], ruta = proto.ruta || proto.routes || proto;
    let imax = array.length, i = 0, x, xruta;
    while (++i < imax) {
        x = array[i];
        xruta = x.ruta || x.routes || x;
        for (let key in xruta) {
            if (xruta[key] != null) {
                ruta[key] = xruta[key];
            }
        }
        if (x.ruta == null || x.routes) {
            continue;
        }
        for (let key in x) {
            if (key === 'ruta' || key === 'routes') {
                continue;
            }
            if (x[key] != null) {
                proto[key] = x[key];
            }
        }
    }
    return proto;
}
//# sourceMappingURL=HttpService.js.map
//# sourceMappingURL=HttpService.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_HttpService === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_HttpService) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_HttpService, module.exports);
    } else {
        _src_HttpService_HttpService = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util__format;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util__format != null ? _src_util__format : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$format = void 0;
var $format;
(function ($format) {
    let $size;
    (function ($size) {
        const SIZES = {
            B: 1,
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
            TB: 1024 * 1024 * 1024 * 1024,
            PB: 1024 * 1024 * 1024 * 1024 * 1024
        };
        /**
         * @param {string} fmt 1KB 20MB 5GB
         * @returns {number} size in bytes
         */
        function parse(fmt) {
            if (typeof fmt === 'number') {
                // no parsing required
                return fmt;
            }
            let match = /^(?<value>[\d\.]+)(?<unit>[a-z]+)$/i.exec(fmt.trim());
            if (match == null) {
                throw new Error(`Invalid format: ${fmt}`);
            }
            if (SIZES[match.groups.unit] == null) {
                throw new Error(`Unsupported unit: ${match.groups.unit}`);
            }
            let unitAmount = SIZES[match.groups.unit];
            let amount = parseFloat(match.groups.value);
            return amount * unitAmount;
        }
        $size.parse = parse;
    })($size = $format.$size || ($format.$size = {}));
})($format = exports.$format || (exports.$format = {}));
//# sourceMappingURL=$format.js.map
//# sourceMappingURL=$format.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_util__format === module.exports) {
        // do nothing if
    } else if (__isObj(_src_util__format) && __isObj(module.exports)) {
        Object.assign(_src_util__format, module.exports);
    } else {
        _src_util__format = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_bodyJson;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_middleware_bodyJson != null ? _src_middleware_bodyJson : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyJsonMid = void 0;
const _format_1 = _src_util__format;
const rgxContentType = /^application\/json(;|$)/i;
function BodyJsonMid(config) {
    let MAX_SIZE = _format_1.$format.$size.parse(config?.limit ?? '10MB');
    return function (req, res, next) {
        const method = req.method;
        if (method !== 'POST' && method !== 'PUT') {
            next();
            return;
        }
        const header = req.headers['content-type'];
        if (rgxContentType.test(header) === false) {
            next();
            return;
        }
        let body = '';
        let error = null;
        req.on('data', (chunk) => {
            if (error != null) {
                return;
            }
            body += chunk.toString();
            if (body.length > MAX_SIZE) {
                error = new Error(`Payload size exceeded`);
                next(error);
            }
        });
        req.on('end', () => {
            if (error != null) {
                return;
            }
            try {
                req.body = JSON.parse(body);
                next();
            }
            catch (err) {
                error = err;
                next(error);
            }
        });
    };
}
exports.BodyJsonMid = BodyJsonMid;
;
//# sourceMappingURL=bodyJson.js.map
//# sourceMappingURL=bodyJson.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_middleware_bodyJson === module.exports) {
        // do nothing if
    } else if (__isObj(_src_middleware_bodyJson) && __isObj(module.exports)) {
        Object.assign(_src_middleware_bodyJson, module.exports);
    } else {
        _src_middleware_bodyJson = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_query;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_middleware_query != null ? _src_middleware_query : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMid = void 0;
const ruta_1 = require("ruta");
const deserialize = ruta_1._.query.deserialize;
function QueryMid(req, res, next) {
    const url = req.url;
    const qIdx = url.indexOf('?');
    req.query = qIdx === -1
        ? {}
        : deserialize(url.substring(qIdx + 1));
    next();
}
exports.QueryMid = QueryMid;
;
//# sourceMappingURL=query.js.map
//# sourceMappingURL=query.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_middleware_query === module.exports) {
        // do nothing if
    } else if (__isObj(_src_middleware_query) && __isObj(module.exports)) {
        Object.assign(_src_middleware_query, module.exports);
    } else {
        _src_middleware_query = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Plugins_Static;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Plugins_Static != null ? _src_Plugins_Static : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = _src_util_app;
const Autoreload_1 = _src_Autoreload_Autoreload;
const Application_1 = _src_HttpApplication_Application;
const StaticContent = require('static-content');
Application_1.default.on('configure', function (app) {
    if (app.isRoot === false || (0, app_1.app_isDebug)() === false) {
        return;
    }
    StaticContent.on('file', file => {
        Autoreload_1.Autoreload.watchFile(file);
    });
    Autoreload_1.Autoreload.getWatcher().on('fileChange', (relPath, absPath) => {
        StaticContent.Cache.remove(absPath);
    });
});
exports.default = StaticContent;
//# sourceMappingURL=Static.js.map
//# sourceMappingURL=Static.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_Plugins_Static === module.exports) {
        // do nothing if
    } else if (__isObj(_src_Plugins_Static) && __isObj(module.exports)) {
        Object.assign(_src_Plugins_Static, module.exports);
    } else {
        _src_Plugins_Static = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_static;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_middleware_static != null ? _src_middleware_static : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStaticMid = exports.StaticMid = void 0;
const Static_1 = _src_Plugins_Static;
function StaticMid(config) {
    return Static_1.default.create(config);
}
exports.StaticMid = StaticMid;
;
function createStaticMid(config) {
    return (responder = Static_1.default.create(config));
}
exports.createStaticMid = createStaticMid;
StaticMid.config = function (config) {
    return (responder = Static_1.default.create(config));
};
let responder = null;
//# sourceMappingURL=static.js.map
//# sourceMappingURL=static.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_middleware_static === module.exports) {
        // do nothing if
    } else if (__isObj(_src_middleware_static) && __isObj(module.exports)) {
        Object.assign(_src_middleware_static, module.exports);
    } else {
        _src_middleware_static = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_export;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_middleware_export != null ? _src_middleware_export : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyJson_1 = _src_middleware_bodyJson;
const query_1 = _src_middleware_query;
const static_1 = _src_middleware_static;
exports.default = {
    query: query_1.QueryMid,
    bodyJson: bodyJson_1.BodyJsonMid,
    static: static_1.StaticMid,
    files: static_1.createStaticMid
};
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_middleware_export === module.exports) {
        // do nothing if
    } else if (__isObj(_src_middleware_export) && __isObj(module.exports)) {
        Object.assign(_src_middleware_export, module.exports);
    } else {
        _src_middleware_export = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_handlers_MaskRunner;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_handlers_MaskRunner != null ? _src_handlers_MaskRunner : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerFactory_1 = _src_HandlerFactory;
const HttpPage_1 = _src_HttpPage_HttpPage;
const atma_utils_1 = require("atma-utils");
class MaskRunner extends atma_utils_1.class_Dfr {
    constructor(route, app) {
        super();
        this.route = route;
        this.app = app;
        this.app = app;
        this.route = route;
    }
    process(req, res, config) {
        var url = req.url.replace(/\.\w+$/, '');
        var route = {
            current: this.route.current,
            value: { template: url, master: null }
        };
        var page = new HttpPage_1.default(route, this.app);
        page
            .process(req, res, config)
            .pipe(this);
        return this;
    }
}
;
HandlerFactory_1.default.Handlers.MaskRunner = MaskRunner;
//# sourceMappingURL=MaskRunner.js.map
//# sourceMappingURL=MaskRunner.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_handlers_MaskRunner === module.exports) {
        // do nothing if
    } else if (__isObj(_src_handlers_MaskRunner) && __isObj(module.exports)) {
        Object.assign(_src_handlers_MaskRunner, module.exports);
    } else {
        _src_handlers_MaskRunner = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_handlers_MaskHtml;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_handlers_MaskHtml != null ? _src_handlers_MaskHtml : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandlerFactory_1 = _src_HandlerFactory;
const HttpPage_1 = _src_HttpPage_HttpPage;
class MaskHtml {
    constructor(route, app) {
        this.route = route;
        this.app = app;
    }
    process(req, res, config) {
        var url = req.url;
        var route = {
            current: this.route.current,
            value: {
                template: url,
                master: null,
                isHtmlPage: true
            }
        };
        let page = new HttpPage_1.default(route, this.app);
        return page.process(req, res, config);
    }
}
;
HandlerFactory_1.default.Handlers.MaskHtml = MaskHtml;
//# sourceMappingURL=MaskHtml.js.map
//# sourceMappingURL=MaskHtml.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_handlers_MaskHtml === module.exports) {
        // do nothing if
    } else if (__isObj(_src_handlers_MaskHtml) && __isObj(module.exports)) {
        Object.assign(_src_handlers_MaskHtml, module.exports);
    } else {
        _src_handlers_MaskHtml = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_handlers_export;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_handlers_export != null ? _src_handlers_export : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
_src_handlers_MaskRunner;
_src_handlers_MaskHtml;
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_handlers_export === module.exports) {
        // do nothing if
    } else if (__isObj(_src_handlers_export) && __isObj(module.exports)) {
        Object.assign(_src_handlers_export, module.exports);
    } else {
        _src_handlers_export = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_env_overrides;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_env_overrides != null ? _src_env_overrides : {};
    var module = { exports: exports };

    if (typeof BigInt !== 'undefined' && 'toJSON' in BigInt.prototype === false) {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
}
//# sourceMappingURL=overrides.js.map
//# sourceMappingURL=overrides.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_env_overrides === module.exports) {
        // do nothing if
    } else if (__isObj(_src_env_overrides) && __isObj(module.exports)) {
        Object.assign(_src_env_overrides, module.exports);
    } else {
        _src_env_overrides = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco = exports.StaticContent = exports.clean = exports.middleware = exports.LifecycleEvents = exports.Middleware = exports.HttpEndpoint = exports.HttpResponse = exports.IHttpHandler = exports.HttpService = exports.HandlerFactory = exports.HttpPage = exports.HttpErrorPage = exports.HttpSubApplication = exports.Application = exports.SecurityError = exports.RuntimeError = exports.RequestError = exports.NotFoundError = exports.HttpError = void 0;
const HttpError_1 = _src_HttpError_HttpError;
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return HttpError_1.HttpError; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return HttpError_1.NotFoundError; } });
Object.defineProperty(exports, "RequestError", { enumerable: true, get: function () { return HttpError_1.RequestError; } });
Object.defineProperty(exports, "RuntimeError", { enumerable: true, get: function () { return HttpError_1.RuntimeError; } });
Object.defineProperty(exports, "SecurityError", { enumerable: true, get: function () { return HttpError_1.SecurityError; } });
const IHttpHandler_1 = _src_IHttpHandler;
Object.defineProperty(exports, "IHttpHandler", { enumerable: true, get: function () { return IHttpHandler_1.IHttpHandler; } });
Object.defineProperty(exports, "HttpResponse", { enumerable: true, get: function () { return IHttpHandler_1.HttpResponse; } });
const HandlerFactory_1 = _src_HandlerFactory;
exports.HandlerFactory = HandlerFactory_1.default;
const HttpErrorPage_1 = _src_HttpPage_HttpErrorPage;
exports.HttpErrorPage = HttpErrorPage_1.default;
const HttpPage_1 = _src_HttpPage_HttpPage;
exports.HttpPage = HttpPage_1.default;
const Application_1 = _src_HttpApplication_Application;
exports.Application = Application_1.default;
const SubApp_1 = _src_HttpApplication_SubApp;
exports.HttpSubApplication = SubApp_1.default;
const HttpService_1 = _src_HttpService_HttpService;
exports.HttpService = HttpService_1.default;
const HttpEndpoint_1 = _src_HttpService_HttpEndpoint;
Object.defineProperty(exports, "HttpEndpoint", { enumerable: true, get: function () { return HttpEndpoint_1.HttpEndpoint; } });
const export_1 = _src_middleware_export;
exports.Middleware = export_1.default;
_src_handlers_export;
const HttpEndpointDecos_1 = _src_HttpService_HttpEndpointDecos;
const LifecycleEvents_1 = _src_HttpApplication_LifecycleEvents;
Object.defineProperty(exports, "LifecycleEvents", { enumerable: true, get: function () { return LifecycleEvents_1.LifecycleEvents; } });
_src_env_overrides;
exports.middleware = export_1.default;
exports.clean = Application_1.default.clean;
exports.StaticContent = require('static-content');
exports.deco = {
    route: HttpEndpointDecos_1.HttpEndpointDecos.route,
    origin: HttpEndpointDecos_1.HttpEndpointDecos.origin,
    middleware: HttpEndpointDecos_1.HttpEndpointDecos.middleware,
    isAuthorized: HttpEndpointDecos_1.HttpEndpointDecos.isAuthorized,
    isInRole: HttpEndpointDecos_1.HttpEndpointDecos.isInRole,
    hasClaim: HttpEndpointDecos_1.HttpEndpointDecos.hasClaim,
    fromUri: HttpEndpointDecos_1.HttpEndpointDecos.fromUri,
    fromBody: HttpEndpointDecos_1.HttpEndpointDecos.fromBody,
    response: HttpEndpointDecos_1.HttpEndpointDecos.response,
    description: HttpEndpointDecos_1.HttpEndpointDecos.description,
    createDecorator: HttpEndpointDecos_1.HttpEndpointDecos.createDecorator,
};
//# sourceMappingURL=export.js.map
//# sourceMappingURL=export.ts.map

}));
