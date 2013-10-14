Atma Node.js Server Module
----

Connect Middleware.

This module uses:

- MaskJS.Node
- IncludeJS.Node
- ClassJS.Node
- atma.logger
- atma.io


To setup a bootstrap project use Atma.Toolkit - ``` $ atma template server ```

All the configuration and the routing are defined in '/server/config/**.yml' files (path is also configurable).

There are 3 Types of a request endpoint:

- Handler (generic handler)
- HttpService (RESTful service)
- HttpPage


### Handler

To declare a Handler is as simple as to define a Class/Constructor 
with Deferred implementation and process function in prototypes, like this

```javascript
// server/http/handler/hello.js
module.exports = Class({
	Base: Class.Deferred,
	process: function(req, res){

		this.resolve('Hello World');

		// or

		var that = this;
		setTimeout(function(){
			that.resolve('Hello World - wait async');
		}, 200);
	}
});
```

To bind for a route:
```yml
# server/config/handlers.yml

handler:
	location: '/server/http/handler/{0}.js'
	# <- default

handlers:
	'/say/hello': hello
```

Handler is the first endpoint that will be looked for in defined routes by the responder.
Usually this is the low level handlers, like 'Less' preprocessor. 
But the interface ``` (Deferred + process(req, res)) ``` is the same as in HttpService and HttpPage


### HttpService

```javascript
// server/http/service/time.js
module.exports = atma.server.HttpService({
	'!/': function(req, res){
		this.resolve('This is a time service');
	},
	'/:transport(console|file|client)': function(req, res, params){
		var time = new Date().toString(),
			that = this;
		switch(params.transport){
			case 'console':
				console.log(' > time', time);
				this.resolve('Pushed to console');
				return;
			case 'file':
				var that = this;
				fs.write('someFile.txt', time, function(error){
					if (error) return that.reject(error);
					that.resolve('Saved to file');
				});
				return;
			case 'client':
				this.resolve(time);
				return;
		}
	}
})
```

```yml
# server/config/services.yml

service:
	location: /server/http/service/{0}.js'
	# <- default

services:
	'/time': time
```

### _(still in progress)_ Barricades

Define the 'Barricade' Functions to reach the service handler. To get the idea look at this example:

```javascript
var HttpService = atma.server.HttpService
module.exports = HttpService({
	'/current': HttpService.Barricade(
		HttpService.isInRole('admin'), 
		function(req, res, params) {
			// process request
		}
	)
})
```

### HttpPage

HttpPage consists of 3 parts

- Controller
- Master View Template
- View Template

You would rare redefine the default controller, as each Page contains of a component composition. 
So the logic could be moved to each component. We wont explain what a component is, as you should refer to MaskJS library.
Some things we remind:

- **Context**
	```javascript
	{ req: <Request>, res: <Response>, page: <HttpPage (current instance)> }
	```
- **Render Mode**
	Define if the component(optionally define the same mode for all children) is rendered on the server or client mode, default mode is 'both'
	Define if the model is serialized and sent to the client
- **Cache**
	Components rendered output could be cached and the conditions could be defined.
	- byProperty: Get data from model or ctx and cache compo for each unique value.


```javascript
mask.registerHandler(':requestedUrl', Compo({
	mode: <String> // 'server' 'server:all' 'client' 'client:all'
	modelMode: <String> // 'server' 'server:all'
	cache: {
		byProperty: <String> // e.g: 'ctx.req.url'
	},

	onRenderStart: function(model, ctx){
		this.nodes = jmask('h4').text(ctx.req.url);
	}
}))
```

Going back to the HttpPage, lets start from a master view template

#### Master View

Please refer to [layout component](http://atmajs.com/compo/layout)

Example:
```mask
// server/http/master/default.mask

layout:master #default {

	:document {
		
		head {
			meta http-equiv="Content-Type" content="text/html;charset=utf-8";
			meta name="viewport" content="maximum-scale=1.5, minimum-scale=.8, initial-scale=1, user-scalable=1";
			title > "Atma.js"

			:styles;
		}
		
		body {
			
			@placeholder #body;
			
			:scripts;
		}
	}
}
```


#### Page View

```mask
// server/http/page/hello.mask

layout:view master=default {
	@content #body {
		'Hello World'
	}
}
```

The routing is also made via configuration files

```yml
# server/config/pages.yml

page: 
	location:
		# controller: '/server/http/page/{0}/{1}.js'
		# template: '/server/http/page/{0}/{1}.mask'
		# master: '/server/http/master/{0}.mask'
		# <- this all are defaults

pages: 
	'!/hello': 
		template: hello
		master: default #<- default

		# also other data could be here defined, and then accessed in components onRenderStart like: ``` ctx.page.data.title ```
		title: Hello
```

**Route Declaration** refer to [RutaJS](http://atmajs.com/ruta)
