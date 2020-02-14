
// source ./RootModule.js
(function(){
	
	var _node_modules_tslib_tslib = {};
var _src_Autoreload_Autoreload = {};
var _src_Autoreload_ConnectionSocket = {};
var _src_Autoreload_WatcherHandler = {};
var _src_Business_Middleware = {};
var _src_Config_Config = {};
var _src_Config_ConfigUtils = {};
var _src_Config_EnvUtils = {};
var _src_Config_IncludeUtils = {};
var _src_Config_PathUtils = {};
var _src_HandlerFactory = {};
var _src_HttpApplication_Application = {};
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
var _src_export = {};
var _src_handlers_MaskHtml = {};
var _src_handlers_MaskRunner = {};
var _src_handlers_export = {};
var _src_middleware_export = {};
var _src_middleware_query = {};
var _src_middleware_static = {};
var _src_util_app = {};
var _src_util_cli = {};
var _src_util_cors = {};
var _src_util_fn = {};
var _src_util_obj = {};
var _src_util_page = {};
var _src_util_path = {};
var _src_util_send = {};
var _src_vars = {};

// source ./ModuleSimplified.js
var _node_modules_tslib_tslib;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
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

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator];
        return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
});;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_node_modules_tslib_tslib) && isObject(module.exports)) {
		Object.assign(_node_modules_tslib_tslib, module.exports);
		return;
	}
	_node_modules_tslib_tslib = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_dependency;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Class = require("atma-class");
exports.Class = Class;
var logger = require("atma-logger");
exports.logger = logger;
var Utils = require("atma-utils");
var root = global;
if (root.include == null) {
    require('includejs');
}
exports.ruta = require('ruta');
exports.mask = root.mask || require('maskjs');
exports.jmask = exports.mask.jmask;
exports.Compo = exports.mask.Compo;
exports.Routes = exports.ruta.Collection;
exports.io = root.io && root.io.File ? root.io : require('atma-io');
exports.Uri = Utils.class_Uri;
exports.is_String = Utils.is_String, exports.is_Function = Utils.is_Function, exports.is_Array = Utils.is_Array, exports.is_Object = Utils.is_Object;
exports.obj_extend = Utils.obj_extend, exports.obj_extendDefaults = Utils.obj_extendDefaults;
exports.include = root.include;
exports.includeLib = root.includeLib;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_dependency) && isObject(module.exports)) {
		Object.assign(_src_dependency, module.exports);
		return;
	}
	_src_dependency = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpError_HttpError;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
exports.HttpError = dependency_1.Class({
    Base: Error,
    _error: null,
    _json: null,
    Construct: function (message, statusCode) {
        if (this instanceof exports.HttpError === false)
            return new exports.HttpError(message, statusCode);
        this._error = new Error(message);
        this.message = String(message);
        if (statusCode != null)
            this.statusCode = statusCode;
    },
    name: 'HttpError',
    statusCode: 500,
    get stack() {
        if (this._error == null)
            return;
        var stack = this._error.stack.split('\n'), imax = stack.length, start = 8, startRgx = /(atma\-server)|(atma\-class)/i;
        // while (++start < imax) {
        // 	if (startRgx.test(stack[start]) === false)
        // 		break;
        // }
        var end = start + 1;
        var rgx = /\[as \w+Error\]/;
        while (++end < imax) {
            if (rgx.test(stack[end]))
                break;
        }
        return stack[0] + '\n' + stack.slice(start, end).join('\n');
    },
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
            code: this.statusCode
        };
    },
    Static: {
        create: function (mix, statusCode) {
            if (dependency_1.is_String(mix))
                return new exports.HttpError(mix, statusCode);
            if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/
                return mix;
            if (mix instanceof Error) {
                var error = new exports.HttpError(mix.message, statusCode || 500);
                error._error = mix;
                return error;
            }
            if (dependency_1.is_Object(mix)) {
                if (mix.toString !== _obj_toString) {
                    return new exports.HttpError(mix.toString(), statusCode || mix.statusCode || mix.status);
                }
                var msg = mix.message, code = statusCode || mix.statusCode || mix.status, error = void 0;
                error = new exports.HttpError(msg, code);
                error._json = mix;
                return error;
            }
            return new exports.RuntimeError('Invalid error object: ' + mix);
        }
    }
});
exports.RequestError = createError('RequestError', 400);
exports.SecurityError = createError('SecurityError', 403);
exports.NotFoundError = createError('NotFoundError', 404);
exports.RuntimeError = createError('RuntimeError', 500);
// PRIVATE
var _obj_toString = Object.prototype.toString;
function createError(id, code) {
    var Ctor = dependency_1.Class({
        Base: exports.HttpError,
        Construct: function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this instanceof Ctor === false) {
                var arguments_ = (_a = [null]).concat.apply(_a, args);
                return new (Ctor.bind.apply(Ctor, arguments_));
            }
        },
        statusCode: code,
        name: id
    });
    return Ctor;
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpError_HttpError) && isObject(module.exports)) {
		Object.assign(_src_HttpError_HttpError, module.exports);
		return;
	}
	_src_HttpError_HttpError = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_IHttpHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_IHttpHandler) && isObject(module.exports)) {
		Object.assign(_src_IHttpHandler, module.exports);
		return;
	}
	_src_IHttpHandler = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_Message;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
/*
    * Very basic implementation of ClientRequest and -Response.
    * Is used when not the socket but direct request is made
    *
    * app
    * 	.execute('service/user/foo', 'get')
    * 	.done(function(obj:Any))
    * 	.fail(function(err))
    */
exports.Request = dependency_1.Class({
    Construct: function (url, method, body, headers) {
        this.url = url;
        this.method = (method || 'GET').toUpperCase();
        this.body = body;
        this.headers = headers;
    }
});
exports.Response = dependency_1.Class({
    Extends: [
        dependency_1.Class.EventEmitter,
        dependency_1.Class.Deferred
    ],
    writable: true,
    finished: false,
    statusCode: null,
    Construct: function () {
        this.body = '';
        this.headers = {};
    },
    Override: {
        resolve: function (body, code, mimeType, headers) {
            this.super(body || this.body, code || this.statusCode || 200, mimeType, headers || this.headers);
        },
        reject: function (error, code) {
            this.super(error || this.body, code || error.statusCode || this.statusCode || 500);
        }
    },
    writeHead: function (code) {
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
        dependency_1.obj_extend(this.headers, headers);
    },
    setHeader: function () {
        // do_Nothing
    },
    end: function (content) {
        if (this.finished === true)
            return;
        this.write(content);
        this.finished = true;
        this.writable = false;
        this.resolve(this.body, this.statusCode, null, this.headers);
    },
    /*
        * support String|Buffer|Object
        */
    write: function (content) {
        if (this.writable === false)
            return;
        if (content == null)
            return;
        if (this.body == null) {
            this.body = content;
            return;
        }
        if (dependency_1.is_Function(this.body.concat)) {
            this.body = this.body.concat(content);
            return;
        }
        this.body = [this.body, content];
    }
});
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpApplication_Message) && isObject(module.exports)) {
		Object.assign(_src_HttpApplication_Message, module.exports);
		return;
	}
	_src_HttpApplication_Message = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cli;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_cli) && isObject(module.exports)) {
		Object.assign(_src_util_cli, module.exports);
		return;
	}
	_src_util_cli = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_app;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_app) && isObject(module.exports)) {
		Object.assign(_src_util_app, module.exports);
		return;
	}
	_src_util_app = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_WebSocket;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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
            cb && cb({ message: 'Server is not started' });
            return;
        }
        if (this.SocketListeners[namespace] == null) {
            console.error('No handlers are bound to the namespace', namespace);
            cb && cb({ message: 'No handlers' });
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_WebSocket) && isObject(module.exports)) {
		Object.assign(_src_WebSocket, module.exports);
		return;
	}
	_src_WebSocket = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_path;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uri = require('atma-utils').class_Uri;
exports.path_hasProtocol = function (path) {
    return /^(file|https?):/.test(path);
};
exports.path_normalize = function (path) {
    return path
        .replace(/\\/g, '/')
        // remove double slashes, but not near protocol
        .replace(/([^:\/])\/{2,}/g, '$1/');
};
exports.path_resolveSystemUrl = function (path, base) {
    if (base === void 0) { base = null; }
    path = exports.path_normalize(path);
    if (exports.path_hasProtocol(path))
        return path;
    if (path[0] === '.' && path[1] === '/')
        path = path.substring(2);
    if (hasSystemRoot(path))
        return 'file://' + path;
    if (base_ == null)
        ensureBase();
    return Uri.combine(base || base_, path);
};
var base_;
function ensureBase() {
    base_ = 'file://' + exports.path_normalize(process.cwd() + '/');
}
function hasSystemRoot(path) {
    if (path[0] === '/')
        return true;
    return /^[A-Za-z]:[\/\\]/.test(path);
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_path) && isObject(module.exports)) {
		Object.assign(_src_util_path, module.exports);
		return;
	}
	_src_util_path = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_EnvUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
