import { Application } from '../../src/export';
import supertest from 'supertest'
import * as http from 'http'

let app: Application;
let srv: supertest.SuperTest<any>;

UTest({
    async $before() {
        app = await Application.clean().create({
            configs: null,
            config: {
                pages: {
                    '/foo': {
                        rewrite: '/test/fixtures/index.mask.mr'
                    }
                }
            }
        });
        srv = supertest(http.createServer(app.process));
    },

    'should render mask file as a page'(done) {
        srv
            .get('/test/fixtures/index.mask.mr')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);
                has_(res.text, '<h4>Foo</h4>')
                done();
            });
    },
    'should rewrite path to static mask file as a page'(done) {
        srv
            .get('/foo')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);
                has_(res.text, '<h4>Foo</h4>')
                done();
            });
    }
});
