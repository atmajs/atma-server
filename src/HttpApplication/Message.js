var Message = {};
(function(){
	
	/*
	 * Very basic implementation of ClientRequest and -Response.
	 * Is used when not the socket but direct request is made
	 *
	 * app
	 * 	.execute('service/user/foo', 'get')
	 * 	.done(function(obj:Any))
	 * 	.fail(function(err))
	 */
	
	Message.Request = Class({
		Construct: function(url, method, body, headers){
			this.url = url;
			this.method = (method || 'GET').toUpperCase();
			this.body = body;
			this.headers = headers;
		}
	});
	
	Message.Response = Class({
		Extends: [
			Class.EventEmitter,			
			Class.Deferred
		],
		writable: true,
		finished: false,
		statusCode: null,
		Construct: function(){
			this.body = '';
			this.headers = {};
		},
		Override: {
			resolve: function(body, code, mimeType, headers){
				this.super(
					body || this.body,
					code || this.statusCode || 200,
					mimeType,
					headers || this.headers
				);
			},
			reject: function(error, code){
				this.super(
					error || this.body,
					code || error.statusCode || this.statusCode || 500
				);
			}
		},
		writeHead: function(code){
			if (this.writable === false) 
				return;
			
			var reason, headers;
			if (3 === arguments.length) {
				reason = arguments[1];
				headers = arguments[2];
			}
			if (2 === arguments.length) {
				headers = arguments[1];
			}
			
			this.statusCode = code;
			obj_extend(this.headers, headers);
		},
		end: function(content){
			if (this.finished === true) 
				return;
			
			this.write(content);
			this.finished = true;
			this.writable = false;
			this.resolve(this.body, this.statusCode, null, this.headers)
		},
		/*
		 * support String|Buffer|Object
		 */
		write: function(content){
			if (this.writable === false) 
				return;
			if (content == null) 
				return;
			if (this.body == null) {
				this.body = content;
				return;
			}
			
			if (is_Function(this.body.concat)) {
				this.body = this.body.concat(content);
				return;
			}
			
			this.body = [ this.body, content];
		}
	});
	
}());