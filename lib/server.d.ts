// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../http
//   ../ruta
//   ../net
//   ../atma-utils
//   ../ruta/route/RouteCollection
//   ../class-json

declare module 'atma-server' {
    import { createStaticMidd } from 'atma-server/middleware/static'; 
     import { StaticMidd } from 'atma-server/middleware/static'; 
     import { QueryMidd } from 'atma-server/middleware/query'; 
     import { HttpError, NotFoundError, RequestError, RuntimeError, SecurityError } from 'atma-server/HttpError/HttpError';
    import { IHttpHandler, HttpResponse } from 'atma-server/IHttpHandler';
    import HandlerFactory from 'atma-server/HandlerFactory';
    import HttpErrorPage from 'atma-server/HttpPage/HttpErrorPage';
    import HttpPage from 'atma-server/HttpPage/HttpPage';
    import Application from 'atma-server/HttpApplication/Application';
    import HttpSubApplication from 'atma-server/HttpApplication/SubApp';
    import HttpCrudEndpoints from 'atma-server/HttpService/CrudWrapper';
    import HttpService from 'atma-server/HttpService/HttpService';
    import { HttpEndpoint } from 'atma-server/HttpService/HttpEndpoint';
    import Middleware from 'atma-server/middleware/export';
    
    import { HttpEndpointDecos } from 'atma-server/HttpService/HttpEndpointDecos';
    import { LifecycleEvents } from 'atma-server/HttpApplication/LifecycleEvents';
    export { HttpError, NotFoundError, RequestError, RuntimeError, SecurityError, Application, HttpSubApplication, HttpErrorPage, HttpPage, HandlerFactory, HttpCrudEndpoints, HttpService, IHttpHandler, HttpResponse, HttpEndpoint, Middleware, LifecycleEvents };
    export const middleware: {
            query: typeof QueryMidd;
            static: typeof StaticMidd;
            files: typeof createStaticMidd;
    };
    export const clean: typeof Application.clean;
    export const StaticContent: any;
    export const deco: {
            route: typeof HttpEndpointDecos.route;
            origin: typeof HttpEndpointDecos.origin;
            middleware: typeof HttpEndpointDecos.middleware;
            isAuthorized: typeof HttpEndpointDecos.isAuthorized;
            isInRole: typeof HttpEndpointDecos.isInRole;
            hasClaim: typeof HttpEndpointDecos.hasClaim;
            fromUri: typeof HttpEndpointDecos.fromUri;
            fromBody: typeof HttpEndpointDecos.fromBody;
            response: typeof HttpEndpointDecos.response;
            description: typeof HttpEndpointDecos.description;
            createDecorator: typeof HttpEndpointDecos.createDecorator;
    };
}

declare module 'atma-server/middleware/static' {
    export function StaticMidd(req: any, res: any, next: any, config: any): void;
    export interface IStaticServConfig {
        base?: string;
        mimeTypes?: {
            [MimeTypeString: string]: string[];
        };
        extensions?: {
            [Extension: string]: {
                mimeType?: string;
                encoding?: string | 'buffer' | 'UTF-8';
                maxAge?: Number;
            };
        };
        defaultMimeType?: string;
        headers?: any;
    }
    export function createStaticMidd(config: IStaticServConfig): any;
}

declare module 'atma-server/middleware/query' {
    export function QueryMidd(req: any, res: any, next: any): void;
}

