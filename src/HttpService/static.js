(function() {

	HttpService.classParser = function(name, Ctor) {
		var keys = Class.keys(Ctor);

		return function(req, res, params, next) {

			if (req.body == null)
				return next('Body is not defined');

			var type,
				key;
			for (key in req.body) {

				if (keys[key] === void 0)
					return next('Unexpected property ' + key);

				type = typeof req.body[key];
				if (type !== 'undefined' && type !== keys[key])
					return next('Type mismatch ' + type + '/' + keys[key]);

			}

			req[name] = new Ctor(req.body);

			next(Class.validate(req[name]));
		};
	};

	HttpService.classPatchParser = function(name, Ctor) {
		var keys = Class.keys(Ctor);

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

}());