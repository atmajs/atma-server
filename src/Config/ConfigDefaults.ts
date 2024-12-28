import { IApplicationConfig } from '../HttpApplication/IApplicationConfig';

export const ConfigDefaults = <IApplicationConfig> {
    env: {
        both: {
            include: {
                cfg: {}
            },
            routes: null,
            scripts: null
        },
        client: {
            include: {
                src: '/node_modules/includejs/lib/include.js'
            },
            mask: {
                cfg: null,
                src: null
            },
            scripts: null,
            styles: null,
            routes: null,
        },
        server: {
            routes: null,
            scripts: null
        }
    },
    handler: {
        location: '/server/http/handler/{0}.js'
    },
    handlers: {
        '(\\.mr$|\\.mr\\?.+)': '/{self}.MaskRunner',
        '(\\.html\\.mask$|\\.html\\.mask\\?.+)': '/{self}.MaskHtml'
    },

    mask: {
        compos: {
            ':scripts': {
                mode: 'server:all'
            },
            ':styles': {
                mode: 'server:all'
            },
            ':template': {
                mode: 'server'
            },
            'layout:master': {
                mode: 'server'
            },
            'layout:view': {
                mode: 'server'
            },
            ':animation': {
                mode: 'client'
            },
        },
        attributes: null
    },
    service: {
        location: '/server/http/service/{0}.js',
        endpoints: null
    },
    services: {
        //routePattern: path
    },
    page: {
        location: {
            controller: '/server/http/page/{0}/{1}.js',
            template: '/server/http/page/{0}/{1}.mask',
            master: '/server/http/master/{0}.mask',
            viewTemplate: '/public/view/{0}/{1}.mask',
            viewController: '/public/view/{0}/{1}.js',
            viewStyle: '/public/view/{0}/{1}.less',
            pageFiles: '/public/pages/',
        },
        extension: {
            javascript: 'js',
            style: 'less',
            template: 'mask'
        },
        index: {
            template: 'index',
            master: 'default'
        },
        urls: {
            login: '/login'
        },
        pattern: '/:view/:category/:section'

    },
    pages: {},
    server: {
        ssl: {
            forced: false,
            enabled: false,
            port: 443,
            keyFile: null,
            certFile: null,
            caFile: null,
        }
    },
    view: {
        location: {
            template:   '/public/view/{0}/{1}.mask',
            controller: '/public/view/{0}/{1}.js',
            style:      '/public/view/{0}/{1}.less',
        }
    },
    websocket: {
        location: '/server/http/websocket/{0}.js'
    },
    websockets: {}
}
