(function (root, factory) {
    'use strict';


    factory(global, module, module.exports);

    const server = module.exports;

    if (global.atma == null) {
        global.atma = {}
    }
    if (global.atma.server) {
        Object.assign(global.atma.server, server);
    } else {
        global.atma.server = server;
    }
    
}(this, function (global, module, exports) {
    'use strict';

    var _node_modules_memd_lib_memd = {};
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
var _src_HttpService_CrudWrapper = {};
var _src_HttpService_HttpEndpoint = {};
var _src_HttpService_HttpEndpointDecos = {};
var _src_HttpService_HttpEndpointExplorer = {};
var _src_HttpService_HttpEndpointParamUtils = {};
var _src_HttpService_HttpService = {};
var _src_HttpService_static = {};
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
var _src_middleware_export = {};
var _src_middleware_query = {};
var _src_middleware_static = {};
var _src_util_FormDataUtil = {};
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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.AppConfig = exports.Class = exports.includeLib = exports.include = exports.obj_extendDefaults = exports.obj_extend = exports.is_Object = exports.is_Array = exports.is_Function = exports.is_String = exports.Uri = exports.io = exports.Compo = exports.jmask = exports.mask = void 0;
var Class = require("atma-class");
var logger = require("atma-logger");
exports.logger = logger;
var Utils = require("atma-utils");
var AppConfig = require("appcfg");
exports.AppConfig = AppConfig;
var root = global;
if (root.include == null) {
    require('includejs');
}
var $anyClass = Class;
var $Class = (_b = (_a = $anyClass.default) !== null && _a !== void 0 ? _a : $anyClass.Class) !== null && _b !== void 0 ? _b : $anyClass;
exports.Class = $Class;
exports.mask = root.mask || require('maskjs');
exports.jmask = exports.mask.jmask;
exports.Compo = exports.mask.Compo;
exports.io = root.io && root.io.File ? root.io : require('atma-io');
exports.Uri = Utils.class_Uri;
exports.is_String = Utils.is_String, exports.is_Function = Utils.is_Function, exports.is_Array = Utils.is_Array, exports.is_Object = Utils.is_Object;
exports.obj_extend = Utils.obj_extend, exports.obj_extendDefaults = Utils.obj_extendDefaults;
exports.include = root.include;
exports.includeLib = root.includeLib;
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = exports.Request = void 0;
var atma_utils_1 = require("atma-utils");
var dependency_1 = _src_dependency;
/*
    * Very basic implementation of ClientRequest and -Response.
    * Is used when not the socket but direct request is made
    *
    * app
    *     .execute('service/user/foo', 'get')
    *     .done(function(obj:Any))
    *     .fail(function(err))
    */
var Request = /** @class */ (function () {
    function Request(url, method, body, headers) {
        this.url = url;
        this.method = (method || 'GET').toUpperCase();
        this.body = body;
        this.headers = headers;
    }
    return Request;
}());
exports.Request = Request;
;
var Response = /** @class */ (function (_super) {
    __extends(Response, _super);
    function Response() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.writable = true;
        _this.finished = false;
        _this.body = '';
        _this.headers = {};
        return _this;
    }
    Response.prototype.resolve = function (body, code, mimeType, headers) {
        var _a;
        return _super.prototype.resolve.call(this, body !== null && body !== void 0 ? body : this.body, (_a = code !== null && code !== void 0 ? code : this.statusCode) !== null && _a !== void 0 ? _a : 200, mimeType, headers !== null && headers !== void 0 ? headers : this.headers);
    };
    Response.prototype.reject = function (error, code) {
        var _a, _b;
        return _super.prototype.reject.call(this, error !== null && error !== void 0 ? error : this.body, (_b = (_a = code !== null && code !== void 0 ? code : error.statusCode) !== null && _a !== void 0 ? _a : this.statusCode) !== null && _b !== void 0 ? _b : 500);
    };
    Response.prototype.writeHead = function (code) {
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
    };
    Response.prototype.setHeader = function () {
        // do_Nothing
    };
    Response.prototype.end = function (content) {
        if (this.finished === true) {
            return;
        }
        this.write(content);
        this.finished = true;
        this.writable = false;
        this.resolve(this.body, this.statusCode, null, this.headers);
    };
    /*
        * support String|Buffer|Object
        */
    Response.prototype.write = function (content) {
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
    };
    return Response;
}((0, atma_utils_1.mixin)(atma_utils_1.class_EventEmitter, atma_utils_1.class_Dfr)));
exports.Response = Response;
;
;

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
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var Application_1 = _src_HttpApplication_Application;
var atma_utils_1 = require("atma-utils");
var status_initial = '';
var status_loading = 'loading';
var status_loaded = 'loaded';
var status_errored = 'error';
var HttpSubApplication = /** @class */ (function (_super) {
    __extends(HttpSubApplication, _super);
    function HttpSubApplication(path, mix, parentApp) {
        var _this = _super.call(this) || this;
        _this.status = status_initial;
        _this.app_ = null;
        if (path[0] !== '/')
            path = '/' + path;
        if (path[path.length - 1] !== '/')
            path += '/';
        _this.path_ = path;
        _this.dfr = new atma_utils_1.class_Dfr;
        if (mix instanceof Application_1.default) {
            _this.app_ = mix;
            _this.status = status_loaded;
            return _this;
        }
        var controller;
        if (typeof mix === 'string') {
            controller = mix;
        }
        else {
            controller = mix.controller;
        }
        var that = _this;
        if ((0, dependency_1.is_String)(controller)) {
            _this.status = status_loading;
            var base = parentApp.config.base || parentApp.base || '/';
            dependency_1.include
                .instance(base)
                .setBase(base)
                .js(controller + '::App')
                .done(function (resp) {
                if (resp.App instanceof Application_1.default) {
                    resp
                        .App
                        .done(function (app) {
                        _this.app_ = app;
                        _this.process = _this.handle;
                        _this.status = status_loaded;
                        _this.dfr.resolve();
                    });
                    return;
                }
                that.status = status_errored;
            });
            return _this;
        }
        var definition = mix, configs = definition.configs, config = definition.config;
        if (config == null && configs == null)
            configs = path;
        _this.status = status_loading;
        new Application_1.default({
            configs: configs,
            config: config
        })
            .done(function (app) {
            that.app_ = app;
            that.process = that.handle;
            that.status = status_loaded;
            that.dfr.resolve();
        });
        return _this;
    }
    HttpSubApplication.prototype.process = function (req, res) {
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
    };
    HttpSubApplication.prototype.handle = function (req, res) {
        if (req.url.length < this.path_.length) {
            res.writeHead(301, {
                'Location': this.path_
            });
            res.end();
            return;
        }
        prepairUrl(req, this);
        this.app_.process(req, res);
    };
    /* execute raw request */
    HttpSubApplication.prototype.execute = function (req, res) {
        prepairUrl(req, this);
        (0, Application_1.respond_Raw)(this.app_, req, res);
    };
    return HttpSubApplication;
}(atma_utils_1.class_Dfr));
exports.default = HttpSubApplication;
;
function prepairUrl(req, subapp) {
    req.url = req.url.replace(subapp.path_, '/');
}
;

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
var fn_proxy = function (fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments);
    };
};
exports.fn_proxy = fn_proxy;
var fn_delegate = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args2[_i] = arguments[_i];
        }
        fn.apply(null, 
        /* args_1 + args_2 */
        args.concat(args2));
    };
};
exports.fn_delegate = fn_delegate;
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var HttpPageBase = /** @class */ (function (_super) {
    __extends(HttpPageBase, _super);
    function HttpPageBase(route, app) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.app = app;
        _this.data = {
            id: null,
            env: null
        };
        _this.isHtmlPage = false;
        return _this;
    }
    //mimeType = mime_HTML
    HttpPageBase.prototype.getScripts = function (config) {
        return config.$getScripts(this.data.id);
    };
    HttpPageBase.prototype.getStyles = function (config) {
        return config.$getStyles(this.data.id);
    };
    return HttpPageBase;
}(atma_utils_1.class_Dfr));
exports.default = HttpPageBase;
;
;

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
var dependency_1 = _src_dependency;
exports.LIB_DIR = new dependency_1.Uri('file://' + __dirname + '/');
;

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
;

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
var HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
var HEADER_ALLOW_HEADERS = 'Access-Control-Allow-Headers';
var DEFAULT = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
};
var delimiter = /[ ,]+/g;
function cors_ensure(req, headers) {
    if (headers == null) {
        return;
    }
    var allowOrigin = headers[HEADER_ALLOW_ORIGIN];
    if (allowOrigin == null) {
        return;
    }
    var allowHeaders = headers[HEADER_ALLOW_HEADERS];
    if (allowHeaders == null) {
        headers[HEADER_ALLOW_HEADERS] = req.headers['access-control-request-headers'] || 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';
    }
    var current = req.headers['host'];
    if (current == null) {
        return;
    }
    if (allowOrigin === '*' || delimiter.test(allowOrigin) === false) {
        return;
    }
    var hosts = allowOrigin.split(delimiter);
    for (var i = 0; i < hosts.length; i++) {
        var host = hosts[i];
        var globIndex = host.indexOf('*');
        if (globIndex > -1) {
            host = host.substring(globIndex + 2);
        }
        var index = current.toLowerCase().indexOf(host.toLowerCase());
        if (index + host.length === current.length) {
            headers[HEADER_ALLOW_ORIGIN] = host;
            return;
        }
    }
}
exports.cors_ensure = cors_ensure;
function cors_rewriteAllowedOrigins(req, headers) {
    var origin = req.headers['origin'];
    if (origin == null || origin === '') {
        return;
    }
    var allowedOrigin = headers[HEADER_ALLOW_ORIGIN];
    if (allowedOrigin == null || allowedOrigin === '') {
        return;
    }
    if (allowedOrigin === '*') {
        headers[HEADER_ALLOW_ORIGIN] = origin;
        return;
    }
    var hosts = allowedOrigin.split(' ');
    for (var i = 0; i < hosts.length; i++) {
        var host = hosts[i];
        var globIndex = host.indexOf('*');
        if (globIndex > -1) {
            host = host.substring(globIndex + 2);
        }
        var index = origin.toLowerCase().indexOf(host.toLowerCase());
        if (index + host.length === origin.length) {
            headers[HEADER_ALLOW_ORIGIN] = host;
            return;
        }
    }
}
exports.cors_rewriteAllowedOrigins = cors_rewriteAllowedOrigins;
;

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
var _src_util_send;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_send != null ? _src_util_send : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send_Content = exports.send_Error = exports.send_JSON = exports.send_REDIRECT = void 0;
var atma_utils_1 = require("atma-utils");
var mime_1 = _src_const_mime;
var HttpError_1 = _src_HttpError_HttpError;
var cors_1 = _src_util_cors;
function send_REDIRECT(res, url, code) {
    if (code === void 0) { code = 302; }
    res.statusCode = code;
    res.setHeader('Location', url);
    res.setHeader('Content-Length', '0');
    res.end();
}
exports.send_REDIRECT = send_REDIRECT;
function send_JSON(req, res, json, statusCode, headers, app, startedAt) {
    var str;
    try {
        str = JSON.stringify(json);
    }
    catch (error) {
        return send_Error(req, res, new HttpError_1.RuntimeError("Json Serialization: ".concat(error.message)), null, app, startedAt);
    }
    send_Content(req, res, str, statusCode || 200, mime_1.mime_JSON, headers, app, startedAt);
}
exports.send_JSON = send_JSON;
;
function send_Error(req, res, error, headers, app, startedAt) {
    if (error != null && 'toJSON' in error === false) {
        // indirect check if error is the HttpError instance
        error = HttpError_1.HttpErrorUtil.create(error);
    }
    send_Content(req, res, JSON.stringify(error), error.statusCode || 500, mime_1.mime_JSON, headers, app, startedAt, error);
}
exports.send_Error = send_Error;
;
function send_Content(req, res, content, statusCode, mimeType, headers, app, startedAt, error) {
    if (typeof content !== 'string' && content instanceof Buffer === false) {
        if (content instanceof Error) {
            send_Error(req, res, content, headers, app, startedAt);
            return;
        }
        if ((0, atma_utils_1.is_Object)(content)) {
            send_JSON(req, res, content, statusCode, headers, app, startedAt);
            return;
        }
        send_Error(req, res, new HttpError_1.RuntimeError('Unexpected content response'), headers, app, startedAt);
        return;
    }
    res.setHeader('Content-Type', mimeType || mime_1.mime_HTML);
    res.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 200;
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
            app === null || app === void 0 ? void 0 : app.lifecycle.completeHandlerSuccess(startedAt, req, res);
        }
        else {
            if (error == null && typeof content === 'string') {
                error = new Error("Undefined error: ".concat(content.substring(0, 400)));
            }
            app === null || app === void 0 ? void 0 : app.lifecycle.completeHandlerError(startedAt, req, res, error);
        }
    }
    res.end(content);
}
exports.send_Content = send_Content;
;
;

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
var send_1 = _src_util_send;
var HttpContext = /** @class */ (function () {
    function HttpContext(page, config, req, res) {
        this.page = page;
        this.config = config;
        this.req = req;
        this.res = res;
    }
    HttpContext.prototype.redirect = function (url, code) {
        if (code === void 0) { code = 302; }
        (0, send_1.send_REDIRECT)(this.res, url, code);
        this._redirect = url;
    };
    HttpContext.prototype.rewrite = function (url) {
        this._rewrite = url;
    };
    return HttpContext;
}());
exports.default = HttpContext;
;

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
var _src_Business_Middleware;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Business_Middleware != null ? _src_Business_Middleware : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var MiddlewareRunner = /** @class */ (function () {
    function MiddlewareRunner(arr) {
        this.arr = arr;
        this.arr = arr;
    }
    MiddlewareRunner.prototype.process = function (req, res, callback, config) {
        next(this, req, res, callback, config, 0);
    };
    MiddlewareRunner.prototype.add = function (mix) {
        var _this = this;
        if (mix == null) {
            return this;
        }
        if (typeof mix === 'function') {
            this.arr.push(mix);
            return this;
        }
        if (Array.isArray(mix)) {
            mix.forEach(function (midd) { return _this.add(midd); });
            return this;
        }
        throw new Error("Middleware must be a function.");
    };
    MiddlewareRunner.create = function (arr) {
        if (arr == null) {
            return null;
        }
        return new MiddlewareRunner(arr);
    };
    return MiddlewareRunner;
}());
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
        if (result === null || result === void 0 ? void 0 : result.done) {
            callback(null, req, res);
            return;
        }
        next(runner, req, res, callback, config, ++index);
    };
}
;

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
var _src_HttpPage_page_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpPage_page_utils != null ? _src_HttpPage_page_utils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageError_failDelegate = exports.pageError_sendDelegate = exports.page_processPartial = exports.page_process = exports.page_pathAddAlias = exports.page_resolve = exports.page_processRequest = exports.page_processRequestDelegate = exports.page_rewriteDelegate = exports.page_Create = void 0;
var Application_1 = _src_HttpApplication_Application;
var HttpPage_1 = _src_HttpPage_HttpPage;
var HttpContext_1 = _src_HttpPage_HttpContext;
var dependency_1 = _src_dependency;
var Middleware_1 = _src_Business_Middleware;
var send_1 = _src_util_send;
var mime_1 = _src_const_mime;
var ruta_1 = require("ruta");
var page_Create = function (classProto) {
    if (classProto.middleware) {
        classProto.middleware = new Middleware_1.default(classProto.middleware);
    }
    if (classProto.Base == null) {
        classProto.Base = HttpPage_1.default;
    }
    else if (classProto.Extends == null) {
        classProto.Extends = HttpPage_1.default;
    }
    else if (Array.isArray(classProto.Extends)) {
        classProto.Extends.push(HttpPage_1.default);
    }
    else {
        classProto.Extends = [HttpPage_1.default, classProto.Extends];
    }
    return (0, dependency_1.Class)(classProto);
};
exports.page_Create = page_Create;
var page_rewriteDelegate = function (page) {
    var ctx = page.ctx;
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
            .then(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return page.resolve.apply(page, args);
        }, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return page.reject.apply(page, args);
        });
    };
};
exports.page_rewriteDelegate = page_rewriteDelegate;
var page_processRequestDelegate = function (page, req, res, config) {
    return function (error) {
        if (error) {
            page.reject(error);
            return;
        }
        (0, exports.page_processRequest)(page, req, res, config);
    };
};
exports.page_processRequestDelegate = page_processRequestDelegate;
var page_processRequest = function (page, req, res, config) {
    if (page.pattern) {
        var query = (0, ruta_1.parse)(page.pattern, req.url).params;
        for (var key in query) {
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
        var user = req.user, secure = page.data.secure, role = typeof secure === 'object' && secure.role || null;
        if (user == null || (role && user.isInRole(role)) === false) {
            page.ctx.redirect(Application_1.default.current.config.page.urls.login);
            return page;
        }
    }
    return page._load();
};
exports.page_processRequest = page_processRequest;
var page_resolve = function (page, data) {
    if (page.ctx._redirect != null) {
        // response was already flushed
        return;
    }
    page.resolve(data);
};
exports.page_resolve = page_resolve;
var page_pathAddAlias = function (path, alias) {
    if (path == null || path === '')
        return null;
    var i = path.indexOf('::');
    if (i !== -1)
        path = path.slice(0, -i);
    return path + '::' + alias;
};
exports.page_pathAddAlias = page_pathAddAlias;
var page_process = function (page, nodes, onSuccess) {
    dependency_1.mask
        .renderAsync(nodes, page.model, page.ctx, null, page)
        .done(function (html) {
        if (page.ctx._rewrite != null) {
            Application_1.default
                .current
                .handlers
                .get(page.ctx._rewrite, {}, (0, exports.page_rewriteDelegate)(page));
            return;
        }
        onSuccess(html);
    })
        .fail(page.rejectDelegate());
};
exports.page_process = page_process;
var page_processPartial;
exports.page_processPartial = page_processPartial;
(function () {
    exports.page_processPartial = page_processPartial = function (page, nodes, selectors) {
        nodes = __getTemplate(page, nodes, selectors);
        __getResources(page, page.ctx.config, function (meta) {
            if (meta.templates) {
                var node = dependency_1.mask.jmask(':html').text(meta.templates);
                nodes.push(node);
            }
            (0, exports.page_process)(page, nodes, function (html) {
                var json = {
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
        var arr = [], selectors = selector.split(';'), imax = selectors.length, i = -1, x;
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
        var styles = Styles.getModel(page, config, true);
        Scripts.getModel(page, config, true, function (scripts) {
            cb({
                scripts: scripts.scripts,
                styles: styles
            });
        });
    }
    var Scripts, Styles;
}());
var pageError_sendDelegate = function (req, res, error, app) {
    return function (html) {
        (0, send_1.send_Content)(req, res, html, error.statusCode || 500, mime_1.mime_HTML, null, app, 0);
    };
};
exports.pageError_sendDelegate = pageError_sendDelegate;
var pageError_failDelegate = function (req, res, error, app) {
    return function (internalError) {
        var str = (0, dependency_1.is_Object)(internalError)
            ? JSON.stringify(internalError)
            : internalError;
        str += '\nError: ' + error.message;
        (0, send_1.send_Content)(req, res, 'ErrorPage Failed: ' + str, 500, mime_1.mime_PLAIN, null, app, 0);
    };
};
exports.pageError_failDelegate = pageError_failDelegate;
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var HttpError_1 = _src_HttpError_HttpError;
var vars_1 = _src_vars;
var fn_1 = _src_util_fn;
var HttpPageBase_1 = _src_HttpPage_HttpPageBase;
var page_utils_1 = _src_HttpPage_page_utils;
var HttpErrorPage = /** @class */ (function (_super) {
    __extends(HttpErrorPage, _super);
    function HttpErrorPage(error, pageData, config) {
        var _this = _super.call(this, null, null) || this;
        _this._setPageData(pageData, config);
        _this.model = error;
        return _this;
    }
    HttpErrorPage.prototype._setPageData = function (data, cfg) {
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
    };
    HttpErrorPage.send = function (error, req, res, config) {
        var pageCfg = config.page, errorPages = pageCfg.errors, genericPage = pageCfg.error;
        var pageData = (errorPages && errorPages[error.statusCode]) || genericPage;
        if (pageData == null) {
            pageData = {
                masterPath: '',
                templatePath: vars_1.LIB_DIR.combine('../pages/error/error.mask').toString()
            };
        }
        return new HttpErrorPage(error, pageData, config).process(req, res, config);
    };
    HttpErrorPage.prototype.process = function (req, res, config) {
        this
            .done((0, page_utils_1.pageError_sendDelegate)(req, res, this.model, this.app))
            .fail((0, page_utils_1.pageError_failDelegate)(req, res, this.model, this.app));
        (0, page_utils_1.page_processRequest)(this, req, res, config);
    };
    HttpErrorPage.prototype._load = function () {
        this.resource = dependency_1.include
            .instance()
            .load((0, page_utils_1.page_pathAddAlias)(this.masterPath, 'Master'), (0, page_utils_1.page_pathAddAlias)(this.templatePath, 'Template'))
            .js((0, page_utils_1.page_pathAddAlias)(this.compoPath, 'Compo'))
            .done((0, fn_1.fn_proxy)(this._response, this));
        return this;
    };
    HttpErrorPage.prototype._response = function (resp) {
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
    };
    return HttpErrorPage;
}(HttpPageBase_1.default));
;
exports.default = HttpErrorPage;
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var HttpError_1 = _src_HttpError_HttpError;
var fn_1 = _src_util_fn;
var HttpPageBase_1 = _src_HttpPage_HttpPageBase;
var HttpErrorPage_1 = _src_HttpPage_HttpErrorPage;
var page_utils_1 = _src_HttpPage_page_utils;
var HttpPage = /** @class */ (function (_super) {
    __extends(HttpPage, _super);
    function HttpPage(route, app) {
        var _this = _super.call(this, route, app) || this;
        if (route == null || route.value == null) {
            dependency_1.logger.error('<HttpPage> Route value is undefined');
            return _this;
        }
        var cfg = app.config, data = route.value;
        _this.query = route.current && route.current.params;
        _this._setPageData(data, cfg);
        return _this;
    }
    HttpPage.prototype._setPageData = function (data, cfg) {
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
    };
    HttpPage.prototype.process = function (req, res, config) {
        if (this.middleware == null)
            return (0, page_utils_1.page_processRequest)(this, req, res, config);
        this.middleware.process(req, res, (0, page_utils_1.page_processRequestDelegate)(this, req, res, config), config);
        return this;
    };
    HttpPage.prototype.sendError = function (error, req, res, config) {
        HttpErrorPage_1.default.send(error, req, res, config);
    };
    HttpPage.prototype._load = function () {
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
    };
    HttpPage.prototype._response = function (resp) {
        var _this = this;
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
                .then(function (html) { return _this.resolve(html); }, function (error) { return _this.reject(error); });
            return;
        }
        (0, page_utils_1.page_process)(this, nodes, (0, fn_1.fn_delegate)(page_utils_1.page_resolve, this));
    };
    HttpPage.create = function (mix) {
        return (0, page_utils_1.page_Create)(mix);
    };
    return HttpPage;
}(HttpPageBase_1.default));
exports.default = HttpPage;
;

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
var page_flatternPageViewRoutes = function (pages, pageCfg) {
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
function split(page, segments, prevSegment) {
    if (prevSegment === void 0) { prevSegment = null; }
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
;

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
var Uri = require('atma-utils').class_Uri;
var path_hasProtocol = function (path) {
    return /^(file|https?):/.test(path);
};
exports.path_hasProtocol = path_hasProtocol;
var path_normalize = function (path) {
    return path
        .replace(/\\/g, '/')
        // remove double slashes, but not near protocol
        .replace(/([^:\/])\/{2,}/g, '$1/');
};
exports.path_normalize = path_normalize;
var path_resolveSystemUrl = function (path, base) {
    if (base === void 0) { base = null; }
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
;

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
var _src_HandlerFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HandlerFactory != null ? _src_HandlerFactory : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = _src_HttpApplication_Application;
var SubApp_1 = _src_HttpApplication_SubApp;
var HttpPage_1 = _src_HttpPage_HttpPage;
var dependency_1 = _src_dependency;
var page_1 = _src_util_page;
var path_1 = _src_util_path;
var app_1 = _src_util_app;
var atma_utils_1 = require("atma-utils");
var ruta_1 = require("ruta");
var fns_RESPONDERS = [
    'subapps',
    'handlers',
    'services',
    'pages'
];
var HandlerFactory = /** @class */ (function () {
    function HandlerFactory(app) {
        this.app = app;
        this.subapps = new ruta_1.Collection();
        this.handlers = new ruta_1.Collection();
        this.services = new ruta_1.Collection();
        this.pages = new ruta_1.Collection();
    }
    HandlerFactory.prototype.registerPages = function (pages_, pageCfg) {
        var pages = (0, page_1.page_flatternPageViewRoutes)(pages_, pageCfg), id, page;
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
    };
    HandlerFactory.prototype.registerHandlers = function (routes, handlerCfg) {
        for (var key in routes) {
            this.registerHandler(key, routes[key], handlerCfg);
        }
        return this;
    };
    HandlerFactory.prototype.registerHandler = function (path, handler, handlerCfg) {
        if ((0, dependency_1.is_String)(handler)) {
            handler = {
                controller: handler_path(handler, handlerCfg)
            };
        }
        this
            .handlers
            .add(path, handler);
    };
    HandlerFactory.prototype.registerSubApps = function (routes, subAppCfg) {
        for (var key in routes) {
            this.registerSubApp(key, routes[key], subAppCfg);
        }
        return this;
    };
    HandlerFactory.prototype.registerSubApp = function (name, data, subAppCfg) {
        var route = name;
        if (route[0] !== '^') {
            if (route[0] !== '/')
                route = '/' + route;
            route = '^' + route;
        }
        this
            .subapps
            .add(route, new SubApp_1.default(name, data, this.app));
    };
    HandlerFactory.prototype.registerServices = function (routes, serviceCfg) {
        for (var key in routes) {
            this.registerService(key, routes[key], serviceCfg);
        }
        return this;
    };
    HandlerFactory.prototype.registerService = function (path, service, serviceCfg) {
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
        if ((0, dependency_1.is_String)(service.controller))
            service.controller = handler_path(service.controller, serviceCfg);
        this
            .services
            .add(path, service);
    };
    HandlerFactory.prototype.registerWebsockets = function (routes, websocketCfg) {
        for (var namespace in routes) {
            this.registerWebsocket(namespace, routes[namespace]);
        }
        return this;
    };
    HandlerFactory.prototype.registerWebsocket = function (namespace, handler, handlerCfg) {
        if (handlerCfg === void 0) { handlerCfg = null; }
        var socket = this.app.webSockets;
        if ((0, dependency_1.is_String)(handler)) {
            var path = handler_path(handler, handlerCfg);
            dependency_1.include
                .instance()
                .js(handler + '::Handler')
                .done(function (resp) {
                socket.registerHandler(namespace, resp.Handler);
            });
            return;
        }
        socket.registerHandler(namespace, handler);
    };
    HandlerFactory.prototype.get = function (app, req, callback) {
        var url = req.url, method = req.method, base = app.config.base, route;
        if (method === 'POST' && req.body && req.body._method) {
            method = req.body._method;
        }
        var imax = fns_RESPONDERS.length, i = -1;
        while (++i < imax) {
            var x = fns_RESPONDERS[i];
            if (processor_tryGet(this, this[x], url, method, base, callback)) {
                return;
            }
        }
        if (this.app !== Application_1.default.current) {
            // check handlers of the root application
            var factory = Application_1.default.current.handlers, cfg = Application_1.default.current.config;
            var hasHandler = processor_tryGet(factory, factory.handlers, url, method, cfg.base || base, callback);
            if (hasHandler) {
                return;
            }
        }
        callback(null);
    };
    HandlerFactory.prototype.has = function (url, method) {
        var imax = fns_RESPONDERS.length, i = -1;
        while (++i < imax) {
            if (this[fns_RESPONDERS[i]].get(url, method) != null)
                return true;
        }
        return false;
    };
    HandlerFactory.Handlers = {};
    return HandlerFactory;
}());
exports.default = HandlerFactory;
;
function processor_tryGet(factory, collection, url, method, base, callback) {
    var route = collection.get(url, method);
    if (route == null)
        return false;
    var controller = route.value.controller || route.value;
    if (controller == null) {
        dependency_1.logger.error('<routing> no controller', url);
        return false;
    }
    if ((0, dependency_1.is_Function)(controller)) {
        callback(new controller(route, factory.app));
        return true;
    }
    if ((0, dependency_1.is_String)(controller)) {
        var path = (0, path_1.path_hasProtocol)(controller)
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
var COUNTER = 0;
function processor_loadAndInit(factory, url, route, callback) {
    if (memory_canResolve(url)) {
        memory_resolve(factory, url, route, callback);
        return;
    }
    var key = "Handler".concat(++COUNTER);
    factory
        .app
        .resources
        .js(url + "::".concat(key))
        .done(function (resp) {
        var _a;
        var Handler = resp[key];
        if (Handler == null) {
            dependency_1.logger.error('<handler> invalid route', url);
            callback(new ErrorHandler('Invalid route: ' + url));
            return;
        }
        if (typeof Handler.default === 'function') {
            Handler = Handler.default;
        }
        if (!(0, dependency_1.is_Function)((_a = Handler.prototype) === null || _a === void 0 ? void 0 : _a.process)) {
            var msg = "\n                    Invalid default exported interface from ".concat(url, ". Did you used default export/inherited the HttpEndpoint\n                ").trim();
            dependency_1.logger.error("<handler> ".concat(msg));
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
var memory_canResolve, memory_resolve;
(function () {
    var rgx = /\/\{(self|global)\}.?/;
    memory_canResolve = function (url) {
        return rgx.test(url);
    };
    memory_resolve = function (factory, url, route, callback) {
        var match = rgx.exec(url), str = match[0], type = match[1], path = url.substring(match.index + match[0].length), memory = getContext(type), Handler = (0, atma_utils_1.obj_getProperty)(memory, path);
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
    var location = config && config.location;
    if (location == null) {
        dependency_1.logger
            .error('<Handler> Path is relative but no location. Set handler: {location: X} in config')
            .error(path, config);
        return path;
    }
    var template = path.split('/');
    var route = location.split(/[\{\}]/g);
    path = route[0];
    for (var i = 1; i < route.length; i++) {
        if (i % 2 === 0) {
            path += route[i];
            continue;
        }
        /** if template provides less "breadcrumbs" than needed -
         * take always the last one for failed peaces */
        var index = route[i] << 0;
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
var ErrorHandler = /** @class */ (function (_super) {
    __extends(ErrorHandler, _super);
    function ErrorHandler(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    ErrorHandler.prototype.process = function () {
        var _a;
        return this.reject((_a = this.message) !== null && _a !== void 0 ? _a : 'Invalid Routing');
    };
    return ErrorHandler;
}(atma_utils_1.class_Dfr));
;
;

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
var dependency_1 = _src_dependency;
var WebSocket = /** @class */ (function () {
    function WebSocket(app) {
        this.app = app;
        this.SocketListeners = {};
        this.io = null;
        this.ioSsl = null;
    }
    WebSocket.prototype.listen = function (httpServer) {
        this.listen = doNothing;
        dependency_1.logger.log('Web socket opened'.green.bold);
        this.io = io_create(httpServer, this.SocketListeners);
    };
    WebSocket.prototype.listenSsl = function (httpsServer) {
        this.listenSsl = doNothing;
        dependency_1.logger.log('Wsl socket opened'.green.bold);
        this.ioSsl = io_create(httpsServer, this.SocketListeners);
    };
    WebSocket.prototype.hasHandlers = function () {
        return Object.keys(this.SocketListeners).length !== 0;
    };
    WebSocket.prototype.getHandler = function (namespace) {
        return this.SocketListeners[namespace];
    };
    WebSocket.prototype.registerHandler = function (namespace, Handler) {
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
    };
    WebSocket.prototype.clients = function (namespace) {
        var clients = [];
        if (this.io) {
            var nsp = this.io.of(namespace);
            for (var id in nsp.connected) {
                clients.push(nsp.connected[id]);
            }
        }
        if (this.ioSsl) {
            var nsp = this.ioSsl.of(namespace);
            for (var id in nsp.connected) {
                clients.push(nsp.connected[id]);
            }
        }
        return clients;
    };
    // of (namespace){
    // 	return this.io == null
    // 		? null
    // 		: this.io.of(namespace);
    // }
    WebSocket.prototype.emit = function (namespace) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cb = args[args.length - 1];
        if (this.io == null && this.ioSsl === null) {
            console.error('Emitting to the websockets (%s), but server is not started', namespace);
            cb === null || cb === void 0 ? void 0 : cb({ message: 'Server is not started' });
            return;
        }
        if (this.SocketListeners[namespace] == null) {
            console.error('No handlers are bound to the namespace', namespace);
            cb === null || cb === void 0 ? void 0 : cb({ message: 'No handlers' });
            return;
        }
        if (typeof cb === 'function') {
            args.pop();
            io_emitMany(this.clients(namespace), args, cb);
            return;
        }
        if (this.io != null) {
            var nsp = this.io.of(namespace);
            nsp.emit.apply(nsp, args);
        }
        if (this.ioSsl != null) {
            var nsp = this.ioSsl.of(namespace);
            nsp.emit.apply(nsp, args);
        }
    };
    return WebSocket;
}());
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
;

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
var _node_modules_memd_lib_memd;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_memd_lib_memd != null ? _node_modules_memd_lib_memd : {};
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
var _src_persistance_FsTransport = {};
var _src_persistance_LocalStorageTransport = {};
var _src_persistance_StoreWorker = {};
var _src_persistance_TransportWorker = {};
var _src_workers_CachedWorker = {};

// source ./ModuleSimplified.js
var _src_fn_Args;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
var Args;
(function (Args) {
    function getKey(args) {
        var key = '';
        for (var i = 0; i < args.length; i++) {
            if (i > 0) {
                key += '.';
            }
            key += getKeySingle(args[i]);
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc) {
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
            return getKey(misc);
        }
        var str = '';
        for (var key in misc) {
            str += '.' + getKeySingle(misc[key]);
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_Args) && isObject(module.exports)) {
		Object.assign(_src_fn_Args, module.exports);
		return;
	}
	_src_fn_Args = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_TransportWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportWorker = void 0;
var TransportWorker = /** @class */ (function () {
    function TransportWorker(cache, transport) {
        var _this = this;
        var _a;
        this.cache = cache;
        this.transport = transport;
        this.isReady = false;
        this.isAsync = false;
        this.lastModified = null;
        this.restorePromise = null;
        // We duplicate collection, as Cache collections can store also promises.
        this.coll = {};
        this.isAsync = Boolean(this.transport.isAsync);
        this.flushRunner = new AsyncRunner(function () { return _this.flushInner(); }, (_a = this.transport.debounceMs) !== null && _a !== void 0 ? _a : 500);
    }
    TransportWorker.prototype.restore = function () {
        if (this.isReady) {
            return;
        }
        if (this.isAsync) {
            throw new Error('Transport is Async');
        }
        var coll = this.transport.restore();
        this.cache.setRestored(coll);
        this.coll = coll !== null && coll !== void 0 ? coll : {};
        this.isReady = true;
    };
    TransportWorker.prototype.restoreAsync = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.restorePromise) !== null && _a !== void 0 ? _a : (this.restorePromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var coll;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (this.isReady) {
                                        return [2 /*return*/];
                                    }
                                    if (this.isAsync === false) {
                                        this.restore();
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, this.transport.restoreAsync()];
                                case 1:
                                    coll = _a.sent();
                                    if (this.isReady) {
                                        return [2 /*return*/];
                                    }
                                    this.cache.setRestored(coll);
                                    this.coll = coll !== null && coll !== void 0 ? coll : {};
                                    this.isReady = true;
                                    return [2 /*return*/];
                            }
                        });
                    }); })())];
            });
        });
    };
    TransportWorker.prototype.flush = function (key, entry) {
        this.isReady = true;
        this.lastModified = new Date();
        this.coll[key] = entry;
        if (this.transport.debounceMs === 0) {
            this.transport.flush(this.coll);
            return;
        }
        this.flushRunner.run();
    };
    TransportWorker.prototype.flushAsync = function (key, entry, force) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.restoreAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.lastModified = new Date();
                        this.coll[key] = entry;
                        return [2 /*return*/, this.flushRunner.run()];
                }
            });
        });
    };
    TransportWorker.prototype.flushAllAsync = function (force) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.restoreAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.lastModified = new Date();
                        return [2 /*return*/, this.flushRunner.run(force)];
                }
            });
        });
    };
    TransportWorker.prototype.clear = function () {
        return this.flushRunner.run();
    };
    TransportWorker.prototype.clearAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.clear()];
            });
        });
    };
    TransportWorker.prototype.flushInner = function () {
        var coll = this.coll;
        if (this.transport.isAsync) {
            return this.transport.flushAsync(coll);
        }
        this.transport.flush(coll);
    };
    return TransportWorker;
}());
exports.TransportWorker = TransportWorker;
var AsyncRunner = /** @class */ (function () {
    function AsyncRunner(fn, debounce) {
        this.fn = fn;
        this.debounce = debounce;
        this.isWaiting = false;
        this.isBusy = false;
        this.timeout = null;
        this.shouldRunNext = false;
    }
    AsyncRunner.prototype.run = function (force) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (this.isWaiting && !this.isBusy) {
                    this.defer(force);
                    return [2 /*return*/, this.dfr.promise];
                }
                if (this.isBusy) {
                    this.shouldRunNext = true;
                    return [2 /*return*/, this.dfr.promise];
                }
                this.isWaiting = true;
                this.isBusy = false;
                this.dfr = new Deferred;
                this.defer(force);
                return [2 /*return*/, this.dfr.promise];
            });
        });
    };
    AsyncRunner.prototype.defer = function (force) {
        var _this = this;
        if (this.isWaiting) {
            clearTimeout(this.timeout);
        }
        if (force === true) {
            this.runInner();
            return;
        }
        this.timeout = setTimeout(function () { return _this.runInner(); }, this.debounce);
    };
    AsyncRunner.prototype.reset = function () {
        clearTimeout(this.timeout);
        this.isWaiting = false;
        this.isBusy = false;
        this.shouldRunNext = false;
    };
    AsyncRunner.prototype.runInner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, runNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isWaiting = false;
                        this.isBusy = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fn()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Transport error', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        runNext = this.shouldRunNext;
                        this.dfr.resolve(null);
                        this.reset();
                        if (runNext) {
                            this.run();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AsyncRunner;
}());
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_TransportWorker) && isObject(module.exports)) {
		Object.assign(_src_persistance_TransportWorker, module.exports);
		return;
	}
	_src_persistance_TransportWorker = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_StoreWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreWorker = void 0;
