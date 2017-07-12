"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Uri = require('atma-utils').class_Uri;
exports.path_hasProtocol = function (path) {
    return /^(file|https?):/.test(path);
};
exports.path_normalize = function (path) {
    return path
        .replace(/\\/g, '/')
        .replace(/([^:\/])\/{2,}/g, '$1/');
};
exports.path_resolveSystemUrl = function (path, base) {
    if (base === void 0) { base = null; }
    path = exports.path_normalize(path);
    if (exports.path_hasProtocol(path))
        return path;
    if (path[0] === '.' && path[1] === '/')
        path = path.substring(2);
    if (hasSystemRoot(path))
        return 'file://' + path;
    if (base_ == null)
        ensureBase();
    return Uri.combine(base || base_, path);
};
var base_;
function ensureBase() {
    base_ = 'file://' + exports.path_normalize(process.cwd() + '/');
}
function hasSystemRoot(path) {
    if (path[0] === '/')
        return true;
    return /^[A-Za-z]:[\/\\]/.test(path);
}
