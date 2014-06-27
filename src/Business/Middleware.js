var MiddlewareRunner;

(function(){

	MiddlewareRunner = Class({
		Construct: function(arr){
			this.arr = arr;
		},
		process: function(req, res, callback, config){
			
			next(this, req, res, callback, config, 0);
		},
		add: function(mix){
			if (mix == null) 
				return this;
			
			if (typeof mix === 'function') {
				this.arr.push(mix);
				return this;
			}
			if (is_Array(mix)) {
				this.arr = this.arr.concat(mix);
				return this;
			}
			return this;
		},
		Static: {
			create: function(arr){
				if (arr == null) 
					return null;
				
				return new MiddlewareRunner(arr);
			}
		}
		
	});
	
	// private
	
	function next(runner, req, res, callback, config, index){
		if (index >= runner.arr.length) 
			return callback(null, req, res);
	
		var middleware = runner.arr[index];
		if (middleware == null) 
			return next(runner, req, res, callback, config, ++index);
	
		middleware(
			req,
			res,
			nextDelegate(runner, req, res, callback, config, index),
			config
		);
	}
	
	
	function nextDelegate(runner, req, res, callback, config, index){
		
		return function(error){
			if (error) {
				logger
					.debug('<app:middleware:nextDelegate>'.red, error);
				callback(error, req, res);
				return;
			}
			
			next(runner, req, res, callback, config, ++index);
		};
	}	
	
}());