exports.default = {
    $getScripts: dependency_1.Class.Fn.memoize(function (pageID) {
        var scripts = getResources('scripts', this.env).slice();
        if (pageID)
            scripts = scripts.concat(this.$getScriptsForPageOnly(pageID));
        return scripts;
    }),
    $getScriptsForPageOnly: dependency_1.Class.Fn.memoize(function (pageID) {
        var page = this.pages[pageID], scripts = [];
        if (page == null) {
            dependency_1.logger.error('<page:scripts> Page not defined', pageID);
            return null;
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
            dependency_1.logger.error('<page:styles> Page not defined', pageID);
            return null;
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
            console.error('[CLIENT CONFIGURATION ERROR]');
            console.error('- Include PATH is not specified in `env:client:include:src`');
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
        var template = pageData.template || this.page.index.template, location = this.page.location.template, path = this.$formatPath(location, template);
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
            'script': ' js es6 jsx ',
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
var getResources = dependency_1.Class.Fn.memoize(function (type, env, pckg, routes) {
    var Routes = new dependency_1.includeLib.Routes(), array = [];
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Config_EnvUtils) && isObject(module.exports)) {
		Object.assign(_src_Config_EnvUtils, module.exports);
		return;
	}
	_src_Config_EnvUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_IncludeUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Config_IncludeUtils) && isObject(module.exports)) {
		Object.assign(_src_Config_IncludeUtils, module.exports);
		return;
	}
	_src_Config_IncludeUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_PathUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Config_PathUtils) && isObject(module.exports)) {
		Object.assign(_src_Config_PathUtils, module.exports);
		return;
	}
	_src_Config_PathUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_ConfigUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var path_1 = _src_util_path;
