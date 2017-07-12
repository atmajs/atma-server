"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Static_1 = require("../Plugins/Static");
function Static(req, res, next, config) {
    if (responder == null)
        responder = Static_1.default.respond;
    responder(req, res, next, config);
}
exports.default = Static;
;
Static.config = function (config) {
    return (responder = Static_1.default.create(config));
};
var responder = null;
