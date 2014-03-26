(function() {
	var error_TITLE = '<service> Model deserialization: ';
	
	HttpService.classParser = function(name, Ctor) {
		var keys = Class.properties(Ctor);

		return function(req, res, params, next) {

			if (req.body == null){
				next('Body is not defined');
				return;
			}
			
			var error = checkProperties(req.body, keys);
			if (error != null) {
				next(error_TITLE + error);
				return;
			}
			
			
			req[name] = new Ctor(req.body);
			error = Class.validate(req[name]);
			
			if (error != null) 
				error = error_TITLE + error;
			
			next(error);
		};
	};
	
	HttpService.collectionParser = function(name, CollCtor){
		var keys = Class.properties(CollCtor.prototype._ctor);
		
		return function(req, res, params, next){
			if (Array.isArray(req.body) === false) {
				next('Array expected');
				return;
			}
			var error,
				imax = req.body.length,
				error,
				i = -1;
			while( ++i < imax ){
				
				error = checkProperties(req.body[i], keys);
				if (error != null) {
					next(error_TITLE + error);
					return;
				}
			}
			
			req[name] = new CollCtor(req.body);
			i = -1;
			while ( ++i < imax ){
				error = Class.validate(req[name][i]);
				if (error != null) {
					next(error_TITLE + error);
					return;
				}
			}
			next();
		}
	};

	HttpService.classPatchParser = function(name, Ctor) {
		var keys = Class.properties(Ctor);

		return function(req, res, params, next) {
			if (req.body == null)
				return next('Body is not defined');

			var $set = req.body.$set;
			if ($set) {

				var type,
					key,
					dot;
				for (key in $set) {
					
					dot = key.indexOf('.');
					if (dot !== -1) 
						key = key.substring(0, dot);
					
					if (keys[key] === void 0)
						return next('Unexpected property ' + key);

					type = typeof req.body[key];
					if (type !== 'undefined' && type !== keys[key])
							return next('Type mismatch ' + type + '/' + keys[key]);
					
				}
			}
			
			next();
		};
	}

	function checkProperties(obj, keys){
		var type,
			key;
		for (key in obj) {

			if (keys[key] === void 0)
				return 'Unexpected property ' + key;
			

			type = typeof obj[key];
			if (type !== 'undefined' && type !== keys[key]){
				return 'Type mismatch ' + type + '/' + keys[key];
			}
		}
		
		return null;
	}
}());