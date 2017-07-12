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
var dependency_1 = require("./dependency");
var HttpError_1 = require("./HttpError/HttpError");
var IHttpHandler = (function (_super) {
    __extends(IHttpHandler, _super);
    function IHttpHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IHttpHandler.prototype.process = function (req, res, config) {
        this.reject(new HttpError_1.HttpError('Not Implemented', 500));
    };
    return IHttpHandler;
}(dependency_1.Class.Deferred));
exports.default = IHttpHandler;
;
