"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var HttpError = (function () {
    function HttpError(message, statusCode) {
        if (statusCode === void 0) { statusCode = 500; }
        this.message = message;
        this.statusCode = statusCode;
        this.name = 'HttpError';
        this._error = null;
        this._json = null;
        this._error = Error(message);
    }
    Object.defineProperty(HttpError.prototype, "stack", {
        get: function () {
            if (this._error == null)
                return;
            var stack = this._error.stack.split('\n'), imax = stack.length, start = 1, end = 1;
            var rgx = /\[as \w+Error\]/;
            while (++end < imax) {
                if (rgx.test(stack[end]))
                    break;
            }
            stack.splice(1, end - start + 1);
            return stack.join('\n');
        },
        enumerable: true,
        configurable: true
    });
    HttpError.prototype.toString = function () {
        return this.message
            ? this.name + ': ' + this.message
            : this.name;
    };
    HttpError.prototype.toJSON = function () {
        if (this._json != null)
            return this._json;
        return {
            name: this.name,
            error: this.message,
            code: this.statusCode
        };
    };
    HttpError.create = function (mix, statusCode) {
        if (dependency_1.is_String(mix))
            return new HttpError(mix, statusCode);
        if (mix._error != null)
            return mix;
        if (mix instanceof Error) {
            var error = new HttpError(mix.message, statusCode || 500);
            error._error = mix;
            return error;
        }
        if (dependency_1.is_Object(mix)) {
            if (mix.toString !== _obj_toString) {
                return new HttpError(mix.toString(), statusCode || mix.statusCode || mix.status);
            }
            var msg = mix.message, code = statusCode || mix.statusCode || mix.status;
            var error = new HttpError(msg, code);
            error._json = mix;
            return error;
        }
        return new RuntimeError('Invalid error object: ' + mix);
    };
    return HttpError;
}());
exports.HttpError = HttpError;
var RequestError = (function (_super) {
    __extends(RequestError, _super);
    function RequestError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'RequestError';
        _this.statusCode = 400;
        return _this;
    }
    return RequestError;
}(HttpError));
exports.RequestError = RequestError;
var SecurityError = (function (_super) {
    __extends(SecurityError, _super);
    function SecurityError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'SecurityError';
        _this.statusCode = 403;
        return _this;
    }
    return SecurityError;
}(HttpError));
exports.SecurityError = SecurityError;
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'NotFoundError';
        _this.statusCode = 404;
        return _this;
    }
    return NotFoundError;
}(HttpError));
exports.NotFoundError = NotFoundError;
var RuntimeError = (function (_super) {
    __extends(RuntimeError, _super);
    function RuntimeError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'RuntimeError';
        _this.statusCode = 500;
        return _this;
    }
    return RuntimeError;
}(HttpError));
exports.RuntimeError = RuntimeError;
var _obj_toString = Object.prototype.toString;
