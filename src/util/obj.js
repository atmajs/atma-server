"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj_lazyProperty = function (obj, xpath, init) {
    var arr = xpath.split('.'), imax = arr.length - 1, i = -1, key;
    while (++i < imax) {
        key = arr[i];
        if (obj[key] == null)
            obj[key] = {};
        obj = obj[key];
    }
    key = arr[imax];
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            var val = init();
            Object.defineProperty(obj, key, {
                enumerable: true,
                writable: true,
                value: val
            });
            return val;
        },
        set: function (val) {
            Object.defineProperty(obj, key, {
                enumerable: true,
                writable: true,
                value: val
            });
        }
    });
};
