import StaticContent from '../Plugins/Static';

export interface IStaticServerConfig {
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


export function StaticMid(config: IStaticServerConfig) {
    return StaticContent.create(config);
};


export function createStaticMid(config: IStaticServerConfig) {
    return (responder = StaticContent.create(config));
}

(<any>StaticMid).config = function (config) {
    return (responder = StaticContent.create(config));
};

let responder = null;
