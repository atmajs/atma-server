
import logger = require('atma-logger');
import Utils = require('atma-utils');
import AppConfig = require('appcfg');

let root = <any> global;
if (root.include == null) {
    require('includejs');
}


export const mask        = root.mask  || require('maskjs');
export const jmask       = mask.jmask;
export const Compo       = mask.Compo;
export const io: typeof import('atma-io') = root.io && root.io.File ? root.io : require('atma-io');
export const { class_Uri: Uri } = Utils;
export const { is_String, is_Function, is_Array, is_Object } = Utils;
export const { obj_extend, obj_extendDefaults } = Utils;

export const include     = root.include;
export const includeLib  = root.includeLib;


export { AppConfig, logger }
