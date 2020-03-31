// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../http
//   ../net
//   ../atma-utils
//   ../atma-logger
//   ../appcfg
//   ../class-json

declare module 'atma-server' {
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
}

declare module 'atma-server/middleware/query' {
    export function QueryMidd(req: any, res: any, next: any): void;
}

declare module 'atma-server/HttpError/HttpError' {
    export const HttpError: IHttpErrorConstructor;
    export const RequestError: IHttpErrorConstructor;
    export const SecurityError: IHttpErrorConstructor;
    export const NotFoundError: IHttpErrorConstructor;
    export const RuntimeError: IHttpErrorConstructor;
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
        };
        process(req: IncomingMessage, res: ServerResponse, config?: IApplicationConfig): void | PromiseLike<any | HttpResponse>;
        send?(req: any, res: any, content: any, statusCode: any, mimeType: any, allHeaders: any): any;
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
    import { Routes } from 'atma-server/dependency';
    import { IncomingMessage } from 'http';
    export default class HandlerFactory {
        app: Application;
        subapps: typeof Routes;
        handlers: typeof Routes;
        services: typeof Routes;
        pages: typeof Routes;
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
    import HandlerFactory from 'atma-server/HandlerFactory';
    import Config from 'atma-server/Config/Config';
    import MiddlewareRunner from 'atma-server/Business/Middleware';
    import { IApplicationDefinition, IApplicationConfig, IAppConfigExtended } from 'atma-server/HttpApplication/IApplicationConfig';
    import HttpRewriter from 'atma-server/HttpRewrites/HttpRewriter';
    import { ServerResponse, IncomingMessage } from 'http';
    import * as net from 'net';
    import { class_Dfr } from 'atma-utils';
    import { LifecycleEvents } from 'atma-server/HttpApplication/LifecycleEvents';
    class Application extends class_Dfr {
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
        lib: any;
        webSockets: any;
        config: IAppConfigExtended & IApplicationConfig;
        args: {
            [key: string]: string;
        };
        _baseConfig: IApplicationConfig;
        rewriter: HttpRewriter;
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
        execute(url: any, method: any, body: any, headers: any): any;
        autoreload(httpServer?: any): void;
        listen(): net.Server;
        getSubApp(path: any): any;
        static current: Application;
        static on: any;
        static off: any;
        static once: any;
        static trigger: any;
        static Config: typeof Config;
        static clean(): typeof Application;
        static create(config: IApplicationConfig): Application;
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
    import { IncomingMessage, ServerResponse } from 'http';
    import { class_Dfr } from 'atma-utils';
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
    export namespace RouteUtils {
        function resolveFromType(endpoint: HttpEndpoint): any;
        function resolveFromProto(prototype: any): any;
    }
}

declare module 'atma-server/middleware/export' {
    import { QueryMidd } from 'atma-server/middleware/query';
    import { StaticMidd } from 'atma-server/middleware/static';
    const _default: {
        query: typeof QueryMidd;
        static: typeof StaticMidd;
    };
    export default _default;
}

declare module 'atma-server/HttpService/HttpEndpointDecos' {
    import { IHttpEndpointMeta, IHttpEndpointMethod, IHttpEndpointMethodArgOptions, IHttpEndpointMethodMetaResponse } from 'atma-server/HttpService/HttpEndpointModels';
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
        export function fromUri(name: string, Type?: Function): any;
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
    import { class_EventEmitter } from 'atma-utils';
    import { ServerResponse, IncomingMessage } from 'http';
    export type EventType = 'AppStart' | 'HandlerSuccess' | 'HandlerError' | 'Error';
    export class LifecycleEvents extends class_EventEmitter {
        static Instance: LifecycleEvents;
        on(event: EventType, cb: (event: LifecycleEvent, req?: IncomingMessage, res?: ServerResponse) => void): this;
        emit(event: EventType, ...args: any[]): this;
        emitEvent(event: LifecycleEvent, req?: any, res?: any): void;
        completeAppStart(start: number): void;
        completeHandlerSuccess(start: number, req: IncomingMessage, res: ServerResponse): void;
        completeHandlerError(start: number, req: IncomingMessage, res: ServerResponse, error: Error): void;
        emitError(error: Error, req?: IncomingMessage): void;
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
        url: string;
        status: number;
        error: Error;
        /** Do NOT create event objects to prevent GC */
        define(type: EventType, time: number, message: string, url?: string, status?: number, error?: Error, user?: string): void;
    }
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
            endpoints?: string;
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

declare module 'atma-server/dependency' {
    import logger = require('atma-logger');
    import Utils = require('atma-utils');
    import AppConfig = require('appcfg');
    let $Class: any;
    export const ruta: any;
    export const mask: any;
    export const jmask: any;
    export const Compo: any;
    export const Routes: any;
    export const io: any;
    export const Uri: typeof Utils.class_Uri;
    export const is_String: typeof Utils.is_String, is_Function: typeof Utils.is_Function, is_Array: typeof Utils.is_Array, is_Object: typeof Utils.is_Object;
    export const obj_extend: typeof Utils.obj_extend, obj_extendDefaults: typeof Utils.obj_extendDefaults;
    export const include: any;
    export const includeLib: any;
    export { $Class as Class, AppConfig, logger };
}

declare module 'atma-server/HttpPage/HttpPageBase' {
    import Application from 'atma-server/HttpApplication/Application';
    import { class_Dfr } from 'atma-utils';
    export default class HttpPageBase extends class_Dfr {
        route: any;
        app: Application;
        data: {
            id: any;
            env: any;
        };
        isHtmlPage: boolean;
        template: string;
        master: string;
        ctx: any;
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
    import { IncomingMessage } from 'http';
    export default class Rewriter {
        rules: Rule[];
        addRules(rules: IRuleDefinition[]): void;
        rewrite(req: IncomingMessage): void;
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

declare module 'atma-server/HttpService/HttpEndpointModels' {
    import { IncomingMessage, ServerResponse } from 'http';
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
    export interface IHttpEndpointMethodArgOptions {
        Type: Function;
        name?: string;
        optional?: boolean;
        validate?: (val: any) => string;
    }
    export interface IHttpEndpointMethodArgMeta {
        Type?: any;
        from: 'uri' | 'body';
        name?: string;
        description?: string;
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
    export interface IHttpEndpointRutaCollection {
        routes: IHttpEndpointRutaItem[];
        get(path: string, method?: string): IHttpEndpointRutaItem;
        add(pathDefinition: string, mix: any): any;
    }
}

declare module 'atma-server/HttpService/HttpEndpointParamUtils' {
    import { IHttpEndpointMethodArgMeta } from 'atma-server/HttpService/HttpEndpointModels';
    import { Serializable } from 'class-json';
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
        function resolveParam(req: any, params: any, meta: IHttpEndpointMethodArgMeta): any;
    }
    export {};
}

