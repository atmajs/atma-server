import Application from '../../src/HttpApplication/Application'
import { HttpEndpoint } from '../../src/HttpService/HttpEndpoint'


function testMiddleware (req) {
    req.middleware = 'Bar';
    return Promise.resolve();
}

class TestEndpoint extends HttpEndpoint {

    @HttpEndpoint.middleware(testMiddleware)
    '$get /foo' (req) {
        return { 
            foo: 'Foo', 
            middleware: req.middleware 
        };
    }
}

@HttpEndpoint.isAuthorized()
class SecuredEndpoint extends HttpEndpoint {

    '$get /foo' () {
        return 1;
    }
}

const app = Application.create({
	configs: null,
	config: {
		debug: true,
		services: {
            '^/tested': TestEndpoint,
            '^/notallowed': SecuredEndpoint
		}
	}
});
const srv = require('supertest')(
	require('http').createServer(app.process)
);

UTest({
	$before (done) {
		app.done(done);		
	},

	'get model': function(done){
		srv
			.get('/tested/foo')
			.expect('Content-Type', 'application/json;charset=utf-8')
			.expect(200)
			.end(function(err, res){
                eq_(err, null);

				var json = JSON.parse(res.text);
				deepEq_(json, { 
                    foo: 'Foo',
                    middleware: 'Bar'
                });
                done();
			});
    },
    'authorized' (done) {
        srv
			.get('/notallowed/foo')
			.expect('Content-Type', 'application/json;charset=utf-8')
			.expect(403)
			.end(function(err, res){
                eq_(err, null);
                

                console.log('TEXT', res.text);

				var json = JSON.parse(res.text);
				has_(json, { 
                    code: 403,
                    error: 'Access Denied'
                });
				done();
			});
    }
})
