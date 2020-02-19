import { HttpEndpoint } from '../../../src/HttpService/HttpEndpoint'

@HttpEndpoint.route('/api/v1/lorem')
export default class LoremEndpoint extends HttpEndpoint {

    '$get /' () {
        return { lorem: 'ipsum' };
    }
}