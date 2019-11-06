import { IHttpEndpointMeta, IHttpEndpointMethod } from './HttpEndpointModels';

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