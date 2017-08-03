import { Class } from './dependency'
import { HttpError } from './HttpError/HttpError' 
import { IncomingMessage, ServerResponse } from 'http'
import { IApplicationConfig } from './HttpApplication/IApplicationConfig'


export interface IHttpHandler {
	process (req: IncomingMessage, res: ServerResponse, config?: IApplicationConfig): Class.DeferredLike

};