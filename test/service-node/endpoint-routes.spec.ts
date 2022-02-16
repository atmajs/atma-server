import Application from '../../src/HttpApplication/Application'
import { HttpEndpointExplorer } from '../../src/HttpService/HttpEndpointExplorer';
import { File } from 'atma-io';
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
                service: {
                    endpoints: '/test/fixtures/Endpoints/'
                }
            }
        });
        srv = supertest(http.createServer(app.process));
    },

    async 'should resolve endpoint paths'() {
        let endpoints = await HttpEndpointExplorer.find(app.config.service.endpoints);
        let checkKey = '^/api/v1/lorem';
        let checkVal = '/test/fixtures/Endpoints/LoremEndpoint.ts';

        eq_(checkKey in endpoints, true);
        has_(endpoints[checkKey], checkVal);
        eq_(File.exists(endpoints[checkKey]), true);
    },

    'should resolve lorem endpoint from fixtures'(done) {
        srv
            .get('/api/v1/lorem/')
            .expect('Content-Type', 'application/json;charset=utf-8')
            .expect(200)
            .end(function (err, res) {
                eq_(err, null);

                var json = JSON.parse(res.text);
                deepEq_(json, { lorem: 'ipsum' });
                done();
            });
    }
})
