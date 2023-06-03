// import '@testing-library/jest-dom'

process.env.API_URL = 'http://test.local'

if (typeof global.setImmediate === 'undefined') {
  Object.assign(global, {
    setImmediate: setTimeout,
    clearImmediate: clearTimeout
  })
}
