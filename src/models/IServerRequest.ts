
import http from 'http';

export interface IServerRequest extends http.IncomingMessage {

    body?: any
    files?: any
    user?: any
}
