const Utils = require('atma-utils');

export const logger = require('atma-logger');
export const io          = global.io && global.io.File ? global.io : require('atma-io');
export const Class       = require('atma-class');
export const ruta        = global.ruta  || require('ruta');
export const mask        = global.mask  || require('maskjs');
export const jmask       = mask.jmask;
export const Compo       = mask.Compo;
export const Routes      = ruta.Collection;
export const Log         = logger('atma-server');
export const { class_Uri: Uri } = Utils;
export const { is_String, is_Function, is_Array, is_Object } = Utils;
export const { obj_extend, obj_default } = Utils; 

if (global.include == null) {
    require('includejs');
}
export const include     = global.include;
export const includeLib  = global.includeLib;

