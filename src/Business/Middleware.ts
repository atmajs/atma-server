import { logger } from '../dependency'

export default class MiddlewareRunner {
	
	constructor (public arr){
        this.arr = arr;
	}
	process (req, res, callback, config){
		
		next(this, req, res, callback, config, 0);
	}
	add (mix) {
		if (mix == null)  {
            return this;
        }
		if (typeof mix === 'function') {
			this.arr.push(mix);
			return this;
		}
		if (Array.isArray(mix)) {
            mix.forEach(midd => this.add(midd));
			return this;
        }
        throw new Error(`Middleware must be a function function.`);
	}
	static create (arr){
		if (arr == null) 
			return null;
		
		return new MiddlewareRunner(arr);
	}
};

// private

function next(runner: MiddlewareRunner, req, res, callback, config, index){
	if (index >= runner.arr.length) 
		return callback(null, req, res);

	var middleware = runner.arr[index];
	if (middleware == null) {
        return next(runner, req, res, callback, config, ++index);
    }
	middleware(
		req,
		res,
		nextDelegate(runner, req, res, callback, config, index),
		config
	);
}


function nextDelegate(runner, req, res, callback, config, index){
	
	return function(error, result: { done?: boolean }){
		if (error) {
			logger
				.debug('<app:middleware:nextDelegate>'.red, error);
			callback(error, req, res);
			return;
        }
        if (result && result.done) {
            callback(null, req, res);
            return;
        }
		
		next(runner, req, res, callback, config, ++index);
	};
}	