var StoreWorker = /** @class */ (function () {
    function StoreWorker(store, options) {
        if (options === void 0) { options = {}; }
        this.store = store;
        this.options = options;
        this.isAsync = false;
        this.doNotWaitSave = false;
        this.isAsync = this.store.getAsync != null;
        this.doNotWaitSave = (options === null || options === void 0 ? void 0 : options.doNotWaitSave) === true;
    }
    StoreWorker.prototype.get = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.store.get(key);
    };
    StoreWorker.prototype.getAsync = function (key) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.store).getAsync.apply(_a, __spreadArray([key], args, false));
    };
    StoreWorker.prototype.save = function (key, val) {
        this.store.save(key, val);
    };
    StoreWorker.prototype.saveAsync = function (key, val) {
        var promise = this.store.saveAsync(key, val);
        if (this.doNotWaitSave === true) {
            return null;
        }
        return promise;
    };
    StoreWorker.prototype.clear = function (key) {
        this.store.clear(key);
    };
    StoreWorker.prototype.clearAsync = function (key) {
        return this.store.clearAsync(key);
    };
    return StoreWorker;
}());
exports.StoreWorker = StoreWorker;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_StoreWorker) && isObject(module.exports)) {
		Object.assign(_src_persistance_StoreWorker, module.exports);
		return;
	}
	_src_persistance_StoreWorker = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Cache;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
