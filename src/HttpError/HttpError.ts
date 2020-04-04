import { Class, is_String, is_Object } from '../dependency'
import { app_isDebug } from '../util/app';

export const HttpError: IHttpErrorConstructor = <any>Class({
    Base: Error,
    _error: null,
    _json: null,
    Construct: function (message, statusCode) {
        if (this instanceof HttpError === false)
            return new HttpError(message, statusCode);

        this._error = new Error(message);
        this.message = String(message);

        if (statusCode != null)
            this.statusCode = statusCode;
    },
    name: 'HttpError',
    statusCode: 500,
    get stack() {
        if (this._error == null) {
            return;
        }

        let stack = this._error.stack.split('\n');
        let imax = stack.length;
        let start = 1;
        let end = imax;
        let cursor = 0;
        let before = true;
        let atmaRgx = /[\\\/]atma\-/;

        while (++cursor < imax) {
            if (atmaRgx.test(stack[cursor])) {
                if (before) {
                    start = cursor + 1;
                    continue;
                }
                if (before === false) {
                    end = cursor;
                    break;
                }
            }
            before = false;
        }

        return stack[0] + '\n' + stack.slice(start, end).join('\n');
    },

    toString () {

        return this.message
            ? this.name + ': ' + this.message
            : this.name
            ;
    },
    toJSON () {
        if (this._json != null)
            return this._json;

        return {
            name: this.name,
            error: this.message,
            code: this.statusCode,
            stack: app_isDebug ? this.stack : void 0
        };
    },
    Static: {
        create: function (mix, statusCode) {
            if (is_String(mix))
                return new HttpError(mix, statusCode);

            if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/
                return mix;

            if (mix instanceof Error) {
                let error = new HttpError(mix.message, statusCode || 500);
                error._error = mix;
                return error;
            }

            if (is_Object(mix)) {
                if (mix.toString !== _obj_toString) {
                    return new HttpError(
                        mix.toString(), statusCode || mix.statusCode || mix.status
                    );
                }
                let msg = mix.message;
                let code = statusCode || mix.statusCode || mix.status;
                let error;

                error = new HttpError(msg, code);
                error._json = mix;
                return error;
            }
            return new RuntimeError('Invalid error object: ' + mix);
        }
    }
});

export const RequestError = createError('RequestError', 400);
export const SecurityError = createError('SecurityError', 403);
export const NotFoundError = createError('NotFoundError', 404);
export const RuntimeError = createError('RuntimeError', 500);

export interface IHttpError {
    name: string
    statusCode: number
    message: string
    status: string
    stack: string
    toString: Function
    toJSON: Function

    _error?: Error
}
export interface IHttpErrorConstructor {
    new(message: string, statusCode?: number): IHttpError
}

// PRIVATE

var _obj_toString = Object.prototype.toString;

function createError(id, code) {
    const Ctor = Class({
        Base: HttpError,
        Construct: function (...args) {

            if (this instanceof Ctor === false) {
                var arguments_ = [null].concat(...args);
                return new (Ctor.bind.apply(Ctor, arguments_));
            }

        },
        statusCode: code,
        name: id
    });
    return Ctor as IHttpErrorConstructor;
}

// export class HttpError {
// 	name = 'HttpError'
// 	_error: Error = null
// 	_json: any = null
// 	constructor (public message, public statusCode = 500){

// 		this._error = Error(message);

// 	}
// 	get stack() {
// 		if (this._error == null)
// 			return;

// 		var stack = this._error.stack.split('\n'),
// 			imax = stack.length,
// 			start = 1,
// 			end = 1;

// 		var rgx = /\[as \w+Error\]/;

// 		while (++end < imax) {
// 			if (rgx.test(stack[end]))
// 				break;
// 		}

// 		stack.splice(1, end - start + 1);

// 		return stack.join('\n');
// 	}
// 	toString () {

// 		return this.message
// 			? this.name + ': ' + this.message
// 			: this.name
// 			;
// 	}
// 	toJSON () {
// 		if (this._json != null)
// 			return this._json;

// 		return {
// 			name: this.name,
// 			error: this.message,
// 			code: this.statusCode
// 		};
// 	}
// 	static create (mix, statusCode?){
// 		if (is_String(mix))
// 			return new HttpError(mix, statusCode);

// 		if (mix._error != null) /* instanceof HttpError (weakness of instanceof)*/
// 			return mix;

// 		if (mix instanceof Error) {
// 			let error = new HttpError(mix.message, statusCode || 500);
// 			error._error = mix;
// 			return error;
// 		}

// 		if (is_Object(mix)) {
// 			if (mix.toString !== _obj_toString) {
// 				return new HttpError(
// 					mix.toString() , statusCode || mix.statusCode || mix.status
// 				);
// 			}
// 			var msg = mix.message,
// 				code = statusCode || mix.statusCode || mix.status;

// 			let error = new HttpError(msg, code);
// 			error._json = mix;
// 			return error;
// 		}
// 		return new RuntimeError('Invalid error object: ' + mix);
// 	}	
// }

// export class RequestError extends HttpError {
// 	name = 'RequestError'
// 	statusCode = 400
// }

// export class SecurityError extends HttpError {
// 	name = 'SecurityError'
// 	statusCode = 403
// }

// export class NotFoundError extends HttpError {
// 	name = 'NotFoundError'
// 	statusCode = 404
// }

// export class RuntimeError extends HttpError {
// 	name = 'RuntimeError'
// 	statusCode = 500
// }

// const _obj_toString = Object.prototype.toString;