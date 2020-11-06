import { IHttpEndpointMethodArgMeta } from './HttpEndpointModels'
import { obj_setProperty } from 'atma-utils'
import { HttpError } from '../HttpError/HttpError'
import { Serializable, JsonConvert, JsonValidate } from 'class-json'
import { IServerRequest } from '../models/IServerRequest';
import { FormDataUtil } from '../util/FormDataUtil';

export namespace Types {
    export class ArrayOfString { }

    export class ArrayOfNumber { }

    export function ArrayOf(Type) {
        return new ArrayOfInner(Type);
    }
    export class Json extends Serializable<Json> {

    }
}


class ArrayOfInner {
    constructor(public Type) { }
}

export namespace HttpEndpointParamUtils {

    export function resolveParam(req: IServerRequest, params, meta: IHttpEndpointMethodArgMeta) {
        if (meta.from === 'uri') {
            return UriExtractor.get(params, meta);
        }
        let body = req.body;
        if (req.headers['content-type']?.includes?.('multipart/form-data')) {
            body = FormDataUtil.map(body, req.files);
        }
        return BodyExtractor.get(body, meta);
    }
}

namespace BodyExtractor {
    export function get(body, meta: IHttpEndpointMethodArgMeta) {
        return TypeConverter.fromType(body, meta.Type)
    }
}

namespace UriExtractor {
    export function get(params, meta: IHttpEndpointMethodArgMeta) {
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
            if (meta.validate) {
                let error = meta.validate(val);
                if (error) {
                    throw new HttpError(`Invalid URI Parameter '${meta.name}' with value '${str}': ${error}`, 400);
                }
            }
            return val;
        }
        let obj = toTree(params);
        return TypeConverter.fromType(obj, meta.Type);
    }

    function toTree(params) {
        let obj = {};
        for (let key in params) {
            let val = params[key];
            if (isJson(val)) {
                try {
                    val = JSON.parse(val);
                } catch (error) {
                    console.error('400: Unexpected URI JSON');
                }
            }
            obj_setProperty(obj, key, val);
        }
        return obj;
    }
    function isJson(str: string) {
        if (typeof str !== 'string') {
            return false;
        }
        let c = str[0];
        if (c === '{') {
            return str[str.length - 1] === '}'
        }
        if (c === '[') {
            return str[str.length - 1] === ']'
        }
        return false;
    }


    function getConverter(Type) {
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
            convert(val) {
                return val;
            }
        },
        {
            Type: Number,
            convert(val: string) {
                if (val == null || val === '') {
                    return null;
                }
                return parseFloat(val);
            },
            validate(val): string {
                if (isNaN(val)) {
                    return `Is not a number`;
                }
            }
        },
        {
            Type: Date,
            convert(val: string) {
                if (val == null) {
                    return val;
                }
                return new Date(val);
            }
        },
        {
            Type: Boolean,
            convert(val: string) {
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
            convert(val: string) {
                if (val == null) {
                    return val;
                }
                return val.split(',');
            }
        },
        {
            Type: Types.ArrayOfNumber,
            convert(val: string) {
                if (val == null) {
                    return val;
                }
                return val.split(',').map(parseFloat);
            },
            validate(arr: number[]) {
                if (arr.some(isNaN)) {
                    return `Contains invalid number`;
                }
            }
        },
        {
            Type: Types.Json,
            convert(val: string) {
                if (val == null) {
                    return val;
                }
                try {
                    return JSON.parse(val);
                } catch (error) {
                    throw new HttpError(`Invalid json data: ${val}`)
                }
            },
            validate(arr: number[]) {

            }
        },
    ];

}

namespace TypeConverter {
    export function fromType(json, Type) {
        if (Type == null) {
            return json;
        }
        if (typeof Type !== 'function') {
            if (Type instanceof ArrayOfInner && Array.isArray(json)) {
                return json.map(x => fromType(x, Type.Type));
            }
        }
        let instance = Type.fromJSON?.(json) ?? JsonConvert.fromJSON(json, { Type });
        let error = Type.validate != null
            ? Type.validate(instance)
            : JsonValidate.validate(instance, { Type })

        if (error != null && error.length !== 0) {
            // Try handle different cases
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
            throw new HttpError(`Invalid Parameter: ${message} `, 400);
        }
        return instance;
    }
}
