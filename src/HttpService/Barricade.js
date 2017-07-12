"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var HttpError_1 = require("../HttpError/HttpError");
var Runner = dependency_1.Class.Collection(Function, {
    Base: dependency_1.Class.Serializable,
    process: function (service, req, res, params) {
        next(this, service, req, res, params, 0);
    }
});
function next(runner, service, req, res, params, index) {
    if (index >= runner.length)
        return;
    var fn = runner[index], error;
    error = fn.call(service, req, res, params, nextDelegate(runner, service, req, res, params, index));
    if (error)
        reject(service, error);
}
function nextDelegate(runner, service, req, res, params, index) {
    return function (error) {
        if (error)
            return reject(service, error);
        next(runner, service, req, res, params, ++index);
    };
}
function reject(service, error) {
    if (typeof error === 'string')
        error = new HttpError_1.HttpError(error);
    service.reject(error);
}
exports.Barricade = function (middlewares) {
    var barricade = new Runner(middlewares), service;
    return function (req, res, params) {
        service = this;
        barricade.process(service, req, res, params);
    };
};
