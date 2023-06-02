/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/website/setup/test.ts'
  ],
  testRegex: '.+/*\\.(test|spec)\\.(ts|tsx)$',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest'
    ]
  }
}
