import HttpPage from '../../src/HttpPage/HttpPage';
import { StaticContent, Application } from '../../src/export';
import supertest from 'supertest'
import * as http from 'http'


let app: Application;
let srv: supertest.SuperTest<any>;

class PageController extends HttpPage {
    master: string = 'layout:master #stab;'
    template = ':document'
};


UTest({

    async $before() {
        app = await Application.clean().create({
            base: __dirname,
            configs: null,
            config: {
                debug: true,
                page: {
                    errors: {
                        '404': {
                            masterPath: '',
                            templatePath: '~/error/404.mask'
                        }
                    }
                },
                pages: {
                    '/page': {
                        controller: PageController,
                        scripts: 'page-script.js',
                        styles: 'page-style.css',
                    }
                },
                env: {
                    client: {
                        styles: 'app-style.css',
                        scripts: 'app-scripts.js'
                    }
                }
            }
        });
        srv = supertest(http.createServer(app.processor({
            after: [
                StaticContent.process
            ]
        }).process));
    },
    'find static'(done) {
        srv
            .get('/error/404.mask')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(404)
            .end(function (err, res) {
                eq_(err, null);
                has_(res.text, 'h1>');
                done();
            });
    },

    'not found: 404'(done) {
        srv
            .get('/foo')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(404)
            .end(function (err, res) {
                eq_(err, null);
                has_(res.text, 'not found');
                has_(res.text, 'foo');
                done();
            });
    },

    'default error'(done) {
        app.config.page = {};
        srv
            .get('/foo')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(404)
            .end(function (err, res) {
                eq_(err, null);
                has_(res.text, '<span>404</span>');
                has_(res.text, '<tt>Endpoint not found');
                done();
            });
    }
})
