import {mime_HTML} from '../const/mime'
import Application from '../HttpApplication/Application'
import { class_Dfr } from 'atma-utils'
import HttpContext from './HttpContext'

export default abstract class HttpPageBase extends class_Dfr {
    data = {
        id: null,
        env: null
    } as {
        id: string,
        env: {
            both: any
            server: any
            client: any
        },
        redirect: string
        rewrite: string
        secure: boolean | { role: string }
    }

    pattern: string
    isHtmlPage = false
    template: string
    master: string

    ctx: HttpContext

    templatePath: string
    masterPath: string
    location: string
    query: any
    model: any

    compoPath: string

    resource

    nodes

    middleware

    onRenderStart:Function

    constructor(public route, public app: Application) {
        super();
    }

    //mimeType = mime_HTML

    getScripts (config){
        return config.$getScripts(this.data.id);
    }

    getStyles (config){
        return config.$getStyles(this.data.id);
    }

    abstract _load ();
};
