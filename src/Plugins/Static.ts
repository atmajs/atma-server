import { app_isDebug } from '../util/app';
import { Autoreload } from '../Autoreload/Autoreload'
import Application from '../HttpApplication/Application'

const StaticContent = require('static-content');

Application.on('configure', function (app) {
    if (app.isRoot === false || app_isDebug() === false) {
        return;
    }
    StaticContent.on('file', file => {
        Autoreload.watchFile(file)
    });
    Autoreload.getWatcher().on('fileChange', (relPath: string, absPath: string) => {
        StaticContent.Cache.remove(absPath);
    });
});

export default StaticContent;
