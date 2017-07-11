import { include, mask, logger, Class, obj_default } from '../dependency'
import { HttpError } from '../HttpError/HttpError'
import { LIB_DIR } from '../vars'
import { fn_delegate, fn_proxy } from '../util/fn'


const HttpErrorPage =  Class({
		
		Extends: [
			Class.Deferred,
			Resources
		],
		
		template: null,
		master: null,
		
		ctx: null,
		
		templatePath: null,
		masterPath: null,
		
		route: null,
		query: null,
		model: null,
		
		Construct: function(error, pageData, config){
			this._setPageData(pageData, config);
			this.model = error;
		},
		_setPageData: function(data, cfg){
			this.data = data;
			
			if (data.masterPath != null) 
				this.masterPath = data.masterPath;
			
			if (data.templatePath != null) 
				this.templatePath = data.templatePath;
			
			if (data.master) 
				this.masterPath = cfg.$getMaster(data);
			
			if (data.template) 
				this.templatePath = cfg.$getTemplate(data);
			
			if (data.compo) 
				this.compoPath = cfg.$getCompo(data);
			
			
			if (this.template == null && this.compoPath == null && this.templatePath == null)
				this.templatePath = cfg.$getTemplate(data);
			
			if (this.master == null && this.masterPath == null)
				this.masterPath = cfg.$getMaster(data);
			
		},
		Static: {
			send: function(error, req, res, config){
				var pageCfg = config.page,
					errorPages = pageCfg.errors,
					genericPage = pageCfg.error
					;
					
				var pageData = (errorPages && errorPages[error.statusCode]) || genericPage;
				if (pageData == null) {
					pageData = {
						masterPath: '',
						templatePath:  LIB_DIR.combine('../pages/error/error.mask').toString()
					};
				}
				
				return new HttpErrorPage(error, pageData, config).process(req, res, config);
			}
		},
		process: function(req, res, config){
			this
				.done(pageError_sendDelegate(res, this.model))
				.fail(pageError_failDelegate(res, this.model))
				;
			page_proccessRequest(this, req, res, config);
		},
		
		_load: function(){
			
			this.resource = include
				.instance()
				.load(
					page_pathAddAlias(this.masterPath, 'Master'),
					page_pathAddAlias(this.templatePath, 'Template'))
				.js(
					page_pathAddAlias(this.compoPath, 'Compo')
				)
				.done(fn_proxy(this._response, this));
			return this;
		},
		
		
		_response: function(resp){
			
			var master = resp.load.Master || this.master,
				template = resp.load.Template || this.template,
				nodes = this.nodes || template
				;
			if (master == null && this.masterPath !== '') {
				this.reject(new HttpError('Page: Masterpage not found'));
				return;
			}
			
			if (nodes == null) {
				this.reject(new HttpError('Page: Template not found'));
				return;
			}
			
			if (master) 
				mask.render(mask.parse(master));
			
			page_process(
				this
				, nodes
				, fn_delegate(page_resolve, this)
			);
		}
	
	});

export default HttpErrorPage;