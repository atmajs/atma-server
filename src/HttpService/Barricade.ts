import { HttpError } from '../HttpError/HttpError'
import { IHttpHandler } from '../IHttpHandler';


type TMiddleware = (this: IHttpHandler, req, res, params, next) => void | HttpError | Promise<void | HttpError>;

class Runner {

    constructor (public middlewares: TMiddleware[]) {

    }

    process (service: IHttpHandler, req, res, params) {

        next(this, service, req, res, params, 0)
    }
}

function next(runner: Runner, service: IHttpHandler, req, res, params, index: number) {
    if (index >= runner.middlewares.length)
        return;

    const fn = runner.middlewares[index];
    const error = fn.call(
        service,
        req,
        res,
        params,
        nextDelegate(runner, service, req, res, params, index)
    );

    if (error)
        reject(service, error);

}


function nextDelegate(runner: Runner, service: IHttpHandler, req, res, params, index: number) {

    return function (error) {

        if (error) {
            reject(service, error);
            return;
        }

        next(
            runner,
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

export function Barricade (middlewares) {

    const barricade = new Runner(middlewares);

    return function (req, res, params) {
        barricade.process(this, req, res, params);
    };
};

