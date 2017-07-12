"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
exports.secure_canAccess = function (req, secureObj) {
    if (secureObj == null)
        return true;
    if (secureObj === true || secureObj.role == null)
        return (req.session != null || req.user != null);
    var user = req.user, role = secureObj.role;
    return user != null && (role == null || user.isInRole(role));
};
exports.service_validateArgs = function (body, args, isStrict) {
    if (body == null)
        return 'Message Body is not defined';
    return dependency_1.Class.validate(body, args, isStrict);
};
