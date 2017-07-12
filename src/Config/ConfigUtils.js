"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dependency_1 = require("../dependency");
var path_1 = require("../util/path");
var IncludeUtils_1 = require("./IncludeUtils");
var PathUtils_1 = require("./PathUtils");
exports.default = {
    $formatPath: PathUtils_1.default.format
};
// private
var cfg_prepair, configurate_Include, configurate_Mask, configurate_Pages, configurate_PageFiles, configurate_Plugins, configurate_Projects, configurate_BowerAndCommonJS;
exports.cfg_prepair = cfg_prepair;
exports.configurate_Include = configurate_Include;
exports.configurate_Mask = configurate_Mask;
exports.configurate_Pages = configurate_Pages;
exports.configurate_PageFiles = configurate_PageFiles;
exports.configurate_Plugins = configurate_Plugins;
exports.configurate_Projects = configurate_Projects;
exports.configurate_BowerAndCommonJS = configurate_BowerAndCommonJS;
(function () {
    exports.cfg_prepair = cfg_prepair = function (base, configs, defaults) {
        if (configs == null && configs !== void 0)
            return null;
        if (configs === void 0)
            return [prepair(defaults)];
        if (typeof configs === 'string')
            return [prepair(configs)];
        return configs.map(prepair);
        // private
        function prepair(config) {
            if (typeof config !== 'string') {
                return {
                    config: config
                };
            }
            var path = path_1.path_hasProtocol(config)
                ? config
                : dependency_1.Uri.combine(base, config);
            return { path: path };
        }
    };
    exports.configurate_Include = configurate_Include = function (cfg) {
        var resource = dependency_1.include.instance(cfg.base);
        cfg.env.both.routes
            && resource.routes(cfg.env.both.routes);
        cfg.env.both.include
            && resource.cfg(cfg.env.both.include.cfg);
        cfg.env.server.include
            && resource.cfg(cfg.env.server.include.cfg);
        cfg.env.server.routes
            && resource.routes(cfg.env.server.routes);
        IncludeUtils_1.default.prepair(cfg.env.server.scripts);
        IncludeUtils_1.default.prepair(cfg.env.client.scripts);
    };
    exports.configurate_Mask = configurate_Mask = function (cfg) {
        var maskCfg = cfg.mask;
        if (maskCfg == null)
            return;
        dependency_1.mask.compoDefinitions(maskCfg.compos, maskCfg.utils, maskCfg.attributes);
    };
    exports.configurate_Pages = configurate_Pages = function (cfg) {
        var pages = cfg.pages;
        if (pages == null)
            return;
        var page, key;
        for (key in pages) {
            page = pages[key];
            if (page.id == null) {
                page.id = key;
            }
            if (page.route == null)
                page.route = key;
            //if (pages[page.id] && pages[page.id] !== page)
            //	logger.error('<page:register> overwrite existed ID',
            //		key.bold,
            //		pages[page.id] === page);
            //
            //pages[page.id] = page;
            //
            //delete pages[key];
        }
    };
    exports.configurate_PageFiles = configurate_PageFiles = function (cfg, app) {
        var folder = cfg.page.location.pageFiles;
        var base = cfg.$get('base');
        var pageFilesFolder = dependency_1.Uri.combine(base, folder);
        if (dependency_1.io.Directory.exists(pageFilesFolder) === false) {
            return;
        }
        return dependency_1.io
            .Directory
            .readFilesAsync(pageFilesFolder, '**.html.mask')
            .then(function (files) {
            files.forEach(function (file) {
                var rel = file.uri.toRelativeString(pageFilesFolder);
                console.log(rel);
                var i = rel.indexOf(/\.|\//);
                var name = rel.substring(0, i);
                i = rel.lastIndexOf('/');
                var path = rel.substring(0, i);
                cfg.rewrites[name] = dependency_1.Uri.combine(folder, path);
                dependency_1.logger.log(cfg.rewrites);
            });
        });
    };
    exports.configurate_Plugins = configurate_Plugins = function (cfg, app) {
        if (cfg.plugins == null)
            return null;
        if (app.isRoot === false)
            return null;
        var dfr = new dependency_1.Class.Await, sources = cfg.plugins.map(function (name) {
            var base = new dependency_1.Uri(cfg.base), path = 'node_modules/' + name + '/index.js', x;
            while (true) {
                x = base.combine(path);
                if (dependency_1.io.File.exists(x)) {
                    path = x.toString();
                    break;
                }
                base = base.combine('../');
                if (base.path === '' || base.path === '/')
                    break;
            }
            return path + '::' + name;
        });
        dependency_1.include
            .instance(cfg.base)
            .js(sources)
            .done(function (resp) {
            for (var key in resp) {
                if (resp[key] && typeof resp[key].attach === 'function')
                    resp[key].attach(app);
            }
            dfr.resolve();
        });
        return dfr;
    };
    /* Resolve CommonJS, Bower resource paths */
    (function () {
        exports.configurate_BowerAndCommonJS = configurate_BowerAndCommonJS = function (cfg, app) {
            return new dependency_1.Class.Await(handleAllEnvironments(cfg, 'npm'), handleAllEnvironments(cfg, 'bower'));
        };
        var _types = {
            'bower': {
                'dir': 'bower_components',
                'package': 'bower.json',
                'alternate': 'component.json'
            },
            'npm': {
                'dir': 'node_modules',
                'package': 'package.json'
            }
        };
        var _resourceTypeExtensions = {
            'scripts': 'js',
            'styles': 'css'
        };
        var _extensionTypes = {
            'js': 'scripts',
            'css': 'styles'
        };
        function handleAllEnvironments(config, packageSystem) {
            return new dependency_1.Class.Await(handleEnvironments(config, packageSystem, 'scripts'), handleEnvironments(config, packageSystem, 'styles'));
        }
        function handleEnvironments(config, packageSystem, resourceType) {
            return new dependency_1.Class.Await(handleEnvironment(config, packageSystem, resourceType, 'client'), handleEnvironment(config, packageSystem, resourceType, 'server'), handleEnvironment(config, packageSystem, resourceType, 'both'));
        }
        function handleEnvironment(config, packageSystem, resourceType, envType) {
            var env = config.env[envType], resources = env[resourceType], paths = resources && resources[packageSystem];
            if (paths == null)
                return null;
            var dfr = new dependency_1.Class.Deferred;
            resolvePaths(config, resourceType, packageSystem, paths, function (mappings) {
                var arr = resources[packageSystem], imax = arr.length, i = -1, j = -1, x;
                while (++i < imax) {
                    x = mappings[arr[i]];
                    if (dependency_1.is_String(x)) {
                        arr[i] = x;
                        continue;
                    }
                    if (dependency_1.is_Array(x)) {
                        arr.splice.apply(arr, [i, 1].concat(x));
                        i += x.length - 1;
                        imax += x.length - 1;
                        continue;
                    }
                    dependency_1.logger.error('Module path mapping is not defined', arr[i]);
                }
                dfr.resolve();
            });
            return dfr;
        }
        function resolvePaths(config, resourceType, packageSystem, arr, cb) {
            var base = new dependency_1.Uri(config.base), paths = [], mappings = {};
            var data = _types[packageSystem];
            if (data == null)
                throw Error('Support:' + Object.keys(_types) + ' Got:' + packageSystem);
            var await = new dependency_1.Class.Await;
            var dirName = data.dir, packageName = data.package;
            arr.forEach(function (name) {
                if (name == null) {
                    // could be when conditional configuration item is falsy
                    return;
                }
                var map = name;
                var aliasIndex = name.indexOf('::'), alias = '';
                if (aliasIndex !== -1) {
                    alias = name.substring(aliasIndex);
                    name = name.substring(0, aliasIndex);
                }
                if (name.indexOf('/') !== -1) {
                    if (/\.\w+$/.test(name) === false)
                        name += '.' + _resourceTypeExtensions[resourceType];
                    mappings[map] = '/'
                        + dirName
                        + '/'
                        + name
                        + alias;
                    return;
                }
                var pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + packageName);
                if (pckgPath == null) {
                    if (data.alternate) {
                        pckgPath = resolveModulePath(base, dirName + '/' + name + '/' + data.alternate);
                    }
                    if (pckgPath == null) {
                        dependency_1.logger.error('<Module is not resolved>', name);
                        return;
                    }
                }
                dependency_1.io
                    .File
                    .readAsync(pckgPath)
                    .done(function (pckg) {
                    var base = '/' + dirName + '/' + name + '/', main = pckg.main;
                    if (main == null)
                        main = 'index.js';
                    if (dependency_1.is_String(main)) {
                        mapPath(mappings, map, main, base, alias);
                        return;
                    }
                    if (dependency_1.is_Array(main)) {
                        mapPathMany(mappings, map, main, base, alias, resourceType);
                        return;
                    }
                    dependency_1.logger.error('Main is not defined', pckgPath);
                })
                    .fail(dependency_1.logger.error)
                    .always(await.delegate(name, false));
            });
            await.always(function () {
                cb(mappings);
            });
        }
        function mapPathMany(mappings, str, mainArr, base, alias, resourceType) {
            var imax = mainArr.length, i = -1, ext, arr = [];
            while (++i < imax) {
                ext = _file_getExt(mainArr[i]);
                if (_extensionTypes[ext] === resourceType)
                    arr.push(base + mainArr[i] + alias);
            }
            mappings[str] = arr;
        }
        function mapPath(mappings, str, main, base, alias) {
            mappings[str] = base + main + alias;
        }
        function resolveModulePath(base, path) {
            var x;
            while (true) {
                x = base.combine(path);
                if (dependency_1.io.File.exists(x)) {
                    path = x.toString();
                    break;
                }
                base = base.combine('../');
                if (base.path === '' || base.path === '/')
                    return null;
            }
            return path;
        }
        function _file_getExt(path) {
            var i = path.lastIndexOf('.');
            return i === -1
                ? ''
                : path.substring(i + 1);
        }
    }());
}());
