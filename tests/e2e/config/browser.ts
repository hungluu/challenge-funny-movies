import 'expect-puppeteer'
import { E2eTestApp } from './E2eTestApp'

export { Page } from 'puppeteer'

export const app = new E2eTestApp('http://localhost:8000')

beforeAll(async () => {
  await app.setup()
  await app.setupPage()
})

beforeEach(async () => {
  await app.refresh()
})

afterAll(async () => {
  await app.dispose()
})
