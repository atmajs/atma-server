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
var HttpPageBase = (function (_super) {
    __extends(HttpPageBase, _super);
    function HttpPageBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            id: null,
            env: null
        };
        return _this;
    }
    //mimeType = mime_HTML
    HttpPageBase.prototype.getScripts = function (config) {
        return config.$getScripts(this.data.id);
    };
    HttpPageBase.prototype.getStyles = function (config) {
        return config.$getStyles(this.data.id);
    };
    return HttpPageBase;
}(dependency_1.Class.Deferred));
exports.default = HttpPageBase;
;