var Args_1 = _src_fn_Args;
var TransportWorker_1 = _src_persistance_TransportWorker;
var StoreWorker_1 = _src_persistance_StoreWorker;
var Cache = /** @class */ (function () {
    function Cache(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        this._cache = {};
        this.isAsync = false;
        if (this.options.monitors) {
            this.onChanged = this.onChanged.bind(this);
            options.monitors.forEach(function (x) { return x.on('change', _this.onChanged); });
        }
        if (this.options.persistance) {
            this._transport = new TransportWorker_1.TransportWorker(this, this.options.persistance);
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
    Cache.prototype.resolveKey = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.keyResolver) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray([_a], args, false));
        return key !== null && key !== void 0 ? key : Args_1.Args.getKey(args);
    };
    Cache.prototype.get = function (key) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._transport != null && this._transport.isReady === false) {
            this._transport.restore();
        }
        var entry = this._cache[key];
        if (entry == null) {
            if (this._store == null) {
                return null;
            }
            entry = (_a = this._store).get.apply(_a, __spreadArray([key], args, false));
            if (entry == null) {
                return null;
            }
        }
        if (this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge) {
            this.clear(key);
            return null;
        }
        return entry.value;
    };
    Cache.prototype.getAsync = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var entry;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._transport != null && this._transport.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._transport.restoreAsync()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        entry = this._cache[key];
                        if (!(entry == null)) return [3 /*break*/, 4];
                        if (this._store == null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, (_a = this._store).getAsync.apply(_a, __spreadArray([key], args, false))];
                    case 3:
                        entry = _b.sent();
                        if (entry == null) {
                            return [2 /*return*/, null];
                        }
                        _b.label = 4;
                    case 4:
                        if (!(this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.clearAsync(key)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/, entry.value];
                }
            });
        });
    };
    Cache.prototype.set = function (key, val) {
        var cached = {
            timestamp: Date.now(),
            value: val
        };
        this._cache[key] = cached;
        this.persist(key, cached, false);
        return val;
    };
    Cache.prototype.persist = function (key, entry, isAsync) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var transport, store, val, isPromise;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        transport = this._transport;
                        store = this._store;
                        if (transport == null && store == null) {
                            return [2 /*return*/];
                        }
                        val = entry.value;
                        isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
                        if (!isPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, val];
                    case 1:
                        val = _e.sent();
                        entry = {
                            value: val,
                            timestamp: entry.timestamp,
                        };
                        _e.label = 2;
                    case 2:
                        if (!isAsync) return [3 /*break*/, 5];
                        return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.flushAsync(key, entry))];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, ((_b = this._store) === null || _b === void 0 ? void 0 : _b.saveAsync(key, entry))];
                    case 4:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        (_c = this._transport) === null || _c === void 0 ? void 0 : _c.flush(key, entry);
                        (_d = this._store) === null || _d === void 0 ? void 0 : _d.save(key, entry);
                        _e.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Cache.prototype.setAsync = function (key, val) {
        return __awaiter(this, void 0, Promise, function () {
            var cached;
            return __generator(this, function (_a) {
                cached = {
                    timestamp: Date.now(),
                    value: val
                };
                this._cache[key] = cached;
                this.persist(key, cached, true);
                return [2 /*return*/, val];
            });
        });
    };
    Cache.prototype.setRestored = function (coll) {
        var _a;
        this._cache = __assign(__assign({}, (coll !== null && coll !== void 0 ? coll : {})), ((_a = this._cache) !== null && _a !== void 0 ? _a : {}));
    };
    Cache.prototype.clear = function (key) {
        var _a, _b;
        if (typeof key === 'string') {
            this._cache[key] = null;
        }
        else {
            this._cache = {};
        }
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.clear();
        (_b = this._store) === null || _b === void 0 ? void 0 : _b.clear(key);
    };
    Cache.prototype.clearAsync = function (key) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (typeof key === 'string') {
                            this._cache[key] = null;
                        }
                        else {
                            this._cache = {};
                        }
                        return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.clearAsync())];
                    case 1:
                        _c.sent();
                        (_b = this._store) === null || _b === void 0 ? void 0 : _b.clearAsync(key);
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.prototype.destroy = function () {
        var _this = this;
        var _a;
        this.clear();
        (_a = this.options.monitors) === null || _a === void 0 ? void 0 : _a.forEach(function (x) { return x.off('change', _this.onChanged); });
    };
    Cache.prototype.onChanged = function (key) {
        this.clear(key);
    };
    Cache.prototype.flushAsync = function (force) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.flushAllAsync(force))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.flushAllAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(Cache.caches.map(function (cache) { return cache.flushAsync(true); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.resolve = function (cache, resolver, key) {
        if (key === void 0) { key = ''; }
        return __awaiter(this, void 0, Promise, function () {
            var value, promise, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cache.getAsync(key)];
                    case 1:
                        value = _a.sent();
                        if (value != null) {
                            return [2 /*return*/, value];
                        }
                        promise = resolver();
                        cache.set(key, promise);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, promise];
                    case 3:
                        value = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        cache.clear(key);
                        throw error_1;
                    case 5: return [4 /*yield*/, cache.flushAsync()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, value];
                }
            });
        });
    };
    Cache.caches = [];
    return Cache;
}());
exports.Cache = Cache;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Cache) && isObject(module.exports)) {
		Object.assign(_src_Cache, module.exports);
		return;
	}
	_src_Cache = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_clearMemoized = exports.fn_memoize = void 0;
var Cache_1 = _src_Cache;
function fn_memoize(fn, opts, key) {
    var _a, _b, _c, _d;
    if (opts === void 0) { opts = {}; }
    var _cache = new Cache_1.Cache(opts);
    if (_cache.isAsync) {
        return fn_memoizeAsync(_cache, fn, opts, key);
    }
    var _perInstance = (_a = opts === null || opts === void 0 ? void 0 : opts.perInstance) !== null && _a !== void 0 ? _a : false;
    var _clearOnReady = (_b = opts === null || opts === void 0 ? void 0 : opts.clearOnReady) !== null && _b !== void 0 ? _b : false;
    var _clearOnReject = (_c = opts === null || opts === void 0 ? void 0 : opts.clearOnReject) !== null && _c !== void 0 ? _c : false;
    var _clearOn = (_d = opts === null || opts === void 0 ? void 0 : opts.clearOn) !== null && _d !== void 0 ? _d : null;
    var _caches = [];
    var _thisArg = opts === null || opts === void 0 ? void 0 : opts.thisArg;
    var Wrapper = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var cache = _cache;
        if (_perInstance === true) {
            var prop = "__$mem_".concat(key);
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
        var thisArg = _thisArg !== null && _thisArg !== void 0 ? _thisArg : this;
        var id = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.key) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([opts, { this: thisArg }], args, false))) !== null && _b !== void 0 ? _b : cache.resolveKey.apply(cache, args);
        var cached = cache.get(id);
        if (cached != null) {
            return cached;
        }
        var isPromise = null;
        var val = fn.apply(thisArg, args);
        if (_clearOnReject === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(null, function (err) {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOnReady === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(function (result) {
                    cache.clear(id);
                    return Promise.resolve(result);
                }, function (err) {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOn != null) {
            isPromise = isPromise !== null && isPromise !== void 0 ? isPromise : (val != null && typeof val === 'object' && typeof val.then === 'function');
            if (isPromise) {
                val = val.then(function (result) {
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
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = _cache.resolveKey.apply(_cache, args);
        _cache.clear(id);
        _caches.forEach(function (x) { return x.clear(id); });
    };
    Wrapper.clearAll = function () {
        _cache.clear();
        _caches.forEach(function (x) { return x.clear(); });
    };
    return Wrapper;
}
exports.fn_memoize = fn_memoize;
;
function fn_memoizeAsync(_cache, fn, opts, key) {
    var _a, _b, _c, _d;
    if (opts === void 0) { opts = {}; }
    var _perInstance = (_a = opts === null || opts === void 0 ? void 0 : opts.perInstance) !== null && _a !== void 0 ? _a : false;
    var _clearOnReady = (_b = opts === null || opts === void 0 ? void 0 : opts.clearOnReady) !== null && _b !== void 0 ? _b : false;
    var _clearOnReject = (_c = opts === null || opts === void 0 ? void 0 : opts.clearOnReject) !== null && _c !== void 0 ? _c : false;
    var _clearOn = (_d = opts === null || opts === void 0 ? void 0 : opts.clearOn) !== null && _d !== void 0 ? _d : null;
    var _caches = [];
    var _thisArg = opts === null || opts === void 0 ? void 0 : opts.thisArg;
    var Wrapper = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var cache, prop, thisArg, id, cached, isPromise, val;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cache = _cache;
                        if (_perInstance === true) {
                            prop = "__$mem_".concat(key);
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
                        thisArg = _thisArg !== null && _thisArg !== void 0 ? _thisArg : this;
                        id = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.key) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([opts, { this: thisArg }], args, false))) !== null && _b !== void 0 ? _b : cache.resolveKey.apply(cache, args);
                        return [4 /*yield*/, cache.getAsync.apply(cache, __spreadArray([id], args, false))];
                    case 1:
                        cached = _c.sent();
                        if (cached != null) {
                            return [2 /*return*/, cached];
                        }
                        isPromise = null;
                        val = fn.apply(thisArg, args);
                        if (_clearOnReject === true) {
                            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
                            if (isPromise) {
                                val = val.then(null, function (err) {
                                    cache.clearAsync(id);
                                    return Promise.reject(err);
                                });
                            }
                        }
                        if (_clearOnReady === true) {
                            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
                            if (isPromise) {
                                val = val.then(function (result) {
                                    cache.clearAsync(id);
                                    return Promise.resolve(result);
                                }, function (err) {
                                    cache.clearAsync(id);
                                    return Promise.reject(err);
                                });
                            }
                        }
                        if (_clearOn != null) {
                            isPromise = isPromise !== null && isPromise !== void 0 ? isPromise : (val != null && typeof val === 'object' && typeof val.then === 'function');
                            if (isPromise) {
                                val = val.then(function (result) {
                                    if (_clearOn(result)) {
                                        cache.clearAsync(id);
                                    }
                                    return result;
                                });
                            }
                            else if (_clearOn(val)) {
                                // don't even set to cache
                                return [2 /*return*/, val];
                            }
                        }
                        return [2 /*return*/, cache.setAsync(id, val)];
                }
            });
        });
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = _cache.resolveKey.apply(_cache, args);
        _cache.clearAsync(id);
        _caches.forEach(function (x) { return x.clearAsync(id); });
    };
    Wrapper.clearAll = function () {
        _cache.clearAsync();
        _caches.forEach(function (x) { return x.clearAsync(); });
    };
    return Wrapper;
}
function fn_clearMemoized(fn) {
    var _a, _b, _c, _d;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (args.length === 0) {
        (_b = (_a = fn) === null || _a === void 0 ? void 0 : _a.clearAll) === null || _b === void 0 ? void 0 : _b.call(_a);
        return;
    }
    (_d = (_c = fn) === null || _c === void 0 ? void 0 : _c.clearArgs) === null || _d === void 0 ? void 0 : _d.call.apply(_d, __spreadArray([_c], args, false));
    return;
}
exports.fn_clearMemoized = fn_clearMemoized;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_memoize) && isObject(module.exports)) {
		Object.assign(_src_fn_memoize, module.exports);
		return;
	}
	_src_fn_memoize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_memoize = void 0;
var memoize_1 = _src_fn_memoize;
function deco_memoize(opts) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var isGetter = !viaProperty && typeof descriptor.get === 'function';
        var innerFn = viaProperty
            ? target[propertyKey]
            : (isGetter ? descriptor.get : descriptor.value);
        var fn = (0, memoize_1.fn_memoize)(innerFn, opts, propertyKey);
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_memoize) && isObject(module.exports)) {
		Object.assign(_src_deco_memoize, module.exports);
		return;
	}
	_src_deco_memoize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_debounce;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_debounce = void 0;
var requestFn = typeof requestAnimationFrame === 'undefined' ? setImmediate : requestAnimationFrame;
var clearRequest = typeof requestAnimationFrame === 'undefined' ? clearImmediate : cancelAnimationFrame;
/**
 *
 * @param timeoutMs ms to wait before calling inner fn
 */
function deco_debounce(timeoutMs) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        if (viaProperty) {
            descriptor = {
                configurable: true,
                value: target[propertyKey]
            };
        }
        var fn = descriptor.value;
        if (timeoutMs == null || timeoutMs === 0) {
            var frame_1 = 0;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                if (frame_1 !== 0) {
                    clearRequest(frame_1);
                }
                frame_1 = requestFn(function () {
                    frame_1 = 0;
                    fn.apply(self, args);
                });
            };
        }
        else {
            var timer_1 = 0;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                clearTimeout(timer_1);
                timer_1 = setTimeout(function () {
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_debounce) && isObject(module.exports)) {
		Object.assign(_src_deco_debounce, module.exports);
		return;
	}
	_src_deco_debounce = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_model_Deferred;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolveFn = resolve;
            _this.rejectFn = reject;
            if (_this.isResolved === true) {
                resolve(_this.resolvedArg);
            }
            if (_this.isRejected === true) {
                reject(_this.rejectedArg);
            }
        });
    }
    Deferred.prototype.resolve = function (arg) {
        if (this.resolveFn) {
            this.resolveFn(arg);
            return;
        }
        this.isResolved = true;
        this.resolvedArg = arg;
    };
    Deferred.prototype.reject = function (arg) {
        if (this.rejectFn) {
            this.rejectFn(arg);
            return;
        }
        this.isRejected = true;
        this.rejectedArg = arg;
    };
    Deferred.prototype.then = function (fnA, fnB) {
        this.promise.then(fnA, fnB);
    };
    return Deferred;
}());
exports.Deferred = Deferred;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_model_Deferred) && isObject(module.exports)) {
		Object.assign(_src_model_Deferred, module.exports);
		return;
	}
	_src_model_Deferred = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_throttle;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_throttle = void 0;
var Args_1 = _src_fn_Args;
var Deferred_1 = _src_model_Deferred;
function deco_throttle(timeWindow, mix) {
    var _a, _b;
    var options = typeof mix === 'boolean'
        ? { shouldCallLater: mix }
        : mix;
    var shouldCallLater = (_a = options === null || options === void 0 ? void 0 : options.shouldCallLater) !== null && _a !== void 0 ? _a : false;
    var perArguments = (_b = options === null || options === void 0 ? void 0 : options.perArguments) !== null && _b !== void 0 ? _b : false;
    var perArgumentInfos = perArguments ? Object.create(null) : null;
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = viaProperty ? target[propertyKey] : descriptor.value;
        var timer = 0;
        var latestArgs = null;
        var latestCall = 0;
        var promise = null;
        var resultFn = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _key = perArguments !== true ? null : Args_1.Args.getKey(args);
            var _meta = perArguments !== true ? null : ((_a = perArgumentInfos[_key]) !== null && _a !== void 0 ? _a : (perArgumentInfos[_key] = {
                latestCall: 0,
                latestArgs: null,
                promise: null,
                timer: 0
            }));
            var _latestCall = perArguments ? _meta.latestCall : latestCall;
            var _timer = perArguments ? _meta.timer : timer;
            var self = this;
            var now = Date.now();
            var diff = now - _latestCall;
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
            var _promise = perArguments ? _meta.promise : promise;
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
                    var args = perArguments ? _meta.latestArgs : latestArgs;
                    var r = fn.apply(self, args);
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_throttle) && isObject(module.exports)) {
		Object.assign(_src_deco_throttle, module.exports);
		return;
	}
	_src_deco_throttle = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_queued = void 0;
