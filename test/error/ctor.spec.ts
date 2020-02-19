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
        var error = new RequestError('txt');
        assert(error instanceof Error, 'instanceof Error');
        assert(error instanceof HttpError, 'instanceof HttpError');
    },
    'proper stacktrace'() {

        var err = new SecurityError('baz');
        eq_(err.message, 'baz');
        eq_(err.name, 'SecurityError');
        eq_(String(err), 'SecurityError: baz');
        has_(err.stack.split('\n')[1], 'proper stacktrace')
    }
})
