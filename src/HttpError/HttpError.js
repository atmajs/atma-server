
var HttpError,
	
	NotFoundError,
	RequestError,
	
	SecurityError,
	
	RuntimeError
	;
	

(function(){
	
	server.HttpError = HttpError = Class({
		Base: Error,
		Construct: function(message, statusCode){
			
			if (this instanceof HttpError === false) 
				return new HttpError(message, statusCode);
			
			this._error = Error(message);
			this.message = message;
			
			if (statusCode != null) 
				this.statusCode = statusCode;
		},
		name: 'HttpError',
		statusCode: 500,
		get stack() {
			if (this._error == null) 
				return;
			
			var stack = this._error.stack.split('\n'),
				imax = stack.length,
				start = 1,
				end = 1;
			
			var rgx = /\[as \w+Error\]/;
			
			while (++end < imax) {
				if (rgx.test(stack[end])) 
					break;
			}
			
			stack.splice(1, end - start + 1);
			
			return stack.join('\n');
		},
		
		toString: function(){
			
			return this.message
				? this.name + ': ' + this.message
				: this.name
				;
		},
		
		Static: {
			create: function(mix, statusCode){
				if (mix instanceof HttpError) 
					return mix;
				
				if (mix instanceof Error) {
					mix.statusCode = statusCode || 500;
					return mix;
				}
				if (is_String(mix)) 
					return HttpError(mix, statusCode);
				
				if (is_Object(mix)) {
					var msg = mix.message,
						code = statusCode || mix.statusCode || mix.status;
					if (msg == null) {
						msg = JSON.stringify(mix);
					}
					var error = HttpError(msg, code);
					obj_extend(error, mix);
					
					return error;
				}
				return RuntimeError('Invalid error object: ' + mix);
			}
		}
	});
	
	RequestError = createError('RequestError'	, 400);
	SecurityError = createError('SecurityError'	, 403);
	NotFoundError = createError('NotFoundError'	, 404);
	RuntimeError = createError('RuntimeError'	, 500);
	
	
	// PRIVATE
	function createError(id, code) {
		var Ctor = server[id] = Class({
			Base: HttpError,
			Construct: function(){
				
				if (this instanceof Ctor === false) {
					var arguments_ = [null].concat(_Array_slice.call(arguments));
					return new (Ctor.bind.apply(Ctor, arguments_));
				}
				
			},
			statusCode: code,
			name: id
		});
		
		return Ctor;
	}
	
}());