declare module 'atma-server/HttpError/HttpError' {
    export class HttpError extends Error {
        _error: any;
        _json: any;
        constructor(mix: any, statusCode?: any);
        name: string;
        statusCode: number;
        toString(): string;
        toJSON(): any;
    }
    export namespace HttpErrorUtil {
        function parseStackTrace(error: Error): string;
        function create(mix: any, statusCode?: number): any;
    }
    export const RequestError: {
        new (mix: any, status?: any): {
            statusCode: any;
            name: any;
            _error: any;
            _json: any;
            toString(): string;
            toJSON(): any;
            message: string;
            stack?: string;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
    export const SecurityError: {
        new (mix: any, status?: any): {
            statusCode: any;
            name: any;
            _error: any;
            _json: any;
            toString(): string;
            toJSON(): any;
            message: string;
            stack?: string;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
    export const NotFoundError: {
        new (mix: any, status?: any): {
            statusCode: any;
            name: any;
            _error: any;
            _json: any;
            toString(): string;
            toJSON(): any;
            message: string;
            stack?: string;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
    export const RuntimeError: {
        new (mix: any, status?: any): {
            statusCode: any;
            name: any;
            _error: any;
            _json: any;
            toString(): string;
            toJSON(): any;
            message: string;
            stack?: string;
        };
        captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;
        stackTraceLimit: number;
    };
    export interface IHttpError {
        name: string;
        statusCode: number;
        message: string;
        status: string;
        stack: string;
        toString: Function;
        toJSON: Function;
        _error?: Error;
    }
    export interface IHttpErrorConstructor {
        new (error: Error, statusCode?: number): IHttpError;
        new (message: string, statusCode?: number): IHttpError;
    }
}

declare module 'atma-server/IHttpHandler' {
    import { IncomingMessage, ServerResponse } from 'http';
    import { IApplicationConfig } from 'atma-server/HttpApplication/IApplicationConfig';
    export interface IHttpHandlerDef {
        controller: string | IHttpHandler;
    }
    export interface IHttpHandlerConstructor {
        new (...args: any[]): IHttpHandler;
    }
    export interface IHttpHandler {
        meta?: {
            headers?: {
                [key: string]: string;
            };
            origins?: string;
        };
        process(req: IncomingMessage, res: ServerResponse, config?: IApplicationConfig): void | PromiseLike<any | HttpResponse>;
        send?(req: any, res: any, content: any, statusCode: any, mimeType: any, allHeaders: any): any;
        sendError?(error: any, req: any, res: any, config: any): any;
        then?(ok: any, error: any): any;
    }
    export class HttpResponse {
        content: string | Buffer | any;
        statucCode: number;
        mimeType: string;
        headers: {
            [key: string]: string;
        };
        constructor(json?: Partial<HttpResponse>);
    }
}

declare module 'atma-server/HandlerFactory' {
    import Application from 'atma-server/HttpApplication/Application';
    import { IHttpHandler, IHttpHandlerDef } from 'atma-server/IHttpHandler';
    import { IncomingMessage } from 'http';
    import { Collection } from 'ruta';
    export default class HandlerFactory {
        app: Application;
        subapps: InstanceType<typeof Collection>;
        handlers: InstanceType<typeof Collection>;
        services: InstanceType<typeof Collection>;
        pages: InstanceType<typeof Collection>;
        constructor(app: Application);
        registerPages(pages_: any, pageCfg: any): this;
        registerHandlers(routes: any, handlerCfg: any): this;
        registerHandler(path: string, handler: string | IHttpHandlerDef, handlerCfg: any): void;
        registerSubApps(routes: any, subAppCfg: any): this;
        registerSubApp(name: any, data: any, subAppCfg: any): void;
        registerServices(routes: any, serviceCfg: any): this;
        registerService(path: any, service: any, serviceCfg: any): void;
        registerWebsockets(routes: any, websocketCfg: any): this;
        registerWebsocket(namespace: any, handler: any, handlerCfg?: any): void;
        get(app: Application, req: IncomingMessage & {
            body: any;
        }, callback: any): void;
        has(url: any, method: any): boolean;
        static Handlers: {
            [name: string]: new (...args: any[]) => IHttpHandler;
        };
    }
}

declare module 'atma-server/HttpPage/HttpErrorPage' {
    import HttpPageBase from 'atma-server/HttpPage/HttpPageBase';
    class HttpErrorPage extends HttpPageBase {
        constructor(error: any, pageData: any, config: any);
        static send(error: any, req: any, res: any, config: any): void;
        process(req: any, res: any, config: any): void;
        _load(): this;
    }
    export default HttpErrorPage;
}

declare module 'atma-server/HttpPage/HttpPage' {
    import Application from 'atma-server/HttpApplication/Application';
    import HttpPageBase from 'atma-server/HttpPage/HttpPageBase';
    export default class HttpPage extends HttpPageBase {
        constructor(route: any, app: Application);
        process(req: any, res: any, config: any): any;
        sendError(error: any, req: any, res: any, config: any): void;
        _load(): this;
        _response(resp: any): void;
        static create(mix: any): any;
    }
}

declare module 'atma-server/HttpApplication/Application' {
    import { Response } from 'atma-server/HttpApplication/Message';
    import HandlerFactory from 'atma-server/HandlerFactory';
    import WebSocket from 'atma-server/WebSocket';
    import Config from 'atma-server/Config/Config';
    import MiddlewareRunner from 'atma-server/Business/Middleware';
    import { IApplicationDefinition, IApplicationConfig, IAppConfigExtended } from 'atma-server/HttpApplication/IApplicationConfig';
    import HttpRewriter from 'atma-server/HttpRewrites/HttpRewriter';
    import { ServerResponse, IncomingMessage } from 'http';
    import * as net from 'net';
    import { class_EventEmitter, class_Dfr } from 'atma-utils';
    import { LifecycleEvents } from 'atma-server/HttpApplication/LifecycleEvents';
    class Application extends class_EventEmitter {
        promise: class_Dfr;
        lifecycle: LifecycleEvents;
        isRoot: boolean;
        isHttpsForced: boolean;
        handlers: HandlerFactory;
        _server: net.Server;
        _sslServer: net.Server;
        _innerPipe: MiddlewareRunner;
        _outerPipe: MiddlewareRunner;
        _responder: any;
        _responders: any;
        middleware: any;
        resources: any;
        lib: {
            [key: string]: any;
        };
        webSockets: WebSocket;
        config: IAppConfigExtended & IApplicationConfig;
        args: {
            [key: string]: string;
        };
        _baseConfig: IApplicationConfig;
        rewriter: HttpRewriter;
        redirects: HttpRewriter;
        constructor(proto?: IApplicationDefinition);
        respond(req: any, res: any, next: any): void;
        responder(data: any): (req: any, res: any, next: any) => void;
        responders(array: any): void;
        /**
          * :before - Array|Function - Middleware fns in OUTER pipe, before main responder
          * :middleware - Arrat|Function - Middleware fns in INNER pipe, before the Handler
          * :after - Array|Function - Middlewarefns in OUTER pipe, after the Handler
          */
        processor(data?: {
            before?: Function[];
            after?: Function[];
            middleware?: Function[];
        }): this;
        process(req: IncomingMessage, res: ServerResponse, next?: any): void;
        execute(url: any, method: any, body: any, headers: any): Response;
        autoreload(httpServer?: net.Server): void;
        done(fn: any): void;
        fail(fn: any): void;
        listen(): any;
        listen(port: number): any;
        listen(server: net.Server | {
            listen: Function;
        }): any;
        getSubApp(path: any): any;
        static current: Application;
        static on: any;
        static off: any;
        static once: any;
        static trigger: any;
        static Config: typeof Config;
        static clean(): typeof Application;
        static create(config: IApplicationConfig): Promise<Application>;
    }
    export function respond_Raw(app: any, req: any, res: any): void;
    export default Application;
}

declare module 'atma-server/HttpApplication/SubApp' {
    import Application from 'atma-server/HttpApplication/Application';
    import { IApplicationDefinition } from 'atma-server/HttpApplication/IApplicationConfig';
    import { IncomingMessage, ServerResponse } from 'http';
    import { class_Dfr } from 'atma-utils';
    export default class HttpSubApplication extends class_Dfr {
        status: string;
        app_: Application;
        path_: string;
        dfr: any;
        constructor(path: any, mix: Application | string | (IApplicationDefinition & {
            controller: string;
        }), parentApp: any);
        process(req: IncomingMessage, res: ServerResponse): void;
        handle(req: IncomingMessage, res: ServerResponse): void;
        execute(req: any, res: any): void;
    }
}

declare module 'atma-server/HttpService/CrudWrapper' {
    const _default: {
        Single: (name: any, Ctor: any) => {};
        Collection: (name: any, Ctor: any) => {};
    };
    export default _default;
}

declare module 'atma-server/HttpService/HttpService' {
    export default function HttpService(mix: any, ...params: any[]): any;
}

declare module 'atma-server/HttpService/HttpEndpoint' {
    import { RouteCollection } from 'ruta/route/RouteCollection'; 
     import { IApiMeta } from 'atma-server/HttpService/HttpEndpointExplorer'; 
     /// <reference types="node" />
    import { IncomingMessage, ServerResponse } from 'http';
    import { class_Dfr } from 'atma-utils';
    import { HttpResponse, IHttpHandler } from 'atma-server/IHttpHandler';
    import { IHttpEndpointRutaCollection, IHttpEndpointMeta, IHttpEndpointMethod } from 'atma-server/HttpService/HttpEndpointModels';
    import { HttpEndpointDecos } from 'atma-server/HttpService/HttpEndpointDecos';
    import { Types } from 'atma-server/HttpService/HttpEndpointParamUtils';
    import Application from 'atma-server/HttpApplication/Application';
    export abstract class HttpEndpoint {
            app: Application;
            static route: typeof HttpEndpointDecos.route;
            static origin: typeof HttpEndpointDecos.origin;
            static middleware: typeof HttpEndpointDecos.middleware;
            static isAuthorized: typeof HttpEndpointDecos.isAuthorized;
            static isInRole: typeof HttpEndpointDecos.isInRole;
            static hasClaim: typeof HttpEndpointDecos.hasClaim;
            static fromUri: typeof HttpEndpointDecos.fromUri;
            static fromBody: typeof HttpEndpointDecos.fromBody;
            static response: typeof HttpEndpointDecos.response;
            static description: typeof HttpEndpointDecos.description;
            static createDecorator: typeof HttpEndpointDecos.createDecorator;
            static Types: typeof Types;
            protected rootCharCount: number;
            protected dfr: class_Dfr;
            routes: IHttpEndpointRutaCollection;
            meta?: IHttpEndpointMeta;
            ruta?: {
                    [path: string]: IHttpEndpointMethod;
            };
            constructor(route: {
                    path: string[];
            }, app: Application);
            process(req: IncomingMessage & {
                    body?: any;
            }, res: ServerResponse): Promise<any> | void;
            resolve(...args: any[]): void;
            reject(error: any): void;
    }
    export namespace HttpEndpointUtils {
            function onComplete(path: string, req: IncomingMessage, res: ServerResponse, endpoint: HttpEndpoint, endpointMethod: IHttpEndpointMethod, promise: class_Dfr, mix: any | HttpResponse, statusCode?: number, mimeType?: string, headers?: any): void;
            function getHelpModel(service: HttpEndpoint): IApiMeta;
            function getCorsHeaders(req: IncomingMessage, handler: IHttpHandler): {
                    'Access-Control-Allow-Methods': string[];
                    'Access-Control-Allow-Credentials': string;
                    'Access-Control-Allow-Headers': string | string[];
                    'Access-Control-Allow-Origin': string;
            };
            function getOptionsHeaders(endpoint: HttpEndpoint, path: string, req: IncomingMessage): {};
    }
    export namespace RouteUtils {
            function resolveFromType(endpoint: HttpEndpoint): RouteCollection;
            function resolveFromProto(prototype: any): RouteCollection;
    }
}

declare module 'atma-server/middleware/export' {
    import { QueryMidd } from 'atma-server/middleware/query';
    import { StaticMidd, createStaticMidd } from 'atma-server/middleware/static';
    const _default: {
        query: typeof QueryMidd;
        static: typeof StaticMidd;
        files: typeof createStaticMidd;
    };
    export default _default;
}

declare module 'atma-server/HttpService/HttpEndpointDecos' {
    import { IHttpEndpointMeta, IHttpEndpointMethod, IHttpEndpointMethodArgOptions, IHttpEndpointMethodMetaResponse, IHttpParamContstructor } from 'atma-server/HttpService/HttpEndpointModels';
    export namespace HttpEndpointDecos {
        export function middleware(fn: (req: any, res?: any, params?: any) => Promise<any> | any | void): (target: any, propertyKey: any, descriptor: any) => any;
        export function isAuthorized(): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function isInRole(...roles: string[]): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function hasClaim(...claims: string[]): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function origin(origin: string): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function route(route: string): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function description(txt: string): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function response(response: IHttpEndpointMethodMetaResponse): (target: any, propertyKey?: any, descriptor?: any) => any;
        export function fromUri(): any;
        export function fromUri(name: string, Type?: IHttpParamContstructor): any;
        export function fromUri(opts: IHttpEndpointMethodArgOptions): any;
        export function fromBody(): any;
        export function fromBody(Type: Function): any;
        export function fromBody(opts: IHttpEndpointMethodArgOptions): any;
        interface ICreateDecorator {
            forCtor(Ctor: Function, meta: IHttpEndpointMeta): Function | void;
            forMethod(Proto: any, method: IHttpEndpointMethod): IHttpEndpointMethod | void;
        }
        export function createDecorator(opts: ICreateDecorator): (target: any, propertyKey?: any, descriptor?: any) => any;
        export {};
    }
}

declare module 'atma-server/HttpApplication/LifecycleEvents' {
    import { ServerResponse, IncomingMessage } from 'http';
    export type EventType = 'AppStart' | 'HandlerSuccess' | 'HandlerError' | 'Error';
    const LifecycleEvents_base: any;
    export class LifecycleEvents extends LifecycleEvents_base {
        static Instance: LifecycleEvents;
        on(event: EventType, cb: (event: LifecycleEvent, req?: IncomingMessage, res?: ServerResponse) => void): any;
        emit(event: EventType, ...args: any[]): any;
        emitEvent(event: LifecycleEvent, req?: any, res?: any): void;
        completeAppStart(start: number): void;
        completeHandlerSuccess(start: number, req: IncomingMessage & {
            user?: {
                email: string;
            };
        }, res: ServerResponse): void;
        completeHandlerError(start: number, req: IncomingMessage & {
            user?: {
                email: string;
            };
        }, res: ServerResponse, error: Error): void;
        emitError(error: Error, req?: IncomingMessage & {
            user?: {
                email: string;
            };
        }): void;
    }
    export class LifecycleSpan {
        start: number;
        end: number;
        constructor();
    }
    export class LifecycleEvent {
        time: number;
        type: EventType;
        message: string;
        user: string;
        ip: string;
        method: string;
        url: string;
        status: number;
        error: Error;
        /** Do NOT create event objects to prevent GC */
        define(type: EventType, time: number, message: string, method?: string, url?: string, status?: number, error?: Error, user?: string, ip?: string): void;
    }
    export {};
}

declare module 'atma-server/HttpApplication/IApplicationConfig' {
    import { IHttpHandlerConstructor } from 'atma-server/IHttpHandler';
    export interface IApplicationDefinition {
        base?: string;
        args?: {
            [key: string]: string;
        };
        disablePackageJson?: boolean;
        config?: IApplicationConfig;
        configs?: string | string[];
    }
    export interface IApplicationConfig {
        base?: string;
        static?: string;
        debug?: boolean;
        env?: {
            both?: {
                include?: {
                    cfg: any;
                };
                /** include routes */
                routes?: {
                    [name: string]: string;
                };
                scripts?: string | string[];
                imports?: {
                    [name: string]: string | string[] | {
                        [name: string]: string | string[];
                    };
                };
            };
            client?: {
                include?: {
                    cfg?: any;
                    src?: string;
                };
                mask?: {
                    cfg?: any;
                    src?: string;
                };
                scripts?: string | string[] | {
                    npm: string[];
                };
                styles?: string | string[] | {
                    npm: string[];
                };
                routes?: {
                    [name: string]: string;
                };
                imports?: {
                    [name: string]: string | string[] | {
                        [name: string]: string | string[];
                    };
                };
            };
            server?: {
                routes?: {
                    [name: string]: string;
                };
                scripts?: string[] | {
                    npm: string[];
                };
                imports?: {
                    [name: string]: string | string[] | {
                        [name: string]: string | string[];
                    };
                };
            };
        };
        handler?: {
            location?: string;
        };
        handlers?: {
            /** regex pattern : Path to the controllers script file */
            [urlPattern: string]: string;
        };
        page?: IPageConfiguration;
        pages?: {
            [urlPattern: string]: {
                id?: string;
                title?: string;
                rewrite?: string;
                controller?: string | any;
                scripts?: string | string[];
                styles?: string | string[];
            };
        };
        service?: {
            location?: string;
            endpoints?: string | string[];
        };
        services?: {
            /** regex pattern : Path to the controllers script file */
            [urlPattern: string]: string | IHttpHandlerConstructor;
        };
        subapp?: {};
        subapps?: {
            [urlPattern: string]: string | (IApplicationDefinition & {
                controller: string;
            });
        };
        websocket?: {};
        websockets?: {};
        rewriteRules?: Array<{
            rule: string;
            conditions: Array<{
                condition: string;
            }>;
        }>;
        redirectRules?: Array<{
            rule: string;
            conditions: Array<{
                condition: string;
            }>;
        }>;
        disablePackageJson?: boolean;
        buildDirectory?: string;
        configs?: string | string[];
        config?: IApplicationConfig;
        sources?: object[];
        include?: {
            src?: string;
        };
    }
    export interface IPageConfiguration {
        location?: {
            controller?: string;
            template?: string;
            master?: string;
            viewTemplate?: string;
            viewController?: string;
            viewStyle?: string;
            pageFiles?: string;
        };
        extension?: {
            javascript?: string;
            style?: string;
            template?: string;
        };
        index?: {
            template?: string;
            master?: string;
        };
        urls?: {
            [key: string]: string;
        };
        pattern?: string;
        errors?: {
            [statusCode: string]: {
                masterPath: string;
                templatePath: string;
            };
        };
    }
    export interface IAppConfigExtended {
        $get(path: string): any;
        $getController(data: IPageConfiguration): any;
        $getImports(type: 'server' | 'client' | 'both'): {
            path: string;
            type: 'mask' | 'script' | 'css' | 'html';
        }[];
        projects: {
            [name: string]: {
                attach(Application: any): any;
            };
        };
    }
}

declare module 'atma-server/HttpPage/HttpPageBase' {
    import Application from 'atma-server/HttpApplication/Application';
    import { class_Dfr } from 'atma-utils';
    import HttpContext from 'atma-server/HttpPage/HttpContext';
    export default abstract class HttpPageBase extends class_Dfr {
        route: any;
        app: Application;
        data: {
            id: string;
            env: {
                both: any;
                server: any;
                client: any;
            };
            redirect: string;
            rewrite: string;
            secure: boolean | {
                role: string;
            };
        };
        pattern: string;
        isHtmlPage: boolean;
        template: string;
        master: string;
        ctx: HttpContext;
        templatePath: string;
        masterPath: string;
        location: string;
        query: any;
        model: any;
        compoPath: string;
        resource: any;
        nodes: any;
        middleware: any;
        onRenderStart: Function;
        constructor(route: any, app: Application);
        getScripts(config: any): any;
        getStyles(config: any): any;
        abstract _load(): any;
    }
}

declare module 'atma-server/HttpApplication/Message' {
    import { Statics } from 'atma-utils'; 
     /// <reference types="node" />
    import { class_Dfr, class_EventEmitter } from 'atma-utils';
    export class Request {
            url: string;
            method: string;
            body: any;
            headers: any;
            constructor(url: any, method: any, body: any, headers: any);
    }
    const Response_base: Statics<typeof class_EventEmitter> & Statics<typeof class_Dfr> & (new () => class_EventEmitter<Record<string | number | symbol, (...args: any) => any>> & class_Dfr);
    export class Response extends Response_base {
            writable: boolean;
            finished: boolean;
            statusCode: number;
            body: string | any[];
            headers: any;
            resolve(body: string | Buffer | any, code?: number, mimeType?: string, headers?: any): this;
            reject(error: any, code?: number): this;
            writeHead(code: number, reason: string, headers: any): any;
            writeHead(code: number, headers: any): any;
            setHeader(): void;
            end(content: any): void;
            write(content: any): void;
    }
    export {};
}

declare module 'atma-server/WebSocket' {
    import Application from 'atma-server/HttpApplication/Application';
    export default class WebSocket {
        app: Application;
        SocketListeners: {};
        io: any;
        ioSsl: any;
        constructor(app: Application);
        listen(httpServer: any): void;
        listenSsl(httpsServer: any): void;
        hasHandlers(): boolean;
        getHandler(namespace: any): any;
        registerHandler(namespace: any, Handler: any): void;
        clients(namespace: any): any[];
        emit(namespace: any, ...args: any[]): void;
    }
}

declare module 'atma-server/Config/Config' {
    import { IApplicationConfig } from 'atma-server/HttpApplication/IApplicationConfig';
    export default function Config(params: IApplicationConfig, app?: any, done?: any, fail?: any): any;
}

declare module 'atma-server/Business/Middleware' {
    export default class MiddlewareRunner {
        arr: Function[];
        constructor(arr: Function[]);
        process(req: any, res: any, callback: any, config: any): void;
        add(mix: any): this;
        static create(arr: any): MiddlewareRunner;
    }
}

declare module 'atma-server/HttpRewrites/HttpRewriter' {
    import { IncomingMessage, ServerResponse } from 'http';
    export default class Rewriter {
        rules: Rule[];
        addRules(rules: IRuleDefinition[]): void;
        rewrite(req: IncomingMessage): void;
        redirect(req: IncomingMessage, res: ServerResponse): boolean;
    }
    export interface IRuleDefinition {
        rule: string;
        conditions?: IRuleConditionDefinition[];
    }
    export interface IRuleConditionDefinition {
        condition: string;
    }
    export class Rule {
        rewriter: string;
        matcher: RegExp;
        constructor(cond: IRuleDefinition);
        rewrite(req: IncomingMessage): boolean;
        redirect(req: IncomingMessage): string;
    }
    export class RuleCondition {
        textParts: string[];
        matcher: RegExp;
        constructor(cond: IRuleConditionDefinition);
        isMatch(req: any): boolean;
        static resolvers: {
            REMOTE_ADDR(req: IncomingMessage): string;
            REMOTE_HOST(req: IncomingMessage): string;
            SERVER_ADDR(req: IncomingMessage): string;
        };
    }
}

declare module 'atma-server/HttpService/HttpEndpointExplorer' {
    import { HttpEndpoint } from 'atma-server/HttpService/HttpEndpoint';
    export interface IApiMeta {
        path: string;
        description: string;
        paths: IApiRouteMeta[];
    }
    interface IApiRouteMeta {
        path: string;
        description: string;
        method: 'get' | 'post' | 'put' | 'option' | 'patch';
        operationId: string;
        security?: {
            authorized: boolean;
            claims?: string[];
            roles?: string[];
        };
        parameters: IApiRouteParameterMeta[];
        responses: IApiRouteResponseMeta[];
    }
    interface IApiRouteParameterMeta {
        name: string;
        in: 'query' | 'body';
        description: string;
        required: boolean;
        schema: any;
    }
    interface IApiRouteResponseMeta {
        statusCode: number;
        description: string;
        schema: any;
    }
    export namespace HttpEndpointExplorer {
        function getMeta<T extends (new (...args: any[]) => HttpEndpoint)>(Type: T): IApiMeta;
        function find(path: string | string[], base?: string): Promise<{
            [urlPattern: string]: string;
        }>;
    }
    export {};
}

declare module 'atma-server/HttpService/HttpEndpointModels' {
    import { IncomingMessage, ServerResponse } from 'http';
    import { Collection } from 'ruta';
    export interface IHttpEndpointMiddleware {
        (req: IncomingMessage, res: ServerResponse, params: any): void | any | Promise<any>;
    }
    export interface IHttpEndpointMeta {
        path?: string;
        description?: string;
        headers?: any;
        origins?: string;
        secure?: boolean | {
            roles?: string[];
            claims?: string[];
        };
        endpointsParams?: {
            [method: string]: IHttpEndpointMethodArgMeta[];
        };
    }
    export type IHttpParamContstructor<T = any> = (new (x?: any) => T) | ((x?: any) => T);
    export interface IHttpEndpointMethodArgOptions<T = any> {
        Type?: IHttpParamContstructor;
        ArrayType?: Function;
        name?: string;
        optional?: boolean;
        default?: T;
        validate?: (val: any) => string;
    }
    export interface IHttpEndpointMethodArgMeta {
        Type?: any;
        from: 'uri' | 'body';
        name?: string;
        description?: string;
        default?: any;
        optional?: boolean;
        validate?: (val: any) => string;
    }
    export interface IHttpEndpointMethodMeta {
        path?: string;
        headers?: any;
        origins?: string;
        description?: string;
        arguments?: any;
        response?: any;
        responses?: IHttpEndpointMethodMetaResponse[];
        strict?: boolean;
        secure?: boolean | {
            roles?: string[];
            claims?: string[];
        };
        params?: IHttpEndpointMethodArgMeta[];
    }
    export interface IHttpEndpointMethod {
        key?: string;
        meta?: IHttpEndpointMethodMeta;
        process: IHttpEndpointMiddleware;
    }
    export interface IHttpEndpointMethodMetaResponse {
        status?: number;
        Type?: any;
        description?: string;
    }
    export interface IHttpEndpointRutaItem {
        definition: string;
        current: {
            params: {
                [query: string]: string;
            };
        };
        value: IHttpEndpointMethod;
    }
    export type IHttpEndpointRutaCollection = InstanceType<typeof Collection>;
}

declare module 'atma-server/HttpService/HttpEndpointParamUtils' {
    import { IHttpEndpointMethodArgMeta } from 'atma-server/HttpService/HttpEndpointModels';
    import { Serializable } from 'class-json';
    import { IServerRequest } from 'atma-server/models/IServerRequest';
    export namespace Types {
        class ArrayOfString {
        }
        class ArrayOfNumber {
        }
        function ArrayOf(Type: any): ArrayOfInner;
        class Json extends Serializable<Json> {
        }
    }
    class ArrayOfInner {
        Type: any;
        constructor(Type: any);
    }
    export namespace HttpEndpointParamUtils {
        function resolveParam(req: IServerRequest, params: any, meta: IHttpEndpointMethodArgMeta): any;
    }
    export {};
}

declare module 'atma-server/HttpPage/HttpContext' {
    export default class HttpContext {
        page: any;
        config: any;
        req: any;
        res: any;
        _rewrite: string;
        _redirect: string;
        debug?: boolean | {
            breakOn?: string;
        };
        constructor(page: any, config: any, req: any, res: any);
        redirect(url: any, code?: number): void;
        rewrite(url: any): void;
    }
}

declare module 'atma-server/models/IServerRequest' {
    import http from 'http';
    export interface IServerRequest extends http.IncomingMessage {
        body?: any;
        files?: any;
        user?: any;
        session?: any;
    }
}