var IncludeUtils_1 = _src_Config_IncludeUtils;
var PathUtils_1 = _src_Config_PathUtils;
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
        var path = path_1.path_hasProtocol(config)
            ? config
            : dependency_1.Uri.combine(base, config);
        return { path: path };
    }
}
exports.cfg_prepair = cfg_prepair;
;
exports.configurate_Include = function (cfg) {
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
exports.configurate_Mask = function (cfg) {
    var maskCfg = cfg.mask;
    if (maskCfg == null)
        return;
    dependency_1.mask.compoDefinitions(maskCfg.compos, maskCfg.utils, maskCfg.attributes);
};
exports.configurate_Pages = function (cfg, app) {
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
exports.configurate_PageFiles = function (cfg, app) {
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
                rule: "^/" + name + "/?($|\\?.+) " + dependency_1.Uri.combine(folder, path) + "/index.html.mask$1"
            };
            var ruleAssets = {
                rule: "^/" + name + "/(.+) " + dependency_1.Uri.combine(folder, path) + "/$1"
            };
            if (cfg.rewriteRules == null) {
                cfg.rewriteRules = [];
            }
            cfg.rewriteRules.push(ruleIndex, ruleAssets);
        });
    });
};
exports.configurate_Plugins = function (cfg, app) {
    if (cfg.plugins == null)
        return null;
    if (app.isRoot === false)
        return null;
    var dfr = new dependency_1.Class.Await, sources = cfg.plugins.map(function (name) {
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
/* Resolve CommonJS, Bower resource paths */
var configurate_BowerAndCommonJS;
exports.configurate_BowerAndCommonJS = configurate_BowerAndCommonJS;
(function () {
    exports.configurate_BowerAndCommonJS = configurate_BowerAndCommonJS = function (cfg, app) {
        return new dependency_1.Class.Await(handleAllEnvironments(cfg, 'npm'), handleAllEnvironments(cfg, 'bower'));
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
        return new dependency_1.Class.Await(handleEnvironments(config, packageSystem, 'scripts'), handleEnvironments(config, packageSystem, 'styles'));
    }
    function handleEnvironments(config, packageSystem, resourceType) {
        return new dependency_1.Class.Await(handleEnvironment(config, packageSystem, resourceType, 'client'), handleEnvironment(config, packageSystem, resourceType, 'server'), handleEnvironment(config, packageSystem, resourceType, 'both'));
    }
    function handleEnvironment(config, packageSystem, resourceType, envType) {
        var env = config.env[envType], resources = env[resourceType], paths = resources && resources[packageSystem];
        if (paths == null)
            return null;
        var dfr = new dependency_1.Class.Deferred;
        resolvePaths(config, resourceType, packageSystem, paths, function (mappings) {
            var arr = resources[packageSystem], imax = arr.length, i = -1, j = -1, x;
            while (++i < imax) {
                x = mappings[arr[i]];
                if (dependency_1.is_String(x)) {
                    arr[i] = x;
                    continue;
                }
                if (dependency_1.is_Array(x)) {
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
        var base = new dependency_1.Uri(config.base), paths = [], mappings = {};
        var data = _types[packageSystem];
        if (data == null)
            throw Error('Support:' + Object.keys(_types) + ' Got:' + packageSystem);
        var awaiter = new dependency_1.Class.Await;
        var dirName = data.dir, packageName = data.package;
        arr.forEach(function (name) {
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
            var pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + packageName);
            if (pckgPath == null) {
                if (data.alternate) {
                    pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + data.alternate);
                }
                if (pckgPath == null) {
                    dependency_1.logger.error('<Module is not resolved>', name);
                    return;
                }
            }
            dependency_1.io
                .File
                .readAsync(pckgPath)
                .done(function (pckg) {
                var base = '/' + dirName + '/' + name + '/', main = pckg.main;
                if (main == null)
                    main = 'index.js';
                if (dependency_1.is_String(main)) {
                    mapPath(mappings, map, main, base, alias);
                    return;
                }
                if (dependency_1.is_Array(main)) {
                    mapPathMany(mappings, map, main, base, alias, resourceType);
                    return;
                }
                dependency_1.logger.error('Main is not defined', pckgPath);
            })
                .fail(dependency_1.logger.error)
                .always(awaiter.delegate(name, false));
        });
        awaiter.always(function () {
            cb(mappings);
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Config_ConfigUtils) && isObject(module.exports)) {
		Object.assign(_src_Config_ConfigUtils, module.exports);
		return;
	}
	_src_Config_ConfigUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Config_Config;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var path_1 = _src_util_path;
var EnvUtils_1 = _src_Config_EnvUtils;
var ConfigUtils_1 = _src_Config_ConfigUtils;
var DEFAULTS = [
    // source cfg-defaults.json
    "{\"env\":{\"both\":{\"include\":{\"cfg\":null},\"routes\":null,\"scripts\":null},\"client\":{\"include\":{\"cfg\":null,\"src\":\"/bower_components/includejs/lib/include.js\"},\"mask\":{\"cfg\":null,\"src\":null},\"scripts\":null,\"styles\":null,\"routes\":null},\"server\":{\"routes\":null,\"scripts\":null}},\"handler\":{\"location\":\"/server/http/handler/{0}.js\"},\"handlers\":{\"(\\\\.mr$|\\\\.mr\\\\?.+)\":\"/{self}.MaskRunner\",\"(\\\\.html\\\\.mask$|\\\\.html\\\\.mask\\\\?.+)\":\"/{self}.MaskHtml\"},\"mask\":{\"compos\":{\":scripts\":{\"mode\":\"server:all\"},\":styles\":{\"mode\":\"server:all\"},\":template\":{\"mode\":\"server\"},\"layout:master\":{\"mode\":\"server\"},\"layout:view\":{\"mode\":\"server\"},\":animation\":{\"mode\":\"client\"}},\"attributes\":null},\"page\":{\"location\":{\"controller\":\"/server/http/page/{0}/{1}.js\",\"template\":\"/server/http/page/{0}/{1}.mask\",\"master\":\"/server/http/master/{0}.mask\",\"viewTemplate\":\"/public/view/{0}/{1}.mask\",\"viewController\":\"/public/view/{0}/{1}.js\",\"viewStyle\":\"/public/view/{0}/{1}.less\",\"pageFiles\":\"/public/pages/\"},\"extension\":{\"javascript\":\"js\",\"style\":\"less\",\"template\":\"mask\"},\"index\":{\"template\":\"index\",\"master\":\"default\"},\"urls\":{\"login\":\"/login\"},\"pattern\":\"/:view/:category/:section\"},\"pages\":null,\"server\":{\"ssl\":{\"forced\":false,\"enabled\":false,\"port\":443,\"keyFile\":null,\"certFile\":null,\"caFile\":null}},\"service\":{\"location\":\"/server/http/service/{0}.js\"},\"services\":null,\"view\":{\"location\":{\"template\":\"/public/view/{0}/{1}.mask\",\"controller\":\"/public/view/{0}/{1}.js\",\"style\":\"/public/view/{0}/{1}.less\"}},\"websocket\":{\"location\":\"/server/http/websocket/{0}.js\"},\"websockets\":null}"
    // end:source cfg-defaults.json
][0];
var DEFAULTS_JSON = {
    env: {
        both: {
            include: {
                cfg: null
            },
            routes: null,
            scripts: null
        },
        client: {
            include: {
                cfg: null
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
    handler: {},
    handlers: {},
    service: {},
    services: {},
    page: {
        location: {}
    },
    pages: {}
};
var PATH = 'server/config/**.yml';
var BUILD_PATH = 'public/build/stats.json';
function Config(params, app, done, fail) {
    params = params || {};
    var path_base = params.base, configPaths = params.configs, disablePackageJson = params.disablePackageJson === true, path_Build, appConfig;
    path_base = path_base == null
        ? 'file://' + path_1.path_normalize(process.cwd()) + '/'
        : path_1.path_resolveSystemUrl(path_base + '/');
    var configs = ConfigUtils_1.cfg_prepair(path_base, configPaths, PATH);
    if (configs) {
        // if `configs` null, do not load also build values
        path_Build = path_base + (params.buildDirectory || BUILD_PATH);
    }
    if (params.config) {
        appConfig = { config: params.config };
    }
    var $sources = [
        {
            config: DEFAULTS ? JSON.parse(DEFAULTS) : DEFAULTS_JSON
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
    return require('appcfg')
        .fetch($sources)
        .fail(function (error) {
        if (fail != null) {
            fail(error);
            return;
        }
        error.message = '<app:configuration> ' + error.message;
        throw error;
    })
        .done(function () {
        var cfg = this;
        new dependency_1.Class.Await(ConfigUtils_1.configurate_Mask(cfg), ConfigUtils_1.configurate_Include(cfg), ConfigUtils_1.configurate_PageFiles(cfg, app), ConfigUtils_1.configurate_Pages(cfg, app), ConfigUtils_1.configurate_Plugins(cfg, app), ConfigUtils_1.configurate_BowerAndCommonJS(cfg, app))
            .done(function () {
            if (done != null)
                process.nextTick(done);
        })
            .fail(function (error) {
            if (fail != null)
                process.nextTick(function () { return fail(error); });
        });
    });
}
exports.default = Config;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Config_Config) && isObject(module.exports)) {
		Object.assign(_src_Config_Config, module.exports);
		return;
	}
	_src_Config_Config = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Business_Middleware;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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
        if (mix == null)
            return this;
        if (typeof mix === 'function') {
            this.arr.push(mix);
            return this;
        }
        if (Array.isArray(mix)) {
            this.arr = this.arr.concat(mix);
            return this;
        }
        return this;
    };
    MiddlewareRunner.create = function (arr) {
        if (arr == null)
            return null;
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
    if (middleware == null)
        return next(runner, req, res, callback, config, ++index);
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
        if (result && result.done) {
            callback(null, req, res);
            return;
        }
        next(runner, req, res, callback, config, ++index);
    };
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Business_Middleware) && isObject(module.exports)) {
		Object.assign(_src_Business_Middleware, module.exports);
		return;
	}
	_src_Business_Middleware = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Autoreload_WatcherHandler;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = _src_util_path;
var dependency_1 = _src_dependency;
var WatcherHandler = /** @class */ (function (_super) {
    __extends(WatcherHandler, _super);
    function WatcherHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WatcherHandler, "Instance", {
        get: function () {
            return _instance || (_instance = new WatcherHandler);
        },
        enumerable: true,
        configurable: true
    });
    WatcherHandler.prototype.watch = function (file) {
        var path = file.uri.toString();
        if (_watchers[path] != null)
            return;
        var watcher;
        watcher = new FileWatcher(file);
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
    WatcherHandler.prototype.fileChanged = function (path, sender, requestedUrl, base) {
        if (dependency_1.mask.Module.clearCache) {
            dependency_1.mask.Module.clearCache();
        }
        if (sender === 'filewatcher') {
            var rel = requestedUrl || ('/' + path.replace(rootFolder, ''));
            if (dependency_1.include.getResource(rel) == null)
                this.trigger('fileChange', rel, path);
            return;
        }
        if (this.isWatching(new dependency_1.io.File(path))) {
            return;
        }
        if (base) {
            base = new dependency_1.Uri(base).toLocalFile();
            path = path.replace(base, '');
        }
        this.trigger('fileChange', path);
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
    __decorate([
        dependency_1.Class.deco.self
    ], WatcherHandler.prototype, "fileChanged", null);
    return WatcherHandler;
}(dependency_1.Class.EventEmitter));
exports.WatcherHandler = WatcherHandler;
var rootFolder = path_1.path_normalize(process.cwd() + '/');
var FileWatcher = /** @class */ (function (_super) {
    __extends(FileWatcher, _super);
    function FileWatcher(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        _this.active = false;
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
    __decorate([
        dependency_1.Class.deco.self
    ], FileWatcher.prototype, "fileChanged", null);
    return FileWatcher;
}(dependency_1.Class.EventEmitter));
var _watchers = {};
var _instance = null;
exports.default = new WatcherHandler;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Autoreload_WatcherHandler) && isObject(module.exports)) {
		Object.assign(_src_Autoreload_WatcherHandler, module.exports);
		return;
	}
	_src_Autoreload_WatcherHandler = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Autoreload_ConnectionSocket;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Autoreload_ConnectionSocket) && isObject(module.exports)) {
		Object.assign(_src_Autoreload_ConnectionSocket, module.exports);
		return;
	}
	_src_Autoreload_ConnectionSocket = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Autoreload_Autoreload;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var WatcherHandler_1 = _src_Autoreload_WatcherHandler;
var ConnectionSocket_1 = _src_Autoreload_ConnectionSocket;
var Autoreload = {
    enabled: false,
    enable: function (app) {
        this.enabled = true;
        app
            .webSockets
            .registerHandler('/browser', ConnectionSocket_1.default);
        var configs = new dependency_1.io.Directory('server/config/');
        if (configs.exists())
            configs.watch(reloadConfigDelegate(app));
        dependency_1.include.cfg('autoreload', this);
        dependency_1.mask.cfg('allowCache', false);
        this.base = app.config.base;
        return this;
    },
    watch: function (requestedUrl, config) {
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
    },
    watchFile: function (file) {
        if (!(file.uri && file.uri.file))
            // virtual file?
            return;
        if (/\.map$/.test(file.uri.file))
            return;
        if (WatcherHandler_1.default.isWatching(file))
            return;
        if (dependency_1.io.File.prototype.exists.call(file) === false)
            return;
        WatcherHandler_1.default.watch(file);
    },
    unwatch: function (path) {
        WatcherHandler_1.default.unwatch(new dependency_1.io.File(path));
    },
    fileChanged: function (path, sender) {
        WatcherHandler_1.default.fileChanged(path, sender, null, this.base);
    },
    isWatching: function (file) {
        if (typeof file === 'string')
            file = new dependency_1.io.File(file);
        return WatcherHandler_1.default.isWatching(file);
    },
    listenDirectory: function (dir, callback) {
        new dependency_1.io
            .Directory(dir)
            .watch(callback);
    },
    getWatcher: function () {
        return WatcherHandler_1.default;
    }
};
//var root = path_resolveSystemUrl('/');
function reloadConfigDelegate(app) {
    return function (path) {
        app
            .defer()
            ._loadConfig()
            .done(function () {
            Autoreload.fileChanged(path);
        });
    };
}
exports.default = Autoreload;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Autoreload_Autoreload) && isObject(module.exports)) {
		Object.assign(_src_Autoreload_Autoreload, module.exports);
		return;
	}
	_src_Autoreload_Autoreload = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_vars;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
exports.LIB_DIR = new dependency_1.Uri('file://' + __dirname + '/');
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_vars) && isObject(module.exports)) {
		Object.assign(_src_vars, module.exports);
		return;
	}
	_src_vars = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_fn;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_proxy = function (fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments);
    };
};
exports.fn_delegate = function (fn) {
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_fn) && isObject(module.exports)) {
		Object.assign(_src_util_fn, module.exports);
		return;
	}
	_src_util_fn = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpPageBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
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
}(dependency_1.Class.Deferred));
exports.default = HttpPageBase;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpPage_HttpPageBase) && isObject(module.exports)) {
		Object.assign(_src_HttpPage_HttpPageBase, module.exports);
		return;
	}
	_src_HttpPage_HttpPageBase = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpPage;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
    };
    HttpPage.prototype.process = function (req, res, config) {
        if (this.middleware == null)
            return page_utils_1.page_processRequest(this, req, res, config);
        this.middleware.process(req, res, page_utils_1.page_processRequestDelegate(this, req, res, config), config);
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
            .load(page_utils_1.page_pathAddAlias(this.masterPath, 'Master'), page_utils_1.page_pathAddAlias(this.templatePath, 'Template'))
            .js(page_utils_1.page_pathAddAlias(this.compoPath, 'Compo'))
            .js(env_both)
            .js(env_server)
            .done(fn_1.fn_proxy(this._response, this));
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
        if (dependency_1.is_Function(this.onRenderStart))
            this.onRenderStart(this.model, this.ctx);
        var nodes = this.nodes || template;
        if (this.query.partial) {
            page_utils_1.page_processPartial(this, nodes, this.query.partial);
            return;
        }
        if (this.isHtmlPage) {
            dependency_1.mask
                .renderPageAsync(nodes, this.model, this.ctx)
                .then(function (html) { return _this.resolve(html); }, function (error) { return _this.reject(error); });
            return;
        }
        page_utils_1.page_process(this, nodes, fn_1.fn_delegate(page_utils_1.page_resolve, this));
    };
    HttpPage.create = function (mix) {
        return page_utils_1.page_Create(mix);
    };
    return HttpPage;
}(HttpPageBase_1.default));
exports.default = HttpPage;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpPage_HttpPage) && isObject(module.exports)) {
		Object.assign(_src_HttpPage_HttpPage, module.exports);
		return;
	}
	_src_HttpPage_HttpPage = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpContext;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpContext = /** @class */ (function () {
    function HttpContext(page, config, req, res) {
        this.page = page;
        this.config = config;
        this.req = req;
        this.res = res;
    }
    HttpContext.prototype.redirect = function (url, code) {
        if (code == null)
            code = 302;
        this.res.statusCode = code;
        this.res.setHeader('Location', url);
        this.res.setHeader('Content-Length', '0');
        this.res.end();
        this._redirect = url;
    };
    HttpContext.prototype.rewrite = function (url) {
        this._rewrite = url;
    };
    return HttpContext;
}());
exports.default = HttpContext;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpPage_HttpContext) && isObject(module.exports)) {
		Object.assign(_src_HttpPage_HttpContext, module.exports);
		return;
	}
	_src_HttpPage_HttpContext = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_const_mime;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utf8 = ';charset=utf-8';
