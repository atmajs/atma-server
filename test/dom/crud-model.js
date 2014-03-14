Class.MongoStore.settings({
	db: 'test-service-crude'
});

var Foo = Class({
	Base: Class.Serializable,
	Store: Class.MongoStore.Single('foos'),
	
	_id: null,
	name: ''
});

var Endpoints = atma.server.HttpCrudEndpoints.Single(
	'foo', Foo
);

var FooService = atma
	.server
	.HttpService(Endpoints)
	;

atma
	.server
	.app
	.handlers
	.registerService('^/rest/', FooService);
