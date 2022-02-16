import HttpService from '../../src/HttpService/HttpService';

var FooService = HttpService({
    '$get /': function(){},
    '$post /baz': {
        meta: {
            description: 'Baz Helper',
            arguments: {
                bazValue: 'string'
            }
        },
        process: [
            function () {}
        ]
    }
});

UTest({
    'service help': function(){

        var help = new FooService().help();

        has_(help, [{
            path: '/baz',
            description: 'Baz Helper',
            arguments: {
                bazValue: 'string'
            }
        }]);
    }
})
