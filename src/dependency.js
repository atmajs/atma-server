"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_class_1 = require("atma-class");
exports.Class = atma_class_1.default;
var atma_logger_1 = require("atma-logger");
var Utils = require('atma-utils');
var root = global;
if (root.include == null) {
    require('includejs');
}
exports.io = root.io && root.io.File ? root.io : require('atma-io');
exports.ruta = root.ruta || require('ruta');
exports.mask = root.mask || require('maskjs');
exports.jmask = exports.mask.jmask;
exports.Compo = exports.mask.Compo;
exports.Routes = exports.ruta.Collection;
exports.Log = atma_logger_1.default('atma-server');
exports.logger = exports.Log;
exports.Uri = Utils.class_Uri;
exports.is_String = Utils.is_String, exports.is_Function = Utils.is_Function, exports.is_Array = Utils.is_Array, exports.is_Object = Utils.is_Object;
exports.obj_extend = Utils.obj_extend, exports.obj_extendDefaults = Utils.obj_extendDefaults;
exports.include = root.include;
exports.includeLib = root.includeLib;
