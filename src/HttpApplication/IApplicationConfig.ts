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
            scripts?: string[]
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
            scripts?: string[]
            styles?: string[]
            routes: {
                [name: string]: string
            }
        },
        server?: {
            routes?: {
                [name: string]: string
            },
            scripts?: string[]
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
        }
    },
    service?: {
        location?: string
    },
    services?: {
        /** regex pattern : Path to the controllers script file */
        [urlPattern: string]: string
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
    disablePackageJson?: boolean

    buildDirectory?: string

    // appcfg directories/files configs
    configs?: string | string[]
    // additional appcfg configs    
    config?: object

    // appcfg raw sources
    sources?: object[]
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
}

export interface IAppConfigExtended {
    $get(path: string): any 
    $getController(data: IPageConfiguration): any
    $getImports(type: 'server' | 'client' | 'both'): { path: string, type: 'mask' | 'script' | 'css' | 'html' }[]
    projects: {
        [name: string] : { attach (Application) }
    }

}