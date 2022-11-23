// Loading Node JS modules
import path from 'path'

// Module external
import dotenv from 'dotenv'

// Directories
import './directory'

// If NODE_ENV value not define then dev value will be assign 
const mode = process.env.NODE_ENV || 'local'

console.log({mode})

// Prepare file dotenv
const fileEnv = `.env.${mode}`
const pathEnv = path.resolve(global.DIR_CONFIG, fileEnv)

// Initialize configuration
dotenv.config({ path: pathEnv })

// Module server
import { server, app } from './core'

// Export para testing
export { server, app }