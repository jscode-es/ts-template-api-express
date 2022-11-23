import { ICustomEnv } from '../types'

const { port, host, limit_json }: ICustomEnv = process.env

if (!host || !port) process.exit(0)

// Modules required for the server
import express from 'express'
import cors from 'cors'

// Router
import { router } from '../core/router'

// Imports Middlewares
import { middleware } from '../middleware'

const app = express()

const OPTIONS_CORS =
{
	origin: '*', // Reemplazar con dominio
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Cors
app.use(cors(OPTIONS_CORS))

// Traffic
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: limit_json }))

// Middlewares
app.use(middleware)

const start = () => {

	console.log(`Server: http://${host}:${port}`)

	app.use('/', router)

}

// Listener
const server = app.listen(parseInt(port), host, start)

export { app, server }