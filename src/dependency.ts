
import Class = require('atma-class');
import io = require('atma-io');
import logger = require('atma-logger');
import Utils = require('atma-utils');

let root = <any> global;
if (root.include == null) {
    require('includejs');
}

export { io }

export const ruta        = root.ruta  || require('ruta');
export const mask        = root.mask  || require('maskjs');
export const jmask       = mask.jmask;
export const Compo       = mask.Compo;
export const Routes      = ruta.Collection;
export const { class_Uri: Uri } = Utils;
export const { is_String, is_Function, is_Array, is_Object } = Utils;
export const { obj_extend, obj_extendDefaults } = Utils; 

export const include     = root.include;
export const includeLib  = root.includeLib;


export { Class, logger }
