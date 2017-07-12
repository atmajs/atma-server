"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_proxy = function (fn, ctx) {
    return function () {
        return fn.apply(ctx, arguments);
    };
};
exports.fn_delegate = function (fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args2[_i] = arguments[_i];
        }
        fn.apply(null, 
        /* args_1 + args_2 */
        args.concat(args2));
    };
};
