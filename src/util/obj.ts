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