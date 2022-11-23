import { Response, NextFunction } from 'express'
import { IRequest } from '../types'

export const middleware = ( req: IRequest, res: Response, next: NextFunction ) =>
{	
	// Ignore favicon
	if (req.originalUrl.includes('favicon.ico')) return res.status(204).end()

	// Ip client
	req.ipClient = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

	// Check is json
	req.isJsonRequest = req.get('Content-Type') === 'application/json'

	// Force convert method
	req.method = String(req.method).toLowerCase()

	// Focus unique data
	req.data = Object.keys(req.query).length ? req.query : req.body

	// Continue request
	next()
}	