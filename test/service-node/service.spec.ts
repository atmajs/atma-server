import { Application, HttpService } from '../../src/export';
import supertest from 'supertest'
import * as http from 'http'


let app: Application;
let srv: supertest.SuperTest<any>;

UTest({
    async $before() {
        app = await Application.clean().create({
            configs: null,
            config: {
                debug: true,
                services: {

                }
            },
            processor: {
                middleware: [
                    require('body-parser').json(),
                ]
            }
        });


        var FooService = HttpService({
            '$get /': function (res, req) {
                this.resolve({
                    name: 'foo'
                });
            },

            '$get /baz': function (res, req) {
                this.resolve({
                    name: 'baz'
                })
            },

            '$post /echo': function (req, res) {
                if (req.body.name == null) {
                    this.reject(atma.server.HttpError('`name` expected'));
                    return;
                }

                this.resolve({
                    name: req.body.name
                });
            },

            '$get /many': [
                function (req, res, params, next) {
                    req.sum = 5;
                    next();
                },

                function (req, res, params, next) {
                    this.resolve({
                        sum: req.sum + 5
                    });
                }
            ]
        })
            ;


        app
            .handlers
            .registerService('^/foo', FooService);

        srv = supertest(http.createServer(app.process));
    },
    async 'http service root'() {

        let res = await srv
            .get('/foo')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200);

        let json = JSON.parse(res.text);
        eq_(json.name, 'foo');
    },


    async 'http service nested path' () {
        let res = await srv
            .get('/foo/baz')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200);

        let json = JSON.parse(res.text);
        eq_(json.name, 'baz');
    },

    async 'http service echo' () {
        let res = await srv
            .post('/foo/echo')
            .send({ name: 'echoservice' })
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200);

        let json = JSON.parse(res.text);
        eq_(json.name, 'echoservice');
    },

    async 'http service echo - errored' () {
        let res = await srv
            .post('/foo/echo')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(500);

        let json = JSON.parse(res.text);
        eq_(json.error, '`name` expected');
    },


    async 'http service - no endpoint' () {
        await srv
            .post('/foo/daz')
            .expect(404);
    },
    async 'http service - barricade' () {
        let res = await srv
            .get('/foo/many')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200);

        let json = JSON.parse(res.text);
        eq_(json.sum, 10);
    },
});
