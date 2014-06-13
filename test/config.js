module.exports = {
	
	suites: {
		'service-dom': {
			exec: 'dom',
			env: 'test/service-dom/before.js',
			tests: 'test/service-dom/**.test'
		},
		'service-node': {
			exec: 'node',
			tests: 'test/service-node/**.test'
		},
		
		'examples': {
			exec: 'browser',
			tests: 'test/examples/**.test'
		}
	}
};