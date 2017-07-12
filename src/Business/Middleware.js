"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var MiddlewareRunner = (function () {
    function MiddlewareRunner(arr) {
        this.arr = arr;
        this.arr = arr;
    }
    MiddlewareRunner.prototype.process = function (req, res, callback, config) {
        next(this, req, res, callback, config, 0);
    };
    MiddlewareRunner.prototype.add = function (mix) {
        if (mix == null)
            return this;
        if (typeof mix === 'function') {
            this.arr.push(mix);
            return this;
        }
        if (Array.isArray(mix)) {
            this.arr = this.arr.concat(mix);
            return this;
        }
        return this;
    };
    MiddlewareRunner.create = function (arr) {
        if (arr == null)
            return null;
        return new MiddlewareRunner(arr);
    };
    return MiddlewareRunner;
}());
exports.default = MiddlewareRunner;
;
// private
function next(runner, req, res, callback, config, index) {
    if (index >= runner.arr.length)
        return callback(null, req, res);
    var middleware = runner.arr[index];
    if (middleware == null)
        return next(runner, req, res, callback, config, ++index);
    middleware(req, res, nextDelegate(runner, req, res, callback, config, index), config);
}
function nextDelegate(runner, req, res, callback, config, index) {
    return function (error) {
        if (error) {
            dependency_1.logger
                .debug('<app:middleware:nextDelegate>'.red, error);
            callback(error, req, res);
            return;
        }
        next(runner, req, res, callback, config, ++index);
    };
}
