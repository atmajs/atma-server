import { HttpError, NotFoundError, RequestError, RuntimeError, SecurityError } from './HttpError/HttpError'
import { IHttpHandler, HttpResponse } from './IHttpHandler'
import HandlerFactory from './HandlerFactory'

import HttpErrorPage from './HttpPage/HttpErrorPage'
import HttpPage from './HttpPage/HttpPage'
import Application from './HttpApplication/Application'
import HttpSubApplication from './HttpApplication/SubApp'
import HttpCrudEndpoints from './HttpService/CrudWrapper'
import HttpService from './HttpService/HttpService'
import { HttpEndpoint } from './HttpService/HttpEndpoint'
import Middleware from './middleware/export'

import './handlers/export';
import { HttpEndpointDecos } from './HttpService/HttpEndpointDecos'
import { LifecycleEvents } from './HttpApplication/LifecycleEvents'


export {
    HttpError,
    NotFoundError,
    RequestError,
    RuntimeError,
    SecurityError,
    Application,
    HttpSubApplication,
    HttpErrorPage,
    HttpPage,
    HandlerFactory,
    HttpCrudEndpoints,
    HttpService,
    IHttpHandler,
    HttpResponse,
    HttpEndpoint,
    Middleware,
    LifecycleEvents
};

export const middleware = Middleware;
export const clean = Application.clean;
export const StaticContent = require('static-content');
export const deco = {
    route: HttpEndpointDecos.route,
    origin: HttpEndpointDecos.origin,
    middleware: HttpEndpointDecos.middleware,
    isAuthorized: HttpEndpointDecos.isAuthorized,
    isInRole: HttpEndpointDecos.isInRole,
    hasClaim: HttpEndpointDecos.hasClaim,
    fromUri: HttpEndpointDecos.fromUri,
    fromBody: HttpEndpointDecos.fromBody,
    response: HttpEndpointDecos.response,
    description: HttpEndpointDecos.description,
    createDecorator: HttpEndpointDecos.createDecorator,
}
