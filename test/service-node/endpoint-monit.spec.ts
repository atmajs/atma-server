import { HttpEndpoint } from '../../src/HttpService/HttpEndpoint'
import { Application, HttpError } from '../../src/export';

class FooEndpoint extends HttpEndpoint {

    '$get /sync/foo'(req) {
        return {
            foo: 'Foo'
        };
    }
    '$get /sync/error'(req) {
        throw new Error('SyncError');
    }
    async '$get /async/foo'(req) {
        return {
            foo: 'Foo'
        };
    }
    async '$get /async/error'(req) {
        throw new Error('AsyncException');
    }
    async '$get /async/httperror'(req) {
        throw new HttpError('MyHttpException', 501);
    }
    async '$get /async/reject'(req) {
        return Promise.reject(new Error('RejectError'));
    }
}

const app = Application.clean().create({
    configs: null,
    config: {
        debug: true,
        services: {
            '^/foo': FooEndpoint
        }
    }
});
const srv = require('supertest')(
    require('http').createServer(app.process)
);


UTest({
    $before(done) {
        app.done(done as any);
    },
    $teardown () {
        app.lifecycle.off('HandlerSuccess');
        app.lifecycle.off('HandlerError');
    },

    'should resolve sync value' (done) {
        app.lifecycle.on('HandlerSuccess', <any> assert.await((event, req, res) => {
            eq_(typeof event.time, 'number');
            eq_(event.url, '/foo/sync/foo');
        }));

        srv
            .get('/foo/sync/foo')
            .end(done);
    },
    'should resolve async value' (done) {
        app.lifecycle.on('HandlerSuccess', <any> assert.await((event, req, res) => {
            eq_(typeof event.time, 'number');
            eq_(event.url, '/foo/async/foo');
        }));

        srv
            .get('/foo/async/foo')
            .end(() => {
                done();
            });
    },
    'should throw sync value' (done) {
        app.lifecycle.on('HandlerSuccess', assert.avoid());
        app.lifecycle.on('HandlerError', <any> assert.await((event, req, res) => {
            eq_(typeof event.time, 'number');
            has_(String(event.error), 'SyncError');
            eq_(event.url, '/foo/sync/error');
        }));

        srv
            .get('/foo/sync/error')
            .end(done);
    },
    'should throw exception in async' (done) {
        app.lifecycle.on('HandlerSuccess', assert.avoid());
        app.lifecycle.on('HandlerError', <any> assert.await((event, req, res) => {
            eq_(typeof event.time, 'number');
            has_(String(event.error), 'AsyncException');
            eq_(event.url, '/foo/async/error');
        }));

        srv
            .get('/foo/async/error')
            .end(() => done());
    },
    'should throw httperror in async' (done) {
        app.lifecycle.on('HandlerSuccess', assert.avoid());
        app.lifecycle.on('HandlerError', <any> assert.await((event, req, res) => {
            eq_(typeof event.time, 'number');
            has_(String(event.error), 'MyHttpException');
            eq_(event.url, '/foo/async/httperror');
            eq_(event.status, 501);
        }));

        srv
            .get('/foo/async/httperror')
            .end(() => done());
    },
    'should reject async value' (done) {
        app.lifecycle.on('HandlerSuccess', assert.avoid());
        app.lifecycle.on('HandlerError', <any> assert.await((event, req, res) => {
            eq_(typeof event.time, 'number');
            has_(String(event.error), 'RejectError');
            eq_(event.url, '/foo/async/reject');
        }));

        srv
            .get('/foo/async/reject')
            .end(done);
    }
})
