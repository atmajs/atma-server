"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var mime_1 = require("../const/mime");
var HttpError_1 = require("../HttpError/HttpError");
exports.send_JSON = function (res, json, statusCode, headers) {
    var text;
    try {
        text = JSON.stringify(json);
    }
    catch (error) {
        return exports.send_Error(res, new HttpError_1.RuntimeError('Json Serialization'));
    }
    exports.send_Content(res, text, statusCode || 200, mime_1.mime_JSON, headers);
};
exports.send_Error = function (res, error, headers) {
    if (headers === void 0) { headers = null; }
    if (error instanceof HttpError_1.HttpError === false) {
        error = HttpError_1.HttpError.create(error);
    }
    exports.send_Content(res, JSON.stringify(error), error.statusCode || 500, mime_1.mime_JSON, headers);
};
exports.send_Content = function (res, content, statusCode, mimeType, headers) {
    if (typeof content !== 'string' && content instanceof Buffer === false) {
        if (atma_utils_1.is_Object(content)) {
            exports.send_JSON(res, content, statusCode, headers);
            return;
        }
        if (content instanceof Error) {
            exports.send_Error(res, content, headers);
            return;
        }
        exports.send_Error(res, new HttpError_1.RuntimeError('Unexpected content response'));
        return;
    }
    res.setHeader('Content-Type', mimeType || mime_1.mime_HTML);
    res.statusCode = statusCode || 200;
    if (headers != null) {
        for (var key in headers) {
            res.setHeader(key, headers[key]);
        }
    }
    res.end(content);
};