var Deferred_1 = _src_model_Deferred;
/** For original async method - ensure it is called one after another  */
function fn_queued(fn, opts) {
    if (opts === void 0) { opts = {}; }
    var queue = [];
    var busy = false;
    var lastResultAt = 0;
    var throttle = opts === null || opts === void 0 ? void 0 : opts.throttle;
    var resultFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (opts != null && opts.single === true && queue.length > 0) {
            return queue[0].promise;
        }
        var wrapped = Queued.prepair(fn, this, args, opts);
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
    var tick = function () {
        if (queue.length === 0) {
            busy = false;
            return;
        }
        if (throttle != null) {
            var ms = throttle - (Date.now() - lastResultAt);
            if (ms > 0) {
                setTimeout(tick, ms);
                return;
            }
        }
        var x = queue.shift();
        x.always(next);
        x.run();
    };
    var next = function () {
        lastResultAt = Date.now();
        tick();
    };
    return resultFn;
}
exports.fn_queued = fn_queued;
var Queued = {
    prepair: function (innerFn, ctx, args, opts) {
        var dfr = new Deferred_1.Deferred;
        var completed = false;
        var timeout = null;
        return {
            promise: dfr,
            run: function () {
                var result = innerFn.apply(ctx, args);
                if ('then' in result === false) {
                    dfr.resolve(result);
                }
                else {
                    if ((opts === null || opts === void 0 ? void 0 : opts.timeout) > 0) {
                        timeout = setTimeout(function () {
                            if (completed) {
                                return;
                            }
                            dfr.reject(new Error("Queue Worker: the inner function ".concat(innerFn.name, " timeouted: ").concat(opts.timeout)));
                        }, opts.timeout);
                    }
                    result.then(function (_result) {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.resolve(_result);
                    }, function (_error) {
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
            always: function (fn) {
                dfr.then(fn, fn);
            }
        };
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_queued) && isObject(module.exports)) {
		Object.assign(_src_fn_queued, module.exports);
		return;
	}
	_src_fn_queued = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_queued = void 0;
var queued_1 = _src_fn_queued;
function deco_queued(opts) {
    if (opts === void 0) { opts = null; }
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = viaProperty ? target[propertyKey] : descriptor.value;
        var resultFn = (0, queued_1.fn_queued)(fn, opts);
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_queued = deco_queued;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_queued) && isObject(module.exports)) {
		Object.assign(_src_deco_queued, module.exports);
		return;
	}
	_src_deco_queued = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_FsTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsTransport = void 0;
var FsTransport = /** @class */ (function () {
    function FsTransport(opts) {
        this.opts = opts;
        this._file = null;
        this.isAsync = true;
        if (typeof process === 'undefined' || typeof process.exit !== 'function') {
            throw new Error('NodeJS expected');
        }
        var r = require;
        var module = 'atma-io';
        var FileSafe = r(module).FileSafe;
        this._file = new FileSafe(this.opts.path, { threadSafe: true });
    }
    FsTransport.prototype.restoreAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._file.readAsync()];
                    case 1:
                        json = _a.sent();
                        return [2 /*return*/, typeof json === 'string'
                                ? JSON.parse(json)
                                : json];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FsTransport.prototype.flushAsync = function (coll) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = JSON.stringify(coll);
                        return [4 /*yield*/, this._file.writeAsync(json)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FsTransport;
}());
exports.FsTransport = FsTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_FsTransport) && isObject(module.exports)) {
		Object.assign(_src_persistance_FsTransport, module.exports);
		return;
	}
	_src_persistance_FsTransport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_LocalStorageTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageTransport = void 0;
var LocalStorageTransport = /** @class */ (function () {
    function LocalStorageTransport(opts) {
        this.opts = opts;
        this.isAsync = false;
        if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
            throw new Error('Browser expected');
        }
    }
    LocalStorageTransport.prototype.restore = function () {
        try {
            return JSON.parse(localStorage.getItem(this.opts.key));
        }
        catch (error) {
        }
    };
    LocalStorageTransport.prototype.flush = function (coll) {
        try {
            localStorage.getItem(JSON.stringify(this.opts.key));
        }
        catch (error) {
        }
    };
    return LocalStorageTransport;
}());
exports.LocalStorageTransport = LocalStorageTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_LocalStorageTransport) && isObject(module.exports)) {
		Object.assign(_src_persistance_LocalStorageTransport, module.exports);
		return;
	}
	_src_persistance_LocalStorageTransport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_workers_CachedWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedWorker = void 0;
var FsTransport_1 = _src_persistance_FsTransport;
var LocalStorageTransport_1 = _src_persistance_LocalStorageTransport;
var Cache_1 = _src_Cache;
var CachedWorker = /** @class */ (function () {
    function CachedWorker(opts) {
        var _a;
        this.opts = opts;
        var persistance = (_a = opts.persistance) !== null && _a !== void 0 ? _a : this.getTransport();
        if (persistance) {
            persistance.debounceMs = 0;
        }
        this.cache = new Cache_1.Cache({
            persistance: persistance,
            maxAge: opts.maxAge,
            monitors: opts.monitors,
        });
        this.worker = opts.worker;
    }
    CachedWorker.prototype.getTransport = function () {
        var t = this.opts.transport;
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
    };
    CachedWorker.prototype.run = function () {
        var result = this.cache.get('result');
        if (result != null) {
            return result;
        }
        result = this.worker();
        this.cache.set('result', result);
        return result;
    };
    CachedWorker.prototype.runAsync = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.workerDfr) !== null && _a !== void 0 ? _a : (this.workerDfr = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.cache.getAsync('result')];
                                case 1:
                                    result = _a.sent();
                                    if (result) {
                                        return [2 /*return*/, result];
                                    }
                                    return [4 /*yield*/, this.opts.worker()];
                                case 2:
                                    result = _a.sent();
                                    return [4 /*yield*/, this.cache.setAsync('result', result)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    }); })())];
            });
        });
    };
    CachedWorker.run = function (opts) {
        return new CachedWorker(opts).run();
    };
    CachedWorker.runAsync = function (opts) {
        return new CachedWorker(opts).runAsync();
    };
    return CachedWorker;
}());
exports.CachedWorker = CachedWorker;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_workers_CachedWorker) && isObject(module.exports)) {
		Object.assign(_src_workers_CachedWorker, module.exports);
		return;
	}
	_src_workers_CachedWorker = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var memoize_1 = _src_deco_memoize;
var debounce_1 = _src_deco_debounce;
var throttle_1 = _src_deco_throttle;
var queued_1 = _src_deco_queued;
var memoize_2 = _src_fn_memoize;
var Cache_1 = _src_Cache;
var FsTransport_1 = _src_persistance_FsTransport;
var LocalStorageTransport_1 = _src_persistance_LocalStorageTransport;
var CachedWorker_1 = _src_workers_CachedWorker;
var queued_2 = _src_fn_queued;
var Memd = /** @class */ (function () {
    function Memd() {
    }
    Memd.Cache = Cache_1.Cache;
    Memd.fn = {
        memoize: memoize_2.fn_memoize,
        queued: queued_2.fn_queued,
        clearMemoized: memoize_2.fn_clearMemoized
    };
    Memd.deco = {
        memoize: memoize_1.deco_memoize,
        throttle: throttle_1.deco_throttle,
        debounce: debounce_1.deco_debounce,
        queued: queued_1.deco_queued
    };
    Memd.FsTransport = FsTransport_1.FsTransport;
    Memd.LocalStorageTransport = LocalStorageTransport_1.LocalStorageTransport;
    Memd.CachedWorker = CachedWorker_1.CachedWorker;
    return Memd;
}());
Memd.default = Memd;
module.exports = Memd;


}));