exports.mime_JSON = 'application/json' + utf8;
exports.mime_HTML = 'text/html' + utf8;
exports.mime_PLAIN = 'text/plain' + utf8;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_const_mime) && isObject(module.exports)) {
		Object.assign(_src_const_mime, module.exports);
		return;
	}
	_src_const_mime = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_cors;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_cors) && isObject(module.exports)) {
		Object.assign(_src_util_cors, module.exports);
		return;
	}
	_src_util_cors = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_send;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var mime_1 = _src_const_mime;
var HttpError_1 = _src_HttpError_HttpError;
var cors_1 = _src_util_cors;
exports.send_JSON = function (req, res, json, statusCode, headers) {
    var text;
    try {
        text = JSON.stringify(json);
    }
    catch (error) {
        return exports.send_Error(req, res, new HttpError_1.RuntimeError("Json Serialization: " + error.message));
    }
    exports.send_Content(req, res, text, statusCode || 200, mime_1.mime_JSON, headers);
};
exports.send_Error = function (req, res, error, headers) {
    if (error instanceof HttpError_1.HttpError === false) {
        error = HttpError_1.HttpError.create(error);
    }
    exports.send_Content(req, res, JSON.stringify(error), error.statusCode || 500, mime_1.mime_JSON, headers);
};
exports.send_Content = function (req, res, content, statusCode, mimeType, headers) {
    if (typeof content !== 'string' && content instanceof Buffer === false) {
        if (atma_utils_1.is_Object(content)) {
            exports.send_JSON(req, res, content, statusCode, headers);
            return;
        }
        if (content instanceof Error) {
            exports.send_Error(req, res, content, headers);
            return;
        }
        exports.send_Error(req, res, new HttpError_1.RuntimeError('Unexpected content response'), headers);
        return;
    }
    res.setHeader('Content-Type', mimeType || mime_1.mime_HTML);
    res.statusCode = statusCode || 200;
    if (headers != null) {
        cors_1.cors_ensure(req, headers);
        for (var key in headers) {
            if (key === 'Content-Type' && mimeType != null) {
                continue;
            }
            res.setHeader(key, headers[key]);
        }
    }
    res.end(content);
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_send) && isObject(module.exports)) {
		Object.assign(_src_util_send, module.exports);
		return;
	}
	_src_util_send = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_page_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = _src_HttpApplication_Application;
var HttpPage_1 = _src_HttpPage_HttpPage;
var HttpContext_1 = _src_HttpPage_HttpContext;
var dependency_1 = _src_dependency;
var Middleware_1 = _src_Business_Middleware;
var send_1 = _src_util_send;
var mime_1 = _src_const_mime;
exports.page_Create = function (classProto) {
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
    return dependency_1.Class(classProto);
};
exports.page_rewriteDelegate = function (page) {
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
exports.page_processRequestDelegate = function (page, req, res, config) {
    return function (error) {
        if (error) {
            page.reject(error);
            return;
        }
        exports.page_processRequest(page, req, res, config);
    };
};
exports.page_processRequest = function (page, req, res, config) {
    if (page.pattern) {
        var query = dependency_1.ruta
            .parse(page.pattern, req.url)
            .params;
        for (var key in query) {
            if (page.query[key] == null)
                page.query[key] = query[key];
        }
    }
    page.ctx = new HttpContext_1.default(page, config, req, res);
    if ('redirect' in page.data) {
        page.ctx.redirect(page.data.redirect);
        return page;
    }
    if ('rewrite' in page.data) {
        req.url = page.data.rewrite;
        page.app.handlers.get(page.app, req, exports.page_rewriteDelegate(page));
        return page;
    }
    if ('secure' in page.data) {
        var user = req.user, secure = page.data.secure, role = secure && secure.role;
        if (user == null || (role && user.isInRole(role)) === false) {
            page.ctx.redirect(Application_1.default.current.config.page.urls.login);
            return page;
        }
    }
    return page._load();
};
exports.page_resolve = function (page, data) {
    if (page.ctx._redirect != null) {
        // response was already flushed
        return;
    }
    page.resolve(data);
};
exports.page_pathAddAlias = function (path, alias) {
    if (path == null || path === '')
        return null;
    var i = path.indexOf('::');
    if (i !== -1)
        path = path.slice(0, -i);
    return path + '::' + alias;
};
exports.page_process = function (page, nodes, onSuccess) {
    dependency_1.mask
        .renderAsync(nodes, page.model, page.ctx, null, page)
        .done(function (html) {
        if (page.ctx._rewrite != null) {
            Application_1.default
                .current
                .handlers
                .get(page.ctx._rewrite, exports.page_rewriteDelegate(page));
            return;
        }
        onSuccess(html);
    })
        .fail(page.rejectDelegate());
};
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
            exports.page_process(page, nodes, function (html) {
                var json = {
                    type: 'partial',
                    html: html,
                    scripts: meta.scripts,
                    styles: meta.styles
                };
                exports.page_resolve(page, json);
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
exports.pageError_sendDelegate = function (req, res, error) {
    return function (html) {
        send_1.send_Content(req, res, html, error.statusCode || 500, mime_1.mime_HTML);
    };
};
exports.pageError_failDelegate = function (req, res, error) {
    return function (internalError) {
        var str = dependency_1.is_Object(internalError)
            ? JSON.stringify(internalError)
            : internalError;
        str += '\nError: ' + error.message;
        send_1.send_Content(req, res, 'ErrorPage Failed: ' + str, 500, mime_1.mime_PLAIN);
    };
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpPage_page_utils) && isObject(module.exports)) {
		Object.assign(_src_HttpPage_page_utils, module.exports);
		return;
	}
	_src_HttpPage_page_utils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpPage_HttpErrorPage;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
            .done(page_utils_1.pageError_sendDelegate(req, res, this.model))
            .fail(page_utils_1.pageError_failDelegate(req, res, this.model));
        page_utils_1.page_processRequest(this, req, res, config);
    };
    HttpErrorPage.prototype._load = function () {
        this.resource = dependency_1.include
            .instance()
            .load(page_utils_1.page_pathAddAlias(this.masterPath, 'Master'), page_utils_1.page_pathAddAlias(this.templatePath, 'Template'))
            .js(page_utils_1.page_pathAddAlias(this.compoPath, 'Compo'))
            .done(fn_1.fn_proxy(this._response, this));
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
        page_utils_1.page_process(this, nodes, fn_1.fn_delegate(page_utils_1.page_resolve, this));
    };
    return HttpErrorPage;
}(HttpPageBase_1.default));
;
exports.default = HttpErrorPage;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpPage_HttpErrorPage) && isObject(module.exports)) {
		Object.assign(_src_HttpPage_HttpErrorPage, module.exports);
		return;
	}
	_src_HttpPage_HttpErrorPage = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_compos_exports;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_compos_exports) && isObject(module.exports)) {
		Object.assign(_src_compos_exports, module.exports);
		return;
	}
	_src_compos_exports = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_SubApp;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var Application_1 = _src_HttpApplication_Application;
