import { ServerResponse, IncomingMessage } from 'http';
import { $format } from '../util/$format';

const rgxContentType = /^application\/json(;|$)/i;

type TBodyConfig = {
    limit: number | string
}

export function BodyJsonMid (config?: TBodyConfig) {
    let MAX_SIZE = $format.$size.parse(config?.limit ?? '10MB');

    return function (req: IncomingMessage & { body?}, res: ServerResponse, next) {
        const method = req.method;
        if (method !== 'POST' && method !== 'PUT') {
            next();
            return;
        }
        const header = req.headers['content-type'];
        if (rgxContentType.test(header) === false) {
            next();
            return;
        }

        let body = '';
        let error = null as Error;
        req.on('data', (chunk) => {
            if (error != null) {
                return;
            }
            body += chunk.toString();
            if (body.length > MAX_SIZE) {
                error = new Error(`Payload size exceeded`);
                next(error);

            }
        });
        req.on('end', () => {
            if (error != null) {
                return;
            }
            try {
                req.body = JSON.parse(body);
                next();
            } catch (err) {
                error = err;
                next(error);
            }
        });
    }
};

