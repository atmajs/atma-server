import { Application } from '../../src/export';

var srv;

UTest({
	$before (done) {
		Application.create({
				configs: null,
				config: {
					pages: {
						'/foo': {
							rewrite: '/test/fixtures/index.mask.mr'
						}
					}
				}
			})
			.done(app => {
				srv = require('supertest')(
					require('http').createServer(app.process)
				);
				done();
			})
	},
	'should render mask file as a page' (done) {
		srv
			.get('/test/fixtures/index.mask.mr')
			.expect('Content-Type', 'text/html;charset=utf-8')
			.expect(200)
			.end(function(err, res){
				eq_(err, null);
				has_(res.text, '<h4>Foo</h4>')
				done();
			});
	},
	'should rewrite path to static mask file as a page' (done) {
		srv
			.get('/foo')
			.expect('Content-Type', 'text/html;charset=utf-8')
			.expect(200)
			.end(function(err, res){
				eq_(err, null);
				has_(res.text, '<h4>Foo</h4>')
				done();
			});
	}

})