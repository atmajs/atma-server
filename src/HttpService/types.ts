import { HttpError } from '../HttpError/HttpError';
import { IHttpHandler } from '../IHttpHandler';

type THttpProcessFn = (this: IHttpHandler, req, res, params, next) => void | HttpError | Promise<void | HttpError>;

export type THttpServiceEndpoint = THttpProcessFn | {
    meta?: {
        description?: string
        arguments: Record<string, any>
    }
    process: THttpProcessFn | THttpProcessFn[]
}

export type THttpServiceDefinition = Record<string, THttpServiceEndpoint>;
