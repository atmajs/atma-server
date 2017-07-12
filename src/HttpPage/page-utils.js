"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("../HttpApplication/Application");
var HttpPage_1 = require("./HttpPage");
var HttpContext_1 = require("./HttpContext");
var dependency_1 = require("../dependency");
var Middleware_1 = require("../Business/Middleware");
var send_1 = require("../util/send");
var mime_1 = require("../const/mime");
exports.page_Create = function (classProto) {
    if (classProto.middleware) {
        classProto.middleware = new Middleware_1.default(classProto.middleware);
    }
    if (classProto.Base == null) {
        classProto.Base = HttpPage_1.default;
    }
    else if (classProto.Extends == null) {
        classProto.Extends = HttpPage_1.default;
    }
    else if (Array.isArray(classProto.Extends)) {
        classProto.Extends.push(HttpPage_1.default);
    }
    else {
        classProto.Extends = [HttpPage_1.default, classProto.Extends];
    }
    return dependency_1.Class(classProto);
};
exports.page_rewriteDelegate = function (page) {
    var ctx = page.ctx;
    if (ctx.rewriteCount == null)
        ctx.rewriteCount = 1;
    if (++ctx.rewriteCount > 5) {
        page.reject('Too much rewrites, last path: ' + ctx._rewrite);
        return;
    }
    return function (rewrittenHandler) {
        if (rewrittenHandler == null) {
            page.reject('Rewritten Path is not valid: ' + ctx._rewrite);
            return;
        }
        rewrittenHandler
            .process(ctx.req, ctx.res, ctx.config)
            .done(page.resolveDelegate())
            .fail(page.rejectDelegate());
    };
};
exports.page_proccessRequestDelegate = function (page, req, res, config) {
    return function (error) {
        if (error) {
            page.reject(error);
            return;
        }
        exports.page_proccessRequest(page, req, res, config);
    };
};
exports.page_proccessRequest = function (page, req, res, config) {
    if (page.pattern) {
        var query = dependency_1.ruta
            .parse(page.pattern, req.url)
            .params;
        for (var key in query) {
            if (page.query[key] == null)
                page.query[key] = query[key];
        }
    }
    page.ctx = new HttpContext_1.default(page, config, req, res);
    if ('redirect' in page.data) {
        page.ctx.redirect(page.data.redirect);
        return page;
    }
    if ('rewrite' in page.data) {
        req.url = page.data.rewrite;
        page.app.handlers.get(page.app, req, exports.page_rewriteDelegate(page));
        return page;
    }
    if ('secure' in page.data) {
        var user = req.user, secure = page.data.secure, role = secure && secure.role;
        if (user == null || (role && user.isInRole(role)) === false) {
            page.ctx.redirect(Application_1.default.current.config.page.urls.login);
            return page;
        }
    }
    return page._load();
};
exports.page_resolve = function (page, data) {
    if (page.ctx._redirect != null) {
        // response was already flushed
        return;
    }
    page.resolve(data);
};
exports.page_pathAddAlias = function (path, alias) {
    if (path == null || path === '')
        return null;
    var i = path.indexOf('::');
    if (i !== -1)
        path = path.slice(0, -i);
    return path + '::' + alias;
};
exports.page_process = function (page, nodes, onSuccess) {
    dependency_1.mask
        .renderAsync(nodes, page.model, page.ctx, null, page)
        .done(function (html) {
        if (page.ctx._rewrite != null) {
            Application_1.default
                .current
                .handlers
                .get(page.ctx._rewrite, exports.page_rewriteDelegate(page));
            return;
        }
        onSuccess(html);
    })
        .fail(page.rejectDelegate());
};
var page_processPartial;
exports.page_processPartial = page_processPartial;
(function () {
    exports.page_processPartial = page_processPartial = function (page, nodes, selectors) {
        nodes = __getTemplate(page, nodes, selectors);
        __getResources(page, page.ctx.config, function (meta) {
            if (meta.templates) {
                var node = dependency_1.mask.jmask(':html').text(meta.templates);
                nodes.push(node);
            }
            exports.page_process(page, nodes, function (html) {
                var json = {
                    type: 'partial',
                    html: html,
                    scripts: meta.scripts,
                    styles: meta.styles
                };
                exports.page_resolve(page, json);
            });
        });
    };
    function __getTemplate(page, nodes, selector) {
        var arr = [], selectors = selector.split(';'), imax = selectors.length, i = -1, x;
        while (++i < imax) {
            selector = selectors[i];
            if (selector === '')
                continue;
            x = dependency_1.mask.jmask(nodes).find(selector);
            if (x == null) {
                dependency_1.logger.warn('<HttpPage.partial> Not found `%s`', selectors[i]);
                continue;
            }
            arr.push(x);
        }
        return arr;
    }
    function __getResources(page, config, cb) {
        if (Scripts == null)
            Scripts = dependency_1.mask.getHandler('atma:scripts');
        if (Styles == null)
            Styles = dependency_1.mask.getHandler('atma:styles');
        var styles = Styles.getModel(page, config, true);
        Scripts.getModel(page, config, true, function (scripts) {
            cb({
                scripts: scripts.scripts,
                styles: styles
            });
        });
    }
    var Scripts, Styles;
}());
exports.pageError_sendDelegate = function (res, error) {
    return function (html) {
        send_1.send_Content(res, html, error.statusCode || 500, mime_1.mime_HTML);
    };
};
exports.pageError_failDelegate = function (res, error) {
    return function (internalError) {
        var str = dependency_1.is_Object(internalError)
            ? JSON.stringify(internalError)
            : internalError;
        str += '\nError: ' + error.message;
        send_1.send_Content(res, 'ErrorPage Failed: ' + str, 500, mime_1.mime_PLAIN);
    };
};
