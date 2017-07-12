"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("../HttpApplication/Application");
var Debug;
(function (Debug) {
    Debug[Debug["Unknown"] = 0] = "Unknown";
    Debug[Debug["Yes"] = 1] = "Yes";
    Debug[Debug["No"] = 2] = "No";
})(Debug || (Debug = {}));
var debug = Debug.Unknown;
function app_isDebug() {
    if (debug !== Debug.Unknown) {
        return debug === Debug.Yes;
    }
    var app = Application_1.default.current;
    if (app == null)
        return false;
    var isDebug = Boolean(app.args.debug || app.config.debug);
    if (isDebug !== true) {
        var env = process.env.NODE_ENV || process.env.ENV;
        if (env) {
            isDebug = /^(test|debug)$/i.test(env);
        }
    }
    debug = isDebug ? Debug.Yes : Debug.No;
    return isDebug;
}
exports.app_isDebug = app_isDebug;
;
