import { is_Object } from 'atma-utils'
import { ServerResponse, IncomingMessage } from 'http';
import { mime_HTML, mime_JSON } from '../const/mime'
import { HttpError, RuntimeError } from '../HttpError/HttpError'
import { cors_ensure } from '../util/cors'
import Application from '../HttpApplication/Application';

export function send_JSON (req: IncomingMessage, res: ServerResponse, json, statusCode, headers, app: Application, startedAt: number) {
    let str;
    try {
        str = JSON.stringify(json);
    } catch (error) {
        return send_Error(req, res, new RuntimeError(`Json Serialization: ${error.message}`), null, app, startedAt);
    }
    send_Content(req, res, str, statusCode || 200, mime_JSON, headers, app, startedAt);
};

export function send_Error (req: IncomingMessage, res: ServerResponse, error, headers, app: Application, startedAt: number) {
    if (error instanceof HttpError === false) {
        error = (<any>HttpError).create(error);
    }

    send_Content(
        req,
        res
        , JSON.stringify(error)
        , error.statusCode || 500
        , mime_JSON
        , headers
        , app
        , startedAt
        , error
    );
};

export function send_Content (
    req: IncomingMessage,
    res: ServerResponse,
    content: string | Buffer | any | Error,
    statusCode: number,
    mimeType,
    headers,
    app: Application,
    startedAt: number,
    error?
) {

    if (typeof content !== 'string' && content instanceof Buffer === false) {

        if (is_Object(content)) {
            send_JSON(req, res, content, statusCode, headers, app, startedAt);
            return;
        }

        if (content instanceof Error) {
            send_Error(req, res, content, headers, app, startedAt);
            return;
        }

        send_Error(req, res, new RuntimeError('Unexpected content response'), headers, app, startedAt);
        return;
    }

    res.setHeader('Content-Type', mimeType || mime_HTML);
    res.statusCode = statusCode ?? 200;

    if (headers != null) {
        cors_ensure(req, headers)
        for (var key in headers) {
            if (key === 'Content-Type' && mimeType != null) {
                continue;
            }
            res.setHeader(key, headers[key]);
        }
    }
    if (app != null) {
        if (res.statusCode < 400) {
            app?.lifecycle.completeHandlerSuccess(startedAt, req, res);
        } else {
            if (error == null && typeof content === 'string') {
                error = new Error(`Undefined error: ${content.substring(0, 400)}`);
            }
            app?.lifecycle.completeHandlerError(startedAt, req, res, error);
        }
    }
    res.end(content);
};
