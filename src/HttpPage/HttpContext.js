"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpContext = (function () {
    function HttpContext(page, config, req, res) {
        this.page = page;
        this.config = config;
        this.req = req;
        this.res = res;
    }
    HttpContext.prototype.redirect = function (url, code) {
        if (code == null)
            code = 302;
        this.res.statusCode = code;
        this.res.setHeader('Location', url);
        this.res.setHeader('Content-Length', '0');
        this.res.end();
        this._redirect = url;
    };
    HttpContext.prototype.rewrite = function (url) {
        this._rewrite = url;
    };
    return HttpContext;
}());
exports.default = HttpContext;
