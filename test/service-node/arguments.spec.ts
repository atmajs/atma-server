import { service_validateArgs } from '../../src/HttpService/utils'


function checkObject(a, b) {
	
	return service_validateArgs(a, b);
}

UTest({
	
	'check object': function(){
		
		var error,
			expect = {
				username: 'string',
				password: 'string',
				'?age': 'number',
				'?joker': {
					'x_joker': 'number',
					'?y_joker': 'number'
				}
			};
		
		error = checkObject({
			username: 'foo',
			password: 'baz'
		}, expect);
		eq_(error, null);
		'> miss property'
		error = checkObject({
			username: 'foo'
		}, expect);
		has_(error, {
			property: 'password',
			type: 'expect'
		});
		
		'> type missmatch'
		error = checkObject({
			username: 20,
			password: 'baz'
		}, expect);
		has_(error, {
			property: 'username',
			type: 'type',
			expect: 'string'
		});
		
		error = checkObject({
			username: 'foo',
			password: 'baz',
			age: 'qux'
		}, expect);
		has_(error, {
			property: 'age',
			type: 'type',
			expect: 'number'
		});
		
		
		'> miss subproperty'
		error = checkObject({
			username: 'foo',
			password: 'baz',
			joker: {} 
		}, expect);
		has_(error, {
			property: 'joker.x_joker',
			type: 'expect'
		});
		
		error = checkObject({
			username: 'foo',
			password: 'baz',
			joker: {
				x_joker: 'hello'
			} 
		}, expect);
		has_(error, {
			property: 'joker.x_joker',
			expect: 'number',
			type: 'type'
		});
		
		'> invalid optional subproperty type'
		error = checkObject({
			username: 'foo',
			password: 'baz',
			joker: {
				x_joker: 5,
				y_joker: 'baz'
			} 
		}, expect);
		has_(error, {
			property: 'joker.y_joker',
			type: 'type',
			expect: 'number'
		});
		
		'> valid'
		error = checkObject({
			username: 'foo',
			password: 'baz',
			joker: {
				x_joker: 5,
				y_joker: 7
			} 
		}, expect);
		eq_(error, null);
		
		'> array property: valid'
		expect = <any> {
			collection: [ {_id: 'string'}]
		}
		error = checkObject({
			collection: [
				{ _id: '4343' },
				{ _id: '4343' },
				{ _id: '4343' },
			]
		}, expect);
		eq_(error, null);
		
		'> array property: invalid'
		error = checkObject({
			collection: [
				{ _id: '4343' },
				{ _id: '4343' },
				{ _id: 4343 },
			]
		}, expect);
		has_(error, {
			property: 'collection.2._id',
			type: 'type',
			expect: 'string'
		});
		
		'> array'
		expect = <any> [ {_id: 'string' }]
		error = checkObject([
			{ _id: '4343' },
			{ _id: '4343' },
		], expect);
		eq_(error, null);
		
		
		'> regexp - valid'
		expect = <any> { rgx: /^\w+$/ }
		error = checkObject({
			rgx: 'asd92'
		}, expect);
		eq_(error, null);
		
		'> regexp - invalid'
		expect = <any> { rgx: /^\w+$/ }
		error = checkObject({
			rgx: 'as-d92'
		}, expect);
		has_(error, {
			property: 'rgx',
			type: 'invalid'
		});
	}
	
})