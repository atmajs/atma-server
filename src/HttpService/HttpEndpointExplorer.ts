import { File, env } from 'atma-io'
import { class_Uri } from 'atma-utils'
import { fs_exploreFiles } from '../util/fs'
import alot from 'alot'
import { HttpEndpoint, RouteUtils } from './HttpEndpoint';
import { IHttpEndpointMeta, IHttpEndpointMethod, IHttpEndpointMethodMetaResponse, IHttpEndpointMethodMeta } from './HttpEndpointModels';
import { Json, JsonSchema, JsonUtils } from 'class-json';

interface IApiMeta {
    path: string
    description: string
    paths: IApiRouteMeta[]
}
interface IApiRouteMeta {
    path: string
    description: string
    method: 'get' | 'post' | 'put' | 'option' | 'patch'
    operationId: string
    security?: {
        authorized: boolean,
        claims?: string[]
        roles?: string[]
    }
    parameters: IApiRouteParameterMeta[]
    responses: IApiRouteResponseMeta[]
}
interface IApiRouteParameterMeta {
    name: string
    in: 'query' | 'body'
    description: string
    required: boolean
    schema: any
}
interface IApiRouteResponseMeta {
    statusCode: number
    description: string
    schema: any
}

export namespace HttpEndpointExplorer {
    export function getMeta <T extends (new (...args) => HttpEndpoint)> (Type: T): IApiMeta {
        let jsonMeta = JsonUtils.pickModelMeta(Type);
        let meta: IHttpEndpointMeta = Type.prototype.meta ?? {};
        let output = <IApiMeta> {
            path: meta.path,
            description: meta.description ?? jsonMeta?.description,
            paths: []
        };

        const Proto = Type.prototype;
        const rgxPath = /^\$([a-z]+) (.+)$/i;
        for (let key in Proto) {
            let val = Proto[key];
            if (val == null) {
                continue;
            }
            
            let methodMeta = <IHttpEndpointMethodMeta> val.meta;
            if (methodMeta == null) {
                if (rgxPath.test(key) === false) {
                    continue;
                }
                methodMeta = { path: key };
            }
            let route = rgxPath.exec(methodMeta.path);
            if (route == null) {
                output.paths.push( <any> {
                    path: methodMeta.path,
                    description: 'Invalid route'
                });
                continue;
            }

            const methodParamsMeta = meta.endpointsParams[key];
            const apiParams = methodParamsMeta?.map(methodParamMeta => {
                return <IApiRouteParameterMeta> {
                    in: methodParamMeta.from === 'uri' ? 'query' : 'body',
                    name: methodParamMeta.name,
                    description: methodParamMeta.description ?? methodParamMeta.Type?.name,
                    schema: getSchema(methodParamMeta.Type),
                    required: methodParamMeta.optional === true ? false : true
                };
            }) ?? [];
            const apiResponses = methodMeta.responses?.map(resp => {
                return {
                    statusCode: resp.status,
                    description: resp.description ?? resp.Type?.name,
                    schema: getSchema(resp.Type)
                }
            }) ?? [];

            
            const apiRoute: IApiRouteMeta = {
                path: route[2],
                method: <any> route[1],
                operationId: key,
                description: methodMeta.description ?? jsonMeta?.properties?.[key]?.description,
                parameters: apiParams,
                responses: apiResponses
            };
            if (methodMeta.secure != null) {
                if (methodMeta.secure === true) {
                    apiRoute.security = {
                        authorized: true
                    };
                }
                if (typeof methodMeta.secure === 'object') {
                    apiRoute.security = {
                        authorized: true,
                        roles: methodMeta.secure.roles,
                        claims: methodMeta.secure.claims,
                    };
                }
            }
            output.paths.push(apiRoute);
        }
        return output;
    }

    function getSchema (Type) {
        let schema = JsonSchema.getSchema(Type);
        // if (typeof Type === 'function' && schema.description == null)  {
        //     schema.description = Type.name;
        // }
        return schema;
    }

    export async function find (path: string, base?: string): Promise< { [urlPattern: string]: string } > {
        if (path == null || path === '') {
            return null;
        }
        if (path.endsWith('/')) {
            path = `${path}**Endpoint*`;
        }

        if (path.startsWith('.') || path.startsWith('/')) {
            if (base == null) {
                base = env.currentDir.toString();
            }
            path = class_Uri.combine(base, path);
        }

        let files = await fs_exploreFiles(path);
        let keyValues = await alot(files).mapAsync(async $file => {
            let file = new File($file.uri.toString(), { cached: false });
            let str = await file.readAsync <string> ({ skipHooks: true});
            let rgx = /@([\w\.]+\.)?route\s*\(\s*['"]([^'"]+)['"]/;
            let match = rgx.exec(str);
            if (match == null) {
                return null;
            }
            let urlPattern = match[1];
            if (/^\$/.test(urlPattern)) {
                // Endpoint Classes have no METHOD spec
                // The first matched route has one, and look like `$get /foo`
                return null;
            }
            return [ `^${urlPattern}`, file.uri.toString() ];
        }).toArrayAsync({ threads: 4 });

        return alot(keyValues).filter(Boolean).toDictionary(arr => arr[0], arr => arr[1]);
    }
}