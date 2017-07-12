"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var HttpError_1 = require("../HttpError/HttpError");
var fn_1 = require("../util/fn");
var HttpPageBase_1 = require("./HttpPageBase");
var HttpErrorPage_1 = require("./HttpErrorPage");
var page_utils_1 = require("./page-utils");
var HttpPage = (function (_super) {
    __extends(HttpPage, _super);
    function HttpPage(mix, app) {
        var _this = _super.call(this) || this;
        if (mix == null)
            return _this;
        var route = mix;
        if (route.value == null) {
            dependency_1.logger.error('<HttpPage> Route value is undefined');
            return _this;
        }
        var cfg = app.config, data = route.value;
        _this.app = app;
        _this.route = cfg.page.route;
        _this.query = route.current && route.current.params;
        _this._setPageData(data, cfg);
        return _this;
    }
    HttpPage.prototype._setPageData = function (data, cfg) {
        this.data = data;
        if (data.masterPath != null)
            this.masterPath = data.masterPath;
        if (data.templatePath != null)
            this.templatePath = data.templatePath;
        if (data.master)
            this.masterPath = cfg.$getMaster(data);
        if (data.template)
            this.templatePath = cfg.$getTemplate(data);
        if (data.compo)
            this.compoPath = cfg.$getCompo(data);
        // Generate default template path
        if (this.template == null && this.compoPath == null && this.templatePath == null) {
            this.templatePath = cfg.$getTemplate(data);
        }
    };
    HttpPage.prototype.process = function (req, res, config) {
        if (this.middleware == null)
            return page_utils_1.page_proccessRequest(this, req, res, config);
        this.middleware.process(req, res, page_utils_1.page_proccessRequestDelegate(this, req, res, config), config);
        return this;
    };
    HttpPage.prototype.sendError = function (error, req, res, config) {
        HttpErrorPage_1.default.send(error, req, res, config);
    };
    HttpPage.prototype._load = function () {
        var env = this.data.env, env_server, env_both;
        if (env != null) {
            env_both = env.both;
            env_server = env.server;
        }
        var base = this.ctx.config.base, parent = this.app.resources;
        this.resource = dependency_1.include
            .instance(base, parent)
            .setBase(base)
            .load(page_utils_1.page_pathAddAlias(this.masterPath, 'Master'), page_utils_1.page_pathAddAlias(this.templatePath, 'Template'))
            .js(page_utils_1.page_pathAddAlias(this.compoPath, 'Compo'))
            .js(env_both)
            .js(env_server)
            .done(fn_1.fn_proxy(this._response, this));
        return this;
    };
    HttpPage.prototype._response = function (resp) {
        var master = resp.load.Master || this.master, template = resp.load.Template || this.template, Component = resp.Compo;
        if (master == null && this.masterPath) {
            this.reject(new HttpError_1.HttpError('Page: Masterpage not found'));
            return;
        }
        if (template == null && Component == null) {
            this.reject(new HttpError_1.HttpError('Page: Template not found'));
            return;
        }
        if ('master' === this.query.debug) {
            this.resolve(master);
            return;
        }
        if ('template' === this.query.debug) {
            this.resolve(template);
            return;
        }
        if (this.query.breakOn) {
            this.ctx.debug = { breakOn: this.query.breakOn };
        }
        if (master)
            dependency_1.mask.render(dependency_1.mask.parse(master));
        if (Component != null) {
            if (template && Component.template == null)
                Component.template = template;
            if (Component.mode == null)
                Component.mode = 'server';
            this.nodes = new dependency_1.mask
                .Dom
                .Component('', null, Component);
        }
        if (dependency_1.is_Function(this.onRenderStart))
            this.onRenderStart(this.model, this.ctx);
        var nodes = this.nodes || template;
        if (this.query.partial) {
            page_utils_1.page_processPartial(this, nodes, this.query.partial);
            return;
        }
        page_utils_1.page_process(this, nodes, fn_1.fn_delegate(page_utils_1.page_resolve, this));
    };
    return HttpPage;
}(HttpPageBase_1.default));
exports.default = HttpPage;
