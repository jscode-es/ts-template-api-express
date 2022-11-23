import { Request } from 'express'

export interface IObject {
	[key: string]: string | number | boolean
}

export interface IRequest extends Request {
	isJsonRequest?: boolean;
	ipClient?: string | string[];
	data?: IObject;
	lang?: string;
}

export interface ICustomEnv extends NodeJS.ProcessEnv {
	port?: string;
	host?: string;
	limit_json?: string;
}

export interface IReturn 
{
	status:number 
	error?:string[]
	result?:string|number|boolean|IObject
}

export interface IData 
{
	data:IObject
	request:IRequest
}
