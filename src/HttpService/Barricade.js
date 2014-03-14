var Barricade = (function(){
	
	var Runner = Class.Collection(Function, {
		Base: Class.Serializable,
		process: function(service, req, res, params){
			
			next(this, service, req, res, params, 0)
		}
		
	});
		
	function next(runner, service, req, res, params, index){
		if (index >= runner.length) 
			return;
	
		var fn = runner[index],
			error;
			
		error = fn.call(
			service,
			req,
			res,
			params,
			nextDelegate(runner, service, req, res, params, index)
		);
		
		if (error) 
			reject(service, error);
		
	}
	
	
	function nextDelegate(runner, service, req, res, params, index){
		
		return function(error){
			
			if (error) 
				return reject(service, error)
			
			next(
				runner,
				service,
				req,
				res,
				params,
				++index
			);
		};
	}
	
	function reject(service, error){
		if (typeof error === 'string') 
			error = HttpError(error);
		
		service.reject(error);
	}
	
	return function(middlewares){
		
		var barricade = new Runner(middlewares),
			service;
		
		return function(req, res, params){
			service = this;
			barricade.process(service, req, res, params);
		};
	};
	
}());