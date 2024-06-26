import { IncomingMessage, ServerResponse } from 'http'
import { NotFoundError, SecurityError, RequestError } from '../HttpError/HttpError'
import { logger, obj_extend, obj_extendDefaults, is_Function, is_Array, is_Object } from '../dependency'
import { secure_canAccess, service_validateArgs } from './utils'
import { class_Dfr } from 'atma-utils';
import { HttpResponse, IHttpHandler } from '../IHttpHandler';
import { BarricadeExt } from './BarricadeExt'
import { IHttpEndpointMethodMeta, IHttpEndpointRutaCollection, IHttpEndpointMeta, IHttpEndpointMethod } from './HttpEndpointModels'
import { HttpEndpointDecos } from './HttpEndpointDecos'
import { HttpEndpointParamUtils, Types } from './HttpEndpointParamUtils'
import Application from '../HttpApplication/Application';
import { HttpEndpointExplorer } from './HttpEndpointExplorer';
import { cors_rewriteAllowedOrigins } from '../util/cors';
import { Collection } from 'ruta'

const METHOD_META_DEFAULT = <IHttpEndpointMethodMeta>{
    secure: null,
    arguments: null
}

export abstract class HttpEndpoint {

    static route = HttpEndpointDecos.route
    static origin = HttpEndpointDecos.origin
    static middleware = HttpEndpointDecos.middleware
    static isAuthorized = HttpEndpointDecos.isAuthorized
    static isInRole = HttpEndpointDecos.isInRole
    static hasClaim = HttpEndpointDecos.hasClaim

    static fromUri = HttpEndpointDecos.fromUri
    static fromBody = HttpEndpointDecos.fromBody
    static response = HttpEndpointDecos.response
    static description = HttpEndpointDecos.description

    static createDecorator = HttpEndpointDecos.createDecorator
    static Types = Types

    protected rootCharCount: number
    protected dfr: class_Dfr

    routes: IHttpEndpointRutaCollection
    meta?: IHttpEndpointMeta
    ruta?: { [path: string]: IHttpEndpointMethod }

    constructor(route: { path: string[] }, public app: Application) {
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

    process(req: IncomingMessage & { body?: any }, res: ServerResponse): Promise<any> | void {

        let iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return Promise.resolve(HttpEndpointUtils.getHelpModel(this));
        }

        if (this.meta != null){
            if (secure_canAccess(req, this.meta.secure) === false) {
                return Promise.reject(new SecurityError('Access Denied'));
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
                entry = this.routes.get(path, 'GET')
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
            let error = new NotFoundError(`${name}: endpoint not Found: <${req.method}> ${url}`);
            return Promise.reject(error);
        }

        let endpoint = entry.value;
        let meta = endpoint.meta;

        if (meta != null) {
            if (meta.secure != null && secure_canAccess(req, meta.secure) === false) {
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

                let error = service_validateArgs(body, args, isStrict);
                if (error) {
                    return Promise.reject(new RequestError(error.message));
                }
            }
        }

        let params: any[] = null;
        let paramsMeta = this.meta?.endpointsParams?.[endpoint.key];
        if (paramsMeta != null) {
            params = [];
            for (let i = 0; i < paramsMeta.length; i++) {
                params[i] = HttpEndpointParamUtils.resolveParam(req, entry.current.params, paramsMeta[i]);
            }
            params.push(req, res)
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

        let hasCatch = typeof result.catch === 'function';
        let catchable = result.then((mix, statusCode, mimeType, headers) => {
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
        }, hasCatch ? void 0 : error => promise.reject(error));

        if (hasCatch) {
            catchable.catch(err => {
                promise.reject(err)
            });
        }

        return promise as any;
    }

    resolve (...args) {
        this.dfr.resolve(...args);
    }
    reject (error) {
        this.dfr.reject(error);
    }
}

export namespace HttpEndpointUtils {
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

        let response: HttpResponse;
        if (mix instanceof HttpResponse === false) {
            response = new HttpResponse({
                content: mix,

                //@Obsolete - this callback shouldn't support multiple arguments.
                statusCode: statusCode,
                mimeType: mimeType,
                headers: headers,
            });
        } else {
            response = mix;
        }

        if (endpoint.meta?.origins) {
            let corsHeaders = getOptionsHeaders(endpoint, path, req);
            response.headers = obj_extend(response.headers, corsHeaders);
        }
        promise.resolve(response);
    }

    export function getHelpModel(service: HttpEndpoint) {
        return HttpEndpointExplorer.getMeta(( <any> service).constructor);
    };
    export function getCorsHeaders(req: IncomingMessage, handler: IHttpHandler) {

        let headers = {
            'Access-Control-Allow-Methods': [ req.method ],
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] || 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
            'Access-Control-Allow-Origin': handler.meta?.origins ?? '',
            'Vary': 'Origin',
        };
        cors_rewriteAllowedOrigins(req, headers);
        return headers;
    }
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

        obj_extendDefaults(headers, cors);
        cors_rewriteAllowedOrigins(req, headers);
        return headers;
    };

}

export namespace RouteUtils {

    interface IDefinitions {
        [path: string]: Function | Function[] | IHttpEndpointMethod
    }

    function define(defs: IDefinitions, routes: IHttpEndpointRutaCollection) {
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

    export function resolveFromType(endpoint: HttpEndpoint) {
        let prototype = Object.getPrototypeOf(endpoint);
        return resolveFromProto(prototype);
    }
    export function resolveFromProto(prototype) {
        let routes = new Collection;
        let properties = fillProtoHash(prototype, Object.create(null));

        define(properties, routes);
        define(prototype.ruta, routes);
        return routes;
    }
}
