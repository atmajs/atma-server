import { io, logger, include, mask, Uri, includeLib, is_Array, is_String } from '../dependency'
import { path_hasProtocol } from '../util/path'
import IncludeUtils from './IncludeUtils'
import PathUtils from './PathUtils'
import { class_Dfr } from 'atma-utils';


export default {
    $formatPath: PathUtils.format
};

export function cfg_prepair(base, configs: string | string[], defaults) {
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
        var path = path_hasProtocol(config)
            ? config
            : Uri.combine(base, config)
            ;
        return { path: path };
    }
};

export const configurate_Include = async function (cfg) {
    var resource = include.instance(cfg.base);

    cfg.env.both.routes
        && resource.routes(cfg.env.both.routes);

    cfg.env.both.include
        && resource.cfg(cfg.env.both.include.cfg);

    cfg.env.server.include
        && resource.cfg(cfg.env.server.include.cfg);

    cfg.env.server.routes
        && resource.routes(cfg.env.server.routes);


    IncludeUtils.prepair(cfg.env.server.scripts);
    IncludeUtils.prepair(cfg.env.client.scripts);
};

export const configurate_Mask = function (cfg) {
    var maskCfg = cfg.mask;
    if (maskCfg == null)
        return;

    mask.compoDefinitions(
        maskCfg.compos,
        maskCfg.utils,
        maskCfg.attributes
    );
};

