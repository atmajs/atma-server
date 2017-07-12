"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.page_flatternPageViewRoutes = function (pages, pageCfg) {
    var out = {}, key, page;
    for (key in pages) {
        page = pages[key];
        addPage(out, key, page, pages, pageCfg);
    }
    return out;
};
function addPage(out, key, page, pages, pageCfg) {
    if (page.route == null) {
        page.route = key;
    }
    if (page.id == null) {
        page.id = key;
    }
    var pattern = page.pattern || pageCfg.pattern;
    var segments = getSegments(pattern);
    var arr = split(page, segments);
    arr.forEach(function (x) {
        out[x.route] = x;
    });
}
function split(page, segments, prevSegment) {
    if (prevSegment === void 0) { prevSegment = null; }
    if (segments.length === 0) {
        return [page];
    }
    var segment = segments.shift();
    var sub = page[segment];
    if (sub == null) {
        return [page];
    }
    var arr = [];
    for (var key in sub) {
        var subPage = merge(page, key, sub[key], prevSegment, segment);
        var subArr = split(subPage, segments.slice(), segment);
        if (subArr) {
            arr = arr.concat(subArr);
        }
    }
    return arr;
}
function merge(pageData, subPagePath, subPage, prevSegment, currentSegment) {
    var page = Object.create(pageData);
    var path = subPagePath;
    if (path[0] !== '/') {
        path = pageData.route + '/' + path;
    }
    page[currentSegment] = subPage.view;
    page.route = page.id = path;
    for (var key in subPage) {
        if (key === 'view' || key === 'route' || key === 'id')
            continue;
        page[key] = subPage[key];
    }
    return page;
}
function getSegments(pattern) {
    return pattern
        .split('/')
        .filter(function (path) {
        return path !== '';
    })
        .map(function (path) {
        return path.replace(':', '');
    })
        .slice(1);
}
