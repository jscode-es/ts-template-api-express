/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: [
    "./dotenv-config.js",
    "../src/directory.ts"
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  roots: ['../test']
}