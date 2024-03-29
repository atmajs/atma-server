import HttpPage from '../../src/HttpPage/HttpPage';
import Application from '../../src/HttpApplication/Application';
import supertest from 'supertest'
import * as http from 'http'

let app: Application;
let srv: supertest.SuperTest<any>;


class PageController extends HttpPage {
    master = 'layout:master #stab;'
    template = `
        :document {
            atma:styles;
            atma:scripts;


            define Foo {
                var model = {
                    name: 'IsFoo'
                }
                span > '~[name]';
            }
            Foo;
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
                        styles: 'style-page.css',
                        scripts: 'script-page.js'
                    }
                },
                include: {
                    src: 'include-stub',
                },
                env: {
                    both: {
                        scripts: 'script-both.js'
                    },
                    client: {
                        include: {
                            src: 'include-stub',
                        },

                        scripts: 'script-client.js'
                    }
                }
            }
        });
        srv = supertest(http.createServer(app.process));
    },
    'render full'(done) {
        srv
            .get('/page')
            .expect('Content-Type', 'text/html;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);

                has_(res.text, 'href="style-page.css"');
                has_(res.text, 'src="include-stub"');
                // scripts are loaded via includejs in debug
                has_(res.text, "cfg({})");
                has_(res.text, "routes({})");
                has_(res.text, "'script-both.js'");
                has_(res.text, "'script-client.js'");
                has_(res.text, "<body><!--m", "m definition should be direct inside body");
                has_(res.text, 'IsFoo');
                done();
            });
    }
})
