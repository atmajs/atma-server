import Application from '../HttpApplication/Application'
import HttpPage from './HttpPage'
import HttpContext from './HttpContext'
import { logger, Class, mask, ruta, is_Object } from '../dependency'
import MiddlewareRunner from '../Business/Middleware'
import { send_Content } from '../util/send'
import { mime_HTML, mime_PLAIN } from '../const/mime'


export const page_Create = function (classProto) {

    if (classProto.middleware) {
        classProto.middleware = new MiddlewareRunner(
            classProto.middleware
        );
    }

    if (classProto.Base == null) {
        classProto.Base = HttpPage;
    } else if (classProto.Extends == null) {
        classProto.Extends = HttpPage;
    } else if (Array.isArray(classProto.Extends)) {
        classProto.Extends.push(HttpPage);
    } else {
        classProto.Extends = [HttpPage, classProto.Extends];
    }

    return Class(classProto);
};


export const page_rewriteDelegate = function (page) {
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
            .then(
                (...args) => page.resolve(...args),
                (...args) => page.reject(...args)
            );
    }
};

export const page_processRequestDelegate = function (page, req, res, config) {
    return function (error) {
        if (error) {
            page.reject(error);
            return;
        }
        page_processRequest(page, req, res, config);
    };
};

export const page_processRequest = function (page, req, res, config) {
    if (page.pattern) {
        var query = ruta
            .parse(page.pattern, req.url)
            .params;

        for (var key in query) {
            if (page.query[key] == null)
                page.query[key] = query[key];
        }
    }

    page.ctx = new HttpContext(page, config, req, res);
    if ('redirect' in page.data) {
        page.ctx.redirect(page.data.redirect);
        return page;
    }
    if ('rewrite' in page.data) {
        req.url = page.data.rewrite;
        page.app.handlers.get(page.app, req, page_rewriteDelegate(page));
        return page;
    }
    if ('secure' in page.data) {

        var user = req.user,
            secure = page.data.secure,
            role = secure && secure.role
            ;

        if (user == null || (role && user.isInRole(role)) === false) {
            page.ctx.redirect(Application.current.config.page.urls.login);
            return page;
        }
    }
    return page._load();
};

export const page_resolve = function (page, data) {
    if (page.ctx._redirect != null) {
        // response was already flushed
        return;
    }

    page.resolve(data);
};

export const page_pathAddAlias = function (path, alias) {
    if (path == null || path === '')
        return null;

    var i = path.indexOf('::');
    if (i !== -1)
        path = path.slice(0, -i);

    return path + '::' + alias;
};

export const page_process = function (page, nodes, onSuccess) {
    mask
        .renderAsync(
            nodes,
            page.model,
            page.ctx,
            null,
            page
        )
        .done(function (html) {
            if (page.ctx._rewrite != null) {
                Application
                    .current
                    .handlers
                    .get(page.ctx._rewrite, {} as any, page_rewriteDelegate(page));
                return;
            }
            onSuccess(html);
        })
        .fail(page.rejectDelegate());
};

let page_processPartial
(function () {
    page_processPartial = function (page, nodes, selectors) {
        nodes = __getTemplate(page, nodes, selectors);

        __getResources(page, page.ctx.config, function (meta) {

            if (meta.templates) {
                var node = mask.jmask(':html').text(meta.templates);
                nodes.push(node);
            }

            page_process(page, nodes, function (html) {
                var json = {
                    type: 'partial',
                    html: html,
                    scripts: meta.scripts,
                    styles: meta.styles
                };
                page_resolve(page, json);
            });
        });
    };
    function __getTemplate(page, nodes, selector) {
        var arr = [],
            selectors = selector.split(';'),
            imax = selectors.length,
            i = -1,
            x;
        while (++i < imax) {
            selector = selectors[i];
            if (selector === '')
                continue;

            x = mask.jmask(nodes).find(selector);
            if (x == null) {
                logger.warn('<HttpPage.partial> Not found `%s`', selectors[i]);
                continue;
            }
            arr.push(x);
        }
        return arr;
    }
    function __getResources(page, config, cb) {
        if (Scripts == null)
            Scripts = mask.getHandler('atma:scripts');

        if (Styles == null)
            Styles = mask.getHandler('atma:styles');

        var styles = Styles.getModel(page, config, true)

        Scripts.getModel(page, config, true, function (scripts) {
            cb({
                scripts: scripts.scripts,
                styles: styles
            });
        })
    }

    var Scripts, Styles;
}());
export { page_processPartial }

export const pageError_sendDelegate = function (req, res, error, app) {

    return function (html) {
        send_Content(req, res, html, error.statusCode || 500, mime_HTML, null, app, 0);
    };
};

export const pageError_failDelegate = function (req, res, error, app) {
    return function (internalError) {
        var str = is_Object(internalError)
            ? JSON.stringify(internalError)
            : internalError
            ;

        str += '\nError: ' + error.message

        send_Content(req, res, 'ErrorPage Failed: ' + str, 500, mime_PLAIN, null, app, 0);
    }
};
