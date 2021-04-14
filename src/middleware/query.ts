import { _ } from 'ruta';

const deserialize = _.query.deserialize;

export function QueryMidd (req, res, next){

    var url = req.url,
        q = url.indexOf('?');

    req.query = q === -1
        ? {}
        : deserialize(url.substring(q + 1));

    next();
};

