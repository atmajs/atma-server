
import Class = require('atma-class');
import logger = require('atma-logger');
import Utils = require('atma-utils');
import AppConfig = require('appcfg');

let root = <any> global;
if (root.include == null) {
    require('includejs');
}

let $anyClass: any = Class;
let $Class = $anyClass.default ?? $anyClass.Class ?? $anyClass;


export const ruta        = require('ruta');
export const mask        = root.mask  || require('maskjs');
export const jmask       = mask.jmask;
export const Compo       = mask.Compo;
export const Routes      = ruta.Collection;
export const io          = root.io && root.io.File ? root.io : require('atma-io');
export const { class_Uri: Uri } = Utils;
export const { is_String, is_Function, is_Array, is_Object } = Utils;
export const { obj_extend, obj_extendDefaults } = Utils; 

export const include     = root.include;
export const includeLib  = root.includeLib;


export { $Class as Class, AppConfig, logger }
