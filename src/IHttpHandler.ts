import { class_Dfr } from 'atma-utils'
import { IncomingMessage, ServerResponse } from 'http'
import { IApplicationConfig } from './HttpApplication/IApplicationConfig'

export interface IHttpHandlerDef {
    controller: string | IHttpHandler
}
export interface IHttpHandlerConstructor {
    new (...args): IHttpHandler
}

export interface IHttpHandler {
    meta?: {
        headers?: { [key: string]: string }
        origins?: string
    }
    process (req: IncomingMessage, res: ServerResponse, config?: IApplicationConfig): void | PromiseLike<any | HttpResponse>
    send? (req, res, content, statusCode, mimeType, allHeaders)
    sendError? (error, req, res, config)
    then? (ok, error)
    resolve?
    reject?
};

export class HttpResponse {
    content: string | Buffer | Error | ReadableStream | any
    statusCode: number
    mimeType: string
    headers: { [key: string]: string }

    constructor (json?: Partial<HttpResponse>) {
        if (json != null) {
            Object.assign(this, json);
        }
    }

    static ensure (result: string | Buffer | ReadableStream | HttpResponse | Error | any, statusCode?: number) {
        if (result instanceof HttpResponse) {
            if (result.statusCode == null) {
                result.statusCode = 200;
            }
            return result;
        }
        if (result instanceof Error) {
            return new HttpResponse({
                content: result,
                statusCode: statusCode ?? 500
            });
        }
        return new HttpResponse({
            content: result,
            statusCode: 200
        });
    }
    static pipe(dfr: class_Dfr, result: HttpResponse['content'] | HttpResponse) {
        if (typeof result.then === 'function') {
            result.then(
                x => {
                    dfr.resolve(HttpResponse.ensure(x))
                },
                err => {
                    dfr.reject(HttpResponse.ensure(err))
                },
            );
            return;
        }
        dfr.resolve(HttpResponse.ensure(result));
    }
}
