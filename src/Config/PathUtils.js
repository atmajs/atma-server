var PathUtils;
(function() {
	PathUtils = {
		/**
		 *	Format Path / location as in IncludeJS
		 */
		format: function path_format(location, path) {
			if (path.charCodeAt(0) === 47) {
				// /
				return path;
			}

			var params,
				route,
				i,
				length,
				arr;

			var template = path.split('/'),
				route = location.split(/[\{\}]/g);


			path = route[0];

			for (i = 1; i < route.length; i++) {
				if (i % 2 === 0) {
					path += route[i];
				} else {
					/** if template provides less "breadcrumbs" than needed -
					 * take always the last one for failed peaces */

					var index = route[i] << 0;
					if (index > template.length - 1) {
						index = template.length - 1;
					}

					path += template[index];

					if (i === route.length - 2) {
						for (index++; index < template.length; index++) {
							path += '/' + template[index];
						}
					}
				}
			}
			return path;
		}
	};
}());