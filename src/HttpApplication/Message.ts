import { class_Dfr, class_EventEmitter, mixin } from 'atma-utils'
import { is_Function, obj_extend } from '../dependency'
/*
    * Very basic implementation of ClientRequest and -Response.
    * Is used when not the socket but direct request is made
    *
    * app
    *     .execute('service/user/foo', 'get')
    *     .done(function(obj:Any))
    *     .fail(function(err))
    */

export class Request {
    url: string
    method: string
    body: any
    headers: any
    constructor (url, method, body, headers){
        this.url = url;
        this.method = (method || 'GET').toUpperCase();
        this.body = body;
        this.headers = headers;
    }
};

export class Response  extends mixin(class_EventEmitter, class_Dfr) {
    writable = true
    finished = false
    statusCode: number

    body = '' as (string | any[])
    headers = {} as any


    resolve (body: string | Buffer | any, code?: number, mimeType?: string, headers?) {
        return super.resolve(
            body ?? this.body,
            code ?? this.statusCode ?? 200,
            mimeType,
            headers ?? this.headers
        );
    }
    reject (error, code?: number){
        return super.reject(
            error ?? this.body,
            code ?? error.statusCode ?? this.statusCode ?? 500
        );
    }

    writeHead (code: number, reason: string, headers: any)
    writeHead (code: number, headers: any)
    writeHead (code: number) {
        if (this.writable === false)
            return;

        var reason, headers;
        if (3 === arguments.length) {
            reason = arguments[1];
            headers = arguments[2];
        }
        if (2 === arguments.length) {
            headers = arguments[1];
        }

        this.statusCode = code;
        obj_extend(this.headers, headers);
    }
    setHeader () {
        // do_Nothing
    }
    end (content) {
        if (this.finished === true) {
            return;
        }
        this.write(content);
        this.finished = true;
        this.writable = false;
        this.resolve(this.body, this.statusCode, null, this.headers)
    }
    /*
        * support String|Buffer|Object
        */
    write (content) {
        if (this.writable === false)
            return;
        if (content == null)
            return;
        if (this.body == null) {
            this.body = content;
            return;
        }

        if (is_Function(this.body.concat)) {
            this.body = this.body.concat(content);
            return;
        }

        this.body = [ this.body, content ];
    }
};
