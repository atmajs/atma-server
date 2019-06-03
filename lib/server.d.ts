// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../http
//   ../net
//   ../atma-class
//   ../atma-logger
//   ../atma-utils

declare module 'atma-server' {
    import { HttpError, NotFoundError, RequestError, RuntimeError, SecurityError } from 'atma-server/HttpError/HttpError';
    import { IHttpHandler, HttpResponse } from 'atma-server/IHttpHandler';
    import HandlerFactory from 'atma-server/HandlerFactory';
    import HttpErrorPage from 'atma-server/HttpPage/HttpErrorPage';
    import HttpPage from 'atma-server/HttpPage/HttpPage';
    import Application from 'atma-server/HttpApplication/Application';
    import HttpSubApplication from 'atma-server/HttpApplication/SubApp';
    import HttpCrudEndpoints from 'atma-server/HttpService/CrudWrapper';
    import HttpService from 'atma-server/HttpService/HttpService';
    export { HttpError, NotFoundError, RequestError, RuntimeError, SecurityError, Application, HttpSubApplication, HttpErrorPage, HttpPage, HandlerFactory, HttpCrudEndpoints, HttpService, IHttpHandler, HttpResponse };
    export const middleware: {
        query: (req: any, res: any, next: any) => void;
        static: (req: any, res: any, next: any, config: any) => void;
    };
    export const clean: typeof Application.clean;
    export const StaticContent: any;
}

declare module 'atma-server/HttpError/HttpError' {
    export const HttpError: any;
    export const RequestError: any;
    export const SecurityError: any;
    export const NotFoundError: any;
    export const RuntimeError: any;
}

declare module 'atma-server/IHttpHandler' {
    import { Class } from 'atma-server/dependency';
    import { IncomingMessage, ServerResponse } from 'http';
    import { IApplicationConfig } from 'atma-server/HttpApplication/IApplicationConfig';
    export interface IHttpHandler {
        meta?: {
            headers?: {
                [key: string]: string;
            };
        };
        process(req: IncomingMessage, res: ServerResponse, config?: IApplicationConfig): Class.DeferredLike;
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
    import { IHttpHandler } from 'atma-server/IHttpHandler';
    export default class HandlerFactory {
        app: Application;
        subapps: any;
        handlers: any;
        services: any;
        pages: any;
        constructor(app: Application);
        registerPages(pages_: any, pageCfg: any): this;
        registerHandlers(routes: any, handlerCfg: any): this;
        registerHandler(path: any, handler: any, handlerCfg: any): void;
        registerSubApps(routes: any, subAppCfg: any): this;
        registerSubApp(name: any, data: any, subAppCfg: any): void;
        registerServices(routes: any, serviceCfg: any): this;
        registerService(path: any, service: any, serviceCfg: any): void;
        registerWebsockets(routes: any): this;
        registerWebsocket(namespace: any, handler: any, handlerCfg?: any): void;
        get(app: any, req: any, callback: any): void;
        has(url: any, method: any): boolean;
        static Handlers: {
            [name: string]: new (...args) => IHttpHandler;
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
        static create(mix: any): new (...args: any[]) => any;
    }
}

declare module 'atma-server/HttpApplication/Application' {
    import { Class } from 'atma-server/dependency';
    import Config from 'atma-server/Config/Config';
    import { IApplicationDefinition, IApplicationConfig, IAppConfigExtended } from 'atma-server/HttpApplication/IApplicationConfig';
    import HttpRewriter from 'atma-server/HttpRewrites/HttpRewriter';
    import { ServerResponse, IncomingMessage } from 'http';
    import * as net from 'net';
    class Application extends Class.Deferred {
        isRoot: boolean;
        isHttpsForced: boolean;
        handlers: any;
        _server: net.Server;
        _sslServer: net.Server;
        _innerPipe: any;
        _outerPipe: any;
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
        execute(url: any, method: any, body: any, headers: any): {
            Extends: any;
            writable: boolean;
            finished: boolean;
            statusCode: any;
            Construct: () => void;
            Override: {
                resolve: (body: any, code: any, mimeType: any, headers: any) => void;
                reject: (error: any, code: any) => void;
            };
            writeHead: (code: any) => void;
            setHeader: () => void;
            end: (content: any) => void;
            write: (content: any) => void;
        };
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
    import { Class } from 'atma-server/dependency';
    import Application from 'atma-server/HttpApplication/Application';
    import { IApplicationDefinition } from 'atma-server/HttpApplication/IApplicationConfig';
    import { IncomingMessage, ServerResponse } from 'http';
    export default class HttpSubApplication extends Class.Deferred {
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
    export default function HttpService(mix: any, ...params: any[]): new (...args: any[]) => any;
}

declare module 'atma-server/dependency' {
    import Class = require('atma-class');
    import logger = require('atma-logger');
    import Utils = require('atma-utils');
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
    export { Class, logger };
}

declare module 'atma-server/HttpApplication/IApplicationConfig' {
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
                scripts?: string[];
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
                scripts?: string[];
                styles?: string[];
                routes: {
                    [name: string]: string;
                };
            };
            server?: {
                routes?: {
                    [name: string]: string;
                };
                scripts?: string[];
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
            };
        };
        service?: {
            location?: string;
        };
        services?: {
            /** regex pattern : Path to the controllers script file */
            [urlPattern: string]: string;
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
        config?: object;
        sources?: object[];
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
                attach(Application);
            };
        };
    }
}

declare module 'atma-server/HttpPage/HttpPageBase' {
    import { Class } from 'atma-server/dependency';
    import Application from 'atma-server/HttpApplication/Application';
    export default class HttpPageBase extends Class.Deferred {
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
    export default function Config(params: IApplicationConfig, app: any, done: any, fail: any): any;
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

