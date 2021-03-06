import { page_flatternPageViewRoutes } from '../../../src/util/page';

UTest({
	'should flattern subcategories' () {
		var definition = {
			'/foo': {
				template: 'templateMain',
				view: 'viewMain',
				category: {
					'sub-a': {
						view: 'viewSubA'
					},
					'sub-b': {
						view: 'viewSubB'
					}
				}
			}
		};
		var settings = {
			pattern: '/:view/:category'
		};

		var pages = page_flatternPageViewRoutes(definition, settings);
		has_(pages, {
			'/foo/sub-a': {
				template: 'templateMain',
				category: 'viewSubA'
			},
			'/foo/sub-b': {
				template: 'templateMain',
				category: 'viewSubB'
			}
		});
	}
})
