import { is_Object } from 'atma-utils'
import { ServerResponse, IncomingMessage } from 'http';
import { mime_HTML, mime_JSON } from '../const/mime'
import { HttpErrorUtil, RuntimeError } from '../HttpError/HttpError'
import { cors_ensure } from '../util/cors'
import Application from '../HttpApplication/Application';
import { HttpResponse } from '../IHttpHandler';

export function send_REDIRECT (res: ServerResponse, url: string, code = 302) {
    res.statusCode = code;
    res.setHeader('Location', url);
    res.setHeader('Content-Length', '0');
    res.end();
}

export function send_JSON (req: IncomingMessage, res: ServerResponse, response: HttpResponse, app: Application, startedAt: number) {
    let { content } = response;
    let str;
    try {
        str = JSON.stringify(content);
    } catch (error) {
        return send_Error(req, res, new RuntimeError(`Json Serialization: ${error.message}`), null, app, startedAt);
    }

    response.content = str;
    response.mimeType = mime_JSON;
    send_Content(
        req
        , res
        , response
        , app
        , startedAt
    );
};

export function send_Error (req: IncomingMessage, res: ServerResponse, error, headers, app: Application, startedAt: number) {
    if (error != null && 'toJSON' in error === false) {
        // indirect check if error is the HttpError instance
        error = HttpErrorUtil.create(error);
    }

    let response = new HttpResponse({
        content: JSON.stringify(error),
        statusCode: error.statusCode ?? 500,
        headers: headers,
        mimeType: mime_JSON,
    });
    send_Content(
        req
        , res
        , response
        , app
        , startedAt
        , error
    );
};

export function send_Content (
    req: IncomingMessage,
    res: ServerResponse,
    response: HttpResponse,
    app: Application,
    startedAt: number,
    error?
) {

    let { content, statusCode, mimeType, headers } = response;
    if (typeof content !== 'string' && content instanceof Buffer === false) {

        if (content instanceof Error) {
            send_Error(req, res, content, headers, app, startedAt);
            return;
        }

        if (is_Object(content)) {
            send_JSON(req, res, response, app, startedAt);
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
