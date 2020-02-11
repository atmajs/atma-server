import Application from '../../src/HttpApplication/Application'
import { HttpEndpoint } from '../../src/HttpService/HttpEndpoint'
import { Serializable, Json } from 'class-json';


function testMiddleware(req) {
    req.middleware = 'Bar';
    return Promise.resolve();
}

class TestEndpoint extends HttpEndpoint {

    @HttpEndpoint.middleware(testMiddleware)
    '$get /foo'(req) {
        return {
            foo: 'Foo',
            middleware: req.middleware
        };
    }
}

@HttpEndpoint.isAuthorized()
class SecuredEndpoint extends HttpEndpoint {
    '$get /foo'() {
        return 1;
    }
}

class UriParserEndpoint extends HttpEndpoint {
    '$get /number/:num' (
        @HttpEndpoint.fromUri('num', Number) num: number,
        @HttpEndpoint.fromUri('age', Number) age: number,
        ) {
        eq_(typeof num, 'number');
        eq_(typeof age, 'number');
        return [num, age];
    }
}

const app = Application.create({
    configs: null,
    config: {
        debug: true,
        services: {
            '^/tested': TestEndpoint,
            '^/notallowed': SecuredEndpoint,
            '^/params/uri': UriParserEndpoint,
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

    'get model': function (done) {
        srv
            .get('/tested/foo')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);

                var json = JSON.parse(res.text);
                deepEq_(json, {
                    foo: 'Foo',
                    middleware: 'Bar'
                });
                done();
            });
    },
    'authorized'(done) {
        srv
            .get('/notallowed/foo')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(403)
            .end(function (err, res) {
                eq_(err, null);


                console.log('TEXT', res.text);

                var json = JSON.parse(res.text);
                has_(json, {
                    code: 403,
                    error: 'Access Denied'
                });
                done();
            });
    },
    '!uri params': {
        'should parse numbers' (done) {
            srv
                .get('/params/uri/number/5?age=7')
                .expect('Content-Type', 'application/json;charset=utf-8')
                .expect(200)
                .end(function (err, res) {
                    eq_(err, null);
                    eq_(res.text, '[5,7]');
                    done();
                });
        },
        'should return error' (done) {
            srv
                .get('/params/uri/number/5?age=hello')
                .expect('Content-Type', 'application/json;charset=utf-8')
                .expect(400)
                .end(function (err, res) {
                    has_(res.text, 'age');
                    done();
                });
        },
        async 'should parse as object' () {
            class Foo extends HttpEndpoint {
                '$get /' (
                    @HttpEndpoint.fromUri() json
                ) {
                    return json;
                }
            }

            let req = { url: '/?foo=f&bar=b', method: 'GET', headers: {} };
            let foo = new Foo();

            let result = await foo.process(req as any, null);
            deepEq_(result, {
                foo: 'f',
                bar: 'b'
            });
            eq_(HttpEndpoint.prototype.meta, null, 'meta of the base class must be always null');
        },
        async '!should parse body' () {

            class User extends Serializable<User> {
                @Json.type(Date)
                date: Date
            }

            class Foo extends HttpEndpoint {
                '$get /' (
                    @HttpEndpoint.fromBody(User) user: User
                ) {
                    eq_(user.date instanceof Date, true)
                    return { ticks: user.date.getTime() };
                }
            }

            let req = { url: '/', method: 'GET', headers: {}, body: { date: new Date() } };
            let foo = new Foo();

            let result = await foo.process(req as any, null);
            eq_(result.ticks, req.body.date.getTime());
            eq_(HttpEndpoint.prototype.meta, null, 'meta of the base class must be always null');
        }
    }
})
