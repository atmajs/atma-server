var MiddlewareRunner;

(function(){

	MiddlewareRunner = Class.Collection(Function, {
		Base: Class.Serializable,
		process: function(req, res, callback, config){
			
			next(this, req, res, callback, config, 0);
		}
		
	});
	
	// private
	
	function next(runner, req, res, callback, config, index){
		if (index >= runner.length) 
			return callback(null, req, res);
	
		var middleware = runner[index];
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