var status_initial = '', status_loading = 'loading', status_loaded = 'loaded', status_errored = 'error';
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
        _this.dfr = new dependency_1.Class.Deferred;
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
        if (dependency_1.is_String(controller)) {
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
        Application_1.respond_Raw(this.app_, req, res);
    };
    return HttpSubApplication;
}(dependency_1.Class.Deferred));
exports.default = HttpSubApplication;
;
function prepairUrl(req, subapp) {
    req.url = req.url.replace(subapp.path_, '/');
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpApplication_SubApp) && isObject(module.exports)) {
		Object.assign(_src_HttpApplication_SubApp, module.exports);
		return;
	}
	_src_HttpApplication_SubApp = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpRewrites_HttpRewriter;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.rules.forEach(function (x) { return x.rewrite(req); });
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpRewrites_HttpRewriter) && isObject(module.exports)) {
		Object.assign(_src_HttpRewrites_HttpRewriter, module.exports);
		return;
	}
	_src_HttpRewrites_HttpRewriter = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_obj;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
exports.obj_lazyProperty = function (obj, xpath, init) {
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
/**
 * Max 4 args
 */
exports.obj_assign = Object.assign || function (target, a, b, c, d) {
    if (a != null)
        target = dependency_1.obj_extend(target, a);
    if (b != null)
        target = dependency_1.obj_extend(target, b);
    if (c != null)
        target = dependency_1.obj_extend(target, c);
    if (d != null)
        target = dependency_1.obj_extend(target, d);
    return target;
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_obj) && isObject(module.exports)) {
		Object.assign(_src_util_obj, module.exports);
		return;
	}
	_src_util_obj = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpApplication_Application;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
var _emitter = new dependency_1.Class.EventEmitter();
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(proto) {
        if (proto === void 0) { proto = {}; }
        var _this = _super.call(this) || this;
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
        _this.lib = null;
        // webSockets
        _this.webSockets = null;
        _this.rewriter = new HttpRewriter_1.default;
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
        if (this.rewriter) {
            this.rewriter.rewrite(req);
        }
        if (this._outerPipe == null) {
            this.processor();
        }
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
        var _this = this;
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
            server = http.createServer();
        if (this.webSockets.hasHandlers()) {
            this.webSockets.listen(this._server);
        }
        if (app_1.app_isDebug()) {
            this.autoreload();
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
                        var portStr = port_1 === 443 ? '' : ":" + port_1;
                        var path = "https://" + host + portStr + req.url;
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
        return this._server;
    };
    Application.prototype.getSubApp = function (path) {
        var route = this.handlers.subapps.get(path);
        return route && route.value && route.value.app_;
    };
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
        send_1.send_Error(req, res, error);
    };
    Application.clean = function () {
        Application.current = null;
        _emitter = new dependency_1.Class.EventEmitter;
        return this;
    };
    Application.create = function (config) {
        return new Application(config);
    };
    Application.current = null;
    Application.on = _emitter.on.bind(_emitter);
    Application.off = _emitter.off.bind(_emitter);
    Application.once = _emitter.once.bind(_emitter);
    Application.trigger = _emitter.trigger.bind(_emitter);
    Application.Config = Config_1.default;
    return Application;
}(dependency_1.Class.Deferred));
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
exports.respond_Raw = respond_Raw;
function middleware_processDelegate(middlewareRunner) {
    return function (app, handler, req, res) {
        middlewareRunner.process(req, res, done, app.config);
        function done(error) {
            if (error) {
                var headers = handler.meta && handler.meta.headers;
                send_1.send_Error(req, res, error, headers);
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
    var result = null;
    try {
        result = handler.process(req, res, app.config);
    }
    catch (error) {
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
        handler_complete(app, handler, req, res, content, statusCode, mimeType, headers);
    }, function onError(error, statusCode) {
        error = HttpError_1.HttpError.create(error, statusCode);
        if (handler.sendError) {
            handler.sendError(error, req, res, app.config);
            return;
        }
        var allHeaders = handler_resolveHeaders(app, handler);
        send_1.send_Error(req, res, error, allHeaders);
    });
}
function handler_complete(app, handler, req, res, content, statusCode, mimeType, headers) {
    if (statusCode === void 0) { statusCode = null; }
    if (mimeType === void 0) { mimeType = null; }
    if (headers === void 0) { headers = null; }
    var send = handler.send || send_1.send_Content;
    var allHeaders = handler_resolveHeaders(app, handler, headers);
    send(req, res, content, statusCode, mimeType, allHeaders);
}
function handler_resolveHeaders(app, handler, overrides) {
    if (overrides === void 0) { overrides = null; }
    var headers_Handler = handler.meta && handler.meta.headers, headers_App = app.config.headers;
    if (headers_Handler == null && headers_App == null) {
        return overrides;
    }
    return obj_1.obj_assign({}, headers_App, headers_Handler, overrides);
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
        app.rewriter.addRules(cfg.rewriteRules);
        if (app_1.app_isDebug()) {
            dependency_1.include.cfg('autoreload', true);
        }
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpApplication_Application) && isObject(module.exports)) {
		Object.assign(_src_HttpApplication_Application, module.exports);
		return;
	}
	_src_HttpApplication_Application = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_util_page;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page_flatternPageViewRoutes = function (pages, pageCfg) {
    var out = {}, key, page;
    for (key in pages) {
        page = pages[key];
        addPage(out, key, page, pages, pageCfg);
    }
    return out;
};
function addPage(out, key, page, pages, pageCfg) {
    if (page.route == null) {
        page.route = key;
    }
    if (page.id == null) {
        page.id = key;
    }
    var pattern = page.pattern || pageCfg.pattern;
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_util_page) && isObject(module.exports)) {
		Object.assign(_src_util_page, module.exports);
		return;
	}
	_src_util_page = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HandlerFactory;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = _src_HttpApplication_Application;
