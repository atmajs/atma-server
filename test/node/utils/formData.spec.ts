import { FormDataUtil } from '../../../src/util/FormDataUtil';

UTest({
    'should deserialize object' () {
        let json = FormDataUtil.map({
            'user.photo': '1.jpg',
            'user.name': 'Foo',
            'user.location.lat': '2'
        });
        deepEq_(json, {
            user: {
                photo: '1.jpg',
                name: 'Foo',
                location: {
                    lat: '2'
                }
            }
        });
    },
    'should deserialize object with array' () {
        let json = FormDataUtil.map({
            'letters[0].name': 'A',
            'letters[1].name': 'B',
        });
        deepEq_(json, {
            letters: [ { name: 'A' }, { name: 'B' } ]
        });
    },
    'should deserialize array objects' () {
        let json = FormDataUtil.map({
            '[0].url': '1.jpg',
            '[0].amount': '1',
            '[0].date': '2020',
            '[1].amount': '2',
            '[1].date': '2021'
          }, {
            '[1].url': '2.jpg',
          });
        deepEq_(json, [
            { url: '1.jpg', amount: '1', date: '2020' },
            { url: '2.jpg', amount: '2', date: '2021' },
        ]);
    },
    'should deserialize array of strings' () {
        let json = FormDataUtil.map({
            'roles[0]': 'x',
            'roles[1]': 'y',
            'roles[2]': 'z'
        });
        deepEq_(json, { roles: ['x', 'y', 'z'] });
    },
})
