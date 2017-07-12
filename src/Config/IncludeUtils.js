"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("../HttpApplication/Application");
exports.default = {
    prepair: function (pckg) {
        incl_prepair(pckg);
    }
};
function incl_prepair(mix) {
    if (mix == null)
        return;
    if (Array.isArray(mix)) {
        var array = mix, imax = mix.length, i = 0, x;
        for (; i < imax; i++) {
            x = array[i];
            if (x == null || typeof x === 'string')
                continue;
            var cond = cond_getCondition(x);
            if (cond == null) {
                incl_prepair(x);
                continue;
            }
            if (cond_match(cond)) {
                var diff = mod_arrayAdd(array, i, cond.value);
                imax += diff;
                i += diff;
                continue;
            }
            array.splice(i, 1);
            i--;
            imax--;
        }
        return;
    }
    if (typeof mix === 'object') {
        for (var key in mix) {
            incl_prepair(mix[key]);
        }
    }
}
function mod_arrayAdd(array, at, value) {
    if (Array.isArray(value)) {
        Array.prototype.splice.apply(array, [at, 1].concat(value));
        return value.length;
    }
    array.splice(at, 1, value);
    return 1;
}
function cond_getCondition(object) {
    for (var key in object) {
        if (key.substring(0, 3) !== 'if#')
            return null;
        return {
            key: key.substring(3),
            value: object[key]
        };
    }
    return null;
}
function cond_match(cond) {
    return Application_1.default.current.args[cond.key];
}