// end:source ./UMD.js
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_memd_lib_memd === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_memd_lib_memd) && __isObj(module.exports)) {
        Object.assign(_node_modules_memd_lib_memd, module.exports);
    } else {
        _node_modules_memd_lib_memd = module.exports;
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
var dependency_1 = _src_dependency;
var memd_1 = _node_modules_memd_lib_memd;
exports.default = {
    $getScripts: memd_1.default.fn.memoize(function (pageID) {
        var scripts = getResources('scripts', this.env).slice();
        if (pageID)
            scripts = scripts.concat(this.$getScriptsForPageOnly(pageID));
        return scripts;
    }),
    $getScriptsForPageOnly: memd_1.default.fn.memoize(function (pageID) {
        var page = this.pages[pageID], scripts = [];
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
            var path = this.$formatPath(this.page.location.viewController, page.view.controller);
            scripts.push(path);
        }
        return scripts;
    }),
    $getStyles: function (pageID) {
        var cfg = this, styles = getResources('styles', cfg.env).slice();
        if (pageID)
            styles = styles.concat(this.$getStylesForPageOnly(pageID));
        return styles;
    },
    $getStylesForPageOnly: function (pageID) {
        var cfg = this, page = cfg.pages[pageID], styles = [];
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
            var path = this.$getCompo(page), resource = dependency_1.include.getResource(path);
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
            var path = this.$formatPath(this.page.location.viewStyle, page.view.style);
            styles.push(path);
        }
        return styles;
    },
    $getInclude: function () {
        var env = this.env, include = {
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
        var page = this.pages[pageID], include = {};
        return page && page.include ? incl_extend(include, page.include) : include;
    },
    $getTemplate: function (pageData) {
        var _a, _b;
        var template = (_a = pageData.template) !== null && _a !== void 0 ? _a : (_b = this.page.index) === null || _b === void 0 ? void 0 : _b.template;
        if (template == null) {
            return null;
        }
        var location = this.page.location.template;
        var path = this.$formatPath(location, template);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getMaster: function (pageData) {
        var master = pageData.master || this.page.index.master, location = this.page.location.master, path = this.$formatPath(location, master);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getController: function (pageData) {
        var controller = pageData.controller || this.page.index.controller;
        if (controller == null)
            return null;
        var location = this.page.location.controller, path = this.$formatPath(location, controller);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getCompo: function (pageData) {
        var compo = pageData.compo;
        if (compo == null)
            return null;
        var location = this.page.location.compo || this.page.location.controller, path = this.$formatPath(location, compo);
        return dependency_1.Uri.combine(this.base, path);
    },
    $getImports: function (targetEnv) {
        var both = this.env.both.imports, target = this.env[targetEnv].imports;
        var types = {
            'mask': ' mask ',
            'script': ' js es6 jsx ts',
            'style': ' css less sass scss '
        };
        function getType(path) {
            var ext = /\w+$/.exec(path);
            if (ext == null) {
                dependency_1.logger.error('Not parsable extension', path);
                return 'unknown';
            }
            for (var type in types) {
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
var getResources = memd_1.default.fn.memoize(function (type, env, pckg, routes) {
    var Routes = new dependency_1.includeLib.Routes();
    var array = [];
    function register(obj) {
        if (obj == null)
            return;
        for (var key in obj) {
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
            var obj = pckg || env;
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
function obj_extend(target, source, dismissKey) {
    if (dismissKey === void 0) { dismissKey = null; }
    if (source == null)
        return target;
    if (target == null)
        target = {};
    for (var key in source) {
        if (key === dismissKey)
            continue;
        target[key] = source[key];
    }
    return target;
}
var _flatternResources;
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
        var arr = [];
        for (var key in json) {
            arr = arr.concat(_flatternResources(json[key], _combinePath(base, key)));
        }
        return arr;
    }
    function _fromArray(arr, base) {
        var out = [], imax = arr.length, i = -1;
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
;

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
var Application_1 = _src_HttpApplication_Application;
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
;

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
    format: function (location, path) {
        if (path.charCodeAt(0) === 47) {
            // /
            if (/\.\w{1,7}$/.test(path) === false) {
                path += '.mask';
            }
            return path;
        }
        var template = path.split('/'), route = location.split(/[\{\}]/g);
        path = route[0];
        for (var i = 1; i < route.length; i++) {
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
;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurate_BowerAndCommonJS = exports.configurate_Plugins = exports.configurate_PageFiles = exports.configurate_Pages = exports.configurate_Mask = exports.configurate_Include = exports.cfg_prepair = void 0;
var dependency_1 = _src_dependency;
var path_1 = _src_util_path;
var IncludeUtils_1 = _src_Config_IncludeUtils;
var PathUtils_1 = _src_Config_PathUtils;
var atma_utils_1 = require("atma-utils");
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
var configurate_Include = function (cfg) {
    return __awaiter(this, void 0, void 0, function () {
        var resource;
        return __generator(this, function (_a) {
            resource = dependency_1.include.instance(cfg.base);
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
            return [2 /*return*/];
        });
    });
};
exports.configurate_Include = configurate_Include;
var configurate_Mask = function (cfg) {
    var maskCfg = cfg.mask;
    if (maskCfg == null)
        return;
    dependency_1.mask.compoDefinitions(maskCfg.compos, maskCfg.utils, maskCfg.attributes);
};
exports.configurate_Mask = configurate_Mask;
var configurate_Pages = function (cfg, app) {
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
var configurate_PageFiles = function (cfg, app) {
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
        files.forEach(function (file) {
            var rel = file.uri.toRelativeString(pageFilesFolder);
            var i = /\.|\//g.exec(rel).index;
            var name = rel.substring(0, i);
            i = rel.lastIndexOf('/');
            var path = rel.substring(0, i);
            var ruleIndex = {
                rule: "^/".concat(name, "/?($|\\?.+) ").concat(dependency_1.Uri.combine(folder, path), "/index.html.mask$1")
            };
            var ruleAssets = {
                rule: "^/".concat(name, "/(.+) ").concat(dependency_1.Uri.combine(folder, path), "/$1")
            };
            if (cfg.rewriteRules == null) {
                cfg.rewriteRules = [];
            }
            cfg.rewriteRules.push(ruleIndex, ruleAssets);
        });
    });
};
exports.configurate_PageFiles = configurate_PageFiles;
var configurate_Plugins = function (cfg, app) {
    if (cfg.plugins == null) {
        return null;
    }
    if (app.isRoot === false) {
        return null;
    }
    var dfr = new atma_utils_1.class_Dfr;
    var sources = cfg.plugins.map(function (name) {
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
var configurate_BowerAndCommonJS;
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
    function resolvePaths(config, resourceType, packageSystem, arr, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var base, paths, mappings, data, dirName, packageName, promises;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = new dependency_1.Uri(config.base), paths = [], mappings = {};
                        data = _types[packageSystem];
                        if (data == null)
                            throw Error('Support:' + Object.keys(_types) + ' Got:' + packageSystem);
                        dirName = data.dir, packageName = data.package;
                        promises = arr.map(function (name) {
                            return __awaiter(this, void 0, void 0, function () {
                                var map, aliasIndex, alias, pckgPath, pckg, pckgbase, main, error_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (name == null) {
                                                // could be when conditional configuration item is falsy
                                                return [2 /*return*/];
                                            }
                                            map = name;
                                            aliasIndex = name.indexOf('::'), alias = '';
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
                                                return [2 /*return*/];
                                            }
                                            pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + packageName);
                                            if (pckgPath == null) {
                                                if (data.alternate) {
                                                    pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + data.alternate);
                                                }
                                                if (pckgPath == null) {
                                                    dependency_1.logger.error('<Module is not resolved>', name);
                                                    return [2 /*return*/];
                                                }
                                            }
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, dependency_1.io.File.readAsync(pckgPath)];
                                        case 2:
                                            pckg = _a.sent();
                                            pckgbase = '/' + dirName + '/' + name + '/', main = pckg.main;
                                            if (main == null) {
                                                main = 'index.js';
                                            }
                                            if ((0, dependency_1.is_String)(main)) {
                                                mapPath(mappings, map, main, pckgbase, alias);
                                                return [2 /*return*/];
                                            }
                                            if ((0, dependency_1.is_Array)(main)) {
                                                mapPathMany(mappings, map, main, pckgbase, alias, resourceType);
                                                return [2 /*return*/];
                                            }
                                            dependency_1.logger.error('Main is not defined', pckgPath);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_1 = _a.sent();
                                            dependency_1.logger.error("Scripts via configuration. Path error: ".concat(error_1.message));
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        return [4 /*yield*/, Promise.all(promises).then(function () {
                                cb(mappings);
                            }, function (error) {
                                dependency_1.logger.error("Scripts via configuration. Path error: ".concat(error.message));
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
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
;

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
;

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
var dependency_1 = _src_dependency;
var path_1 = _src_util_path;
var EnvUtils_1 = _src_Config_EnvUtils;
var ConfigUtils_1 = _src_Config_ConfigUtils;
var ConfigDefaults_1 = _src_Config_ConfigDefaults;
var PATH = 'server/config/**.yml';
var BUILD_PATH = 'public/build/stats.json';
function Config(params, app) {
    params = params || {};
    var path_base = params.base, configPaths = params.configs, disablePackageJson = params.disablePackageJson === true, path_Build, appConfig;
    path_base = path_base == null
        ? 'file://' + (0, path_1.path_normalize)(process.cwd()) + '/'
        : (0, path_1.path_resolveSystemUrl)(path_base + '/');
    var configs = (0, ConfigUtils_1.cfg_prepair)(path_base, configPaths, PATH);
    if (configs) {
        // if `configs` null, do not load also build values
        path_Build = path_base + (params.buildDirectory || BUILD_PATH);
    }
    if (params.config) {
        appConfig = { config: params.config };
    }
    var $sources = [
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
        return Promise.all([
            (0, ConfigUtils_1.configurate_Mask)(cfg),
            (0, ConfigUtils_1.configurate_Include)(cfg),
            (0, ConfigUtils_1.configurate_PageFiles)(cfg, app),
            (0, ConfigUtils_1.configurate_Pages)(cfg, app),
            (0, ConfigUtils_1.configurate_Plugins)(cfg, app),
            (0, ConfigUtils_1.configurate_BowerAndCommonJS)(cfg, app)
        ])
            .then(function () { return Promise.resolve(cfg); });
    }, function (error) {
        error.message = '<app:configuration> ' + error.message;
        throw error;
    });
}
exports.default = Config;
;
;

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
var _src_Autoreload_WatcherHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_Autoreload_WatcherHandler != null ? _src_Autoreload_WatcherHandler : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatcherHandler = void 0;
var path_1 = _src_util_path;
var dependency_1 = _src_dependency;
var atma_utils_1 = require("atma-utils");
var WatcherHandler = /** @class */ (function (_super) {
    __extends(WatcherHandler, _super);
    function WatcherHandler() {
        var _this = _super.call(this) || this;
        _this.fileChanged = _this.fileChanged.bind(_this);
        return _this;
    }
    Object.defineProperty(WatcherHandler, "Instance", {
        get: function () {
            return _instance !== null && _instance !== void 0 ? _instance : (_instance = new WatcherHandler);
        },
        enumerable: false,
        configurable: true
    });
    WatcherHandler.prototype.watch = function (file) {
        var path = file.uri.toString();
        if (_watchers[path] != null) {
            return;
        }
        var watcher = new FileWatcher(file);
        watcher.bind(this.fileChanged);
        _watchers[path] = watcher;
    };
    WatcherHandler.prototype.unwatch = function (file, callback) {
        var path = file.uri.toString();
        if (_watchers[path] == null) {
            dependency_1.logger.log('<watcher> No watchers', path);
            return;
        }
        _watchers[path].unbind(callback);
        delete _watchers[path];
    };
    WatcherHandler.prototype.isWatching = function (file) {
        var path = file.uri.toString();
        return _watchers[path] != null;
    };
    WatcherHandler.prototype.fileChanged = function (absPath, sender, requestedUrl, base) {
        if (dependency_1.mask.Module.clearCache) {
            dependency_1.mask.Module.clearCache();
        }
        if (sender === 'filewatcher') {
            var rel = requestedUrl !== null && requestedUrl !== void 0 ? requestedUrl : ('/' + absPath.replace(rootFolder, ''));
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
    };
    WatcherHandler.prototype.bind = function (callback) {
        return this
            .on('fileChange', callback);
    };
    WatcherHandler.prototype.unbind = function (callback) {
        return this
            .off('fileChange', callback);
    };
    return WatcherHandler;
}(atma_utils_1.class_EventEmitter));
exports.WatcherHandler = WatcherHandler;
var rootFolder = (0, path_1.path_normalize)(process.cwd() + '/');
var FileWatcher = /** @class */ (function (_super) {
    __extends(FileWatcher, _super);
    function FileWatcher(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        _this.active = false;
        _this.fileChanged = _this.fileChanged.bind(_this);
        return _this;
    }
    FileWatcher.prototype.fileChanged = function (path) {
        dependency_1.logger.log('<watcher:changed>', path);
        this.trigger('fileChange', path, 'filewatcher', this.file.requestedUrl);
    };
    FileWatcher.prototype.bind = function (callback) {
        this.on('fileChange', callback);
        if (this.active)
            return;
        dependency_1.io
            .watcher
            .watch(this.file.uri.toLocalFile(), this.fileChanged);
        this.active = true;
    };
    FileWatcher.prototype.unbind = function (callback) {
        this.off('fileChange', callback);
        if (this._listeners.length === 0) {
            dependency_1.io
                .watcher
                .unwatch(this.file.uri.toLocalFile());
        }
    };
    return FileWatcher;
}(atma_utils_1.class_EventEmitter));
var _watchers = {};
var _instance = null;
exports.default = new WatcherHandler;
;

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
var dependency_1 = _src_dependency;
var WatcherHandler_1 = _src_Autoreload_WatcherHandler;
var ConnectionSocket = /** @class */ (function () {
    function ConnectionSocket(socket) {
        this.socket = socket;
        dependency_1.logger.log('<autoreload> Socket connected');
        this.disconnected = this.disconnected.bind(this);
        this.fileChanged = this.fileChanged.bind(this);
        socket.on('disconnect', this.disconnected);
        WatcherHandler_1.default.on('fileChange', this.fileChanged);
    }
    ConnectionSocket.prototype.fileChanged = function (path) {
        var socket = this.socket;
        setTimeout(function () {
            dependency_1.logger.log('<autoreload sockets> path', path);
            socket.emit('filechange', path);
        }, 50);
    };
    ConnectionSocket.prototype.disconnected = function () {
        WatcherHandler_1.default.off('fileChange', this.fileChanged);
    };
    return ConnectionSocket;
}());
exports.default = ConnectionSocket;
;

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
var dependency_1 = _src_dependency;
var WatcherHandler_1 = _src_Autoreload_WatcherHandler;
var ConnectionSocket_1 = _src_Autoreload_ConnectionSocket;
var AutoreloadInner = /** @class */ (function () {
    function AutoreloadInner() {
        this.prepared = false;
        this.enabled = false;
        this.watcher = WatcherHandler_1.default;
    }
    AutoreloadInner.prototype.prepare = function (app, debug) {
        if (app.config.debug || debug === true) {
            var configs = new dependency_1.io.Directory('server/config/');
            if (configs.exists()) {
                configs.watch(reloadConfigDelegate(app));
            }
            dependency_1.include.cfg('autoreload', this);
            dependency_1.mask.cfg('allowCache', false);
            this.watcher.on('fileChange', function (path) {
                app.emit('fileChange', path);
            });
            this.prepared = true;
        }
    };
    AutoreloadInner.prototype.enable = function (app) {
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
    };
    AutoreloadInner.prototype.watch = function (requestedUrl, config) {
        if (/\.[\w]+$/.test(requestedUrl) === false) {
            // no extension
            return;
        }
        var q = requestedUrl.indexOf('?');
        if (q !== -1)
            requestedUrl = requestedUrl.substring(0, q);
        var root = config.static || config.base || '/', path = dependency_1.Uri.combine(root, requestedUrl), file = new dependency_1.io.File(path);
        file.requestedUrl = requestedUrl;
        this.watchFile(file);
    };
    AutoreloadInner.prototype.watchFile = function (file) {
        var _a;
        if (!((_a = file.uri) === null || _a === void 0 ? void 0 : _a.file)) {
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
    };
    AutoreloadInner.prototype.unwatch = function (path) {
        this.watcher.unwatch(new dependency_1.io.File(path));
    };
    AutoreloadInner.prototype.fileChanged = function (path, sender) {
        this.watcher.fileChanged(path, sender, null, this.base);
    };
    AutoreloadInner.prototype.isWatching = function (file) {
        if (typeof file === 'string') {
            file = new dependency_1.io.File(file);
        }
        return this.watcher.isWatching(file);
    };
    AutoreloadInner.prototype.listenDirectory = function (dir, callback) {
        new dependency_1.io
            .Directory(dir)
            .watch(callback);
    };
    AutoreloadInner.prototype.getWatcher = function () {
        return this.watcher;
    };
    return AutoreloadInner;
}());
exports.Autoreload = new AutoreloadInner;
//let root = path_resolveSystemUrl('/');
function reloadConfigDelegate(app) {
    return function (path) {
        app
            .defer()
            ._loadConfig()
            .done(function () {
            exports.Autoreload.fileChanged(path);
        });
    };
}
;

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
exports.initilizeEmbeddedComponents = void 0;
var dependency_1 = _src_dependency;
var initilizeEmbeddedComponents = function (app) {
    exports.initilizeEmbeddedComponents = initilizeEmbeddedComponents = function () { };
    var DEBUG = app.config.$is('debug'), BUILD_DIR = '/public/build/';
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
exports.initilizeEmbeddedComponents = initilizeEmbeddedComponents;
;

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
var send_1 = _src_util_send;
var Rewriter = /** @class */ (function () {
    function Rewriter() {
        this.rules = [];
    }
    Rewriter.prototype.addRules = function (rules) {
        var _a;
        if (rules == null) {
            return;
        }
        (_a = this.rules).push.apply(_a, rules.map(function (x) { return new Rule(x); }));
    };
    Rewriter.prototype.rewrite = function (req) {
        var arr = this.rules;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].rewrite(req)) {
                return;
            }
        }
    };
    Rewriter.prototype.redirect = function (req, res) {
        var arr = this.rules;
        for (var i = 0; i < arr.length; i++) {
            var path = arr[i].redirect(req);
            if (path == null) {
                continue;
            }
            (0, send_1.send_REDIRECT)(res, path);
            return true;
        }
        return false;
    };
    return Rewriter;
}());
exports.default = Rewriter;
var Rule = /** @class */ (function () {
    function Rule(cond) {
        this.parse(cond.rule);
    }
    Rule.prototype.parse = function (rule) {
        var _a = rule.split(' '), pattern = _a[0], rewriter = _a[1];
        this.rewriter = rewriter;
        this.matcher = new RegExp(pattern);
    };
    Rule.prototype.isMatch = function (req) {
        return this.matcher.test(req.url);
    };
    Rule.prototype.rewrite = function (req) {
        if (this.isMatch(req) === false) {
            return false;
        }
        req.url = req.url.replace(this.matcher, this.rewriter);
        return true;
    };
    Rule.prototype.redirect = function (req) {
        if (this.isMatch(req) === false) {
            return null;
        }
        return req.url.replace(this.matcher, this.rewriter);
    };
    return Rule;
}());
exports.Rule = Rule;
var RuleCondition = /** @class */ (function () {
    function RuleCondition(cond) {
        this.parse(cond.condition);
    }
    RuleCondition.prototype.parse = function (condition) {
        var _a = condition.split(' '), text = _a[0], pattern = _a[1];
        var arr = text.split('%{');
        this.textParts = arr
            .slice(1)
            .map(function (x) { return x.split('}'); })
            .reduce(function (aggr, x) { return aggr.concat(x); }, [arr[0]]);
        this.matcher = new RegExp(pattern);
    };
    RuleCondition.prototype.isMatch = function (req) {
        return this.matcher.test(this.interpolate(req));
    };
    RuleCondition.prototype.interpolate = function (req) {
        var _this = this;
        return this.textParts.map(function (x, i) {
            if (i % 2 === 0) {
                return x;
            }
            return _this.getValue(req, x);
        }).join();
    };
    RuleCondition.prototype.getValue = function (req, name) {
        if (name.substring(0, 5) === 'HTTP_') {
            return req.headers[name.substring(5)] || '';
        }
        return RuleCondition.resolvers[name].get(req);
    };
    RuleCondition.resolvers = {
        REMOTE_ADDR: function (req) {
            return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        },
        REMOTE_HOST: function (req) {
            return req.headers['host'] || '';
        },
        SERVER_ADDR: function (req) {
            return req.socket.localAddress || '';
        }
    };
    return RuleCondition;
}());
exports.RuleCondition = RuleCondition;
;

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
var _src_util_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_obj != null ? _src_util_obj : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_assign = exports.obj_getKeys = exports.obj_lazyProperty = void 0;
var dependency_1 = _src_dependency;
var obj_lazyProperty = function (obj, xpath, init) {
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
    var keys = [];
    var proto = x;
    while (proto != null && proto != Object.prototype) {
        keys.push.apply(keys, Object.getOwnPropertyNames(proto));
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
;

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
var HttpResponse = /** @class */ (function () {
    function HttpResponse(json) {
        if (json != null) {
            Object.assign(this, json);
        }
    }
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
;

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
var _src_util_fs;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_util_fs != null ? _src_util_fs : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs_exploreFiles = void 0;
var atma_io_1 = require("atma-io");
function fs_exploreFiles(mix) {
    return new Promise(function (resolve, reject) {
        atma_io_1.glob.readAsync(mix, function (error, entries) {
            if (error) {
                reject(error);
                return;
            }
            var files = entries.filter(isFile);
            resolve(files);
        });
    });
}
exports.fs_exploreFiles = fs_exploreFiles;
function isFile(f) {
    var _a;
    return Boolean((_a = f.uri) === null || _a === void 0 ? void 0 : _a.extension);
}
;

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
var _src_HttpService_HttpEndpointExplorer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_HttpEndpointExplorer != null ? _src_HttpService_HttpEndpointExplorer : {};
    var module = { exports: exports };

    "use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointExplorer = void 0;
var atma_io_1 = require("atma-io");
var atma_utils_1 = require("atma-utils");
var alot_1 = require("alot");
var fs_1 = _src_util_fs;
var class_json_1 = require("class-json");
var obj_1 = _src_util_obj;
var HttpEndpointExplorer;
(function (HttpEndpointExplorer) {
    function getMeta(Type) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var jsonMeta = class_json_1.JsonUtils.pickModelMeta(Type);
        var meta = (_a = Type.prototype.meta) !== null && _a !== void 0 ? _a : {};
        var output = {
            path: meta.path,
            description: (_b = meta.description) !== null && _b !== void 0 ? _b : jsonMeta === null || jsonMeta === void 0 ? void 0 : jsonMeta.description,
            paths: []
        };
        var Proto = Type.prototype;
        var rgxPath = /^\$([a-z]+) (.+)$/i;
        var keys = (0, obj_1.obj_getKeys)(Proto);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var val = Proto[key];
            if (val == null) {
                continue;
            }
            var methodMeta = val.meta;
            if (methodMeta == null) {
                if (rgxPath.test(key) === false) {
                    continue;
                }
                methodMeta = { path: key };
            }
            var route = rgxPath.exec(methodMeta.path);
            if (route == null) {
                output.paths.push({
                    path: methodMeta.path,
                    description: 'Invalid route'
                });
                continue;
            }
            var methodParamsMeta = meta.endpointsParams[key];
            var apiParams = (_c = methodParamsMeta === null || methodParamsMeta === void 0 ? void 0 : methodParamsMeta.map(function (methodParamMeta) {
                var _a, _b;
                return {
                    in: methodParamMeta.from === 'uri' ? 'query' : 'body',
                    name: methodParamMeta.name,
                    description: (_a = methodParamMeta.description) !== null && _a !== void 0 ? _a : (_b = methodParamMeta.Type) === null || _b === void 0 ? void 0 : _b.name,
                    schema: getSchema(methodParamMeta.Type),
                    required: methodParamMeta.optional === true ? false : true
                };
            })) !== null && _c !== void 0 ? _c : [];
            var apiResponses = (_e = (_d = methodMeta.responses) === null || _d === void 0 ? void 0 : _d.map(function (resp) {
                var _a, _b;
                return {
                    statusCode: resp.status,
                    description: (_a = resp.description) !== null && _a !== void 0 ? _a : (_b = resp.Type) === null || _b === void 0 ? void 0 : _b.name,
                    schema: getSchema(resp.Type)
                };
            })) !== null && _e !== void 0 ? _e : [];
            var apiRoute = {
                path: route[2],
                method: route[1],
                operationId: key,
                description: (_f = methodMeta.description) !== null && _f !== void 0 ? _f : (_h = (_g = jsonMeta === null || jsonMeta === void 0 ? void 0 : jsonMeta.properties) === null || _g === void 0 ? void 0 : _g[key]) === null || _h === void 0 ? void 0 : _h.description,
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
        var schema = class_json_1.JsonSchema.getSchema(Type);
        // if (typeof Type === 'function' && schema.description == null)  {
        //     schema.description = Type.name;
        // }
        return schema;
    }
    function find(path, base) {
        return __awaiter(this, void 0, Promise, function () {
            var arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (path == null || path === '') {
                            return [2 /*return*/, null];
                        }
                        if (typeof path === 'string') {
                            return [2 /*return*/, findByPath(path, base)];
                        }
                        if (!(0, atma_utils_1.is_Array)(path)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.all(path.map(function (x) { return findByPath(x); }))];
                    case 1:
                        arr = _a.sent();
                        return [2 /*return*/, arr.reduce(function (aggr, x) {
                                return Object.assign(aggr, x);
                            }, Object.create(null))];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    }
    HttpEndpointExplorer.find = find;
    function findByPath(path, base) {
        return __awaiter(this, void 0, Promise, function () {
            var files, keyValues;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (path.endsWith('/')) {
                            path = "".concat(path, "**Endpoint*");
                        }
                        if (path.startsWith('.') || path.startsWith('/')) {
                            if (base == null) {
                                base = atma_io_1.env.currentDir.toString();
                            }
                            path = atma_utils_1.class_Uri.combine(base, path);
                        }
                        return [4 /*yield*/, (0, fs_1.fs_exploreFiles)(path)];
                    case 1:
                        files = _a.sent();
                        return [4 /*yield*/, (0, alot_1.default)(files).mapAsync(function ($file) { return __awaiter(_this, void 0, void 0, function () {
                                var file, str, rgx, match, urlPattern;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            file = new atma_io_1.File($file.uri.toString(), { cached: false });
                                            return [4 /*yield*/, file.readAsync({ skipHooks: true })];
                                        case 1:
                                            str = _a.sent();
                                            rgx = /@([\w\.]+\.)?route\s*\(\s*['"]([^'"]+)['"]/;
                                            match = rgx.exec(str);
                                            if (match == null) {
                                                return [2 /*return*/, null];
                                            }
                                            urlPattern = match[2];
                                            if (/^\$/.test(urlPattern)) {
                                                // Endpoint Classes must have no METHOD definition
                                                // This one, the first matched route, has METHOD, and look like `$get /foo`
                                                return [2 /*return*/, null];
                                            }
                                            return [2 /*return*/, ["^".concat(urlPattern), file.uri.toString()]];
                                    }
                                });
                            }); }).toArrayAsync({ threads: 4 })];
                    case 2:
                        keyValues = _a.sent();
                        return [2 /*return*/, (0, alot_1.default)(keyValues).filter(Boolean).toDictionary(function (arr) { return arr[0]; }, function (arr) { return arr[1]; })];
                }
            });
        });
    }
})(HttpEndpointExplorer = exports.HttpEndpointExplorer || (exports.HttpEndpointExplorer = {}));
;

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
var _src_HttpApplication_LifecycleEvents;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpApplication_LifecycleEvents != null ? _src_HttpApplication_LifecycleEvents : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleEvent = exports.LifecycleSpan = exports.LifecycleEvents = void 0;
var atma_utils_1 = require("atma-utils");
var LifecycleEvents = /** @class */ (function (_super) {
    __extends(LifecycleEvents, _super);
    function LifecycleEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LifecycleEvents.prototype.on = function (event, cb) {
        return _super.prototype.on.call(this, event, cb);
    };
    LifecycleEvents.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.prototype.emit.apply(this, __spreadArray([event], args, false));
    };
    LifecycleEvents.prototype.emitEvent = function (event, req, res) {
        LifecycleEvents
            .Instance
            .emit(event.type, event, req, res);
    };
    LifecycleEvents.prototype.completeAppStart = function (start) {
        EVENT.define('AppStart', Date.now() - start, "Application started");
        this.emitEvent(EVENT);
    };
    LifecycleEvents.prototype.completeHandlerSuccess = function (start, req, res) {
        var _a;
        var time = Date.now() - start;
        EVENT.define('HandlerSuccess', time, "".concat(req.url, " completed in ").concat(time, "ms"), req.method, req.url, res.statusCode, null, (_a = req.user) === null || _a === void 0 ? void 0 : _a.email, req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        this.emitEvent(EVENT, req, res);
    };
    LifecycleEvents.prototype.completeHandlerError = function (start, req, res, error) {
        var _a;
        var time = Date.now() - start;
        var message = "[".concat(req.method, "] ").concat(req.url, " completed in ").concat(time, "ms with error[").concat(res.statusCode, "]: ").concat(error);
        EVENT.define('HandlerError', time, message, req.method, req.url, res.statusCode, error, (_a = req.user) === null || _a === void 0 ? void 0 : _a.email, req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        this.emitEvent(EVENT, req, res);
    };
    LifecycleEvents.prototype.emitError = function (error, req) {
        var _a;
        var message = "".concat(error);
        EVENT.define('Error', 0, message, req === null || req === void 0 ? void 0 : req.method, req === null || req === void 0 ? void 0 : req.url, 0, error, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email, (req === null || req === void 0 ? void 0 : req.headers['x-forwarded-for']) || (req === null || req === void 0 ? void 0 : req.connection.remoteAddress));
        this.emitEvent(EVENT);
    };
    LifecycleEvents.Instance = new LifecycleEvents();
    return LifecycleEvents;
}(atma_utils_1.class_EventEmitter));
exports.LifecycleEvents = LifecycleEvents;
var LifecycleSpan = /** @class */ (function () {
    function LifecycleSpan() {
        this.start = Date.now();
    }
    return LifecycleSpan;
}());
exports.LifecycleSpan = LifecycleSpan;
var LifecycleEvent = /** @class */ (function () {
    function LifecycleEvent() {
    }
    /** Do NOT create event objects to prevent GC */
    LifecycleEvent.prototype.define = function (type, time, message, method, url, status, error, user, ip) {
        this.time = time;
        this.type = type;
        this.message = message;
        this.user = user;
        this.method = method;
        this.url = url;
        this.error = error;
        this.status = status;
        this.ip = ip;
    };
    return LifecycleEvent;
}());
exports.LifecycleEvent = LifecycleEvent;
// Use singleton to prevent GC
var EVENT = new LifecycleEvent();
;

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
var dependency_1 = _src_dependency;
function secure_canAccess(req, secure) {
    if (secure == null || req.method === 'OPTIONS') {
        return true;
    }
    if (typeof secure === 'boolean') {
        return secure === false ? true : (req.session != null || req.user != null);
    }
    var user = req.user;
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
    var roles = user.roles;
    if (roles == null) {
        return false;
    }
    for (var i = 0; i < roles.length; i++) {
        var x = roles[i];
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
    for (var i = 0; i < roles.length; i++) {
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
    var claims = user.claims;
    if (claims == null) {
        return false;
    }
    for (var i = 0; i < claims.length; i++) {
        var x = claims[i];
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
    for (var i = 0; i < claims.length; i++) {
        if (hasClaim(req, user, claims[i])) {
            return true;
        }
    }
    return false;
}
var service_validateArgs = function (body, args, isStrict) {
    if (body == null)
        return new Error('Message Body is not defined');
    return dependency_1.Class.validate(body, args, isStrict);
};
exports.service_validateArgs = service_validateArgs;
;

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarricadeExt = void 0;
var dependency_1 = _src_dependency;
var atma_utils_1 = require("atma-utils");
var HttpError_1 = _src_HttpError_HttpError;
var Runner = dependency_1.Class.Collection(Function, {
    Base: dependency_1.Class.Serializable,
    process: function (service, req, res, params) {
        var dfr = new atma_utils_1.class_Dfr;
        next(this, dfr, service, req, res, params, 0);
        return dfr;
    }
});
function next(runner, dfr, service, req, res, params, index) {
    var middlewareFn = runner[index];
    var nextFn = nextDelegate(runner, dfr, service, req, res, params, index);
    var result;
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
    result.then(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return nextFn.apply(void 0, __spreadArray([null], args, false));
    }, function (error) { return nextFn(error); });
}
function nextDelegate(runner, dfr, service, req, res, params, index) {
    return function (error) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (error) {
            reject(dfr, error);
            return;
        }
        if (index >= runner.length - 1) {
            dfr.resolve.apply(dfr, args);
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
var BarricadeExt = function (middlewares) {
    var barricade = new Runner(middlewares);
    return function (req, res, params) {
        return barricade.process(this, req, res, params);
    };
};
exports.BarricadeExt = BarricadeExt;
;

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
        var json = null;
        if (body) {
            for (var key in body) {
                var val = body[key];
                json = setVal(json, key, val);
            }
        }
        if (files) {
            for (var key in files) {
                var val = files[key];
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
        var ctx = json;
        do {
            var _a = getAccessor(path), prop = _a[0], rest = _a[1];
            if (prop[0] === '[') {
                var endI = prop.indexOf(']', 1);
                var idx = Number(prop.substring(1, endI).trim());
                if (rest == null) {
                    ctx[idx] = val;
                    break;
                }
                var x_1 = ctx[idx];
                if (x_1 == null) {
                    x_1 = nextIsArray(rest) ? [] : {};
                    ctx[idx] = x_1;
                }
                ctx = x_1;
                path = rest;
                continue;
            }
            if (rest == null) {
                ctx[prop] = val;
                break;
            }
            var x = ctx[prop];
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
        var bracketI = path.indexOf('[', 1);
        var dotI = path.indexOf('.');
        if (dotI === -1 && bracketI === -1) {
            return [path, null];
        }
        if (dotI > -1 && bracketI > -1) {
            var min = Math.min(dotI, bracketI);
            var prop = path.substring(0, min);
            var rest = path.substring(min === dotI ? (min + 1) : (min));
            return [prop, rest];
        }
        if (dotI > -1) {
            var prop = path.substring(0, dotI);
            var rest = path.substring(dotI + 1);
            return [prop, rest];
        }
        if (bracketI > -1) {
            var prop = path.substring(0, bracketI);
            var rest = path.substring(bracketI);
            return [prop, rest];
        }
    }
})(FormDataUtil = exports.FormDataUtil || (exports.FormDataUtil = {}));
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointParamUtils = exports.Types = void 0;
var atma_utils_1 = require("atma-utils");
var HttpError_1 = _src_HttpError_HttpError;
var class_json_1 = require("class-json");
var FormDataUtil_1 = _src_util_FormDataUtil;
var Types;
(function (Types) {
    var ArrayOfString = /** @class */ (function () {
        function ArrayOfString() {
        }
        return ArrayOfString;
    }());
    Types.ArrayOfString = ArrayOfString;
    var ArrayOfNumber = /** @class */ (function () {
        function ArrayOfNumber() {
        }
        return ArrayOfNumber;
    }());
    Types.ArrayOfNumber = ArrayOfNumber;
    function ArrayOf(Type) {
        return new ArrayOfInner(Type);
    }
    Types.ArrayOf = ArrayOf;
    var Json = /** @class */ (function (_super) {
        __extends(Json, _super);
        function Json() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Json;
    }(class_json_1.Serializable));
    Types.Json = Json;
})(Types = exports.Types || (exports.Types = {}));
var ArrayOfInner = /** @class */ (function () {
    function ArrayOfInner(Type) {
        this.Type = Type;
    }
    return ArrayOfInner;
}());
var HttpEndpointParamUtils;
(function (HttpEndpointParamUtils) {
    function resolveParam(req, params, meta) {
        var _a, _b;
        if (meta.from === 'uri') {
            return UriExtractor.get(params, meta);
        }
        var body = req.body;
        if ((_b = (_a = req.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, 'multipart/form-data')) {
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
        var _a, _b;
        if (meta.name) {
            var val = params[meta.name];
            if (val == null) {
                if (meta.default != null) {
                    return meta.default;
                }
                if (meta.optional !== true) {
                    throw new HttpError_1.HttpError("URI Parameter '".concat(meta.name, "' is undefined"), 400);
                }
                return null;
            }
            var str = val;
            var converter = getConverter((_a = meta.Type) !== null && _a !== void 0 ? _a : String);
            if (converter != null) {
                val = converter.convert(val);
            }
            if (meta.validate || converter.validate) {
                var error = ((_b = meta.validate) !== null && _b !== void 0 ? _b : converter.validate)(val);
                if (error) {
                    throw new HttpError_1.HttpError("Invalid URI Parameter '".concat(meta.name, "' with value '").concat(str, "': ").concat(error), 400);
                }
            }
            return val;
        }
        var obj = toTree(params);
        var json = TypeConverter.fromType(obj, meta.Type);
        if (meta.validate) {
            var error = meta.validate(json);
            if (error) {
                throw new HttpError_1.HttpError("Invalid URI Parameters: ".concat(error), 400);
            }
        }
        return json;
    }
    UriExtractor.get = get;
    function toTree(params) {
        var obj = {};
        for (var key in params) {
            var val = params[key];
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
        var c = str[0];
        if (c === '{') {
            return str[str.length - 1] === '}';
        }
        if (c === '[') {
            return str[str.length - 1] === ']';
        }
        return false;
    }
    function getConverter(Type) {
        for (var i = 0; i < Converters.length; i++) {
            if (Converters[i].Type === Type) {
                return Converters[i];
            }
        }
        return null;
    }
    var Converters = [
        {
            Type: String,
            convert: function (val) {
                return val;
            }
        },
        {
            Type: Number,
            convert: function (val) {
                if (val == null || val === '') {
                    return null;
                }
                return parseFloat(val);
            },
            validate: function (val) {
                if (isNaN(val)) {
                    return "Is not a number";
                }
                return null;
            }
        },
        {
            Type: Date,
            convert: function (val) {
                if (val == null) {
                    return val;
                }
                return new Date(val);
            }
        },
        {
            Type: Boolean,
            convert: function (val) {
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
            convert: function (val) {
                if (val == null) {
                    return val;
                }
                return val.split(',');
            }
        },
        {
            Type: Types.ArrayOfNumber,
            convert: function (val) {
                if (val == null) {
                    return val;
                }
                return val.split(',').map(parseFloat);
            },
            validate: function (arr) {
                if (arr.some(isNaN)) {
                    return "Contains invalid number";
                }
                return null;
            }
        },
        {
            Type: Types.Json,
            convert: function (val) {
                if (val == null) {
                    return val;
                }
                try {
                    return JSON.parse(val);
                }
                catch (error) {
                    throw new HttpError_1.HttpError("Invalid json data: ".concat(val));
                }
            },
            validate: function (arr) {
            }
        },
    ];
})(UriExtractor || (UriExtractor = {}));
var TypeConverter;
(function (TypeConverter) {
    function fromType(json, Type) {
        var _a, _b;
        if (Type == null) {
            return json;
        }
        if (typeof Type !== 'function') {
            if (Type instanceof ArrayOfInner && Array.isArray(json)) {
                return json.map(function (x) { return fromType(x, Type.Type); });
            }
        }
        var instance = (_b = (_a = Type.fromJSON) === null || _a === void 0 ? void 0 : _a.call(Type, json)) !== null && _b !== void 0 ? _b : class_json_1.JsonConvert.fromJSON(json, { Type: Type });
        var error = Type.validate != null
            ? Type.validate(instance)
            : class_json_1.JsonValidate.validate(instance, { Type: Type });
        if (error != null && error.length !== 0) {
            // Try handle different cases
            var message = error;
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
            throw new HttpError_1.HttpError("Invalid Parameter: ".concat(message, " "), 400);
        }
        return instance;
    }
    TypeConverter.fromType = fromType;
})(TypeConverter || (TypeConverter = {}));
;

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpEndpointDecos = void 0;
var HttpEndpointParamUtils_1 = _src_HttpService_HttpEndpointParamUtils;
var HttpEndpointDecos;
(function (HttpEndpointDecos) {
    function middleware(fn) {
        return function (target, propertyKey, descriptor) {
            var viaProperty = descriptor == null;
            var current = viaProperty ? target[propertyKey] : descriptor.value;
            var result = mergeMiddleware(current, fn);
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
            forCtor: function (Ctor, meta) {
                meta.secure = true;
            },
            forMethod: function (Proto, method) {
                method.meta.secure = true;
            }
        });
    }
    HttpEndpointDecos.isAuthorized = isAuthorized;
    ;
    function isInRole() {
        var roles = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            roles[_i] = arguments[_i];
        }
        return createDecorator({
            forCtor: function (Ctor, meta) {
                meta.secure = { roles: roles };
            },
            forMethod: function (Proto, method) {
                method.meta.secure = { roles: roles };
            }
        });
    }
    HttpEndpointDecos.isInRole = isInRole;
    ;
    function hasClaim() {
        var claims = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            claims[_i] = arguments[_i];
        }
        return createDecorator({
            forCtor: function (Ctor, meta) {
                meta.secure = { claims: claims };
            },
            forMethod: function (Proto, method) {
                method.meta.secure = { claims: claims };
            }
        });
    }
    HttpEndpointDecos.hasClaim = hasClaim;
    ;
    function origin(origin) {
        return createDecorator({
            forCtor: function (Ctor, meta) {
                meta.origins = origin;
            },
            forMethod: function (Proto, method) {
                method.meta.origins = origin;
            }
        });
    }
    HttpEndpointDecos.origin = origin;
    ;
    function route(route) {
        return createDecorator({
            forCtor: function (Ctor, meta) {
                // files are dynamically parsed and the content resolved
                meta.path = route;
            },
            forMethod: function (Proto, method) {
                method.meta.path = route;
            }
        });
    }
    HttpEndpointDecos.route = route;
    ;
    function description(txt) {
        return createDecorator({
            forCtor: function (Ctor, meta) {
                meta.description = txt;
            },
            forMethod: function (Proto, method) {
                method.meta.description = txt;
            }
        });
    }
    HttpEndpointDecos.description = description;
    ;
    function response(response) {
        return createDecorator({
            forCtor: function (Ctor, meta) {
                throw new Error('Only the endpoint routes support response decorator');
            },
            forMethod: function (Proto, method) {
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
        var opts;
        if (mix == null) {
            opts = {
                Type: HttpEndpointParamUtils_1.Types.Json
            };
        }
        else if (typeof mix === 'string') {
            opts = {
                name: mix,
                Type: Type !== null && Type !== void 0 ? Type : String
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
        var opts;
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
        var _a;
        var meta = (_a = proto.meta) !== null && _a !== void 0 ? _a : (proto.meta = {});
        if (meta.endpointsParams == null) {
            meta.endpointsParams = {};
        }
        var params = meta.endpointsParams[methodName];
        if (params == null) {
            params = meta.endpointsParams[methodName] = [];
        }
        var Type = opts.Type;
        if (Type == null && opts.default != null) {
            var type = typeof opts.default;
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
        var name = opts.name;
        if (name == null && (Type === Number || Type === Boolean || Type === String)) {
            // primitives
            //- no way to get the param name? decorator provides only method name?
            //- name = methodName;
            console.error("URI Param in ".concat(methodName, " is primitive but the query name is not set."));
        }
        var paramMeta = {
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
        var proto = typeof mix === 'function'
            ? mix.prototype
            : Object.getPrototypeOf(mix);
        var meta = proto.meta;
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
                var meta = ensureEndpointMeta(target);
                return opts.forCtor(target, meta) || target;
            }
            var viaProperty = descriptor == null;
            var current = viaProperty ? target[propertyKey] : descriptor.value;
            var result = ensureEndpointMethod(current);
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
            return __spreadArray([fn], currentVal, true);
        }
        currentVal.process = mergeMiddleware(currentVal.process, fn);
    }
})(HttpEndpointDecos = exports.HttpEndpointDecos || (exports.HttpEndpointDecos = {}));
;

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
var HttpError_1 = _src_HttpError_HttpError;
var dependency_1 = _src_dependency;
var utils_1 = _src_HttpService_utils;
var atma_utils_1 = require("atma-utils");
var IHttpHandler_1 = _src_IHttpHandler;
var BarricadeExt_1 = _src_HttpService_BarricadeExt;
var HttpEndpointDecos_1 = _src_HttpService_HttpEndpointDecos;
var HttpEndpointParamUtils_1 = _src_HttpService_HttpEndpointParamUtils;
var HttpEndpointExplorer_1 = _src_HttpService_HttpEndpointExplorer;
var cors_1 = _src_util_cors;
var ruta_1 = require("ruta");
var METHOD_META_DEFAULT = {
    secure: null,
    arguments: null
};
var HttpEndpoint = /** @class */ (function () {
    function HttpEndpoint(route, app) {
        this.app = app;
        if (this.routes == null) {
            //Create ROUTES once
            Object.getPrototypeOf(this).routes = RouteUtils.resolveFromType(this);
        }
        if (route == null) {
            return;
        }
        var count = 0;
        for (var i = 0; i < route.path.length; i++) {
            var x = route.path[i];
            if (typeof x !== 'string') {
                break;
            }
            count += x.length + 1;
        }
        this.rootCharCount = count;
    }
    HttpEndpoint.prototype.process = function (req, res) {
        var _this = this;
        var _a, _b;
        var iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return Promise.resolve(HttpEndpointUtils.getHelpModel(this));
        }
        if (this.meta != null) {
            if ((0, utils_1.secure_canAccess)(req, this.meta.secure) === false) {
                return Promise.reject(new HttpError_1.SecurityError('Access Denied'));
            }
        }
        var path = req.url.substring(this.rootCharCount);
        var entry = this.routes.get(path, req.method);
        if (entry == null) {
            if (req.method === 'OPTIONS') {
                var headers = HttpEndpointUtils.getOptionsHeaders(this, path, req);
                if (headers) {
                    res.writeHead(200, headers);
                    res.end();
                    // Return nothing back to application
                    return void 0;
                }
            }
            var name = this.constructor.name || '<service>';
            var url = path || '/';
            var error_1 = new HttpError_1.NotFoundError("".concat(name, ": endpoint not Found: <").concat(req.method, "> ").concat(url));
            return Promise.reject(error_1);
        }
        var endpoint = entry.value;
        var meta = endpoint.meta;
        if (meta != null) {
            if (meta.secure != null && (0, utils_1.secure_canAccess)(req, meta.secure) === false) {
                var error_2 = new HttpError_1.SecurityError('Access Denied');
                return Promise.reject(error_2);
            }
            if (meta.arguments != null) {
                var args = meta.arguments;
                var isGet = req.method === 'GET';
                var isStrict = isGet === false && meta.strict;
                var body = isGet
                    ? entry.current.params
                    : req.body;
                var error = (0, utils_1.service_validateArgs)(body, args, isStrict);
                if (error) {
                    return Promise.reject(new HttpError_1.RequestError(error.message));
                }
            }
        }
        var params = null;
        var paramsMeta = (_b = (_a = this.meta) === null || _a === void 0 ? void 0 : _a.endpointsParams) === null || _b === void 0 ? void 0 : _b[endpoint.key];
        if (paramsMeta != null) {
            params = [];
            for (var i = 0; i < paramsMeta.length; i++) {
                params[i] = HttpEndpointParamUtils_1.HttpEndpointParamUtils.resolveParam(req, entry.current.params, paramsMeta[i]);
            }
            params.push(req, res);
        }
        var result = params == null
            ? endpoint.process.call(this, req, res, entry.current.params)
            : endpoint.process.apply(this, params);
        if (result == null) {
            return void 0;
        }
        var promise = this.dfr = new atma_utils_1.class_Dfr();
        if (typeof result.then !== 'function') {
            HttpEndpointUtils.onComplete(path, req, res, this, endpoint, promise, result);
            return promise;
        }
        var hasCatch = typeof result.catch === 'function';
        var catchable = result.then(function (mix, statusCode, mimeType, headers) {
            HttpEndpointUtils.onComplete(path, req, res, _this, endpoint, promise, mix, statusCode, mimeType, headers);
        }, hasCatch ? void 0 : function (error) { return promise.reject(error); });
        if (hasCatch) {
            catchable.catch(function (err) {
                promise.reject(err);
            });
        }
        return promise;
    };
    HttpEndpoint.prototype.resolve = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.dfr).resolve.apply(_a, args);
    };
    HttpEndpoint.prototype.reject = function (error) {
        this.dfr.reject(error);
    };
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
    return HttpEndpoint;
}());
exports.HttpEndpoint = HttpEndpoint;
var HttpEndpointUtils;
(function (HttpEndpointUtils) {
    var METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
    var HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
    function onComplete(path, req, res, endpoint, endpointMethod, promise, mix, statusCode, mimeType, headers) {
        var _a;
        var content = null;
        if (mix instanceof IHttpHandler_1.HttpResponse) {
            content = mix.content;
            statusCode = mix.statucCode;
            mimeType = mix.mimeType;
            headers = mix.headers;
        }
        else {
            content = mix;
        }
        if ((_a = endpoint.meta) === null || _a === void 0 ? void 0 : _a.origins) {
            var corsHeaders = getOptionsHeaders(endpoint, path, req);
            headers = headers == null ? corsHeaders : (0, dependency_1.obj_extend)(headers, corsHeaders);
        }
        promise.resolve(content, statusCode, mimeType, headers);
    }
    HttpEndpointUtils.onComplete = onComplete;
    function getHelpModel(service) {
        return HttpEndpointExplorer_1.HttpEndpointExplorer.getMeta(service.constructor);
    }
    HttpEndpointUtils.getHelpModel = getHelpModel;
    ;
    function getCorsHeaders(req, handler) {
        var _a, _b;
        var headers = {
            'Access-Control-Allow-Methods': [req.method],
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': (_b = (_a = handler.meta) === null || _a === void 0 ? void 0 : _a.origins) !== null && _b !== void 0 ? _b : ''
        };
        (0, cors_1.cors_rewriteAllowedOrigins)(req, headers);
        return headers;
    }
    HttpEndpointUtils.getCorsHeaders = getCorsHeaders;
    function getOptionsHeaders(endpoint, path, req) {
        var headers = {}, allowedMethods = [], allowedOrigins = '', i = METHODS.length;
        if (endpoint.meta) {
            if (endpoint.meta.headers != null) {
                headers = (0, dependency_1.obj_extend)(headers, endpoint.meta.headers);
            }
            if (endpoint.meta.origins != null) {
                allowedOrigins = endpoint.meta.origins;
            }
        }
        while (--i > -1) {
            var method = METHODS[i];
            var route = endpoint.routes.get(path, method);
            if (route != null) {
                allowedMethods.push(method);
                var endpointMethod = route.value;
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
        var methods = allowedMethods.join(',');
        if (methods.includes('OPTIONS') === false) {
            methods += ',OPTIONS';
        }
        var cors = {
            'Content-Type': 'application/json;charset=utf-8',
            'Allow': methods,
            'Access-Control-Allow-Methods': methods,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': allowedOrigins
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
        for (var path in defs) {
            if (path[0] !== '$') {
                continue;
            }
            var x = defs[path];
            var responder = null;
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
        var keys = Object.getOwnPropertyNames(proto);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (null != hash[key]) {
                continue;
            }
            hash[key] = proto[key];
        }
        var next = Object.getPrototypeOf(proto);
        if (null == next || next === Object.prototype) {
            return hash;
        }
        return fillProtoHash(next, hash);
    }
    function resolveFromType(endpoint) {
        var prototype = Object.getPrototypeOf(endpoint);
        return resolveFromProto(prototype);
    }
    RouteUtils.resolveFromType = resolveFromType;
    function resolveFromProto(prototype) {
        var routes = new ruta_1.Collection;
        var properties = fillProtoHash(prototype, Object.create(null));
        define(properties, routes);
        define(prototype.ruta, routes);
        return routes;
    }
    RouteUtils.resolveFromProto = resolveFromProto;
})(RouteUtils = exports.RouteUtils || (exports.RouteUtils = {}));
;

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
var _src_HttpApplication_Application;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpApplication_Application != null ? _src_HttpApplication_Application : {};
    var module = { exports: exports };

    "use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.respond_Raw = void 0;
var dependency_1 = _src_dependency;
var Message_1 = _src_HttpApplication_Message;
var cli_1 = _src_util_cli;
var app_1 = _src_util_app;
var HttpError_1 = _src_HttpError_HttpError;
var HandlerFactory_1 = _src_HandlerFactory;
var WebSocket_1 = _src_WebSocket;
var Config_1 = _src_Config_Config;
var Middleware_1 = _src_Business_Middleware;
var Autoreload_1 = _src_Autoreload_Autoreload;
var HttpErrorPage_1 = _src_HttpPage_HttpErrorPage;
var exports_1 = _src_compos_exports;
var send_1 = _src_util_send;
var SubApp_1 = _src_HttpApplication_SubApp;
var HttpRewriter_1 = _src_HttpRewrites_HttpRewriter;
var obj_1 = _src_util_obj;
var IHttpHandler_1 = _src_IHttpHandler;
var dependency_2 = _src_dependency;
var http = require("http");
var https = require("https");
var HttpEndpointExplorer_1 = _src_HttpService_HttpEndpointExplorer;
var atma_utils_1 = require("atma-utils");
var LifecycleEvents_1 = _src_HttpApplication_LifecycleEvents;
var HttpEndpoint_1 = _src_HttpService_HttpEndpoint;
var _emitter = new atma_utils_1.class_EventEmitter();
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(proto) {
        if (proto === void 0) { proto = {}; }
        var _this = _super.call(this) || this;
        _this.startedAt = Date.now();
        _this.promise = new atma_utils_1.class_Dfr();
        _this.lifecycle = LifecycleEvents_1.LifecycleEvents.Instance;
        // <Boolean>, if instance is the root application, and not one of the subapps
        _this.isRoot = false;
        _this.isHttpsForced = false;
        // <HandlerFactory>, stores all endpoints of this application
        _this.handlers = null;
        // <http.Server> , in case `listen` was called.
        _this._server = null;
        _this._sslServer = null;
        // run this middlewares when the endpoint is found. (Runs before the endpoint handler)
        _this._innerPipe = null;
        // run this middlewares by all requests. Contains also endpoint resolver
        _this._outerPipe = null;
        //@obsolete
        _this._responder = null;
        _this._responders = null;
        _this.middleware = null;
        // Loaded server scripts from `config.env.scripts` and `config.env.both`
        _this.resources = null;
        // Stores all exports from `resources`
        _this.lib = {};
        // webSockets
        _this.webSockets = null;
        _this.rewriter = new HttpRewriter_1.default;
        _this.redirects = new HttpRewriter_1.default;
        if (_this instanceof Application === false) {
            throw Error('Application must be created with the `new` keywoard');
        }
        _this._loadConfig = _this._loadConfig.bind(_this);
        _this._404 = _this._404.bind(_this);
        _this.process = _this.process.bind(_this);
        // if a root application
        if (Application.current == null) {
            Application.current = _this;
        }
        _this.isRoot = _this === Application.current;
        _this.handlers = new HandlerFactory_1.default(_this);
        _this.webSockets = new WebSocket_1.default(_this);
        _this.args = (0, dependency_1.obj_extend)(proto.args, (0, cli_1.cli_arguments)());
        _this._baseConfig = proto;
        _this._loadConfig();
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
        if (this.redirects) {
            var responded = this.redirects.redirect(req, res);
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
    };
    Application.prototype.execute = function (url, method, body, headers) {
        var req = new Message_1.Request(url, method, body, headers);
        var res = new Message_1.Response;
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
        Autoreload_1.Autoreload.enable(this);
        Autoreload_1.Autoreload.getWatcher().on('fileChange', function (relPath, absPath) {
            Application.trigger('autoreload', relPath, absPath);
        });
    };
    Application.prototype.done = function (fn) {
        this.promise.then(fn);
    };
    Application.prototype.fail = function (fn) {
        this.promise.then(null, fn);
    };
    Application.prototype.listen = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var port, server;
        var i = args.length;
        var mix;
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
        var processFn = this.process;
        var ssl = this.config.$get('server.ssl');
        if (ssl && ssl.enabled === true) {
            var forced = ssl.forced, port_1 = ssl.port, certFile = ssl.certFile, keyFile = ssl.keyFile, caFile = ssl.caFile;
            this.isHttpsForced = forced == null ? false : forced;
            var readFile = function (path) {
                return path && dependency_2.io.File.exists(path) && dependency_2.io.File.read(path, { encoding: 'buffer' }) || void 0;
            };
            var options = {
                key: readFile(keyFile),
                cert: readFile(certFile),
                ca: readFile(caFile),
            };
            this._sslServer = https
                .createServer(options, this.process)
                .listen(port_1);
            if (forced === true) {
                processFn = function (req, res, next) {
                    var allow = req.url.indexOf('/.well-known/') !== -1;
                    var proto = req.headers['x-forwarded-proto'];
                    if (proto !== 'https' && allow !== true) {
                        var host = req.headers['host'];
                        if (host) {
                            // clear original port
                            host = host.replace(/:.+$/, '');
                        }
                        var portStr = port_1 === 443 ? '' : ":".concat(port_1);
                        var path = "https://".concat(host).concat(portStr).concat(req.url);
                        res.writeHead(301, { 'Location': path });
                        res.end();
                        return;
                    }
                    _this.process(req, res, next);
                };
            }
        }
        this._server = server
            .on('request', processFn)
            .listen(port);
        _emitter.trigger('listen', this);
        this.lifecycle.completeAppStart(this.startedAt);
        if ((0, app_1.app_isDebug)()) {
            this.autoreload();
        }
        return this._server;
    };
    Application.prototype.getSubApp = function (path) {
        var route = this.handlers.subapps.get(path);
        return route && route.value && route.value.app_;
    };
    Application.prototype._loadConfig = function () {
        var definition = this._baseConfig;
        (0, Config_1.default)(definition, this).then(cfg_doneDelegate(this), function (error) {
            dependency_1.logger
                .warn('Configuration Error')
                .error(error);
        });
        return this;
    };
    Application.prototype._404 = function (error, req, res) {
        error = error == null
            ? new HttpError_1.HttpError('Endpoint not found: ' + req.url, 404)
            : HttpError_1.HttpErrorUtil.create(error);
        var accept = req.headers['accept'];
        if (accept == null || accept.indexOf('text/html') !== -1) {
            HttpErrorPage_1.default.send(error, req, res, this.config);
            return;
        }
        // send json
        (0, send_1.send_Error)(req, res, error, null, this, Date.now());
    };
    Application.clean = function () {
        Application.current = null;
        _emitter = new atma_utils_1.class_EventEmitter;
        return this;
    };
    Application.create = function (config) {
        return new Promise(function (resolve, reject) {
            new Application(config)
                .promise
                .then(resolve, reject);
        });
        ;
    };
    Application.current = null;
    Application.on = _emitter.on.bind(_emitter);
    Application.off = _emitter.off.bind(_emitter);
    Application.once = _emitter.once.bind(_emitter);
    Application.trigger = _emitter.trigger.bind(_emitter);
    Application.Config = Config_1.default;
    return Application;
}(atma_utils_1.class_EventEmitter));
;
function responder(app) {
    return function (req, res, next) {
        if (Autoreload_1.Autoreload.enabled) {
            Autoreload_1.Autoreload.watch(req.url, app.config);
        }
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
exports.respond_Raw = respond_Raw;
function middleware_processDelegate(middlewareRunner) {
    return function (app, handler, req, res) {
        var startedAt = Date.now();
        middlewareRunner.process(req, res, done, app.config);
        function done(error) {
            var _a;
            if (error) {
                var headers = (_a = handler.meta) === null || _a === void 0 ? void 0 : _a.headers;
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
    var result = null;
    var startedAt = Date.now();
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
        handler_complete(app, handler, req, res, result, null, null, null, startedAt);
        return;
    }
    if (handler.then == null) {
        // Handler responds to the request itself
        return;
    }
    handler_await(app, handler, req, res, handler, startedAt);
}
function handler_await(app, handler, req, res, dfr, startedAt) {
    dfr.then(function onSuccess(mix, statusCode, mimeType, headers) {
        var content = null;
        if (mix instanceof IHttpHandler_1.HttpResponse) {
            content = mix.content;
            statusCode = mix.statucCode;
            mimeType = mix.mimeType;
            headers = mix.headers;
        }
        else {
            content = mix;
        }
        handler_complete(app, handler, req, res, content, statusCode, mimeType, headers, startedAt);
    }, function onError(error, statusCode) {
        var _a;
        error = HttpError_1.HttpErrorUtil.create(error, statusCode);
        if (handler.sendError) {
            handler.sendError(error, req, res, app.config);
            return;
        }
        var headers = null;
        var origins = (_a = handler === null || handler === void 0 ? void 0 : handler.meta) === null || _a === void 0 ? void 0 : _a.origins;
        if (origins) {
            headers = HttpEndpoint_1.HttpEndpointUtils.getCorsHeaders(req, handler);
        }
        var allHeaders = handler_resolveHeaders(app, handler, headers);
        (0, send_1.send_Error)(req, res, error, allHeaders, app, startedAt);
    });
}
function handler_complete(app, handler, req, res, content, statusCode, mimeType, headers, startedAt) {
    var _a;
    var send = (_a = handler.send) !== null && _a !== void 0 ? _a : send_1.send_Content;
    var allHeaders = handler_resolveHeaders(app, handler, headers);
    send(req, res, content, statusCode, mimeType, allHeaders, app, startedAt);
}
function handler_resolveHeaders(app, handler, overrides) {
    var _a, _b;
    if (overrides === void 0) { overrides = null; }
    var headers_Handler = (_a = handler.meta) === null || _a === void 0 ? void 0 : _a.headers;
    var headers_App = (_b = app.config) === null || _b === void 0 ? void 0 : _b.headers;
    if (headers_Handler == null && headers_App == null) {
        return overrides;
    }
    return (0, obj_1.obj_assign)({}, headers_App, headers_Handler, overrides);
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
    return function (cfg) {
        app.config = cfg;
        if (app.isRoot && (0, app_1.app_isDebug)() !== true) {
            dependency_1.logger.cfg('color', 'none');
        }
        _emitter.trigger('configurate', app);
        Autoreload_1.Autoreload.prepare(app);
        (0, exports_1.initilizeEmbeddedComponents)(app);
        app
            .handlers
            .registerPages(cfg.pages, cfg.page)
            .registerSubApps(cfg.subapps, cfg.subapp)
            .registerHandlers(cfg.handlers, cfg.handler)
            .registerServices(cfg.services, cfg.service)
            .registerWebsockets(cfg.websockets, cfg.websocket);
        app.rewriter.addRules(cfg.rewriteRules);
        app.redirects.addRules(cfg.redirectRules);
        Promise.all([
            HttpEndpointExplorer_1.HttpEndpointExplorer.find(app.config.service.endpoints, app.config.base),
            resources_load(app)
        ]).then(function (_a) {
            var endpoints = _a[0];
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
    var config = app.config;
    var base = config.base;
    var env = config.env;
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
    return new Promise(function (resolve) {
        app
            .resources
            .done(function (resp) {
            app.lib = (0, dependency_1.obj_extend)(app.lib, resp);
            var projects = config.projects;
            if (projects) {
                for (var name in projects) {
                    var res = resp[name];
                    if (res != null && typeof res.attach === 'function')
                        res.attach(app);
                }
            }
            resolve(null);
        });
    });
}
exports.default = Application;
;

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
var Application_1 = _src_HttpApplication_Application;
var Debug;
(function (Debug) {
    Debug[Debug["Unknown"] = 0] = "Unknown";
    Debug[Debug["Yes"] = 1] = "Yes";
    Debug[Debug["No"] = 2] = "No";
})(Debug || (Debug = {}));
var debug = Debug.Unknown;
function app_isDebug() {
    if (debug !== Debug.Unknown) {
        return debug === Debug.Yes;
    }
    var app = Application_1.default.current;
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
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeError = exports.NotFoundError = exports.SecurityError = exports.RequestError = exports.HttpErrorUtil = exports.HttpError = void 0;
var dependency_1 = _src_dependency;
var app_1 = _src_util_app;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(mix, statusCode) {
        var _this = _super.call(this, mix) || this;
        _this._error = null;
        _this._json = null;
        _this.name = 'HttpError';
        _this.statusCode = 500;
        _this._error = typeof mix === 'string'
            ? new Error(mix)
            : mix;
        _this.message = String(_this._error.message);
        if (statusCode != null) {
            _this.statusCode = statusCode;
        }
        if (_this.toJSON == null) {
            Object.assign(_this, Methods);
        }
        if (_this.toJSON == null) {
            Object.assign(_this, Methods);
            _this.stack = _this._error.stack;
        }
        _this.stack = HttpErrorUtil.parseStackTrace(_this._error);
        return _this;
    }
    HttpError.prototype.toString = function () {
        return this.message
            ? this.name + ': ' + this.message
            : this.name;
    };
    HttpError.prototype.toJSON = function () {
        if (this._json != null)
            return this._json;
        return {
            name: this.name,
            error: this.message,
            code: this.statusCode,
            stack: app_1.app_isDebug ? this.stack : void 0
        };
    };
    return HttpError;
}(Error));
exports.HttpError = HttpError;
;
var Methods = {
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
            stack: app_1.app_isDebug ? this.stack : void 0
        };
    }
};
var HttpErrorUtil;
(function (HttpErrorUtil) {
    function parseStackTrace(error) {
        if (error == null) {
            return;
        }
        var stack = error.stack.split('\n');
        var imax = stack.length;
        var start = 1;
        var end = imax;
        var cursor = 0;
        var before = true;
        var atmaRgx = /node_modules[\\\/]atma\-/;
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
            var msg = mix.message || mix.error;
            var code = statusCode || mix.statusCode || mix.status;
            var error = void 0;
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
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(mix, status) {
            var _this = _super.call(this, mix, status) || this;
            _this.statusCode = code;
            _this.name = id;
            return _this;
        }
        return class_1;
    }(HttpError));
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
;

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
var _src_HttpService_static;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_static != null ? _src_HttpService_static : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var error_TITLE = '<service> Model deserialization: ';
exports.default = {
    classParser: function (name, Ctor) {
        var keys = dependency_1.Class.properties(Ctor);
        return function (req, res, params, next) {
            if (req.body == null) {
                next('Body is not defined');
                return;
            }
            var propError = checkProperties(req.body, keys);
            if (propError != null) {
                next(error_TITLE + propError);
                return;
            }
            var model = new Ctor(req.body);
            var error = dependency_1.Class.validate(model);
            if (error != null) {
                next(error_TITLE + error);
                return;
            }
            req[name] = model;
            next();
        };
    },
    collectionParser: function (name, CollCtor) {
        var keys = dependency_1.Class.properties(CollCtor.prototype._ctor);
        return function (req, res, params, next) {
            if (Array.isArray(req.body) === false) {
                next('Array expected');
                return;
            }
            var error, imax = req.body.length, error, i = -1;
            while (++i < imax) {
                error = checkProperties(req.body[i], keys);
                if (error != null) {
                    next(error_TITLE + error);
                    return;
                }
            }
            req[name] = new CollCtor(req.body);
            i = -1;
            while (++i < imax) {
                error = dependency_1.Class.validate(req[name][i]);
                if (error != null) {
                    next(error_TITLE + error);
                    return;
                }
            }
            next();
        };
    },
    classPatchParser: function (name, Ctor) {
        var keys = dependency_1.Class.properties(Ctor);
        return function (req, res, params, next) {
            if (req.body == null)
                return next('Body is not defined');
            var $set = req.body.$set;
            if ($set) {
                var type, key, dot;
                for (key in $set) {
                    dot = key.indexOf('.');
                    if (dot !== -1)
                        key = key.substring(0, dot);
                    if (keys[key] === void 0)
                        return next('Unexpected property ' + key);
                    type = typeof req.body[key];
                    if (type !== 'undefined' && type !== keys[key])
                        return next('Type mismatch ' + type + '/' + keys[key]);
                }
            }
            next();
        };
    }
};
function checkProperties(obj, keys) {
    for (var key in obj) {
        if (keys[key] === void 0) {
            return 'Unexpected property ' + key;
        }
        var type = typeof obj[key];
        if (type !== 'undefined' && type !== keys[key]) {
            return 'Type mismatch ' + type + '/' + keys[key];
        }
    }
    return null;
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_static === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_static) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_static, module.exports);
    } else {
        _src_HttpService_static = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_CrudWrapper;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_HttpService_CrudWrapper != null ? _src_HttpService_CrudWrapper : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var static_1 = _src_HttpService_static;
var dependency_1 = _src_dependency;
var HttpError_1 = _src_HttpError_HttpError;
exports.default = {
    Single: function (name, Ctor) {
        var proto = {}, property = name, bodyParser = static_1.default.classParser(name, Ctor), bodyPatchParser = static_1.default.classPatchParser(name, Ctor), properties = dependency_1.Class.properties(Ctor);
        Object
            .keys(properties)
            .forEach(function (key) {
            properties['?' + key] = properties[key];
            delete properties[key];
        });
        proto['$get /' + name + '/:id'] = {
            meta: {
                response: properties
            },
            process: function (req, res, params) {
                awaiter(this, Ctor.fetch({ _id: params.id }));
            }
        };
        proto['$put /' + name + '/:id'] = {
            meta: {
                description: 'Update existed entity',
                arguments: properties,
                response: properties
            },
            process: [
                bodyParser,
                function (req, res, params) {
                    var x = req[property];
                    x._id = params.id;
                    awaiter(this, x.save());
                }
            ]
        };
        proto['$post /' + name] = {
            meta: {
                description: 'Create new entity',
                arguments: properties,
                response: properties,
            },
            process: [
                bodyParser,
                function (req) {
                    var x = req[property];
                    delete x._id;
                    awaiter(this, x.save());
                }
            ]
        };
        proto['$delete /' + name + '/:id'] = {
            meta: {
                description: 'Remove entity'
            },
            process: function (req, res, params) {
                var x = new Ctor({ _id: params.id });
                awaiter(this, x.del());
            }
        };
        proto['$patch /' + name + '/:id'] = {
            meta: {
                description: 'Modify existed entity. `patch object` syntax is similar to MongoDB\'s'
            },
            process: [
                bodyPatchParser,
                function (req, res, params) {
                    var json = req.body, instance = new Ctor({ _id: params.id }).patch(json);
                    awaiter(this, instance);
                }
            ]
        };
        return proto;
    },
    Collection: function (name, Ctor) {
        var proto = {}, property = name, bodyParser = static_1.default.collectionParser(property, Ctor), properties = dependency_1.Class.properties(Ctor.prototype._ctor);
        proto['$get /' + name] = {
            meta: {
                response: [properties]
            },
            process: function () {
                awaiter(this, Ctor.fetch({}));
            }
        };
        var upsert = {
            meta: {
                description: 'Create or update(if _id is present) entries',
                arguments: [properties]
            },
            process: [
                bodyParser,
                function (req) {
                    awaiter(this, req[property].save());
                }
            ]
        };
        proto['$put /' + name] = upsert;
        proto['$post /' + name] = upsert;
        proto['$delete /' + name] = {
            meta: {
                arguments: [{ _id: 'string' }]
            },
            process: [
                function (req, res, params, next) {
                    if (Array.isArray(req.body) === false) {
                        next('Invalid arguments. Array expected');
                        return;
                    }
                    var imax = req.body.length, i = -1;
                    while (++i < imax) {
                        if (req.body[i]._id)
                            continue;
                        next('`_id` property expected at ' + i);
                        return;
                    }
                    req[property] = new Ctor(req.body);
                },
                function (req) {
                    awaiter(this, req[property].del());
                }
            ]
        };
        proto['$patch /' + name] = {
            meta: {
                description: '<is not supported>'
            },
            process: function () {
                this.reject(new HttpError_1.HttpError('`PATCH` is not supported for collections'));
            }
        };
        return proto;
    }
};
function awaiter(service, instance) {
    instance
        .done(service.resolveDelegate())
        .fail(service.rejectDelegate());
}
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_HttpService_CrudWrapper === module.exports) {
        // do nothing if
    } else if (__isObj(_src_HttpService_CrudWrapper) && __isObj(module.exports)) {
        Object.assign(_src_HttpService_CrudWrapper, module.exports);
    } else {
        _src_HttpService_CrudWrapper = module.exports;
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
var dependency_1 = _src_dependency;
var HttpError_1 = _src_HttpError_HttpError;
var Runner = dependency_1.Class.Collection(Function, {
    Base: dependency_1.Class.Serializable,
    process: function (service, req, res, params) {
        next(this, service, req, res, params, 0);
    }
});
function next(runner, service, req, res, params, index) {
    if (index >= runner.length)
        return;
    var fn = runner[index], error;
    error = fn.call(service, req, res, params, nextDelegate(runner, service, req, res, params, index));
    if (error)
        reject(service, error);
}
function nextDelegate(runner, service, req, res, params, index) {
    return function (error) {
        if (error)
            return reject(service, error);
        next(runner, service, req, res, params, ++index);
    };
}
function reject(service, error) {
    if (typeof error === 'string')
        error = new HttpError_1.HttpError(error);
    service.reject(error);
}
var Barricade = function (middlewares) {
    var barricade = new Runner(middlewares), service;
    return function (req, res, params) {
        service = this;
        barricade.process(service, req, res, params);
    };
};
exports.Barricade = Barricade;
;

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var HttpError_1 = _src_HttpError_HttpError;
var utils_1 = _src_HttpService_utils;
var Barricade_1 = _src_HttpService_Barricade;
var atma_utils_1 = require("atma-utils");
var IHttpHandler_1 = _src_IHttpHandler;
var cors_1 = _src_util_cors;
var ruta_1 = require("ruta");
var HttpServiceProto = (0, dependency_1.Class)({
    Extends: dependency_1.Class.Deferred,
    secure: null,
    Construct: function (route) {
        if (route == null)
            return;
        var pathParts = route.path, i = 0, imax = pathParts.length, count = 0;
        for (; i < imax; i++) {
            if (typeof pathParts[i] !== 'string')
                break;
            count += pathParts[i].length + 1;
        }
        this.rootCharCount = count;
        if ('secure' in route.value) {
            this.secure = route.value.secure || {};
        }
    },
    help: function () {
        var routes = this.routes.routes, endpoints = [];
        var i = -1, imax = routes.length, endpoint, info, meta;
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
    },
    process: function (req, res) {
        var _this = this;
        var _a;
        var iQuery = req.url.indexOf('?');
        if (iQuery !== -1
            && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return this.resolve(this.help());
        }
        if ((0, utils_1.secure_canAccess)(req, this.secure) === false) {
            return this.reject(new HttpError_1.SecurityError('Access Denied'));
        }
        var path = req.url.substring(this.rootCharCount), entry = this.routes.get(path, req.method);
        if (entry == null && req.method === 'OPTIONS') {
            var headers = this.getOptions(path, req, res);
            if (headers) {
                res.writeHead(200, headers);
                res.end();
                // Return nothing back to application
                return void 0;
            }
        }
        if (entry == null) {
            var name = this.name || '<service>', url = path || '/';
            return this
                .reject(new HttpError_1.NotFoundError(name
                + ': endpoint not Found: <'
                + req.method
                + '> '
                + url));
        }
        var endpoint = entry.value, meta = endpoint.meta, args = meta && meta.arguments;
        if (meta != null && (0, utils_1.secure_canAccess)(req, meta.secure) === false) {
            return this
                .reject(new HttpError_1.SecurityError('Access Denied'));
        }
        if (args != null) {
            var isGet = req.method === 'GET', isStrict = isGet === false && meta.strict, body = isGet
                ? entry.current.params
                : req.body;
            var error = (0, utils_1.service_validateArgs)(body, args, isStrict);
            console.log('ERROR', error);
            if (error) {
                return this.reject(new HttpError_1.RequestError((_a = error.message) !== null && _a !== void 0 ? _a : error.toString()));
            }
        }
        var result = endpoint
            .process
            .call(this, req, res, entry.current.params);
        var dfr = result || this;
        var promise = new atma_utils_1.class_Dfr();
        dfr.then(function (mix, statusCode, mimeType, headers) {
            var content = null;
            if (mix instanceof IHttpHandler_1.HttpResponse) {
                content = mix.content;
                statusCode = mix.statucCode;
                mimeType = mix.mimeType;
                headers = mix.headers;
            }
            else {
                content = mix;
            }
            if (meta != null && meta.origins) {
                var corsHeaders = _this.getOptions(path, req, res);
                headers = headers == null ? corsHeaders : (0, dependency_1.obj_extend)(headers, corsHeaders);
            }
            promise.resolve(content, statusCode, mimeType, headers);
        }, function (error) { return promise.reject(error); });
        return promise;
    },
    getOptions: (function () {
        var METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
        var HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
        return function (path, req) {
            var headers = {}, allowedMethods = [], allowedOrigins = '', i = METHODS.length;
            if (this.meta) {
                if (this.meta.headers != null) {
                    headers = (0, dependency_1.obj_extend)(headers, this.meta.headers);
                }
                if (this.meta.origins != null) {
                    allowedOrigins = this.meta.origins;
                }
            }
            while (--i > -1) {
                var method = METHODS[i];
                var route = this.routes.get(path, method);
                if (route != null) {
                    allowedMethods.push(method);
                    var endpoint = route.value;
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
            var methods = allowedMethods.join(',');
            if (methods.indexOf('OPTIONS') === -1) {
                methods += ',OPTIONS';
            }
            var cors = {
                'Content-Type': 'application/json;charset=utf-8',
                'Allow': methods,
                'Access-Control-Allow-Methods': methods,
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
                'Access-Control-Allow-Origin': allowedOrigins
            };
            (0, dependency_1.obj_extendDefaults)(headers, cors);
            (0, cors_1.cors_rewriteAllowedOrigins)(req, headers);
            return headers;
        };
    }())
});
function HttpService(mix) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    var name, args;
    if (typeof mix === 'string') {
        name = mix;
        args = params;
    }
    else {
        args = __spreadArray([mix], params, true);
    }
    var proto = endpoints_merge(args);
    var routes = new ruta_1.Collection, defs = proto.ruta || proto.routes || proto, path, responder, x;
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
    if (name != null)
        proto.name = name;
    if (proto.Extends == null) {
        proto.Extends = HttpServiceProto;
    }
    else if (Array.isArray(proto.Extends)) {
        proto.Extends.push(HttpServiceProto);
    }
    else {
        proto.Extends = [HttpServiceProto, proto.Extends];
    }
    return (0, dependency_1.Class)(proto);
}
exports.default = HttpService;
HttpService.Barricade = Barricade_1.Barricade;
function endpoints_merge(array) {
    if (array.length === 1)
        return array[0];
    var proto = array[0], ruta = proto.ruta || proto.routes || proto;
    var imax = array.length, i = 0, x, xruta;
    while (++i < imax) {
        x = array[i];
        xruta = x.ruta || x.routes || x;
        for (var key in xruta) {
            if (xruta[key] != null) {
                ruta[key] = xruta[key];
            }
        }
        if (x.ruta == null || x.routes) {
            continue;
        }
        for (var key in x) {
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
;

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
var _src_middleware_query;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_middleware_query != null ? _src_middleware_query : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMidd = void 0;
var ruta_1 = require("ruta");
var deserialize = ruta_1._.query.deserialize;
function QueryMidd(req, res, next) {
    var url = req.url;
    var qIdx = url.indexOf('?');
    req.query = qIdx === -1
        ? {}
        : deserialize(url.substring(qIdx + 1));
    next();
}
exports.QueryMidd = QueryMidd;
;
;

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
var app_1 = _src_util_app;
var Autoreload_1 = _src_Autoreload_Autoreload;
var Application_1 = _src_HttpApplication_Application;
var StaticContent = require('static-content');
Application_1.default.on('configurate', function (app) {
    if (app.isRoot === false || (0, app_1.app_isDebug)() === false) {
        return;
    }
    StaticContent.on('file', function (file) {
        Autoreload_1.Autoreload.watchFile(file);
    });
    Autoreload_1.Autoreload.getWatcher().on('fileChange', function (relPath, absPath) {
        StaticContent.Cache.remove(absPath);
    });
});
exports.default = StaticContent;
;

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
exports.createStaticMidd = exports.StaticMidd = void 0;
var Static_1 = _src_Plugins_Static;
function StaticMidd(req, res, next, config) {
    if (responder == null) {
        responder = Static_1.default.respond;
    }
    responder(req, res, next, config);
}
exports.StaticMidd = StaticMidd;
;
function createStaticMidd(config) {
    return (responder = Static_1.default.create(config));
}
exports.createStaticMidd = createStaticMidd;
StaticMidd.config = function (config) {
    return (responder = Static_1.default.create(config));
};
var responder = null;
;

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
var query_1 = _src_middleware_query;
var static_1 = _src_middleware_static;
exports.default = {
    query: query_1.QueryMidd,
    static: static_1.StaticMidd,
    files: static_1.createStaticMidd
};
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HandlerFactory_1 = _src_HandlerFactory;
var HttpPage_1 = _src_HttpPage_HttpPage;
var atma_utils_1 = require("atma-utils");
var MaskRunner = /** @class */ (function (_super) {
    __extends(MaskRunner, _super);
    function MaskRunner(route, app) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.app = app;
        _this.app = app;
        _this.route = route;
        return _this;
    }
    MaskRunner.prototype.process = function (req, res, config) {
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
    };
    return MaskRunner;
}(atma_utils_1.class_Dfr));
;
HandlerFactory_1.default.Handlers.MaskRunner = MaskRunner;
;

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
var HandlerFactory_1 = _src_HandlerFactory;
var HttpPage_1 = _src_HttpPage_HttpPage;
var MaskHtml = /** @class */ (function () {
    function MaskHtml(route, app) {
        this.route = route;
        this.app = app;
    }
    MaskHtml.prototype.process = function (req, res, config) {
        var url = req.url;
        var route = {
            current: this.route.current,
            value: {
                template: url,
                master: null,
                isHtmlPage: true
            }
        };
        var page = new HttpPage_1.default(route, this.app);
        return page.process(req, res, config);
    };
    return MaskHtml;
}());
;
HandlerFactory_1.default.Handlers.MaskHtml = MaskHtml;
;

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
;

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
;

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
exports.deco = exports.StaticContent = exports.clean = exports.middleware = exports.LifecycleEvents = exports.Middleware = exports.HttpEndpoint = exports.HttpResponse = exports.IHttpHandler = exports.HttpService = exports.HttpCrudEndpoints = exports.HandlerFactory = exports.HttpPage = exports.HttpErrorPage = exports.HttpSubApplication = exports.Application = exports.SecurityError = exports.RuntimeError = exports.RequestError = exports.NotFoundError = exports.HttpError = void 0;
var HttpError_1 = _src_HttpError_HttpError;
Object.defineProperty(exports, "HttpError", { enumerable: true, get: function () { return HttpError_1.HttpError; } });
Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function () { return HttpError_1.NotFoundError; } });
Object.defineProperty(exports, "RequestError", { enumerable: true, get: function () { return HttpError_1.RequestError; } });
Object.defineProperty(exports, "RuntimeError", { enumerable: true, get: function () { return HttpError_1.RuntimeError; } });
Object.defineProperty(exports, "SecurityError", { enumerable: true, get: function () { return HttpError_1.SecurityError; } });
var IHttpHandler_1 = _src_IHttpHandler;
Object.defineProperty(exports, "IHttpHandler", { enumerable: true, get: function () { return IHttpHandler_1.IHttpHandler; } });
Object.defineProperty(exports, "HttpResponse", { enumerable: true, get: function () { return IHttpHandler_1.HttpResponse; } });
var HandlerFactory_1 = _src_HandlerFactory;
exports.HandlerFactory = HandlerFactory_1.default;
var HttpErrorPage_1 = _src_HttpPage_HttpErrorPage;
exports.HttpErrorPage = HttpErrorPage_1.default;
var HttpPage_1 = _src_HttpPage_HttpPage;
exports.HttpPage = HttpPage_1.default;
var Application_1 = _src_HttpApplication_Application;
exports.Application = Application_1.default;
var SubApp_1 = _src_HttpApplication_SubApp;
exports.HttpSubApplication = SubApp_1.default;
var CrudWrapper_1 = _src_HttpService_CrudWrapper;
exports.HttpCrudEndpoints = CrudWrapper_1.default;
var HttpService_1 = _src_HttpService_HttpService;
exports.HttpService = HttpService_1.default;
var HttpEndpoint_1 = _src_HttpService_HttpEndpoint;
Object.defineProperty(exports, "HttpEndpoint", { enumerable: true, get: function () { return HttpEndpoint_1.HttpEndpoint; } });
var export_1 = _src_middleware_export;
exports.Middleware = export_1.default;
_src_handlers_export;
var HttpEndpointDecos_1 = _src_HttpService_HttpEndpointDecos;
var LifecycleEvents_1 = _src_HttpApplication_LifecycleEvents;
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


}));
