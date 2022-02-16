import Application from '../../src/HttpApplication/Application';
import HttpPage from '../../src/HttpPage/HttpPage';
import supertest from 'supertest'
import * as http from 'http'

let app: Application;
let srv: supertest.SuperTest<any>;

class PageController extends HttpPage {
    master = 'layout:master #stab;'
    template = `
        :document {
            body {
                header > 'Header'
                section > 'Section'
            }
        }
    `
};
UTest({

    async $before() {
        app = await Application.clean().create({
            configs: null,
            config: {
                debug: true,
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
        srv = supertest(http.createServer(app.process));
    },
    'render full': function (done) {
        srv
            .get('/page')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);
                has_(res.text, '<header>Header</header>')
                has_(res.text, '<section>Section</section>')
                done();
            });
    },
    'render partial': function (done) {
        srv
            .get('/page?partial=section')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);
                eq_(res.body.html, '<section>Section</section>')
                deepEq_(res.body.scripts, ['page-script.js']);
                deepEq_(res.body.styles, ['page-style.css']);

                done();
            });
    }
})
