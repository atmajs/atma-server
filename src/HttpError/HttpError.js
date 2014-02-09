
var HttpError,
	
	NotFoundError,
	RequestError,
	
	SecurityError,
	
	RuntimeError
	;
	

(function(){
	
	server.HttpError = HttpError = Class({
		Construct: function(message, statusCode){
			
			if (this instanceof HttpError === false) 
				return new HttpError(message, statusCode);
			
			this.error_ = new Error;
			this.message = message;
			
			if (statusCode != null) 
				this.statusCode = statusCode;
		},
		name: 'HttpError',
		statusCode: 500,
		get stack() {
			var stack = this.error_.stack.split('\n'),
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
		}
	});
	
	RequestError = createError('RequestError', 'Bad Request', 400);
	SecurityError = createError('SecurityError', 'Forbidden', 403);
	NotFoundError = createError('NotFoundError', 'Not Found', 404);
	RuntimeError = createError('RuntimeError', 'Internal Server Error', 500);
	
	
	// PRIVATE
	function createError(id, name, code) {
		var Ctor = server[id] = Class({
			Base: HttpError,
			Construct: function(){
				
				if (this instanceof Ctor === false) {
					var arguments_ = [null].concat(_Array_slice.call(arguments));
					return new (Ctor.bind.apply(Ctor, arguments_));
				}
				
			},
			statusCode: code,
			name: name
		});
		
		return Ctor;
	}
	
}());