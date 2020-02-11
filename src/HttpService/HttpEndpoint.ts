import { IncomingMessage, ServerResponse } from 'http'
import { NotFoundError, SecurityError, RequestError } from '../HttpError/HttpError'
import { ruta, logger, obj_extend, obj_extendDefaults, is_Function, is_Array, is_Object } from '../dependency'
import { secure_canAccess, service_validateArgs } from './utils'
import { class_Dfr } from 'atma-utils';
import { HttpResponse } from '../IHttpHandler';
import { BarricadeExt } from './BarricadeExt'
import { IHttpEndpointMethodMeta, IHttpEndpointRutaCollection, IHttpEndpointMeta, IHttpEndpointMethod, IHttpEndpointMethodArgMeta } from './HttpEndpointModels'
import { HttpEndpointDecos } from './HttpEndpointDecos'
import { HttpEndpointParamUtils } from './HttpEndpointParamUtils'

const METHOD_META_DEFAULT = <IHttpEndpointMethodMeta>{
    secure: null,
    arguments: null
}

export abstract class HttpEndpoint {

    static origin = HttpEndpointDecos.origin
    static middleware = HttpEndpointDecos.middleware
    static isAuthorized = HttpEndpointDecos.isAuthorized
    static isInRole = HttpEndpointDecos.isInRole
    static hasClaim = HttpEndpointDecos.hasClaim

    static fromUri = HttpEndpointDecos.fromUri
    static fromBody = HttpEndpointDecos.fromBody

    static createDecorator = HttpEndpointDecos.createDecorator

    protected rootCharCount: number
    protected dfr: class_Dfr

    routes: IHttpEndpointRutaCollection
    meta?: IHttpEndpointMeta
    ruta?: { [path: string]: IHttpEndpointMethod }

    constructor(route?: { path: string[] }) {
        if (this.routes == null) {
            //Create ROUTES once
            Object.getPrototypeOf(this).routes = RouteUtils.resolve(this);
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

    process(req: IncomingMessage & { body?: any }, res: ServerResponse): Promise<any> | void {

        let iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {

            return Promise.resolve(HttpEndpointUtils.getHelpModel(this));
        }

        if (this.meta != null){ 
            if (secure_canAccess(req, this.meta.secure) === false) {
                console.log('SECURE'.red, this.meta, 'META IN PROTO', HttpEndpoint.prototype.meta);
                return Promise.reject(new SecurityError('Access Denied'));
            }
        }

        let path = req.url.substring(this.rootCharCount),
            entry = this.routes.get(path, req.method);

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

            let name = this.constructor.name || '<service>';
            let url = path || '/';
            let error = new NotFoundError(`${name}: endpoint not Found: <${req.method}> ${url}`);
            return Promise.reject(error);
        }

        let endpoint = entry.value;
        let meta = endpoint.meta;

        if (meta != null) {
            if (meta.secure != null && secure_canAccess(req, meta.secure) === false) {
                console.log('SECURE'.green, meta);
                let error = new SecurityError('Access Denied');
                return Promise.reject(error);
            }

            if (meta.arguments != null) {
                let args = meta.arguments;
                let isGet = req.method === 'GET';
                let isStrict = isGet === false && meta.strict;
                let body = isGet
                    ? entry.current.params
                    : req.body
                    ;

                var error = service_validateArgs(body, args, isStrict);
                if (error) {
                    return Promise.reject(new RequestError(error.message));
                }
            }
        }

        let params = null;
        let paramsMeta = this.meta.endpointsParams?.[endpoint.key];
        if (paramsMeta != null) {
            params = [];
            for (let i = 0; i < paramsMeta.length; i++) {
                params[i] = HttpEndpointParamUtils.resolveParam(req, entry.current.params, paramsMeta[i]);
            }
        }

        let result = params == null 
            ? endpoint.process.call(this, req, res, entry.current.params)
            : endpoint.process.apply(this, params);

        if (result == null) {
            return void 0;
        }

        let promise = this.dfr = new class_Dfr();
        if (typeof result.then !== 'function') {
            HttpEndpointUtils.onComplete(
                path,
                req,
                res,
                this,
                endpoint,
                promise,
                result
            );
            return promise as any;
        }

        result.then((mix, statusCode, mimeType, headers) => {
            HttpEndpointUtils.onComplete(
                path,
                req,
                res,
                this,
                endpoint,
                promise,
                mix,
                statusCode,
                mimeType,
                headers
            );
        }, error => promise.reject(error));

        return promise as any;
    }

    resolve (...args) {
        this.dfr.resolve(...args);
    }
    reject (error) {
        this.dfr.reject(error);
    }
}

namespace HttpEndpointUtils {
    const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
    const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';

