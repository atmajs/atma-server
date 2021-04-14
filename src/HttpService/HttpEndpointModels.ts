import { IncomingMessage, ServerResponse } from 'http'
import { Collection } from 'ruta';

export interface IHttpEndpointMiddleware {
    (req: IncomingMessage, res: ServerResponse, params: any): void | any | Promise<any>
}

export interface IHttpEndpointMeta {
    path?: string
    description?: string
    headers?: any
    origins?: string
    secure?: boolean | {
        roles?: string[]
        claims?: string[]
    }
    endpointsParams?: { [method: string]: IHttpEndpointMethodArgMeta[] }
}

export type IHttpParamContstructor<T = any> = (new (x?) => T) | ((x?) => T)
export interface IHttpEndpointMethodArgOptions<T = any> {
    Type?: IHttpParamContstructor
    ArrayType?: Function
    name?: string
    optional?: boolean
    default?: T
    validate?: (val: any) => string
}
export interface IHttpEndpointMethodArgMeta {
    Type?: any
    from: 'uri' | 'body'
    name?: string
    description?: string
    default?: any
    optional?: boolean
    validate?: (val: any) => string
}
export interface IHttpEndpointMethodMeta {
    path?: string
    headers?: any
    origins?: string
    description?: string
    arguments?: any
    response?: any
    responses?: IHttpEndpointMethodMetaResponse[]
    strict?: boolean
    secure?: boolean | {
        roles?: string[]
        claims?: string[]
    }
    params?: IHttpEndpointMethodArgMeta[]
}
export interface IHttpEndpointMethod {
    key?: string
    meta?: IHttpEndpointMethodMeta
    process: IHttpEndpointMiddleware
}
export interface IHttpEndpointMethodMetaResponse {
    status?: number,
    Type?: any,
    description?: string
}

export interface IHttpEndpointRutaItem {
    definition: string
    current: {
        params: { [query: string]: string }
    }
    value: IHttpEndpointMethod
}
// export interface IHttpEndpointRutaCollection {
//     routes: IHttpEndpointRutaItem[]
//     get(path: string, method?: string): IHttpEndpointRutaItem
//     add(pathDefinition: string, mix: any)
// }

export type IHttpEndpointRutaCollection = InstanceType<typeof Collection>;
