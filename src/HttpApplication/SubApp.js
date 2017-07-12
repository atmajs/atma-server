"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var Application_1 = require("./Application");
var status_initial = '', status_loading = 'loading', status_loaded = 'loaded', status_errored = 'error';
var HttpSubApplication = (function () {
    function HttpSubApplication(path, data, parentApp) {
        this.status = status_initial;
        this.app_ = null;
        this.process = function (req, res) {
            if (this.status === status_loading) {
                this
                    .dfr
                    .done(this.pipe.bind(this, req, res));
                return;
            }
            if (this.status === status_loaded) {
                this.pipe(req, res);
                return;
            }
            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            res.end('<Sub Application Errored> ' + this.path_);
        };
        this.pipe = function (req, res) {
            if (req.url.length < this.path_.length) {
                res.writeHead(301, {
                    'Location': this.path_
                });
                res.end();
                return;
            }
            prepairUrl(req, this);
            this.app_.process(req, res);
        };
        /* execute raw request */
        this.execute = function (req, res) {
            prepairUrl(req, this);
            respond_Raw(this.app_, req, res);
        };
        if (path[0] !== '/')
            path = '/' + path;
        if (path[path.length - 1] !== '/')
            path += '/';
        this.path_ = path;
        this.dfr = new dependency_1.Class.Deferred;
        if (data instanceof Application_1.default) {
            this.app_ = data;
            this.status = status_loaded;
            return;
        }
        var controller = data.controller || data, that = this;
        if (dependency_1.is_String(controller)) {
            this.status = status_loading;
            var base = parentApp.config.base || parentApp.base || '/';
            dependency_1.include
                .instance(base)
                .setBase(base)
                .js(controller + '::App')
                .done(function (resp) {
                if (resp.App instanceof Application_1.default) {
                    resp
                        .App
                        .done(function (app) {
                        that.app_ = app;
                        that.process = that.pipe;
                        that.status = status_loaded;
                        that.dfr.resolve();
                    });
                    return;
                }
                that.status = status_errored;
            });
            return;
        }
        var configs = data.configs, config = data.config;
        if (config == null && configs == null)
            configs = path;
        this.status = status_loading;
        new Application_1.default({
            configs: configs,
            config: config
        })
            .done(function (app) {
            that.app_ = app;
            that.process = that.pipe;
            that.status = status_loaded;
            that.dfr.resolve();
        });
    }
    return HttpSubApplication;
}());
exports.default = HttpSubApplication;
;
function prepairUrl(req, subapp) {
    req.url = req.url.replace(subapp.path_, '/');
}
