import { logger, include, mask, Uri, includeLib } from '../dependency'
import memd from 'memd'

export default {

    $getScripts: memd.fn.memoize(function (pageID) {
        let scripts = getResources('scripts', this.env).slice();
        if (pageID)
            scripts = scripts.concat(this.$getScriptsForPageOnly(pageID));

        return scripts;
    }),

    $getScriptsForPageOnly: memd.fn.memoize(function (pageID) {
        let page = this.pages[pageID],
            scripts = [];

        if (page == null) {
            return scripts;
        }

        if (page.scripts != null) {
            scripts = scripts.concat(getResources(
                'page'
                , this.env
                , page.scripts
                , page.routes
            ));
        }
        if (page.env != null) {
            scripts = scripts.concat(getResources(
                'scripts'
                , this.env
                , page.env
            ));
        }

        if (page.view && page.view.controller) {
            let path = this.$formatPath(
                this.page.location.viewController,
                page.view.controller
            );

            scripts.push(path);
        }


        return scripts;
    }),

    $getStyles: function (pageID) {

        let cfg = this,
            styles = getResources('styles', cfg.env).slice();

        if (pageID)
            styles = styles.concat(this.$getStylesForPageOnly(pageID));

        return styles;
    },

    $getStylesForPageOnly: function (pageID) {
        let cfg = this,
            page = cfg.pages[pageID],
            styles = [];

        if (page == null) {
            return styles;
        }

        if (page.styles) {
            styles = styles.concat(getResources(
                'page'
                , cfg.env
                , page.styles
                , page.routes
            ));
        }
        if (page.env) {
            styles = styles.concat(getResources(
                'styles'
                , cfg.env
                , page.env
            ));
        }

        if (page.compo) {
            let path = this.$getCompo(page),
                resource = include.getResource(path);
            if (resource != null) {

                resource.includes.forEach(function (x) {
                    if (x.resource.type === 'css')
                        styles.push(x.resource.url);
                });
            }

            else {
                logger
                    .error('<page:styles> compo resource is undefined', path);
            }
        }


        if (page.view && page.view.style) {
            let path = this.$formatPath(
                this.page.location.viewStyle,
                page.view.style);

            styles.push(path);
        }


        return styles;
    },

    $getInclude: function () {
        let env = this.env,
            include = {
                src: '',
                routes: {},
                cfg: {}
            };

        incl_extend(include, env.both.include);
        incl_extend(include, env.client.include);

        if (!include.src) {
            include.src = '/node_modules/includejs/lib/include.js';
        }

        incl_extend(include, {
            routes: env.both.routes
        });

        incl_extend(include, {
            routes: env.client.routes
        });

        return include;
    },

    $getIncludeForPageOnly: function (pageID) {
        let page = this.pages[pageID],
            include = {};

        return page && page.include ? incl_extend(include, page.include) : include;
    },

    $getTemplate: function (pageData) {

        let template = pageData.template ?? this.page.index?.template;
        if (template == null) {
            return null;
        }
        let location = this.page.location.template;
        let path = this.$formatPath(location, template);
        return Uri.combine(this.base, path);
    },
    $getMaster: function (pageData) {
        let master = pageData.master || this.page.index.master,
            location = this.page.location.master,
            path = this.$formatPath(location, master)
            ;
        return Uri.combine(this.base, path);
    },
    $getController: function (pageData) {
        let controller = pageData.controller || this.page.index.controller;
        if (controller == null)
            return null;

        let location = this.page.location.controller,
            path = this.$formatPath(location, controller)
            ;
        return Uri.combine(this.base, path);
    },
    $getCompo: function (pageData) {
        let compo = pageData.compo;
        if (compo == null)
            return null;

        let location = this.page.location.compo || this.page.location.controller,
            path = this.$formatPath(location, compo)
            ;
        return Uri.combine(this.base, path);
    },
    $getImports: function (targetEnv) {
        let both = this.env.both.imports,
            target = this.env[targetEnv].imports;

        let types = {
            'mask': ' mask ',
            'script': ' js es6 jsx ts',
            'style': ' css less sass scss '
        };
        function getType(path) {
            let ext = /\w+$/.exec(path);
            if (ext == null) {
                logger.error('Not parsable extension', path);
                return 'unknown';
            }
            for (let type in types) {
                if (types[type].indexOf(ext) > -1) {
                    return type;
                }
            }
            logger.error('Unknown extension', path);
            return 'uknown';
        }

        return _flatternResources(both).concat(_flatternResources(target))
            .map(function (path) {
                return {
                    path: path,
                    type: getType(path)
                };
            });
    }
};


const getResources = memd.fn.memoize(function (type, env, pckg?, routes?) {

    let Routes = new includeLib.Routes();
    let array = [];

    function register(obj) {
        if (obj == null)
            return;
        for (let key in obj) {
            Routes.register(key, obj[key]);
        }
    }
    function resolve(pckg) {
        if (pckg == null)
            return;
        Routes.each('js', pckg, function (namespace, route) {
            array.push(route.path);
        });
    }

    register(env.client && env.client.routes);
    register(env.both && env.both.routes);
    register(routes);

    switch (type) {

        case 'page':
            resolve(pckg);
            break;

        case 'debug':
            resolve(env.client.debug);
            break;

        case 'scripts':
        case 'styles':
            let obj = pckg || env;
            resolve(obj.client && obj.client[type]);
            resolve(obj.both && obj.both[type]);
            break;
        default:
            logger.error('Unsupported type', type);
            break;
    }

    return array;
});


function incl_extend(include, source) {
    if (source == null)
        return include;

    if (typeof source === 'string') {
        include.src = source;
        return include;
    }

    if (source.src)
        include.src = source.src;

    if (source.cfg) {
        include.cfg = obj_extend(include.cfg, source.cfg, 'loader');

        if (source.cfg.loader)
            include.cfg.loader = obj_extend(include.cfg.loader, source.cfg.loader);

    }

    if (source.routes)
        obj_extend(include.routes, source.routes);

    return include;
}

function obj_extend(target, source, dismissKey = null) {

    if (source == null)
        return target;

    if (target == null)
        target = {};

    for (let key in source) {
        if (key === dismissKey)
            continue;

        target[key] = source[key];
    }

    return target;
}

let _flatternResources;
(function () {
    _flatternResources = function (mix, base) {
        if (mix == null) {
            return [];
        }
        if (typeof mix === 'string') {
            return _combinePath(base, mix);
        }
        if (mask.is.Array(mix)) {
            return _fromArray(mix, base);
        }
        if (mask.is.Object(mix)) {
            return _fromObj(mix, base);
        }
    };
    function _fromObj(json, base) {
        let arr = [];
        for (let key in json) {
            arr = arr.concat(_flatternResources(json[key], _combinePath(base, key)));
        }
        return arr;
    }
    function _fromArray(arr, base) {
        let out = [],
            imax = arr.length,
            i = -1;
        while (++i < imax) {
            out = out.concat(_flatternResources(arr[i], base));
        }
        return out;
    }

    function _combinePath(a, b) {
        if (a == null || b == null) {
            return a || b;
        }
        return Uri.combine(a, b);
    }
}());
