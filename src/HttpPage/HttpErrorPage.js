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
var vars_1 = require("../vars");
var fn_1 = require("../util/fn");
var HttpPageBase_1 = require("./HttpPageBase");
var page_utils_1 = require("./page-utils");
var HttpErrorPage = (function (_super) {
    __extends(HttpErrorPage, _super);
    function HttpErrorPage(error, pageData, config) {
        var _this = _super.call(this) || this;
        _this._setPageData(pageData, config);
        _this.model = error;
        return _this;
    }
    HttpErrorPage.prototype._setPageData = function (data, cfg) {
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
        if (this.template == null && this.compoPath == null && this.templatePath == null)
            this.templatePath = cfg.$getTemplate(data);
        if (this.master == null && this.masterPath == null)
            this.masterPath = cfg.$getMaster(data);
    };
    HttpErrorPage.send = function (error, req, res, config) {
        var pageCfg = config.page, errorPages = pageCfg.errors, genericPage = pageCfg.error;
        var pageData = (errorPages && errorPages[error.statusCode]) || genericPage;
        if (pageData == null) {
            pageData = {
                masterPath: '',
                templatePath: vars_1.LIB_DIR.combine('../pages/error/error.mask').toString()
            };
        }
        return new HttpErrorPage(error, pageData, config).process(req, res, config);
    };
    HttpErrorPage.prototype.process = function (req, res, config) {
        this
            .done(page_utils_1.pageError_sendDelegate(res, this.model))
            .fail(page_utils_1.pageError_failDelegate(res, this.model));
        page_utils_1.page_proccessRequest(this, req, res, config);
    };
    HttpErrorPage.prototype._load = function () {
        this.resource = dependency_1.include
            .instance()
            .load(page_utils_1.page_pathAddAlias(this.masterPath, 'Master'), page_utils_1.page_pathAddAlias(this.templatePath, 'Template'))
            .js(page_utils_1.page_pathAddAlias(this.compoPath, 'Compo'))
            .done(fn_1.fn_proxy(this._response, this));
        return this;
    };
    HttpErrorPage.prototype._response = function (resp) {
        var master = resp.load.Master || this.master, template = resp.load.Template || this.template, nodes = this.nodes || template;
        if (master == null && this.masterPath !== '') {
            this.reject(new HttpError_1.HttpError('Page: Masterpage not found'));
            return;
        }
        if (nodes == null) {
            this.reject(new HttpError_1.HttpError('Page: Template not found'));
            return;
        }
        if (master)
            dependency_1.mask.render(dependency_1.mask.parse(master));
        page_utils_1.page_process(this, nodes, fn_1.fn_delegate(page_utils_1.page_resolve, this));
    };
    return HttpErrorPage;
}(HttpPageBase_1.default));
;
exports.default = HttpErrorPage;