var SubApp_1 = _src_HttpApplication_SubApp;
var HttpPage_1 = _src_HttpPage_HttpPage;
var dependency_1 = _src_dependency;
var page_1 = _src_util_page;
var path_1 = _src_util_path;
var app_1 = _src_util_app;
var fns_RESPONDERS = [
    'subapps',
    'handlers',
    'services',
    'pages'
];
var HandlerFactory = /** @class */ (function () {
    function HandlerFactory(app) {
        this.app = app;
        this.subapps = new dependency_1.Routes();
        this.handlers = new dependency_1.Routes();
        this.services = new dependency_1.Routes();
        this.pages = new dependency_1.Routes();
    }
    HandlerFactory.prototype.registerPages = function (pages_, pageCfg) {
        var pages = page_1.page_flatternPageViewRoutes(pages_, pageCfg), id, page;
        for (id in pages) {
            page = pages[id];
            if (page.controller == null) {
                page.controller = HttpPage_1.default;
            }
            else if (dependency_1.is_String(page.controller)) {
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
        if (dependency_1.is_String(handler)) {
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
        if (dependency_1.is_Function(service)) {
            service = {
                controller: service
            };
        }
        else if (dependency_1.is_String(service)) {
            service = {
                controller: service
            };
        }
        if (dependency_1.is_String(service.controller))
            service.controller = handler_path(service.controller, serviceCfg);
        this
            .services
            .add(path, service);
    };
    HandlerFactory.prototype.registerWebsockets = function (routes) {
        for (var namespace in routes) {
            this.registerWebsocket(namespace, routes[namespace]);
        }
        return this;
    };
    HandlerFactory.prototype.registerWebsocket = function (namespace, handler, handlerCfg) {
        if (handlerCfg === void 0) { handlerCfg = null; }
        var socket = this.app.webSockets;
        if (dependency_1.is_String(handler)) {
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
        var imax = fns_RESPONDERS.length, i = -1, x;
        while (++i < imax) {
            x = fns_RESPONDERS[i];
            if (processor_tryGet(this, this[x], url, method, base, callback))
                return;
        }
        if (this.app !== Application_1.default.current) {
            // check handlers of the root application
            var factory = Application_1.default.current.handlers, cfg = Application_1.default.current.config;
            var hasHandler = processor_tryGet(factory, factory.handlers, url, method, cfg.base || base, callback);
            if (hasHandler)
                return;
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
    var route = collection.get(url, method), processor;
    if (route == null)
        return false;
    var controller = route.value.controller || route.value;
    if (controller == null) {
        dependency_1.logger.error('<routing> no controller', url);
        return false;
    }
    if (dependency_1.is_Function(controller)) {
        callback(new controller(route, factory.app));
        return true;
    }
    if (dependency_1.is_String(controller)) {
        var path = path_1.path_hasProtocol(controller)
            ? controller
            : dependency_1.Uri.combine(base, controller);
        processor_loadAndInit(factory, path, route, callback);
        return true;
    }
    if (dependency_1.is_Function(controller.process)) {
        callback(controller);
        return true;
    }
    dependency_1.logger.error('<routing> invalid controller', controller);
    return false;
}
function processor_loadAndInit(factory, url, route, callback) {
    if (memory_canResolve(url)) {
        memory_resolve(factory, url, route, callback);
        return;
    }
    factory
        .app
        .resources
        .js(url + '::Handler')
        .done(function (resp) {
        var Handler = resp.Handler;
        if (Handler == null) {
            dependency_1.logger.error('<handler> invalid route', url);
            callback(new ErrorHandler('Invalid route: ' + url));
            return;
        }
        if (!dependency_1.is_Function(Handler.prototype.process)) {
            dependency_1.logger.error('<handler> invalid interface - process function not implemented');
            callback(new ErrorHandler('Invalid interface'));
            return;
        }
        if (app_1.app_isDebug() === false)
            route.value.controller = Handler;
        if (dependency_1.is_Object(Handler) && dependency_1.is_Function(Handler.process)) {
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
        var match = rgx.exec(url), str = match[0], type = match[1], path = url.substring(match.index + match[0].length), memory = getContext(type), Handler = dependency_1.mask.obj.get(memory, path);
        if (Handler == null) {
            dependency_1.logger.error('<handler> invalid route', url);
            callback(new ErrorHandler('Invalid route: ' + url));
            return;
        }
        if (dependency_1.is_Object(Handler)) {
            callback(Handler);
            return;
        }
        //is_Function
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
//function get_service(factory, path) {
//	var services = factory.services,
//		route = services.get(path);
//
//	return route;
//}
//
//function get_handler(factory, path) {
//
//	return factory
//		.handlers
//		.get(path)
//		;
//}
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
    var params, route, i, length, arr;
    var template = path.split('/'), route = location.split(/[\{\}]/g);
    path = route[0];
    for (i = 1; i < route.length; i++) {
        if (i % 2 === 0) {
            path += route[i];
        }
        else {
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
    }
    return path;
}
function rgx_fromString(str, flags) {
    return new RegExp(str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), flags);
}
var ErrorHandler = dependency_1.Class({
    Base: dependency_1.Class.Deferred,
    process: function () {
        return this.reject('Invalid Routing');
    }
});
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HandlerFactory) && isObject(module.exports)) {
		Object.assign(_src_HandlerFactory, module.exports);
		return;
	}
	_src_HandlerFactory = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_static;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_static) && isObject(module.exports)) {
		Object.assign(_src_HttpService_static, module.exports);
		return;
	}
	_src_HttpService_static = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_CrudWrapper;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_CrudWrapper) && isObject(module.exports)) {
		Object.assign(_src_HttpService_CrudWrapper, module.exports);
		return;
	}
	_src_HttpService_CrudWrapper = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_utils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
function secure_canAccess(req, secure) {
    if (secure == null) {
        return true;
    }
    if (typeof secure === 'boolean') {
        return secure === false ? true : (req.session != null || req.user != null);
    }
    var user = req.user;
    if (user == null) {
        return false;
    }
    if (secure.role != null && isInRole(user, secure.role) === false) {
        return false;
    }
    if (secure.roles != null && isInRoleAny(user, secure.roles) === false) {
        return false;
    }
    if (secure.claim != null && hasClaim(user, secure.claim) === false) {
        return false;
    }
    if (secure.claims != null && hasClaimAny(user, secure.claims) === false) {
        return false;
    }
    return true;
}
exports.secure_canAccess = secure_canAccess;
;
function isInRole(user, role) {
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
function isInRoleAny(user, roles) {
    for (var i = 0; i < roles.length; i++) {
        if (isInRole(user, roles[i])) {
            return true;
        }
    }
    return false;
}
function hasClaim(user, claim) {
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
function hasClaimAny(user, claims) {
    for (var i = 0; i < claims.length; i++) {
        if (hasClaim(user, claims[i])) {
            return true;
        }
    }
    return false;
}
exports.service_validateArgs = function (body, args, isStrict) {
    if (body == null)
        return new Error('Message Body is not defined');
    return dependency_1.Class.validate(body, args, isStrict);
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_utils) && isObject(module.exports)) {
		Object.assign(_src_HttpService_utils, module.exports);
		return;
	}
	_src_HttpService_utils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_Barricade;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Barricade = function (middlewares) {
    var barricade = new Runner(middlewares), service;
    return function (req, res, params) {
        service = this;
        barricade.process(service, req, res, params);
    };
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_Barricade) && isObject(module.exports)) {
		Object.assign(_src_HttpService_Barricade, module.exports);
		return;
	}
	_src_HttpService_Barricade = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpService;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
var HttpError_1 = _src_HttpError_HttpError;
var utils_1 = _src_HttpService_utils;
var Barricade_1 = _src_HttpService_Barricade;
var atma_utils_1 = require("atma-utils");
var IHttpHandler_1 = _src_IHttpHandler;
var HttpServiceProto = dependency_1.Class({
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
        var iQuery = req.url.indexOf('?');
        if (iQuery !== -1
            && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return this.resolve(this.help());
        }
        if (utils_1.secure_canAccess(req, this.secure) === false) {
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
        if (meta != null && utils_1.secure_canAccess(req, meta.secure) === false) {
            return this
                .reject(new HttpError_1.SecurityError('Access Denied'));
        }
        if (args != null) {
            var isGet = req.method === 'GET', isStrict = isGet === false && meta.strict, body = isGet
                ? entry.current.params
                : req.body;
            var error = utils_1.service_validateArgs(body, args, isStrict);
            if (error) {
                return this.reject(new HttpError_1.RequestError(error.message));
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
                headers = headers == null ? corsHeaders : dependency_1.obj_extend(headers, corsHeaders);
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
                    headers = dependency_1.obj_extend(headers, this.meta.headers);
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
                            headers = dependency_1.obj_extend(headers, endpoint.meta.headers);
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
            dependency_1.obj_extendDefaults(headers, cors);
            rewriteAllowedOrigins(req, headers);
            return headers;
        };
        function rewriteAllowedOrigins(req, headers) {
            var current = req.headers['host'];
            if (!current) {
                return;
            }
            var origin = headers[HEADER_ALLOW_ORIGIN];
            if (!origin || origin === '*') {
                return;
            }
            var hosts = origin.split(' ');
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
        args = __spreadArrays([mix], params);
    }
    var proto = endpoints_merge(args);
    var routes = new dependency_1.ruta.Collection, defs = proto.ruta || proto.routes || proto, path, responder, x;
    for (path in defs) {
        x = defs[path];
        responder = null;
        if (dependency_1.is_Function(x)) {
            responder = {
                process: x
            };
        }
        if (responder == null && dependency_1.is_Array(x)) {
            responder = {
                process: Barricade_1.Barricade(x)
            };
        }
        if (responder == null && dependency_1.is_Object(x)) {
            responder = x;
        }
        if (responder != null && dependency_1.is_Array(responder.process))
            responder.process = Barricade_1.Barricade(responder.process);
        if (responder == null || dependency_1.is_Function(responder.process) === false) {
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
    return dependency_1.Class(proto);
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

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_HttpService) && isObject(module.exports)) {
		Object.assign(_src_HttpService_HttpService, module.exports);
		return;
	}
	_src_HttpService_HttpService = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_BarricadeExt;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
        return nextFn.apply(void 0, __spreadArrays([null], args));
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
exports.BarricadeExt = function (middlewares) {
    var barricade = new Runner(middlewares);
    return function (req, res, params) {
        return barricade.process(this, req, res, params);
    };
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_BarricadeExt) && isObject(module.exports)) {
		Object.assign(_src_HttpService_BarricadeExt, module.exports);
		return;
	}
	_src_HttpService_BarricadeExt = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpointParamUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var HttpError_1 = _src_HttpError_HttpError;
var class_json_1 = require("class-json");
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
    var Json = /** @class */ (function (_super) {
        __extends(Json, _super);
        function Json() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Json;
    }(class_json_1.Serializable));
    Types.Json = Json;
})(Types = exports.Types || (exports.Types = {}));
var HttpEndpointParamUtils;
(function (HttpEndpointParamUtils) {
    function resolveParam(req, params, meta) {
        if (meta.from === 'uri') {
            return UriExtractor.get(params, meta);
        }
        return BodyExtractor.get(req.body, meta);
    }
    HttpEndpointParamUtils.resolveParam = resolveParam;
})(HttpEndpointParamUtils = exports.HttpEndpointParamUtils || (exports.HttpEndpointParamUtils = {}));
var BodyExtractor;
(function (BodyExtractor) {
    function get(body, meta) {
        var _a, _b;
        var obj = body;
        if (typeof meta.Type.fromJson !== 'function') {
            throw new Error(meta.Type.name + " must implement static fromJson method to deserialize params");
        }
        var instance = meta.Type.fromJson(obj);
        var error = (_b = (_a = meta.Type).validate) === null || _b === void 0 ? void 0 : _b.call(_a, instance);
        if (error && error.length > 0) {
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
            throw new HttpError_1.HttpError("Invalid URI Parameter: " + message + " ", 400);
        }
        return instance;
    }
    BodyExtractor.get = get;
})(BodyExtractor || (BodyExtractor = {}));
var UriExtractor;
(function (UriExtractor) {
    function get(params, meta) {
        var _a;
        if (meta.name) {
            var val = params[meta.name];
            if (val == null) {
                if (meta.optional !== true) {
                    throw new HttpError_1.HttpError("URI Parameter '" + meta.name + "' is undefined", 400);
                }
                return null;
            }
            var str = val;
            var converter = getConverter((_a = meta.Type, (_a !== null && _a !== void 0 ? _a : String)));
            if (converter != null) {
                val = converter.convert(val);
            }
            if (converter.validate) {
                var error = converter.validate(val);
                if (error) {
                    throw new HttpError_1.HttpError("Invalid URI Parameter '" + meta.name + "' with value '" + str + "': ", 400);
                }
            }
            return val;
        }
        var obj = toTree(params);
        if (typeof meta.Type.fromJson !== 'function') {
            throw new Error(meta.Type.name + " must implement static fromJson method to deserialize params");
        }
        var instance = meta.Type.fromJson(obj);
        if (meta.Type.validate) {
            var error = meta.Type.validate(instance);
            if (error && error.length > 0) {
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
                throw new HttpError_1.HttpError("Invalid URI Parameter: " + message + " ", 400);
            }
        }
        return instance;
    }
    UriExtractor.get = get;
    function toTree(params) {
        var obj = {};
        for (var key in params) {
            atma_utils_1.obj_setProperty(obj, key, params[key]);
        }
        return obj;
    }
})(UriExtractor || (UriExtractor = {}));
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
        }
    },
];
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_HttpEndpointParamUtils) && isObject(module.exports)) {
		Object.assign(_src_HttpService_HttpEndpointParamUtils, module.exports);
		return;
	}
	_src_HttpService_HttpEndpointParamUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpointDecos;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
                Type: (Type !== null && Type !== void 0 ? Type : String)
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
        return function (target, propertyKey, index) {
            ensureEndpointArgsMeta(target, propertyKey, 'body', index, opts);
        };
    }
    HttpEndpointDecos.fromBody = fromBody;
    function ensureEndpointArgsMeta(proto, methodName, paramFrom, paramIndex, opts) {
        var _a;
        var meta = (_a = proto.meta, (_a !== null && _a !== void 0 ? _a : (proto.meta = {})));
        if (meta.endpointsParams == null)
            meta.endpointsParams = {};
        var params = meta.endpointsParams[methodName];
        if (params == null) {
            params = meta.endpointsParams[methodName] = [];
        }
        var paramMeta = {
            from: paramFrom,
            Type: opts.Type,
            name: opts.name,
            validate: opts.validate
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
            return __spreadArrays([fn], currentVal);
        }
        currentVal.process = mergeMiddleware(currentVal.process, fn);
    }
})(HttpEndpointDecos = exports.HttpEndpointDecos || (exports.HttpEndpointDecos = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_HttpEndpointDecos) && isObject(module.exports)) {
		Object.assign(_src_HttpService_HttpEndpointDecos, module.exports);
		return;
	}
	_src_HttpService_HttpEndpointDecos = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_HttpService_HttpEndpoint;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError_1 = _src_HttpError_HttpError;
