#!/usr/bin/env node

console.log('==============================================')
console.log('Instalación de ts-template-api-express')
console.log('==============================================')

import { execSync } from 'child_process'

const nameProyect = 'api_server_ts'
const gitClone = 'git clone --depth 1 https://github.com/jscode-es/ts-template-api-express.git'
const installDeps = `cd ${nameProyect} && npm i`

const runCommand = (command:string) =>{
	
	try {
		execSync(`${command}`, {stdio:'inherit'})
	} catch (error) {
		console.error(`Failed to execute ${command}`, error)
		return false
	}

	return true
}

console.log(`Cloning the respository with name ${nameProyect}`)

const checkOut = runCommand(gitClone)

if(!checkOut) process.exit(-1)

console.log(`Installing dependencies for ${nameProyect}`)

const installedDeps = runCommand(installDeps)

if(!installedDeps) process.exit(-1)

console.log('"Congratulation! You are ready.')

console.log(`cd ${nameProyect} && npm start`)
console.log(`cd ${nameProyect} && npm run dev`)