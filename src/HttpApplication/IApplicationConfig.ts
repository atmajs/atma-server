import { IHttpHandlerConstructor } from '../IHttpHandler';

export interface IApplicationDefinition {
    base?: string
    args?: {
        [key: string]: string
    }
    disablePackageJson?: boolean
    config?: IApplicationConfig
    configs?: string | string[]
}

export interface IApplicationConfig {
    base?: string
    static?: string
    debug?: boolean
    env?: {
        both?: {
            include?: {
                cfg: any
            }
            /** include routes */
            routes?: {
                [name: string]: string
            }
            scripts?: string | string[]
            imports?: {
                [name: string]: string | string[] | { [name: string]: string | string[] }
            }
        },
        client?: {
            include?: {
                cfg?: any
                src?: string
            },
            mask?: {
                cfg?: any
                src?: string
            },
            scripts?: string | string[] | { npm: string[] }
            styles?: string | string[] | { npm: string[] }
            routes?: {
                [name: string]: string
            },
            imports?: {
                [name: string]: string | string[] | { [name: string]: string | string[] }
            }
        },
        server?: {
            routes?: {
                [name: string]: string
            },
            scripts?: string[] | { npm: string[] }
            imports?: {
                [name: string]: string | string[] | { [name: string]: string | string[] }
            }
        }
    },
    handler?: {
        location?: string
    },
    handlers?: {
        /** regex pattern : Path to the controllers script file */
        [urlPattern: string]: string
    },
    page?: IPageConfiguration,
    pages?: {
        [urlPattern: string]: {
            id?: string
            title?: string
            rewrite?: string
            controller?: string | any
            scripts?: string | string[]
            styles?: string | string[]
        }
    },
    service?: {
        location?: string
        endpoints?: string | string[]
    },
    services?: {
        /** regex pattern : Path to the controllers script file */
        [urlPattern: string]: string | IHttpHandlerConstructor
    },
    subapp?: {

    },
    subapps?: {
        [urlPattern: string]: string | (IApplicationDefinition & { controller: string})
    },
    websocket?: {

    },
    websockets?: {

    }
    rewriteRules?: Array<{
        rule: string
        conditions: Array<{ condition: string }>
    }>

    redirectRules?: Array<{
        rule: string
        conditions: Array<{ condition: string }>
    }>

    disablePackageJson?: boolean

    buildDirectory?: string

    // appcfg directories/files configs
    configs?: string | string[]
    // additional appcfg configs
    config?: IApplicationConfig

    // appcfg raw sources
    sources?: object[]

    include?: {
        src?: string
    }
}


export interface IPageConfiguration {
    location?: {
        controller?: string
        template?: string
        master?: string
        viewTemplate?: string
        viewController?: string
        viewStyle?: string
        pageFiles?: string
    }
    extension?: {
        javascript?: string
        style?: string
        template?: string
    }
    index?: {
        template?: string
        master?: string
    },
    urls?: {
        [key: string]: string
    },
    pattern?: string
    errors?: {
        [statusCode: string]: {
            masterPath: string,
            templatePath: string
        }
    }
}

export interface IAppConfigExtended {
    $get(path: string): any
    $getController(data: IPageConfiguration): any
    $getImports(type: 'server' | 'client' | 'both'): { path: string, type: 'mask' | 'script' | 'css' | 'html' }[]
    projects: {
        [name: string] : { attach (Application) }
    }

}
