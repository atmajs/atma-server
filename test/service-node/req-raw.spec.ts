import HttpService from '../../src/HttpService/HttpService';
import Application from '../../src/HttpApplication/Application';
import { HttpResponse } from '../../src/IHttpHandler';

let FooService = HttpService({
    '$get /'() {
        this.resolve('I GET Service', 304)
    },
    '$post /baz': {
        f: class Foo { },
        meta: {
            description: 'Baz Helper',
            arguments: {
                bazValue: 'string'
            }
        },
        process: [
            function (req) {
                this.resolve('POST:' + req.body.bazValue)
            }
        ]
    }
});


let app: Application;

UTest({
    async '$before'() {
        app = await Application.create({
            configs: null,
            config: { debug: true }
        })
        app
            .handlers
            .registerService('^/foo', FooService)
            ;
    },
    'get'(done) {
        app
            .execute('/foo', 'get')
            .fail(assert.avoid())
            .done(function (response: HttpResponse) {
                let { content, statusCode } = response;
                eq_(statusCode, 304);
                eq_(content, 'I GET Service');
            })
            .always(done);
    },
    'post'(done) {
        app
            .execute('/foo/baz', 'post', { bazValue: 'bazzy' })
            .fail(assert.avoid())
            .done(function (response: HttpResponse) {
                let { content, statusCode } = response;
                eq_(statusCode, 200);
                eq_(content, 'POST:bazzy');
            })
            .always(done);
    },
    'post - invalid'(done) {
        app
            .execute('/foo/baz', 'post', { bazValue: 10 })
            .then(
                assert.avoid(),
                function (response) {
                    let { content: error, statusCode } = response;
                    //eq_(statusCode, 400);

                    eq_(error.name, 'RequestError');
                    eq_(error.message, 'Invalid type. Expect: string Property: bazValue');
                    done();
                });
    }
})
