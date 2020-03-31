import { class_EventEmitter } from 'atma-utils';
import { ServerResponse, IncomingMessage } from 'http';

export type EventType = 'AppStart' | 'HandlerSuccess' | 'HandlerError';


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
    completeHandlerSuccess (start: number, req: IncomingMessage, res: ServerResponse) {
        const time = Date.now() - start;
        EVENT.define(
            'HandlerSuccess',
            time,
            `${req.url} completed in ${time}ms`,
            req.url,
            res.statusCode,
        );
        this.emitEvent(EVENT, req, res);
    }
    completeHandlerError (start: number, req: IncomingMessage, res: ServerResponse, error: Error) {
        const time = Date.now() - start;
        const message = `${req.url} completed in ${time}ms with error: ${error}`;
        EVENT.define(
            'HandlerError',
            time,
            message,
            req.url,
            res.statusCode,
            error
        );
        this.emitEvent(EVENT, req, res);
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
    url: string
    status: number
    error: Error

    /** Do NOT create event objects to prevent GC */
    define (
        type: EventType,
        time: number,
        message: string,
        url?: string,
        status?: number,
        error?: Error,
        user?: string,
    ) {
        this.time = time;
        this.type = type;
        this.message = message;
        this.user = user;
        this.url = url;
        this.error = error;
        this.status = status;
    }
}

// Use singleton to prevent GC
const EVENT = new LifecycleEvent();