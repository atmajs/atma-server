"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError_1 = require("./HttpError/HttpError");
var IHttpHandler_1 = require("./IHttpHandler");
var HandlerFactory_1 = require("./HandlerFactory");
var HttpErrorPage_1 = require("./HttpPage/HttpErrorPage");
var HttpPage_1 = require("./HttpPage/HttpPage");
var Application_1 = require("./HttpApplication/Application");
var SubApp_1 = require("./HttpApplication/SubApp");
var CrudWrapper_1 = require("./HttpService/CrudWrapper");
var HttpService_1 = require("./HttpService/HttpService");
var export_1 = require("./middleware/export");
var vars_1 = require("./vars");
require("./loader/yml");
exports.default = __assign({ Application: Application_1.default,
    HttpSubApplication: SubApp_1.default,
    HttpErrorPage: HttpErrorPage_1.default,
    HttpPage: HttpPage_1.default,
    HttpError: HttpError_1.HttpError,
    NotFoundError: HttpError_1.NotFoundError,
    RequestError: HttpError_1.RequestError,
    RuntimeError: HttpError_1.RuntimeError,
    SecurityError: HttpError_1.SecurityError,
    IHttpHandler: IHttpHandler_1.default,
    HandlerFactory: HandlerFactory_1.default,
    HttpCrudEndpoints: CrudWrapper_1.default,
    HttpService: HttpService_1.default, middleware: export_1.default }, vars_1.server);
