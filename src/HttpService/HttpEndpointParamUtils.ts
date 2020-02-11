import { IHttpEndpointMethodArgMeta } from './HttpEndpointModels'
import { obj_setProperty } from 'atma-utils'
import { HttpError } from '../HttpError/HttpError'
import { Serializable } from 'class-json'

export namespace Types {
    export class ArrayOfString {}

    export class ArrayOfNumber {}

    export class Json extends Serializable<Json> {

    }
}

export namespace HttpEndpointParamUtils {

    export function resolveParam (req, params, meta: IHttpEndpointMethodArgMeta) {
        if (meta.from === 'uri') {
            return UriExtractor.get(params, meta);
        }
        return BodyExtractor.get(req.body, meta);
    }


}


namespace BodyExtractor {
    export function get (body, meta: IHttpEndpointMethodArgMeta) {
        let obj = body;
        if (typeof meta.Type.fromJson !== 'function') {
            throw new Error(`${meta.Type.name} must implement static fromJson method to deserialize params`);
        }
        let instance = meta.Type.fromJson(obj);
        let error = meta.Type.validate?.(instance);
        if (error && error.length > 0) {
            let message = error;
            if (Array.isArray(error)) {
                message = error[0];
            }
            if (typeof message === 'object') {
                if (message.message) {
                    message = message.message;
                } else {
                    message = JSON.stringify(message);
                }
            }
            throw new HttpError(`Invalid URI Parameter: ${message} `, 400);
        }
    
        return instance;
    }
}

namespace UriExtractor {
    export function get (params, meta: IHttpEndpointMethodArgMeta) {
        if (meta.name) {
            let val = params[meta.name];
            if (val == null) {
                if (meta.optional !== true) {
                    throw new HttpError(`URI Parameter '${meta.name}' is undefined`, 400);
                }
                return null;
            }
            let str = val;
            let converter = getConverter(meta.Type ?? String);
            if (converter != null) {
                val = converter.convert(val);
            }
            if (converter.validate) {
                let error = converter.validate(val);
                if (error) {
                    throw new HttpError(`Invalid URI Parameter '${meta.name}' with value '${str}': `, 400);
                }
            }
            return val;
        }
        let obj = toTree(params);
        if (typeof meta.Type.fromJson !== 'function') {
            throw new Error(`${meta.Type.name} must implement static fromJson method to deserialize params`);
        }
        let instance = meta.Type.fromJson(obj);
        if (meta.Type.validate) {
            let error = meta.Type.validate(instance);
            if (error && error.length > 0) {
                let message = error;
                if (Array.isArray(error)) {
                    message = error[0];
                }
                if (typeof message === 'object') {
                    if (message.message) {
                        message = message.message;
                    } else {
                        message = JSON.stringify(message);
                    }
                }
                throw new HttpError(`Invalid URI Parameter: ${message} `, 400);
            }
        }
        return instance;
    }

    function toTree (params) {
        let obj = {};
        for (let key in params) {
            obj_setProperty(obj, key, params[key]);
        }
        return obj;
    }
}

function getConverter (Type) {
    for (let i = 0; i < Converters.length; i++) {
        if (Converters[i].Type === Type) {
            return Converters[i];
        }
    }
    return null;
}

let Converters = [
    {
        Type: String,
        convert (val) {
            return val;
        }
    },
    {
        Type: Number,
        convert (val: string) {
            if (val == null || val === '') {
                return null;
            }
            return parseFloat(val);
        },
        validate (val): string {
            if (isNaN(val)) {
                return `Is not a number`;
            }
        }
    },
    {
        Type: Boolean,
        convert (val: string) {
            if (val == null) {
                return null;
            }
            if (val === 'true' || val === '1' || val === 'yes') {
                return true;
            }
            return false;
        }
    },
    {
        Type: Types.ArrayOfString,
        convert (val: string) {
            if (val == null) {
                return val;
            }
            return val.split(',');
        }
    },
    {
        Type: Types.ArrayOfNumber,
        convert (val: string) {
            if (val == null) {
                return val;
            }
            return val.split(',').map(parseFloat);
        },
        validate (arr: number[]) {
            if (arr.some(isNaN)) {
                return `Contains invalid number`;
            }
        }
    },
];