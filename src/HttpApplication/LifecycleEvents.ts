import { class_EventEmitter } from 'atma-utils';
import { ServerResponse, IncomingMessage } from 'http';

export type EventType = 'AppStart' | 'HandlerSuccess' | 'HandlerError' | 'Error';

export class LifecycleEvents extends class_EventEmitter {

    static Instance = new LifecycleEvents()

    on (event: EventType, cb: (event: LifecycleEvent, req?: IncomingMessage, res?: ServerResponse) => void) {
        return super.on(<any>event, cb);
    }
    emit (event: EventType, ...args) {
        return super.emit(event, ...args);
    }

    emitEvent (event: LifecycleEvent, req?, res?) {
        LifecycleEvents
            .Instance
            .emit(event.type, event, req, res);
    }

    completeAppStart (start: number) {
        EVENT.define(
            'AppStart',
            Date.now() - start,
            `Application started`
        );
        this.emitEvent(EVENT);
    }
    completeHandlerSuccess (start: number, req: IncomingMessage & {user?: { email: string }}, res: ServerResponse) {
        const time = Date.now() - start;
        EVENT.define(
            'HandlerSuccess',
            time,
            `${req.url} completed in ${time}ms`,
            req.method,
            req.url,
            res.statusCode,
            null,
            req.user?.email,
            req.headers['x-forwarded-for'] as string || req.connection.remoteAddress
        );
        this.emitEvent(EVENT, req, res);
    }
    completeHandlerError (start: number, req: IncomingMessage & {user?: { email: string }}, res: ServerResponse, error: Error) {
        const time = Date.now() - start;
        const message = `[${req.method}] ${req.url} completed in ${time}ms with error[${res.statusCode}]: ${error}`;
        EVENT.define(
            'HandlerError',
            time,
            message,
            req.method,
            req.url,
            res.statusCode,
            error,
            req.user?.email,
            req.headers['x-forwarded-for'] as string || req.connection.remoteAddress
        );
        this.emitEvent(EVENT, req, res);
    }
    emitError (error: Error, req?: IncomingMessage & {user?: { email: string }}) {
        const message = `${error}`;
        EVENT.define(
            'Error',
            0,
            message,
            req?.method,
            req?.url,
            0,
            error,
            req?.user?.email,
            req?.headers['x-forwarded-for'] as string || req?.connection.remoteAddress
        );
        this.emitEvent(EVENT);
    }
}

export class LifecycleSpan {

    start = Date.now();
    end: number;

    constructor () {

    }
}

export class LifecycleEvent {
    time: number
    type: EventType
    message: string
    user: string
    ip: string
    method: string
    url: string
    status: number
    error: Error

    /** Do NOT create event objects to prevent GC */
    define (
        type: EventType,
        time: number,
        message: string,
        method?: string,
        url?: string,
        status?: number,
        error?: Error,
        user?: string,
        ip?: string,
    ) {
        this.time = time;
        this.type = type;
        this.message = message;
        this.user = user;
        this.method = method;
        this.url = url;
        this.error = error;
        this.status = status;
        this.ip = ip;
    }
}

// Use singleton to prevent GC
const EVENT = new LifecycleEvent();
