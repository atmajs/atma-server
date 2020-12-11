import { IServerRequest } from '../models/IServerRequest';

const HEADER_ALLOW_ORIGIN = 'Access-Control-Allow-Origin';
const HEADER_ALLOW_HEADERS = 'Access-Control-Allow-Headers';
const DEFAULT = {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
}
const delimiter = /[ ,]+/g;

export function cors_ensure (req, headers) {
    if (headers == null) {
        return;
    }
    let allowOrigin = headers[HEADER_ALLOW_ORIGIN];
    if (allowOrigin == null) {
        return;
    }
    let allowHeaders = headers[HEADER_ALLOW_HEADERS];
    if (allowHeaders == null) {
        headers[HEADER_ALLOW_HEADERS] = req.headers['access-control-request-headers'] || 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers';
    }

    let current: string = req.headers['host'];
    if (current == null) {
        return;
    }

    if (allowOrigin === '*' || delimiter.test(allowOrigin) === false) {
        return;
    }
    let hosts = allowOrigin.split(delimiter);
    for (let i = 0; i < hosts.length; i++) {
        let host = hosts[i];
        let globIndex = host.indexOf('*');
        if (globIndex > -1) {
            host = host.substring(globIndex + 2);
        }
        let index = current.toLowerCase().indexOf(host.toLowerCase());
        if (index + host.length === current.length) {
            headers[HEADER_ALLOW_ORIGIN] = host;
            return;
        }
    }
}

export function cors_rewriteAllowedOrigins(req: IServerRequest, headers) {
    let origin = req.headers['origin'] as string;
    if (origin == null || origin === '') {
        return;
    }
    let allowedOrigin = headers[HEADER_ALLOW_ORIGIN];
    if (allowedOrigin == null || allowedOrigin === '') {
        return;
    }
    if (allowedOrigin === '*') {
        headers[HEADER_ALLOW_ORIGIN] = origin;
        return;
    }
    let hosts = allowedOrigin.split(' ');
    for (let i = 0; i < hosts.length; i++) {
        let host = hosts[i];
        let globIndex = host.indexOf('*');
        if (globIndex > -1) {
            host = host.substring(globIndex + 2);
        }
        let index = origin.toLowerCase().indexOf(host.toLowerCase());
        if (index + host.length === origin.length) {
            headers[HEADER_ALLOW_ORIGIN] = host;
            return;
        }
    }
}
