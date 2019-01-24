import { is_Object } from 'atma-utils'
import { ServerResponse, IncomingMessage } from 'http';
import { mime_HTML, mime_JSON } from '../const/mime'
import { HttpError, RuntimeError } from '../HttpError/HttpError'
import { cors_ensure } from '../util/cors'

export const send_JSON = function(req: IncomingMessage, res: ServerResponse, json, statusCode, headers){
	
	var text;
	try {
		text = JSON.stringify(json);
	}catch(error){
		return send_Error(req, res,new RuntimeError('Json Serialization'));
	}
	
	send_Content(req, res, text, statusCode || 200, mime_JSON, headers);
};

export const send_Error = function(req: IncomingMessage, res: ServerResponse, error, headers?){
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
	);
};

export const send_Content = function(req: IncomingMessage, res: ServerResponse, content, statusCode, mimeType, headers?) {
	
	if (typeof content !== 'string' && content instanceof Buffer === false) {
		
		if (is_Object(content)) {
			send_JSON(req, res, content, statusCode, headers);
			return;
		}
		
		if (content instanceof Error) {
			send_Error(req, res,content, headers);
			return;
		}
		
		send_Error(req, res, new RuntimeError('Unexpected content response'), headers);
		return;
	}	
	
	res.setHeader('Content-Type', mimeType || mime_HTML);
	res.statusCode = statusCode || 200;
	
	if (headers != null) {
        cors_ensure(req, headers)        
		for (var key in headers) {
            if (key === 'Content-Type' && mimeType != null) {
                continue;
            }
			res.setHeader(key, headers[key]);
		}
	}
	
	res.end(content);
};
