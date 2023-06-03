const { resolve } = require('path')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testTimeout: 20000,
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
