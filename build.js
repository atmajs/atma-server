/**
 *	IncludeJSBuild
 *
 *	``` $ includejs build.js ```
 **/


module.exports = {
	'settings': {
		io: {
			extensions: {
				js: ['condcomments:read', 'importer:read']
			}
		}
	},
	'add-defaults-handler': {
		action: 'custom',
		script: 'tools/cfg-defaults.js'
	},
	'import': {
		files: 'builds/**',
		output: 'lib/'
	},
	'jshint': {
		files: ['lib/server.js'],
		jshint: JSHint()
	},
	'uglify': {
		files: 'lib/server.js'
	},

	'watch': [{
		action: 'custom',
		script: 'tools/cfg-defaults.js'
	},{
		action: 'watch',
		files: 'src/**',
		config: '#[import]'
	}],
	'publish': {
		action: 'custom',
		script: 'tools/publish'
	},

	'defaults': ['add-defaults-handler','import', 'jshint', 'uglify']
};




function JSHint() {

	return {
		options: {
			curly: false,
			eqeqeq: true,
			forin: false,
			immed: true,
			noarg: true,
			noempty: true,
			nonew: true,
			expr: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: false,

			boss: true,
			eqnull: true,
			es5: true,
			lastsemic: true,
			browser: true,
			
			onevar: false,
			evil: true,
			sub: true,
			
			smarttabs: true,
			laxcomma  : true,
			laxbreak  : true,
			newcap: false,
			unused: false,

			shadow : true,
			asi: false,
			proto: true,

			node: true,
			latedef: false
			
		},
		globals: {
			define: true,
			require: true,
			ActiveXObject: true,
			Class: true,
			mask: true,
			include: true,
			includeLib: true,
			app: true,
		}
	};
}