    export function onComplete(
        path: string,
        req: IncomingMessage,
        res: ServerResponse,
        endpoint: HttpEndpoint,
        endpointMethod: IHttpEndpointMethod,

        promise: class_Dfr,

        mix: any | HttpResponse,
        statusCode?: number,
        mimeType?: string,
        headers?
    ) {

        let content = null;
        if (mix instanceof HttpResponse) {
            content = mix.content;
            statusCode = mix.statucCode;
            mimeType = mix.mimeType;
            headers = mix.headers;
        }
        else {
            content = mix;
        }
        if (endpoint.meta != null && endpoint.meta.origins) {
            let corsHeaders = getOptionsHeaders(endpoint, path, req);
            headers = headers == null ? corsHeaders : obj_extend(headers, corsHeaders);
        }

        promise.resolve(content, statusCode, mimeType, headers);
    }

    export function getHelpModel(service: HttpEndpoint) {
        let routes = service.routes.routes;
        let endpoints = [];

        let i = -1,
            imax = routes.length,
            endpoint, info, meta;
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
    };
    export function getOptionsHeaders(endpoint: HttpEndpoint, path: string, req: IncomingMessage) {

        let headers = {},
            allowedMethods = [],
            allowedOrigins = '',
            i = METHODS.length;

        if (endpoint.meta) {
            if (endpoint.meta.headers != null) {
                headers = obj_extend(headers, endpoint.meta.headers);
            }
            if (endpoint.meta.origins != null) {
                allowedOrigins = endpoint.meta.origins;
            }
        }
        while (--i > -1) {
            let method = METHODS[i];
            let route = endpoint.routes.get(path, method);
            if (route != null) {
                allowedMethods.push(method)
                let endpointMethod = route.value;
                if (endpointMethod.meta) {
                    if (endpointMethod.meta.headers != null) {
                        headers = obj_extend(headers, endpointMethod.meta.headers);
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
        if (methods.indexOf('OPTIONS') === -1) {
            methods += ',OPTIONS';
        }

        let cors = {
            'Content-Type': 'application/json;charset=utf-8',
            'Allow': methods,
            'Access-Control-Allow-Methods': methods,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': allowedOrigins
        };

        obj_extendDefaults(headers, cors);
        rewriteAllowedOrigins(req, headers);
        return headers;
    };

    function rewriteAllowedOrigins(req, headers) {
        let current: string = req.headers['host'];
        if (!current) {
            return;
        }
        let origin = headers[HEADER_ALLOW_ORIGIN];
        if (!origin || origin === '*') {
            return;
        }
        let hosts = origin.split(' ');
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

}

namespace RouteUtils {

    interface IDefinitions {
        [path: string]: Function | Function[] | IHttpEndpointMethod
    }

    function define(endpoint: HttpEndpoint, defs: IDefinitions, routes: IHttpEndpointRutaCollection) {
        for (let path in defs) {
            if (path[0] !== '$') {
                continue;
            }

            let x = defs[path];
            let responder = null;

            if (is_Function(x)) {
                responder = {
                    process: x
                };
            }

            if (responder == null && is_Array(x)) {
                responder = {
                    process: BarricadeExt(x)
                }
            }

            if (responder == null && is_Object(x)) {
                responder = x;
            }

            if (responder != null && is_Array(responder.process))
                responder.process = BarricadeExt(responder.process);

            if (responder == null || is_Function(responder.process) === false) {
                logger.warn('<HttpService> `process` is not a function'
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

    export function resolve(endpoint: HttpEndpoint) {
        let routes = new ruta.Collection;
        let properties = fillProtoHash(Object.getPrototypeOf(endpoint), Object.create(null));

        define(endpoint, properties, routes);
        define(endpoint, endpoint.ruta, routes);
        return routes;
    }
}
