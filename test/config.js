module.exports = {

	suites: {
		'service-dom': {
			exec: 'dom',
			env: 'test/service-dom/before.js',
			tests: 'test/service-dom/**.test'
		},
		'service-node': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/service-node/**.test'
		},

		'errors': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/error/**.test'
		},

		'examples': {
			exec: 'browser',
			tests: 'test/examples/**.test'
		},

		'page': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/page/**.test'
		},

		'config': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/config/**.test'
		},

		'handlers': {
			exec: 'node',
			env: '/lib/server.js',
			tests: 'test/handlers/**.test'
		}
	}
};