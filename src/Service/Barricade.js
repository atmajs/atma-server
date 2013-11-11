var Barricade = (function(){
	
	var Runner = Class.Collection(Function, {
		Base: Class.Serializable,
		process: function(service, req, res, params){
			
			next(this, service, req, res, params, 0)
		}
		
	});
		
	function next(runner, service, req, res, callback, index){
		if (index >= runner.length) 
			return;
	
		var fn = runner[index];
		
		fn.call(
			service,
			req,
			res,
			params,
			nextDelegate(runner, req, res, params, index)
		);
	}
	
	
	function nextDelegate(runner, service, req, res, params, index){
		
		return function(error){
			
			if (error) 
				return service.reject(error);
			
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
	
	return function(middlewares){
		
		var baricade = new Runner(middlewares);
		
		return function(req, res, params){
			
		
			barricade.process(this, req, res, params);
		};
	};
	
}());