const ClassFactory = require('atma-class') as typeof Class;
const logger = require('atma-logger');
const Utils = require('atma-utils');
const root = <any> global;

if (root.include == null) {
    require('includejs');
}

export const io = root.io && root.io.File ? root.io : require('atma-io');

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


export { ClassFactory as Class, logger }