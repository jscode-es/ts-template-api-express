// Modules required for the server
import path from 'path'
import { Response } from 'express'
import { CustomRequest,  } from '../types'

const { NODE_ENV } = process.env

const getParams = (url: string) => {
	return url.split('/').join(' ').trim().split(' ')
}

const redirectToDynamicScript = ({ method, params }:{method:string,params:string[]})=>
{	
	let id:string|null = null

	const extension = (NODE_ENV === 'test') ? 'ts' : 'js'

	const [ service, ...arg ] = params
  
 	if(!service.length) params = ['index']
  
  	const lastItem = arg.at(-1)
  
  	if(lastItem && !isNaN(parseInt(lastItem))) 
	{
		id = arg[arg.length-1]

		arg[arg.length-1] = '[id]'
	}
  
  	if(!arg.length) arg['0'] = 'index'
  
  	arg[arg.length-1] = `${arg.at(-1)}.${extension}`
  
	return { dir: path.join(__dirname,'..','router', method, service, ...arg), id }
}

export const router = async (req: CustomRequest, res: Response) => 
{	
	// Recupear datos de la request
	const { method, data } = req

	// Obtener el servicio y el controller de la query http://host/{service}/...{controller}
	const params = getParams(req.originalUrl)

	// Ruta de los métodos
	let {dir, id} = redirectToDynamicScript({method,params})

	try {

		const { getData } = await import(dir)
		
		if(id && data) data.id = id

		const contentData = await getData({ data, req })

		const status = contentData?.status ?? 500

		return res.status(status).json(contentData)

	} catch (error) { 

		console.log('ERROR', error)

		return res.status(500).json({ error: 'ROUTE_NOT_EXIST' })
	} 
}