export const configurate_Pages = function (cfg, app?) {
    var pages = cfg.pages;
    if (pages == null)
        return;

    var page,
        key;
    for (key in pages) {
        page = pages[key];

        /* TODO should we store both versions in pages hash: by key and id? */
        if (page.id == null) {
            page.id = key
                // .replace(/[^\w_-]/g, '_')
                // .replace(/[_]{2,}/g, '_')
                ;
        } else {
            pages[page.id] = page;
        }

        if (page.route == null) {
            page.route = key;
        }

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

export const configurate_PageFiles = function (cfg, app) {
    var folder = cfg.page.location.pageFiles;
    var base = cfg.$get('base');
    var pageFilesFolder = Uri.combine(base, folder);
    if (io.Directory.exists(pageFilesFolder) === false) {
        return;
    }

    return io
        .Directory
        .readFilesAsync(pageFilesFolder, '**.html.mask')
        .then(function (files) {

            files.forEach(file => {
                var rel = file.uri.toRelativeString(pageFilesFolder);

                var i = /\.|\//g.exec(rel).index;
                var name = rel.substring(0, i);

                i = rel.lastIndexOf('/');
                var path = rel.substring(0, i);

                let ruleIndex = {
                    rule: `^/${name}/?($|\\?.+) ${Uri.combine(folder, path)}/index.html.mask$1`
                }
                let ruleAssets = {
                    rule: `^/${name}/(.+) ${Uri.combine(folder, path)}/$1`
                }
                if (cfg.rewriteRules == null) {
                    cfg.rewriteRules = [];
                }
                cfg.rewriteRules.push(ruleIndex, ruleAssets);
            })
        });
};

export const configurate_Plugins = function (cfg, app) {
    if (cfg.plugins == null) {
        return null;
    }
    if (app.isRoot === false) {
        return null;
    }

    const dfr = new class_Dfr;
    const sources = cfg.plugins.map(function (name) {
        var base = new Uri(cfg.base),
            path = name[0] === '.' || name[0] === '/'
                ? name
                : 'node_modules/' + name + '/index.js',
            x;
        while (true) {
            x = base.combine(path);
            if (io.File.exists(x)) {
                path = x.toString();
                break;
            }

            base = base.combine('../');
            if (base.path === '' || base.path === '/')
                break;
        }
        return path + '::' + name;
    });

    include
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
let configurate_BowerAndCommonJS;
(function () {
    configurate_BowerAndCommonJS = function (cfg, app) {
        return Promise.all([
            handleAllEnvironments(cfg, 'npm'),
            handleAllEnvironments(cfg, 'bower')
        ]);
    };

    var _types = {
        'bower': {
            'dir': 'bower_components',
            'package': 'bower.json',
            'alternate': 'component.json'
        },
        'npm': {
            'dir': 'node_modules',
            'package': 'package.json',
            'alternate': null
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
        return Promise.all([
            handleEnvironments(config, packageSystem, 'scripts'),
            handleEnvironments(config, packageSystem, 'styles')
        ]);
    }
    function handleEnvironments(config, packageSystem, resourceType) {
        return Promise.all([
            handleEnvironment(config, packageSystem, resourceType, 'client'),
            handleEnvironment(config, packageSystem, resourceType, 'server'),
            handleEnvironment(config, packageSystem, resourceType, 'both')
        ]);
    }
    function handleEnvironment(config, packageSystem, resourceType, envType) {
        var env = config.env[envType],
            resources = env[resourceType],
            paths = resources && resources[packageSystem];
        if (paths == null)
            return null;

        var dfr = new class_Dfr;
        resolvePaths(config, resourceType, packageSystem, paths, function (mappings) {
            var arr = resources[packageSystem],
                imax = arr.length,
                i = -1, j = -1, x;
            while (++i < imax) {
                x = mappings[arr[i]];
                if (is_String(x)) {
                    arr[i] = x;
                    continue;
                }
                if (is_Array(x)) {
                    arr.splice.apply(arr, [i, 1].concat(x));
                    i += x.length - 1;
                    imax += x.length - 1;
                    continue;
                }
                logger.error('Module path mapping is not defined', arr[i]);
            }
            dfr.resolve();
        });
        return dfr;
    }
    async function resolvePaths(config, resourceType, packageSystem: 'bower' | 'npm', arr, cb) {
        var base = new Uri(config.base),
            paths = [],
            mappings = {};

        var data = _types[packageSystem];
        if (data == null)
            throw Error('Support:' + Object.keys(_types) + ' Got:' + packageSystem);

        var dirName = data.dir,
            packageName = data.package;
        let promises = arr.map(async function (name) {
            if (name == null) {
                // could be when conditional configuration item is falsy
                return;
            }

            var map = name;
            var aliasIndex = name.indexOf('::'),
                alias = '';
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
                    + alias
                    ;
                return;
            }
            let pckgPath = resolveModulePath(
                base, dirName + '/' + name + '/' + packageName
            );
            if (pckgPath == null) {
                if (data.alternate) {
                    pckgPath = resolveModulePath(
                        base, dirName + '/' + name + '/' + data.alternate
                    );
                }
                if (pckgPath == null) {
                    logger.error('<Module is not resolved>', name);
                    return;
                }
            }
            try {
                let pckg = await io.File.readAsync(pckgPath);
                var pckgbase = '/' + dirName + '/' + name + '/',
                    main = pckg.main;
                if (main == null) {
                    main = 'index.js';
                }
                if (is_String(main)) {
                    mapPath(mappings, map, main, pckgbase, alias);
                    return;
                }
                if (is_Array(main)) {
                    mapPathMany(mappings, map, main, pckgbase, alias, resourceType);
                    return;
                }
                logger.error('Main is not defined', pckgPath);

            } catch (error) {
                logger.error(`Scripts via configuration. Path error: ${error.message}`);
            }

        });

        await Promise.all(promises).then(() => {
            cb(mappings);
        }, error => {
            logger.error(`Scripts via configuration. Path error: ${error.message}`);
        });
    }
    function mapPathMany(mappings, str, mainArr, base, alias, resourceType) {
        var imax = mainArr.length,
            i = -1, ext,
            arr = [];
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
            if (io.File.exists(x)) {
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
            : path.substring(i + 1)
            ;
    }

}());

export { configurate_BowerAndCommonJS }

