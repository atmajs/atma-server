import HttpService from '../../src/HttpService/HttpService';
import Application from '../../src/HttpApplication/Application';

var FooService = HttpService({
    '$get /' (){
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

var app;
UTest({
    '$before' (done){
        Application.create({
                configs: null,
                config: { debug: true }
            })
            .done(function(app_){
                app = app_;
                app
                    .handlers
                    .registerService('^/foo', FooService)
                    ;
                done();
            })
    },
    'get' (done){
        app
            .execute('/foo', 'get')
            .fail(assert.avoid())
            .done(function(content, statusCode){
                eq_(statusCode, 304);
                eq_(content, 'I GET Service');
            })
            .always(done);
    },
    'post' (done){
        app
            .execute('/foo/baz', 'post', { bazValue: 'bazzy' })
            .fail(assert.avoid())
            .done(function(content, statusCode){
                eq_(statusCode, 200);
                eq_(content, 'POST:bazzy');
            })
            .always(done);
    },
    'post - invalid' (done){
        app
            .execute('/foo/baz', 'post', { bazValue: 10 })
            .done(assert.avoid())
            .fail(function(error, statusCode){
                eq_(statusCode, 400);

                eq_(error.name, 'RequestError');
                eq_(error.message, 'Invalid type. Expect: string Property: bazValue');
            })
            .always(() => {
                done();
            });
    }
})
