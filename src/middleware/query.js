"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
function default_1(req, res, next) {
    var url = req.url, q = url.indexOf('?');
    req.query = q === -1
        ? {}
        : deserialize(url.substring(q + 1));
    next();
}
exports.default = default_1;
;
var deserialize = dependency_1.ruta.$utils.query.deserialize;
