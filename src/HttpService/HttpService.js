"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var HttpError_1 = require("../HttpError/HttpError");
var utils_1 = require("./utils");
var Barricade_1 = require("./Barricade");
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
            if (error)
                return this.reject(new HttpError_1.RequestError(error));
        }
        endpoint
            .process
            .call(this, req, res, entry.current.params);
        return this;
    },
    getOptions: (function () {
        var METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
        return function (path, req, res) {
            var headers = null, allowedMethods = [];
            var i = METHODS.length;
            while (--i > -1) {
                var method = METHODS[i];
                var endpoint = this.routes.get(path, method);
                if (endpoint != null) {
                    allowedMethods.push(method);
                    if (endpoint.meta && endpoint.meta.headers) {
                        headers = dependency_1.obj_extend(headers, endpoint.meta.headers);
                    }
                }
            }
            if (allowedMethods.length === 0) {
                return null;
            }
            if (this.meta && this.meta.headers) {
                headers = dependency_1.obj_extend(headers, this.meta.headers);
            }
            var methods = allowedMethods.join(',');
            headers['Allow'] = methods;
            headers['Access-Control-Allow-Methods'] = methods;
            if (headers['Content-Type'] === void 0) {
                headers['Content-Type'] = 'application/json;charset=utf-8';
            }
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
        args = [mix].concat(params);
    }
    var proto = endpoints_merge(args);
    var routes = new dependency_1.ruta.Collection, defs = proto.ruta || proto, path, responder, x;
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
            logger.warn('<HttpService> `process` is not a function'
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
    var proto = array[0], ruta = proto.ruta || proto;
    var imax = array.length, i = 0, x, xruta;
    while (++i < imax) {
        x = array[i];
        xruta = x.ruta || x;
        for (var key in xruta) {
            if (xruta[key] != null)
                ruta[key] = xruta[key];
        }
        if (x.ruta == null)
            continue;
        for (var key in x) {
            if (key === 'ruta')
                continue;
            if (x[key] != null)
                proto[key] = x[key];
        }
    }
    return proto;
}
