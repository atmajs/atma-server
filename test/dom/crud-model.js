
Class.MongoStore.settings({
	db: 'test-service-crud'
});

var Foo = Class({
	Base: Class.Serializable,
	Store: Class.MongoStore.Single('foos'),
	
	_id: null,
	name: ''
});

var Foos = Class.Collection(Foo, {
	Base: Class.Serializable,
	Store: Class.MongoStore.Collection('foos')
});

var endpoints_Single = atma.server.HttpCrudEndpoints.Single(
	'foo', Foo
);
var endpoints_Collection = atma.server.HttpCrudEndpoints.Collection(
	'foos', Foos
);

var FooService = atma
	.server
	.HttpService(endpoints_Single, endpoints_Collection)
	;

atma
	.server
	.app
	.handlers
	.registerService('^/rest/', FooService);
