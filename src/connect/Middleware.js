
var MiddlewareRunner = Class.Collection(Function, {
	Construct: function(array){
		for (var i = 0, imax = array.length; i < imax; i++){
			this[this.length++] = array[i];
		}
	},
	
	callback: null,
	
	process: function(req, res, callback){
		
		this.callback = callback;
		this.index = 0;
		
		next(this, req, res, 0)
	}
	
});


function next(runner, req, res, index){
	if (index >= runner.length) {
		runner.callback(req, res);
		runner.callback = null;
		return;
	}
	
	var fn = runner[index];
	
	fn(req, res, nextDelegate(runner, req, res, index));
}


function nextDelegate(runner, req, res, index){
	
	return function(error){
		
		if (error) {
			logger.error(error);
		}
		
		next(runner, req, res, ++index);
	}
}