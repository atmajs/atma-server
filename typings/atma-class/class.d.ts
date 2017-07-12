declare module "atma-class" {
    export default Class;
}

declare namespace Class {
    
    export class EventEmitter {
        on (name: string, callback: Function)
        once (name: string, callback: Function)
        off (mix: string | Function, callback?: Function)
        emit(...args: any[])
        trigger(...args: any[])
    }
    
    export class Serializable {
        toJSON () 
    }

    export class Deferred<T> {
        then (done: (result: T) => void | Deferred<any>, fail: (error: any | Error) => void): this | Deferred<any>
        done (done: (result: T) => void | Deferred<any>)
        fail (fail: (error: any | Error) => void)
        reject(error: any | Error) 
        resolve(result?: T): this
        always (always: Function): this
        delegate(mix: string, x?)
    } 

    export class Await<T> extends Deferred<T> {
        constructor(...arr: (void | any | Deferred<any>)[])
    }

    export function Collection<T, TColl>(type: new (...args) => T, prototype: IClassDeclaration & TColl): new (...args: any[]) => Array<T> & TColl;

    export function validate(instance: object, validationModel?: object, isStrict?: boolean): void | Error
    export function properties(Ctor: Function): string[]
}

declare interface IClassDeclaration {
    [x: string]: any
}

declare function Class<T>(prototype: IClassDeclaration & T): new (...args: any[]) => IClassDeclaration & T;
