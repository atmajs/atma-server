import { AppConfig } from '../dependency'
import { path_normalize, path_resolveSystemUrl } from '../util/path'
import EnvUtils from './EnvUtils'
import ConfigUtils, {
    cfg_prepair,
    configurate_Include,
    configurate_Mask,
    configurate_Pages,
    configurate_PageFiles,
    configurate_Plugins,
    //configurate_Projects,
    configurate_BowerAndCommonJS
} from './ConfigUtils'
import { IApplicationConfig } from '../HttpApplication/IApplicationConfig';
import { ConfigDefaults } from './ConfigDefaults';
import type Application from '../HttpApplication/Application';

const PATH = 'server/config/**.yml';
const BUILD_PATH = 'public/build/stats.json';

declare let global;

export default function Config(params: IApplicationConfig, app?: Application) {
    params = params || {};

    let path_base = params.base;
    let configPaths = params.configs;
    let disablePackageJson = params.disablePackageJson === true;
    let path_Build;
    let appConfig;

    path_base = path_base == null
        ? 'file://' + path_normalize(process.cwd()) + '/'
        : path_resolveSystemUrl(path_base + '/')
        ;

    let configs = cfg_prepair(path_base, configPaths, PATH);
    if (configs) {
        // if `configs` null, do not load also build values
        path_Build = path_base + (params.buildDirectory || BUILD_PATH);
    }
    if (params.config) {
        appConfig = { config: params.config };
    }

    let $sources = [
        {
            config: ConfigDefaults
        },
        path_Build
            ? {
                path: path_Build,
                optional: true
            }
            : null,
        {
            config: ConfigUtils
        },
        disablePackageJson
            ? null
            : {
                path: path_base + 'package.json',
                getterProperty: 'atma',
                optional: true
            },
        {
            config: EnvUtils
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


    return AppConfig
        .fetch($sources)
        .then(function (cfg) {

            if (app != null) {
                // Setting current app to global, sothat plugins can read their configurations (if any)
                if (global.app == null) {
                    global.app = app;
                }
                app.config = cfg as any;
            }

            return Promise.all([
                configurate_Mask(cfg),
                configurate_Include(cfg),
                configurate_PageFiles(cfg, app),
                configurate_Pages(cfg, app),
                configurate_Plugins(cfg, app),
                configurate_BowerAndCommonJS(cfg, app)
            ])
                .then(() => Promise.resolve(cfg));
        }, function (error) {
            error.message = '<app:configuration> ' + error.message;
            throw error;
        });
};
