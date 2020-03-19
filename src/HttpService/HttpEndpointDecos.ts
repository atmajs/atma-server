import { IHttpEndpointMeta, IHttpEndpointMethod, IHttpEndpointMethodArgMeta, IHttpEndpointMethodArgOptions, IHttpEndpointMethodMetaResponse } from './HttpEndpointModels';
import { Types } from './HttpEndpointParamUtils';

export namespace HttpEndpointDecos {

    export function middleware (fn: (req, res?, params?) => Promise<any> | any | void) {
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
        }
    };
    export function isAuthorized () {
        return createDecorator({
            forCtor (Ctor, meta) {
                meta.secure = true;
            },
            forMethod (Proto, method) {
                method.meta.secure = true;
            }
        });
    };
    export function isInRole (...roles: string[]) {
        return createDecorator({
            forCtor (Ctor, meta) {
                meta.secure = { roles };
            },
            forMethod (Proto, method) {
                method.meta.secure = { roles };
            }
        });
    };
    export function hasClaim (...claims: string[]) {
        return createDecorator({
            forCtor (Ctor, meta) {
                meta.secure = { claims };
            },
            forMethod (Proto, method) {
                method.meta.secure = { claims };
            }
        });
    };
    export function origin (origin: string) {
        return createDecorator({
            forCtor (Ctor, meta) {
                meta.origins = origin;
            },
            forMethod (Proto, method) {
                method.meta.origins = origin;
            }
        });
    };
    export function route (route: string) {
        return createDecorator({
            forCtor (Ctor, meta: IHttpEndpointMeta) {
                // files are dynamically parsed and the content resolved
                meta.path = route;
            },
            forMethod (Proto, method: IHttpEndpointMethod) {
                method.meta.path = route;
            }
        });
    };
    export function description (txt: string) {
        return createDecorator({
            forCtor (Ctor, meta: IHttpEndpointMeta) {
                meta.description = txt;
            },
            forMethod (Proto, method: IHttpEndpointMethod) {
                method.meta.description = txt;
            }
        });
    };
    export function response (response: IHttpEndpointMethodMetaResponse) {
        return createDecorator({
            forCtor (Ctor, meta: IHttpEndpointMeta) {
                throw new Error('Only the endpoint routes support response decorator');
            },
            forMethod (Proto, method: IHttpEndpointMethod) {
                if (method.meta.responses == null) {
                    method.meta.responses = [];
                }
                if (response.status == null) {
                    response.status = 200;
                }
                method.meta.responses.push(response);
            }
        });
    };
    export function fromUri ()
    export function fromUri (name: string, Type?: Function)
    export function fromUri (opts: IHttpEndpointMethodArgOptions)
    export function fromUri (mix?: any, Type?: Function) {
        let opts: IHttpEndpointMethodArgOptions;
        if (mix == null) {
            opts = {
                Type: Types.Json
            };
        } else if (typeof mix === 'string') {
            opts = {
                name: mix,
                Type: Type ?? String
            }
        } else if (typeof mix === 'object') {
            opts = mix;
        }
        return function (target, propertyKey, index) {
            ensureEndpointArgsMeta(
                target,
                propertyKey,
                'uri',
                index,
                opts
            );
        };
    }
    export function fromBody ()
    export function fromBody (Type: Function)
    export function fromBody (opts: IHttpEndpointMethodArgOptions)
    export function fromBody (mix?: any) {
        let opts: IHttpEndpointMethodArgOptions;
        if (mix == null) {
            opts = {
                Type: Types.Json
            };
        } else if (typeof mix === 'function') {
            opts = {
                Type: mix
            }
        } else if (typeof mix === 'object') {
            opts = mix;
        }
        return function (target, propertyKey, index) {
            ensureEndpointArgsMeta(
                target,
                propertyKey,
                'body',
                index,
                opts
            );
        };
    }

    function ensureEndpointArgsMeta (
        proto: any, 
        methodName: string, 
        paramFrom: 'uri' | 'body', 
        paramIndex: number,
        opts: IHttpEndpointMethodArgOptions,
    ): IHttpEndpointMethodArgMeta[] {

        let meta = proto.meta ?? (proto.meta = {});
        if (meta.endpointsParams == null) meta.endpointsParams = {};
        
        let params = meta.endpointsParams[methodName];
        if (params == null) {
            params = meta.endpointsParams[methodName] = [];
        }
        
        let paramMeta = <IHttpEndpointMethodArgMeta> {
            from: paramFrom,
            Type: opts.Type,
            name: opts.name,
            validate: opts.validate
        };
        params[paramIndex] = paramMeta;
        return params;
    }

    function ensureEndpointMeta (mix: any): IHttpEndpointMeta {
        let proto = typeof mix === 'function' 
            ? mix.prototype 
            : Object.getPrototypeOf(mix)
            ;
        let meta = proto.meta;
        if (meta == null) {
            meta = proto.meta = {};
        }
        return meta;
    }
    function ensureEndpointMethod (current: any): IHttpEndpointMethod {
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

    interface ICreateDecorator {
        forCtor (Ctor: Function, meta: IHttpEndpointMeta): Function | void;
        forMethod (Proto: any, method: IHttpEndpointMethod): IHttpEndpointMethod | void
    }
    export function createDecorator (opts: ICreateDecorator) {
        return function (target, propertyKey?, descriptor?) {
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
        }
    }
    function mergeMiddleware (currentVal: Function | Function[] | IHttpEndpointMethod, fn: Function) {
        if (currentVal == null) {
            return fn;
        }
        if (typeof currentVal === 'function') {
            return [ fn, currentVal ];
        }
        if (Array.isArray(currentVal)) {
            return [ fn, ...currentVal ];
        }
    
        currentVal.process = <any> mergeMiddleware(currentVal.process, fn);
    }
}