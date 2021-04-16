import { _ } from 'ruta';

const deserialize = _.query.deserialize;

export function QueryMidd (req, res, next){

    const url = req.url;
    const qIdx = url.indexOf('?');

    req.query = qIdx === -1
        ? {}
        : deserialize(url.substring(qIdx + 1));

    next();
};

