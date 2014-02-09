var send_JSON,
	send_Error,
	send_Content
	;
	
(function(){
	
	send_JSON = function(res, json, headers){
		
		try {
			
			var text = JSON.stringify(json);
		}catch(error){
			
			return send_Error(res, RuntimeError('Json Serialization'));
		}
		
		send_Content(res, text, 200, mime_JSON, headers);
	};
	
	send_Error = function(res, error, headers){
		
		var text = JSON.stringify({
			error: error.toString(),
			stack: error.stack
		});
		
		send_Content(res, text, error.statusCode || 500, mime_JSON, headers);
	};
	
	
	
	send_Content = function(res, content, statusCode, mimeType, headers) {
		
		if (typeof content !== 'string' && content instanceof Buffer === false) {
			
			if (is_Object(content)) {
				send_JSON(res, content, headers);
				return;
			}
			
			if (content instanceof Error) {
				send_Error(res, content, headers);
				return;
			}
			
			send_Error(res, RuntimeError('Unexpected content response'));
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
	
	
}());