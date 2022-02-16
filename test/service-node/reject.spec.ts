import HttpService from '../../src/HttpService/HttpService';
import { HttpError } from '../../src/HttpError/HttpError';
import Application from '../../src/HttpApplication/Application';
import supertest from 'supertest'
import * as http from 'http'

let app: Application;
let srv: supertest.SuperTest<any>;


let rejectService = HttpService({
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

UTest({
    async $before() {
        app = await Application.clean().create({
            configs: null,
            config: {
                debug: true,
                services: {
                    '^/reject': rejectService
                }
            }
        });
        srv = supertest(http.createServer(app.process));
    },

    'string error'(done) {
        srv
            .get('/reject/string')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(500)
            .end(function (err, res) {
                eq_(err, null);

                let error = JSON.parse(res.text);
                eq_(error.code, 500);
                eq_(error.error, 'String reject');
                deepEq_(Object.keys(error), ['name', 'error', 'code', 'stack']);
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

                let error = JSON.parse(res.text);
                eq_(error.code, 500);
                eq_(error.error, 'Native reject');

                deepEq_(Object.keys(error), ['name', 'error', 'code', 'stack']);
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

                let error = JSON.parse(res.text);
                eq_(error.code, 503);
                eq_(error.error, 'Http reject');
                deepEq_(Object.keys(error), ['name', 'error', 'code', 'stack']);
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
                let error = JSON.parse(res.text);
                deepEq_(error, {
                    error: 'FooError',
                    baz: 'Lorem'
                });
                done();
            });
    }
})
