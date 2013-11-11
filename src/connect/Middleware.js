
var MiddlewareRunner = Class.Collection(Function, {
	Base: Class.Serializable,
	process: function(req, res, callback){
		
		next(this, req, res, callback, 0);
	}
	
});


function next(runner, req, res, callback, index){
	if (index >= runner.length) 
		return callback(req, res);

	var middleware = runner[index];
	
	if (middleware == null) 
		return next(runner, req, res, callback, ++index);

	middleware(
		req,
		res,
		nextDelegate(runner, req, res, callback, index)
	);
}


function nextDelegate(runner, req, res, callback, index){
	
	return function(error){
		
		if (error) {
			logger.error(error);
		}
		
		next(runner, req, res, callback, ++index);
	};
}