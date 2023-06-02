const { resolve } = require('path')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: resolve(__dirname, '..'),
  setupFilesAfterEnv: [
    '<rootDir>/config/setup.js'
  ],
  testRegex: '.+/*\\.(test|spec)\\.(ts|tsx)$',
  preset: '<rootDir>/config',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest'
    ]
  }
}
