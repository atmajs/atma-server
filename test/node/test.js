Class.MongoStore.settings({
	db: 'calendar'
});

var Foo = Class({
	Store: Class.MongoStore.Single('foo')
})

Foo.fetch().fail(function(error){ logger.error(error); })
