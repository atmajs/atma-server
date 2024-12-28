import { logger, obj_extend, is_Function, is_Array, is_Object, obj_extendDefaults } from '../dependency'
import { NotFoundError, SecurityError, RequestError } from '../HttpError/HttpError'
import { secure_canAccess, service_validateArgs } from './utils'
import { Barricade } from './Barricade'
import { class_Dfr, mixin } from 'atma-utils';
import { HttpResponse } from '../IHttpHandler';
import { cors_rewriteAllowedOrigins } from '../util/cors';
import { Collection } from 'ruta'
import type { ServerResponse } from 'http';
import type { IServerRequest } from '../models/IServerRequest';
import { THttpServiceDefinition } from './types';

abstract class HttpServiceProto extends class_Dfr {
    rootCharCount: number;
    secure: any
    meta: any
    name: any

    abstract routes: InstanceType<typeof Collection>

    constructor(route) {
        super();
        if (route == null)
            return;

        let pathParts = route.path,
            i = 0,
            imax = pathParts.length,
            count = 0;
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
        let routes = this.routes.routes,
            endpoints = []
            ;


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
    }
    process(req: IServerRequest, res: ServerResponse): void | PromiseLike<HttpResponse | any> {

        let iQuery = req.url.indexOf('?');
        if (iQuery !== -1 && /\bhelp\b/.test(req.url.substring(iQuery))) {
            return Promise.resolve(this.help());
        }

        if (secure_canAccess(req, this.secure) === false) {
            return Promise.reject(new SecurityError('Access Denied'));
        }

        let path = req.url.substring(this.rootCharCount),
            entry = this.routes.get(path, req.method);

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
            return Promise.reject(new NotFoundError(message));
        }

        let endpoint = entry.value;
        let meta = endpoint.meta;
        let args = meta && meta.arguments;

        if (meta != null && secure_canAccess(req, meta.secure) === false) {
            return Promise.reject(new SecurityError('Access Denied'));
        }

        if (args != null) {
            let isGet = req.method === 'GET';
            let isStrict = isGet === false && meta.strict;
            let body = isGet
                ? entry.current.params
                : req.body;

            let error = service_validateArgs(body, args, isStrict);
            if (error) {
                return Promise.reject(new RequestError(error.message ?? error.toString()));
            }
        }

        let result = endpoint
            .process
            .call(this, req, res, entry.current.params);

        let dfr = result ?? this;
        let promise = new class_Dfr<HttpResponse>();
        dfr.then((mix, statusCode, mimeType, headers) => {
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

            if (meta != null && meta.origins) {
                let corsHeaders = this.getOptions(path, req);
                response.headers = obj_extend(response.headers, corsHeaders);
            }
            promise.resolve(response);

        }, error => {
            promise.reject(error)
        });

        return promise;
    }

    getOptions(path, req) {

        let headers = {},
            allowedMethods = [],
            allowedOrigins = '',
            i = METHODS.length;

        if (this.meta) {
            if (this.meta.headers != null) {
                headers = obj_extend(headers, this.meta.headers);
            }
            if (this.meta.origins != null) {
                allowedOrigins = this.meta.origins;
            }
        }
        while (--i > -1) {
            let method = METHODS[i];
            let route = this.routes.get(path, method);
            if (route != null) {
                allowedMethods.push(method)
                let endpoint = route.value;
                if (endpoint.meta) {
                    if (endpoint.meta.headers != null) {
                        headers = obj_extend(headers, endpoint.meta.headers);
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

        obj_extendDefaults(headers, cors);
        cors_rewriteAllowedOrigins(req, headers);
        return headers;
    }
};

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'];
const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';



export default function HttpService(mix: string | THttpServiceDefinition, ...params: THttpServiceDefinition[]) {
    let name, args;

    if (typeof mix === 'string') {
        name = mix;
        args = params;
    } else {
        args = [mix, ...params];
    }

    let proto = endpoints_merge(args);

    let routes = new Collection,
        defs = proto.ruta || proto.routes || proto,
        path, responder, x
        ;
    for (path in defs) {
        x = defs[path];
        responder = null;

        if (is_Function(x)) {
            responder = {
                process: x
            };
        }

        if (responder == null && is_Array(x)) {
            responder = {
                process: Barricade(x)
            }
        }

        if (responder == null && is_Object(x)) {
            responder = x;
        }

        if (responder != null && is_Array(responder.process))
            responder.process = Barricade(responder.process);

        if (responder == null || is_Function(responder.process) === false) {
            logger.warn('<HttpService> `process` is not a function'
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

    let extendsArr: [any, any?, any?] = proto.Extends;
    if (extendsArr) {
        console.warn(`Obsolete: HttpService.Extends is deprecated. Use class instead.`);

        if (Array.isArray(extendsArr)) {
            extendsArr.push(HttpServiceProto);
        } else {
            extendsArr = [HttpServiceProto, extendsArr];
        }

    } else {
        extendsArr = [HttpServiceProto];
    }

    extendsArr.push(proto);

    return class extends mixin(...extendsArr) {
    }
}

(<any>HttpService).Barricade = Barricade;


function endpoints_merge(array) {
    if (array.length === 1)
        return array[0];

    let proto = array[0],
        ruta = proto.ruta || proto.routes || proto;

    let imax = array.length,
        i = 0,
        x,
        xruta;
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
