import StaticContent from '../Plugins/Static';

export function StaticMidd(req, res, next, config) {
    if (responder == null) {
        responder = StaticContent.respond
    }

    responder(req, res, next, config);
};

export interface IStaticServConfig {
    base?: string

    // Add or overwrite some mimeTypes
    mimeTypes?: { [MimeTypeString: string]: string[] },
    extensions?: {
        [Extension: string]: {
            mimeType?: string

            // When utf8 is set, then file will be also cached and gzipped
            encoding?: string | 'buffer' | 'UTF-8'

            // In seconds
            maxAge?: Number
        }
    },
    defaultMimeType?: string,

    // Optional, set of default Headers
    headers?: any
}

export function createStaticMidd(config: IStaticServConfig) {
    return (responder = StaticContent.create(config));
}

(<any>StaticMidd).config = function (config) {
    return (responder = StaticContent.create(config));
};

let responder = null;
