import { is_Object } from 'atma-utils'
import { mime_HTML, mime_JSON } from '../const/mime'
import { HttpError, RuntimeError } from '../HttpError/HttpError'

export const send_JSON = function(res, json, statusCode, headers){
	
	var text;
	try {
		text = JSON.stringify(json);
	}catch(error){
		return send_Error(res, new RuntimeError('Json Serialization'));
	}
	
	send_Content(res, text, statusCode || 200, mime_JSON, headers);
};

export const send_Error = function(res, error, headers = null){
	if (error instanceof HttpError === false) {
		error = HttpError.create(error);
	}
	send_Content(
		res
		, JSON.stringify(error)
		, error.statusCode || 500
		, mime_JSON
		, headers
	);
};

export const send_Content = function(res, content, statusCode, mimeType, headers?) {
	
	if (typeof content !== 'string' && content instanceof Buffer === false) {
		
		if (is_Object(content)) {
			send_JSON(res, content, statusCode, headers);
			return;
		}
		
		if (content instanceof Error) {
			send_Error(res, content, headers);
			return;
		}
		
		send_Error(res, new RuntimeError('Unexpected content response'));
		return;
	}	
	
	res.setHeader('Content-Type', mimeType || mime_HTML);
	res.statusCode = statusCode || 200;
	
	if (headers != null) {
		for (var key in headers) {
			res.setHeader(key, headers[key]);
		}
	}
	
	res.end(content);
};
