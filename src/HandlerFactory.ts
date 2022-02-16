import Application from './HttpApplication/Application'
import HttpSubApplication from './HttpApplication/SubApp'
import HttpPage from './HttpPage/HttpPage'
import { IHttpHandler, IHttpHandlerDef } from './IHttpHandler'
import { include, logger, Uri, is_String, is_Function, is_Object } from './dependency'
import { page_flatternPageViewRoutes } from './util/page'
import { path_hasProtocol } from './util/path'
import { app_isDebug } from './util/app'
import { class_Dfr, obj_getProperty } from 'atma-utils'
import { IncomingMessage } from 'http'
import { Collection } from 'ruta'
import { HttpEndpointExplorer } from './HttpService/HttpEndpointExplorer'
import { type HttpEndpoint } from './HttpService/HttpEndpoint'


const fns_RESPONDERS = [
    'subapps',
    'handlers',
    'services',
    'pages'
];

export default class HandlerFactory {
    subapps: InstanceType<typeof Collection>
    handlers: InstanceType<typeof Collection>
    services: InstanceType<typeof Collection>
    pages: InstanceType<typeof Collection>

    constructor(public app: Application) {

        this.subapps = new Collection();
        this.handlers = new Collection();
        this.services = new Collection();
        this.pages = new Collection();
    }

    registerPages(pages_, pageCfg) {
        let pages = page_flatternPageViewRoutes(pages_, pageCfg),
            id, page;
        for (id in pages) {

            page = pages[id];

            if (page.controller == null) {
                page.controller = HttpPage;
            }
            else if (is_String(page.controller)) {
                page.controller = this
                    .app
                    .config
                    .$getController(page)
                    ;
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

    registerHandler(path: string, handler: string | IHttpHandlerDef, handlerCfg) {
        if (is_String(handler)) {
            handler = {
                controller: handler_path(handler, handlerCfg)
            };
        }

        this
            .handlers
            .add(path, handler)
            ;
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
            .add(route, new HttpSubApplication(name, data, this.app))
            ;
    }

    registerServices(routes, serviceCfg) {

        for (let key in routes) {
            this.registerService(key, routes[key], serviceCfg);
        }

        return this;
    }

    registerService(path, service, serviceCfg?) {
        if (is_Function(service)) {
            service = {
                controller: service
            };
        }

        else if (is_String(service)) {
            service = {
                controller: service
            };
        }

        if (is_String(service.controller)) {
            service.controller = handler_path(service.controller, serviceCfg);
        }
        this
            .services
            .add(path, service)
            ;
    }

    registerWebsockets(routes, websocketCfg) {
        for (let namespace in routes) {
            this.registerWebsocket(namespace, routes[namespace]);
        }
        return this;
    }

    registerWebsocket(namespace, handler, handlerCfg = null) {
        let socket = this.app.webSockets;
        if (is_String(handler)) {
            let path = handler_path(handler, handlerCfg);
            include
                .instance()
                .js(handler + '::Handler')
                .done(function (resp) {

                    socket.registerHandler(namespace, resp.Handler);
                });
            return;
        }
        socket.registerHandler(namespace, handler);
    }

    registerEndpoint <T extends (new (...args) => HttpEndpoint)> (Type: T) {
        let meta = HttpEndpointExplorer.getMeta(Type);
        if (meta == null || meta.path == null) {
            throw new Error(`Meta information not extracted from ${Type}`);
        }
        this.registerService(meta.path, Type);
        return this;
    }

    get(app: Application, req: IncomingMessage & { body: any }, callback) {
        let url = req.url;
        let method = req.method;
        let base = app.config.base;

        if (method === 'POST' && req.body && req.body._method) {
            method = req.body._method;
        }

        let imax = fns_RESPONDERS.length,
            i = -1;
        while (++i < imax) {
            let x = fns_RESPONDERS[i];
            if (processor_tryGet(this, this[x], url, method, base, callback)) {
                return;
            }
        }

        if (Application.current != null && this.app !== Application.current) {
            // check handlers of the root application
            let factory = Application.current.handlers,
                cfg = Application.current.config;

            let hasHandler = processor_tryGet(
                factory,
                factory.handlers,
                url,
                method,
                cfg.base || base,
                callback
            );

            if (hasHandler) {
                return;
            }
        }
        callback(null);
    }

    has(url, method) {

        let imax = fns_RESPONDERS.length,
            i = -1
            ;
        while (++i < imax) {

            if (this[fns_RESPONDERS[i]].get(url, method) != null)
                return true;
        }

        return false;
    }

    static Handlers: {
        [name: string]: new (...args) => IHttpHandler
    } = {}
};

function processor_tryGet(
    factory: HandlerFactory,
    collection: InstanceType<typeof ruta.Collection>,
    url: string,
    method: string,
    base: string,
    callback: (ctr: IHttpHandler) => any) {

    let route = collection.get(url, method);
    if (route == null)
        return false;

    let controller = route.value.controller || route.value;
    if (controller == null) {
        logger.error('<routing> no controller', url);
        return false;
    }

    if (is_Function(controller)) {
        callback(new controller(route, factory.app));
        return true;
    }

    if (is_String(controller)) {
        let path = path_hasProtocol(controller)
            ? controller
            : Uri.combine(base, controller)
            ;

        processor_loadAndInit(factory, path, route, callback);
        return true;
    }

    if (is_Function(controller.process)) {
        callback(controller);
        return true;
    }

    logger.error('<routing> invalid controller', controller);
    return false;

}

let COUNTER = 0;

function processor_loadAndInit(factory, url, route, callback) {
    if (memory_canResolve(url)) {
        memory_resolve(factory, url, route, callback);
        return;
    }

    const key = `Handler${++COUNTER}`
    factory
        .app
        .resources
        .js(url + `::${key}`)
        .done(function (resp) {
            let Handler = resp[key];
            if (Handler == null) {
                logger.error('<handler> invalid route', url);
                callback(new ErrorHandler('Invalid route: ' + url));
                return;
            }
            if (typeof Handler.default === 'function') {
                Handler = Handler.default;
            }
            if (!is_Function(Handler.prototype?.process)) {
                let msg = `
                    Invalid default exported interface from ${url}. Did you used default export/inherited the HttpEndpoint
                `.trim();

                logger.error(`<handler> ${msg}`);
                callback(new ErrorHandler(msg));
                return;
            }
            if (app_isDebug() === false)
                route.value.controller = Handler;

            if (is_Object(Handler) && is_Function(Handler.process)) {
                callback(Handler);
                return;
            }
            callback(new Handler(route, factory.app));
        });
}

let memory_canResolve,
    memory_resolve;
(function () {
    let rgx = /\/\{(self|global)\}.?/;
    memory_canResolve = function (url) {
        return rgx.test(url);
    };
    memory_resolve = function (factory, url, route, callback) {
        let match = rgx.exec(url),
            str = match[0],
            type = match[1] as 'self' | 'global',
            path = url.substring(match.index + match[0].length),
            memory = getContext(type),
            Handler = obj_getProperty(memory, path);

        if (Handler == null) {
            logger.error('<handler> invalid route', url);
            callback(new ErrorHandler('Invalid route: ' + url));
            return;
        }
        if (is_Object(Handler)) {
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
        logger
            .error('<Handler> Path is relative but no location. Set handler: {location: X} in config')
            .error(path, config)
            ;
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



class ErrorHandler extends class_Dfr {
    constructor (private message) {
        super();
    }
    process() {
        return this.reject(this.message ?? 'Invalid Routing');
    }
};
