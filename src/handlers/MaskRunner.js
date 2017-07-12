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
var HandlerFactory_1 = require("../HandlerFactory");
var IHttpHandler_1 = require("../IHttpHandler");
var HttpPage_1 = require("../HttpPage/HttpPage");
var MaskRunner = (function (_super) {
    __extends(MaskRunner, _super);
    function MaskRunner(route, app) {
        var _this = _super.call(this) || this;
        _this.route = route;
        _this.app = app;
        _this.app = app;
        _this.route = route;
        return _this;
    }
    MaskRunner.prototype.process = function (req, res, config) {
        var url = req.url.replace(/\.\w+$/, '');
        var route = {
            current: this.route.current,
            value: { template: url, master: null }
        };
        var page = new HttpPage_1.default(route, this.app);
        page
            .process(req, res, config)
            .pipe(this);
        return this;
    };
    return MaskRunner;
}(IHttpHandler_1.default));
;
HandlerFactory_1.default.Handlers.MaskRunner = MaskRunner;