var dependency_1 = _src_dependency;
var utils_1 = _src_HttpService_utils;
var atma_utils_1 = require("atma-utils");
var IHttpHandler_1 = _src_IHttpHandler;
var BarricadeExt_1 = _src_HttpService_BarricadeExt;
var HttpEndpointDecos_1 = _src_HttpService_HttpEndpointDecos;
var HttpEndpointParamUtils_1 = _src_HttpService_HttpEndpointParamUtils;
var METHOD_META_DEFAULT = {
    secure: null,
    arguments: null
};
var HttpEndpoint = /** @class */ (function () {
    function HttpEndpoint(route) {
        if (this.routes == null) {
            //Create ROUTES once
            Object.getPrototypeOf(this).routes = RouteUtils.resolve(this);
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
        var _a;
        var iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return Promise.resolve(HttpEndpointUtils.getHelpModel(this));
        }
        if (this.meta != null) {
            if (utils_1.secure_canAccess(req, this.meta.secure) === false) {
                console.log('SECURE'.red, this.meta, 'META IN PROTO', HttpEndpoint.prototype.meta);
                return Promise.reject(new HttpError_1.SecurityError('Access Denied'));
            }
        }
        var path = req.url.substring(this.rootCharCount), entry = this.routes.get(path, req.method);
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
            var error_1 = new HttpError_1.NotFoundError(name + ": endpoint not Found: <" + req.method + "> " + url);
            return Promise.reject(error_1);
        }
        var endpoint = entry.value;
        var meta = endpoint.meta;
        if (meta != null) {
            if (meta.secure != null && utils_1.secure_canAccess(req, meta.secure) === false) {
                console.log('SECURE'.green, meta);
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
                var error = utils_1.service_validateArgs(body, args, isStrict);
                if (error) {
                    return Promise.reject(new HttpError_1.RequestError(error.message));
                }
            }
        }
        var params = null;
        var paramsMeta = (_a = this.meta.endpointsParams) === null || _a === void 0 ? void 0 : _a[endpoint.key];
        if (paramsMeta != null) {
            params = [];
            for (var i = 0; i < paramsMeta.length; i++) {
                params[i] = HttpEndpointParamUtils_1.HttpEndpointParamUtils.resolveParam(req, entry.current.params, paramsMeta[i]);
            }
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
        result.then(function (mix, statusCode, mimeType, headers) {
            HttpEndpointUtils.onComplete(path, req, res, _this, endpoint, promise, mix, statusCode, mimeType, headers);
        }, function (error) { return promise.reject(error); });
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
    HttpEndpoint.origin = HttpEndpointDecos_1.HttpEndpointDecos.origin;
    HttpEndpoint.middleware = HttpEndpointDecos_1.HttpEndpointDecos.middleware;
    HttpEndpoint.isAuthorized = HttpEndpointDecos_1.HttpEndpointDecos.isAuthorized;
    HttpEndpoint.isInRole = HttpEndpointDecos_1.HttpEndpointDecos.isInRole;
    HttpEndpoint.hasClaim = HttpEndpointDecos_1.HttpEndpointDecos.hasClaim;
    HttpEndpoint.fromUri = HttpEndpointDecos_1.HttpEndpointDecos.fromUri;
    HttpEndpoint.fromBody = HttpEndpointDecos_1.HttpEndpointDecos.fromBody;
    HttpEndpoint.createDecorator = HttpEndpointDecos_1.HttpEndpointDecos.createDecorator;
    return HttpEndpoint;
}());
exports.HttpEndpoint = HttpEndpoint;
var HttpEndpointUtils;
(function (HttpEndpointUtils) {
    var METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
    var HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
    function onComplete(path, req, res, endpoint, endpointMethod, promise, mix, statusCode, mimeType, headers) {
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
        if (endpoint.meta != null && endpoint.meta.origins) {
            var corsHeaders = getOptionsHeaders(endpoint, path, req);
            headers = headers == null ? corsHeaders : dependency_1.obj_extend(headers, corsHeaders);
        }
        promise.resolve(content, statusCode, mimeType, headers);
    }
    HttpEndpointUtils.onComplete = onComplete;
    function getHelpModel(service) {
        var routes = service.routes.routes;
        var endpoints = [];
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
    }
    HttpEndpointUtils.getHelpModel = getHelpModel;
    ;
    function getOptionsHeaders(endpoint, path, req) {
        var headers = {}, allowedMethods = [], allowedOrigins = '', i = METHODS.length;
        if (endpoint.meta) {
            if (endpoint.meta.headers != null) {
                headers = dependency_1.obj_extend(headers, endpoint.meta.headers);
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
                        headers = dependency_1.obj_extend(headers, endpointMethod.meta.headers);
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
        dependency_1.obj_extendDefaults(headers, cors);
        rewriteAllowedOrigins(req, headers);
        return headers;
    }
    HttpEndpointUtils.getOptionsHeaders = getOptionsHeaders;
    ;
    function rewriteAllowedOrigins(req, headers) {
        var current = req.headers['host'];
        if (!current) {
            return;
        }
        var origin = headers[HEADER_ALLOW_ORIGIN];
        if (!origin || origin === '*') {
            return;
        }
        var hosts = origin.split(' ');
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
})(HttpEndpointUtils || (HttpEndpointUtils = {}));
var RouteUtils;
(function (RouteUtils) {
    function define(endpoint, defs, routes) {
        for (var path in defs) {
            if (path[0] !== '$') {
                continue;
            }
            var x = defs[path];
            var responder = null;
            if (dependency_1.is_Function(x)) {
                responder = {
                    process: x
                };
            }
            if (responder == null && dependency_1.is_Array(x)) {
                responder = {
                    process: BarricadeExt_1.BarricadeExt(x)
                };
            }
            if (responder == null && dependency_1.is_Object(x)) {
                responder = x;
            }
            if (responder != null && dependency_1.is_Array(responder.process))
                responder.process = BarricadeExt_1.BarricadeExt(responder.process);
            if (responder == null || dependency_1.is_Function(responder.process) === false) {
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
    function resolve(endpoint) {
        var routes = new dependency_1.ruta.Collection;
        var properties = fillProtoHash(Object.getPrototypeOf(endpoint), Object.create(null));
        define(endpoint, properties, routes);
        define(endpoint, endpoint.ruta, routes);
        return routes;
    }
    RouteUtils.resolve = resolve;
})(RouteUtils || (RouteUtils = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_HttpService_HttpEndpoint) && isObject(module.exports)) {
		Object.assign(_src_HttpService_HttpEndpoint, module.exports);
		return;
	}
	_src_HttpService_HttpEndpoint = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_query;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = _src_dependency;
function default_1(req, res, next) {
    var url = req.url, q = url.indexOf('?');
    req.query = q === -1
        ? {}
        : deserialize(url.substring(q + 1));
    next();
}
exports.default = default_1;
;
var deserialize = dependency_1.ruta.$utils.query.deserialize;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_middleware_query) && isObject(module.exports)) {
		Object.assign(_src_middleware_query, module.exports);
		return;
	}
	_src_middleware_query = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Plugins_Static;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Autoreload_1 = _src_Autoreload_Autoreload;
var Application_1 = _src_HttpApplication_Application;
var app_1 = _src_util_app;
var StaticContent = require('static-content');
Application_1.default.on('configurate', function (app) {
    if (app.isRoot === false || app_1.app_isDebug() === false) {
        return;
    }
    StaticContent.on('file', function (file) {
        Autoreload_1.default.watchFile(file);
    });
    Autoreload_1.default.getWatcher().on('fileChange', function (path, file) {
        StaticContent.Cache.remove(file);
    });
});
exports.default = StaticContent;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Plugins_Static) && isObject(module.exports)) {
		Object.assign(_src_Plugins_Static, module.exports);
		return;
	}
	_src_Plugins_Static = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_static;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Static_1 = _src_Plugins_Static;
function Static(req, res, next, config) {
    if (responder == null)
        responder = Static_1.default.respond;
    responder(req, res, next, config);
}
exports.default = Static;
;
Static.config = function (config) {
    return (responder = Static_1.default.create(config));
};
var responder = null;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_middleware_static) && isObject(module.exports)) {
		Object.assign(_src_middleware_static, module.exports);
		return;
	}
	_src_middleware_static = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_middleware_export;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = _src_middleware_query;
var static_1 = _src_middleware_static;
exports.default = {
    query: query_1.default,
    static: static_1.default
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_middleware_export) && isObject(module.exports)) {
		Object.assign(_src_middleware_export, module.exports);
		return;
	}
	_src_middleware_export = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_handlers_MaskRunner;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var HandlerFactory_1 = _src_HandlerFactory;
