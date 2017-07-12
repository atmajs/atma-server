"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var path_1 = require("../util/path");
var EnvUtils_1 = require("./EnvUtils");
var ConfigUtils_1 = require("./ConfigUtils");
var DEFAULTS = [][0];
var PATH = 'server/config/**.yml';
var BUILD_PATH = 'public/build/stats.json';
function Config(params, app, done, fail) {
    params = params || {};
    var path_base = params.base, configs = params.configs, disablePackageJson = params.disablePackageJson === true, path_Build, appConfig;
    path_base = path_base == null
        ? 'file://' + path_1.path_normalize(process.cwd()) + '/'
        : path_1.path_resolveSystemUrl(path_base + '/');
    configs = ConfigUtils_1.cfg_prepair(path_base, configs, PATH);
    if (configs)
        // if `configs` null, do not load also build values
        path_Build = path_base + (params.buildDirectory || BUILD_PATH);
    if (params.config)
        appConfig = { config: params.config };
    var $sources = [
        {
            config: JSON.parse(DEFAULTS)
        },
        path_Build
            ? {
                path: path_Build,
                optional: true
            }
            : null,
        {
            config: ConfigUtils_1.default
        },
        disablePackageJson
            ? null
            : {
                path: path_base + 'package.json',
                getterProperty: 'atma',
                optional: true
            },
        {
            config: EnvUtils_1.default
        },
        appConfig
    ];
    if (configs) {
        $sources = $sources.concat(configs);
    }
    if (Array.isArray(params.sources))
        $sources = $sources.concat(params.sources);
    // do not allow to override `base` option in configuration.
    $sources.push({
        config: {
            base: path_base
        }
    });
    return require('appcfg')
        .fetch($sources)
        .fail(function (error) {
        if (fail != null) {
            fail(error);
            return;
        }
        error.message = '<app:configuration> ' + error.message;
        throw error;
    })
        .done(function () {
        var cfg = this;
        new dependency_1.Class.Await(ConfigUtils_1.configurate_Mask(cfg), ConfigUtils_1.configurate_Include(cfg), ConfigUtils_1.configurate_PageFiles(cfg, app), ConfigUtils_1.configurate_Pages(cfg, app), ConfigUtils_1.configurate_Plugins(cfg, app), ConfigUtils_1.configurate_BowerAndCommonJS(cfg, app))
            .done(function () {
            if (done != null)
                process.nextTick(done);
        })
            .fail(function (error) {
            if (fail != null)
                process.nextTick(function () { return fail(error); });
        });
    });
}
exports.default = Config;
;
