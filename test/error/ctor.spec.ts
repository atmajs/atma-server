import { SecurityError, RequestError, HttpError } from '../../src/HttpError/HttpError';

UTest({

    'security ctor'() {
        function check(error) {
            eq_(error.toString(), 'SecurityError: Baz');
        }

        const Ctor = SecurityError;

        check(new Ctor('Baz'));
    },
    'valid inheritance'() {
        let httpError = new HttpError('txt');
        eq_(httpError.name, 'HttpError');
        is_(httpError.toJSON, Function);


        let error = new RequestError('txt');
        assert(error instanceof Error, 'instanceof Error');
        assert(error.name, 'RequestError');
        is_(error.toJSON, Function);
    },
    'proper stacktrace'() {

        let err = new SecurityError('baz');
        eq_(err.message, 'baz');
        eq_(err.name, 'SecurityError');
        eq_(String(err), 'SecurityError: baz');

        has_(err.stack, 'proper stacktrace')
    }
})
