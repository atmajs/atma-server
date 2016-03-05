var HttpError,
	NotFoundError,
	RequestError,
	SecurityError,
	RuntimeError
	;

(function(){
	server.HttpError = HttpError = Class({
		Base: Error,
		_error: null,
		_json: null,
		Construct: function(message, statusCode){
			if (this instanceof HttpError === false)
				return new HttpError(message, statusCode);

			this._error = Error(message);
			this.message = String(message);

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
		toJSON: function(){
			if (this._json != null)
				return this._json;

			return {
				name: this.name,
				error: this.message,
				code: this.statusCode
			};
		},
		Static: {
			create: function(mix, statusCode){
				if (is_String(mix))
					return HttpError(mix, statusCode);

				if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/
					return mix;

				if (mix instanceof Error) {
					var error = HttpError(mix.message, statusCode || 500);
					error._error = mix;
					return error;
				}

				if (is_Object(mix)) {
					if (mix.toString !== _obj_toString) {
						return HttpError(
							mix.toString() , statusCode || mix.statusCode || mix.status
						);
					}
					var msg = mix.message,
						code = statusCode || mix.statusCode || mix.status,
						error;

					error = HttpError(msg, code);
					error._json = mix;
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

	var _obj_toString = Object.prototype.toString;

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