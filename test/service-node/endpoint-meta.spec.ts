import { HttpEndpoint } from '../../src/HttpService/HttpEndpoint'
import { Serializable, Json } from 'class-json';
import { Application } from '../../src/export';
import { HttpEndpointExplorer } from '../../src/HttpService/HttpEndpointExplorer';


UTest({
    'should resolve meta for the endpoint'() {
        class User extends Serializable<User> {
            @Json.type(Date)
            date: Date
        }

        const { fromUri, fromBody } = HttpEndpoint;

        @HttpEndpoint.route('/foo/bar')
        class Foo extends HttpEndpoint {
            '$get /'(
                @fromBody(User) user: User
            ) {

            }

            @HttpEndpoint.route('$post /doSmth')
            @HttpEndpoint.response({ Type: User })
            @HttpEndpoint.description('Get smth from api')
            @HttpEndpoint.isInRole('admin')
            doSmth(@fromUri('qux', Number) qux: number) {

            }
        }

        let meta = HttpEndpointExplorer.getMeta(Foo);
        eq_(meta.path, '^/foo/bar');
        eq_(meta.paths.length, 2);

        has_(meta.paths[0], {
            path: '/',
            method: 'get',
            operationId: '$get /',
            parameters: [{
                in: 'body',
                description: 'User',
                schema: {
                    type: 'object',
                    properties: { date: { type: 'string', format: 'date-time' } }
                },
                required: true
            }],
            responses: []
        })
    }
})
