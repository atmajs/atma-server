import { IncomingMessage, ServerResponse } from 'http'

export interface IHttpEndpointMiddleware {
    (req: IncomingMessage, res: ServerResponse, params: any): void | any | Promise<any>
}

export interface IHttpEndpointMeta {
    headers?: any
    origins?: string
    secure?: boolean | {
        roles?: string[]
        claims?: string[]
    }
}
export interface IHttpEndpointMethodMeta {
    headers?: any
    origins?: string
    description?: string
    arguments?: any
    response?: any
    strict?: boolean
    secure?: boolean | {
        roles?: string[]
        claims?: string[]
    }
}
export interface IHttpEndpointMethod {
    meta?: IHttpEndpointMethodMeta
    process: IHttpEndpointMiddleware
}

export interface IHttpEndpointRutaItem {
    definition: string
    current: {
        params: { [query: string]: string }
    }
    value: IHttpEndpointMethod
}
export interface IHttpEndpointRutaCollection {
    routes: IHttpEndpointRutaItem[]
    get(path: string, method?: string): IHttpEndpointRutaItem
    add(pathDefinition: string, mix: any)
}