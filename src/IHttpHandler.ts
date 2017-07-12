import { Class } from './dependency'
import { HttpError } from './HttpError/HttpError' 

export default abstract class IHttpHandler<T> extends Class.Deferred<T> {
	process (req, res, config?) {
		this.reject(new HttpError('Not Implemented', 500));
	}
};