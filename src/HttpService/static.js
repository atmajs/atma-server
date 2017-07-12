"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var error_TITLE = '<service> Model deserialization: ';
exports.default = {
    classParser: function (name, Ctor) {
        var keys = dependency_1.Class.properties(Ctor);
        return function (req, res, params, next) {
            if (req.body == null) {
                next('Body is not defined');
                return;
            }
            var propError = checkProperties(req.body, keys);
            if (propError != null) {
                next(error_TITLE + propError);
                return;
            }
            var model = new Ctor(req.body);
            var error = dependency_1.Class.validate(model);
            if (error != null) {
                next(error_TITLE + error);
                return;
            }
            req[name] = model;
            next();
        };
    },
    collectionParser: function (name, CollCtor) {
        var keys = dependency_1.Class.properties(CollCtor.prototype._ctor);
        return function (req, res, params, next) {
            if (Array.isArray(req.body) === false) {
                next('Array expected');
                return;
            }
            var error, imax = req.body.length, error, i = -1;
            while (++i < imax) {
                error = checkProperties(req.body[i], keys);
                if (error != null) {
                    next(error_TITLE + error);
                    return;
                }
            }
            req[name] = new CollCtor(req.body);
            i = -1;
            while (++i < imax) {
                error = dependency_1.Class.validate(req[name][i]);
                if (error != null) {
                    next(error_TITLE + error);
                    return;
                }
            }
            next();
        };
    },
    classPatchParser: function (name, Ctor) {
        var keys = dependency_1.Class.properties(Ctor);
        return function (req, res, params, next) {
            if (req.body == null)
                return next('Body is not defined');
            var $set = req.body.$set;
            if ($set) {
                var type, key, dot;
                for (key in $set) {
                    dot = key.indexOf('.');
                    if (dot !== -1)
                        key = key.substring(0, dot);
                    if (keys[key] === void 0)
                        return next('Unexpected property ' + key);
                    type = typeof req.body[key];
                    if (type !== 'undefined' && type !== keys[key])
                        return next('Type mismatch ' + type + '/' + keys[key]);
                }
            }
            next();
        };
    }
};
function checkProperties(obj, keys) {
    for (var key in obj) {
        if (keys[key] === void 0) {
            return 'Unexpected property ' + key;
        }
        var type = typeof obj[key];
        if (type !== 'undefined' && type !== keys[key]) {
            return 'Type mismatch ' + type + '/' + keys[key];
        }
    }
    return null;
}
