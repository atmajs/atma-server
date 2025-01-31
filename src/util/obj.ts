import { obj_extend } from '../dependency'

export const obj_lazyProperty = function(obj, xpath, init){
    var arr = xpath.split('.'),
        imax = arr.length - 1,
        i = -1, key;
    while(++i < imax){
        key = arr[i];
        if (obj[key] == null)
            obj[key] = {};

        obj = obj[key];
    }
    key = arr[imax];
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function(){

            var val = init();
            Object.defineProperty(obj, key, {
                enumerable: true,
                writable: true,
                value: val
            })
            return val;
        },
        set: function(val){
            Object.defineProperty(obj, key, {
                enumerable: true,
                writable: true,
                value: val
            });
        }
    })
};


export function obj_getKeys (x): string[] {
    let keys = [];
    let proto = x;
    while (proto != null && proto != Object.prototype) {
        keys.push(
            ...Object.getOwnPropertyNames(proto)
        );
        proto = Object.getPrototypeOf(proto);
    }
    return keys;
}


/**
 * Max 4 args
 */
export const obj_assign = (<any>Object).assign || function (target, a, b, c, d) {
    if (a != null) target = obj_extend(target, a);
    if (b != null) target = obj_extend(target, b);
    if (c != null) target = obj_extend(target, c);
    if (d != null) target = obj_extend(target, d);
    return target;
};


let obj_validate: any
(function(){

    obj_validate = function(a /*, b , ?isStrict, ?property, ... */) {
        if (a == null)
            return Err_Invalid('object');

        _props = null;
        _strict = false;

        var i = arguments.length,
            validator, x;
        while (--i > 0) {
            x = arguments[i];
            switch(typeof x){
                case 'string':
                    if (_props == null)
                        _props = {};
                    _props[x] = 1;
                    continue;
                case 'boolean':
                    _strict = x;
                    continue;
                case 'undefined':
                    continue;
                default:
                    if (i !== 1) {
                        return Err_Invalid('validation argument at ' + i)
                    }
                    validator = x;
                    continue;
            }
        }
        if (validator == null)
            validator = a.Validate;
        if (validator == null)
            // if no validation object - accept any.
            return null;

        return checkObject(a, validator, a);
    };

    // private

        // unexpect in `a` if not in `b`
    var _strict = false,
        // validate only specified properties
        _props = null;

    // a** - payload
    // b** - expect
    // strict -
    function checkObject(a, b, ctx?) {
        var error,
            optional,
            key, aVal, aKey;
        for(key in b){

            if (_props != null && a === ctx && _props.hasOwnProperty(key) === false) {
                continue;
            }

            switch(key.charCodeAt(0)) {
                case 63:
                    // ? (optional)
                    aKey = key.substring(1);
                    aVal = a[aKey];
                    //! accept falsy value
                    if (!aVal)
                        continue;

                    error = checkProperty(aVal, b[key], ctx);
                    if (error != null) {
                        error.setInvalidProperty(aKey);
                        return error;
                    }

                    continue;
                case 45:
                    // - (unexpect)
                    aKey = key.substring(1);
                    if (typeof a === 'object' && aKey in a)
                        return Err_Unexpect(aKey);

                    continue;
            }

            aVal = a[key];
            if (aVal == null)
                return Err_Expect(key);


            error = checkProperty(aVal, b[key], ctx);
            if (error != null) {
                error.setInvalidProperty(key);
                return error;
            }
        }

        if (_strict) {
            for(key in a){
                if (key in b || '?' + key in b)
                    continue;

                return Err_Unexpect(key);
            }
        }
    }

    function checkProperty(aVal, bVal, ctx) {
        if (bVal == null)
            return null;

        if (typeof bVal === 'function') {
            var error = bVal.call(ctx, aVal);
            if (error == null || error === true)
                return null;

            if (error === false)
                return Err_Invalid();

            return Err_Custom(error);
        }

        if (aVal == null)
            return Err_Expect();

        if (typeof bVal === 'string') {
            var str = 'string',
                num = 'number',
                bool = 'boolean'
                ;

            switch(bVal) {
                case str:
                    return typeof aVal !== str || aVal.length === 0
                        ? Err_Type(str)
                        : null;
                case num:
                    return typeof aVal !== num
                        ? Err_Type(num)
                        : null;
                case bool:
                    return typeof aVal !== bool
                        ? Err_Type(bool)
                        : null;
            }
        }

        if (bVal instanceof RegExp) {
            return bVal.test(aVal) === false
                ? Err_Invalid()
                : null;
        }

        if (Array.isArray(bVal)) {
            if (Array.isArray(aVal) === false)
                return Err_Type('array');

            var i = -1,
                imax = aVal.length,
                error;
            while ( ++i < imax ){
                error = checkObject(aVal[i], bVal[0])

                if (error) {
                    error.setInvalidProperty(i);
                    return error;
                }
            }

            return null;
        }

        if (typeof aVal !== typeof bVal)
            return Err_Type(typeof aVal);


        if (typeof aVal === 'object')
            return checkObject(aVal, bVal);

        return null;
    }

    var Err_Type,
        Err_Expect,
        Err_Unexpect,
        Err_Custom,
        Err_Invalid
        ;
    (function(){

        Err_Type = create('type',
            function TypeErr(expect) {
                this.expect = expect;
            },
            {
                toString: function(){
                    return 'Invalid type.'
                        + (this.expect
                           ? ' Expect: ' + this.expect
                           : '')
                        + (this.property
                           ? ' Property: ' + this.property
                           : '')
                        ;
                }
            }
        );
        Err_Expect = create('expect',
            function ExpectErr(property) {
                this.property = property;
            },
            {
                toString: function(){
                    return 'Property expected.'
                        + (this.property
                           ? '`' + this.property + '`'
                           : '')
                        ;
                }
            }
        );
        Err_Unexpect = create('unexpect',
            function UnexpectErr(property) {
                this.property = property;
            },
            {
                toString: function(){
                    return 'Unexpected property'
                        + (this.property
                           ? '`' + this.property + '`'
                           : '')
                        ;
                }
            }
        );
        Err_Custom = create('custom',
            function CustomErr(error) {
                this.error = error
            },
            {
                toString: function(){
                    return 'Custom validation: '
                        + this.error
                        + (this.property
                            ? ' Property: ' + this.property
                            : '')
                        ;
                }
            }
        );
        Err_Invalid = create('invalid',
            function InvalidErr(expect) {
                this.expect = expect
            }, {
                toString: function(){
                    return 'Invalid.'
                        + (this.expect
                            ? ' Expect: ' + this.expect
                            : '')
                        + (this.property
                            ? ' Property: ' + this.property
                            : '')
                        ;
                }
            }
        );

        function create(type, Ctor, proto) {
            proto.type = type;
            proto.property = null;
            proto.setInvalidProperty = setInvalidProperty;

            Ctor.prototype = proto;
            return function(mix){
                return new Ctor(mix);
            }
        }
        function setInvalidProperty(prop){
            if (this.property == null) {
                this.property = prop;
                return;
            }
            this.property = prop + '.' + this.property;
        }
    }()); /*< Errors */

}());

export { obj_validate }
