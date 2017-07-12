"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Autoreload_1 = require("../Autoreload/Autoreload");
var Application_1 = require("../HttpApplication/Application");
var vars_1 = require("../vars");
var app_1 = require("../util/app");
var StaticContent = require('static-content');
Application_1.default.on('configurate', function (config, app) {
    if (app.isRoot === false || app_1.app_isDebug() === false) {
        return;
    }
    StaticContent.on('file', function (file) {
        Autoreload_1.default.watchFile(file);
    });
    Autoreload_1.default.getWatcher().on('fileChange', function (path, file) {
        StaticContent.Cache.remove(file);
    });
});
vars_1.server.StaticContent = StaticContent;
exports.default = StaticContent;
