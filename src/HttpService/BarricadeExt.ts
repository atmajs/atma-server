import { class_Dfr } from 'atma-utils';
import { HttpError } from '../HttpError/HttpError'
import { IHttpHandler } from '../IHttpHandler';


type TMiddleware = (this: IHttpHandler, req, res, params, next) => void | HttpError | Promise<void | HttpError>;

class Runner {

    constructor (public middlewares: TMiddleware[]) {

    }

    process (service: IHttpHandler, req, res, params) {

        let dfr = new class_Dfr;
        next(this, dfr, service, req, res, params, 0)
        return dfr;
    }
}

function next(runner: Runner, dfr: class_Dfr, service: IHttpHandler, req, res, params, index: number) {


    let middlewareFn = runner.middlewares[index];
    let nextFn = nextDelegate(runner, dfr, service, req, res, params, index);

    let result;
    try {
        result = middlewareFn.call(
            service,
            req,
            res,
            params
        );
    } catch (error) {
        nextFn(error);
        return;
    }


    if (result == null || 'then' in result === false) {
        nextFn(null, result);
        return;
    }

    result.then(
        (...args) => nextFn(null, ...args),
        (error) => nextFn(error),
    );
}


function nextDelegate(runner: Runner, dfr: class_Dfr, service: IHttpHandler, req, res, params, index: number) {

    return function (error, ...args) {

        if (error) {
            reject(dfr, error);
            return;
        }
        if (index >= runner.middlewares.length - 1) {
            dfr.resolve(...args);
            return;
        }
        next(
            runner,
            dfr,
            service,
            req,
            res,
            params,
            ++index
        );
    };
}

function reject(service, error) {
    if (typeof error === 'string')
        error = new HttpError(error);

    service.reject(error);
}

export const BarricadeExt = function (middlewares) {

    let barricade = new Runner(middlewares);
    return function (req, res, params) {
        return barricade.process(this, req, res, params);
    };
};

