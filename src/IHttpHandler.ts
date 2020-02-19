import { IncomingMessage, ServerResponse } from 'http'
import { Class } from './dependency'
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
    }
	process (req: IncomingMessage, res: ServerResponse, config?: IApplicationConfig): void | PromiseLike<any | HttpResponse>
    send? (req, res, content, statusCode, mimeType, allHeaders)
};

export class HttpResponse {
    content: string | Buffer | any
    statucCode: number
    mimeType: string
    headers: { [key: string]: string }

    constructor (json?: Partial<HttpResponse>) {
        if (json != null) {
            Object.assign(this, json);
        }
    }
}