var HttpPage_1 = _src_HttpPage_HttpPage;
var dependency_1 = _src_dependency;
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
}(dependency_1.Class.Deferred));
;
HandlerFactory_1.default.Handlers.MaskRunner = MaskRunner;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_handlers_MaskRunner) && isObject(module.exports)) {
		Object.assign(_src_handlers_MaskRunner, module.exports);
		return;
	}
	_src_handlers_MaskRunner = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_handlers_MaskHtml;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
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
        page
            .process(req, res, config)
            .pipe(this);
        return this;
    };
    return MaskHtml;
}());
;
HandlerFactory_1.default.Handlers.MaskHtml = MaskHtml;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_handlers_MaskHtml) && isObject(module.exports)) {
		Object.assign(_src_handlers_MaskHtml, module.exports);
		return;
	}
	_src_handlers_MaskHtml = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_handlers_export;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
_src_handlers_MaskRunner;
_src_handlers_MaskHtml;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_handlers_export) && isObject(module.exports)) {
		Object.assign(_src_handlers_export, module.exports);
		return;
	}
	_src_handlers_export = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_export;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError_1 = _src_HttpError_HttpError;
exports.HttpError = HttpError_1.HttpError;
exports.NotFoundError = HttpError_1.NotFoundError;
exports.RequestError = HttpError_1.RequestError;
exports.RuntimeError = HttpError_1.RuntimeError;
exports.SecurityError = HttpError_1.SecurityError;
var IHttpHandler_1 = _src_IHttpHandler;
exports.IHttpHandler = IHttpHandler_1.IHttpHandler;
exports.HttpResponse = IHttpHandler_1.HttpResponse;
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
exports.HttpEndpoint = HttpEndpoint_1.HttpEndpoint;
var export_1 = _src_middleware_export;
_src_handlers_export;
exports.middleware = export_1.default;
exports.clean = Application_1.default.clean;
exports.StaticContent = require('static-content');
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_export) && isObject(module.exports)) {
		Object.assign(_src_export, module.exports);
		return;
	}
	_src_export = module.exports;
}());
// end:source ./ModuleSimplified.js

_node_modules_tslib_tslib;

const server = _src_export;

(function () {
	if (global.atma == null) { 
		global.atma = {}
	}
	if (global.atma.server) {
		Object.assign(global.atma.server, server);			
	} else {
		global.atma.server = server;
	}		


	Object.assign(exports, server);
}());


}());
// end:source ./RootModule.js
