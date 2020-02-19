import { Class } from '../dependency'
import { class_Dfr } from 'atma-utils';
import { HttpError } from '../HttpError/HttpError'


var Runner = Class.Collection(Function, {
    Base: Class.Serializable,
    process: function (service, req, res, params) {
        let dfr = new class_Dfr;
        next(this, dfr, service, req, res, params, 0)
        return dfr;
    }
});

function next(runner, dfr, service, req, res, params, index) {


    let middlewareFn = runner[index];
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


function nextDelegate(runner, dfr, service, req, res, params, index) {

    return function (error, ...args) {

        if (error) {
            reject(dfr, error);
            return;
        }
        if (index >= runner.length - 1) {
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

    var barricade = new Runner(middlewares);

    return function (req, res, params) {
        return barricade.process(this, req, res, params);
    };
};

