import HttpService from '../../src/HttpService/HttpService';
import { HttpError } from '../../src/HttpError/HttpError';
import Application from '../../src/HttpApplication/Application';

var rejectService = HttpService({
    '/string'() {
        this.reject('String reject');
    },
    '/native'() {
        this.reject(new TypeError('Native reject'));
    },
    '/http'() {
        this.reject(new HttpError('Http reject', 503));
    },
    '/object'() {
        this.reject({ error: 'FooError', baz: 'Lorem' });
    }
});
var app = Application.create({
    configs: null,
    config: {
        debug: true,
        services: {
            '^/reject': rejectService
        }
    }
});
var srv = require('supertest')(
    require('http').createServer(app.process)
);

UTest({
    $before(done) {
        app.done(() => done());
    },

    'string error'(done) {
        srv
            .get('/reject/string')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(500)
            .end(function (err, res) {
                eq_(err, null);

                var error = JSON.parse(res.text);
                eq_(error.code, 500);
                eq_(error.error, 'String reject');
                deepEq_(Object.keys(error), ['name', 'error', 'code']);
                done();
            });
    },
    'native error'(done) {
        srv
            .get('/reject/native')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(500)
            .end(function (err, res) {
                eq_(err, null);

                var error = JSON.parse(res.text);
                eq_(error.code, 500);
                eq_(error.error, 'Native reject');

                deepEq_(Object.keys(error), ['name', 'error', 'code']);
                done();
            });

    },
    'http error'(done) {
        srv
            .get('/reject/http')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(503)
            .end(function (err, res) {
                eq_(err, null);

                var error = JSON.parse(res.text);
                eq_(error.code, 503);
                eq_(error.error, 'Http reject');
                deepEq_(Object.keys(error), ['name', 'error', 'code']);
                done();
            });
    },
    'object error'(done) {
        srv
            .get('/reject/object')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(500)
            .end(function (err, res) {
                eq_(err, null);
                var error = JSON.parse(res.text);
                deepEq_(error, {
                    error: 'FooError',
                    baz: 'Lorem'
                });
                done();
            });
    }
})
