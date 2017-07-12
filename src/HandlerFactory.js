"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("./HttpApplication/Application");
var SubApp_1 = require("./HttpApplication/SubApp");
var HttpPage_1 = require("./HttpPage/HttpPage");
var dependency_1 = require("./dependency");
var page_1 = require("./util/page");
var path_1 = require("./util/path");
var app_1 = require("./util/app");
var fns_RESPONDERS = [
    'subapps',
    'handlers',
    'services',
    'pages'
];
var HandlerFactory = (function () {
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
    return HandlerFactory;
}());
HandlerFactory.Handlers = {};
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
