import { type Browser, type Page, launch, type HTTPResponse } from 'puppeteer'

export type IHeadlessMode = boolean | 'new'
export type ISelectIndicator = (el: Element) => boolean
export type IResponseIndicator = (el: HTTPResponse) => boolean

const defaultHeadlessMode: IHeadlessMode = process.env.HEADLESS ? 'new' : false

export class E2eTestApp {
  private _browser?: Browser
  private _page?: Page

  constructor (
    private readonly url: string,
    private readonly headless: IHeadlessMode = defaultHeadlessMode
  ) {}

  get browser (): Browser {
    if (!this._browser) {
      throw Error('Please do app.setup()')
    }

    return this._browser
  }

  get page (): Page {
    if (!this._page) {
      throw Error('Please do app.setupPage()')
    }

    return this._page
  }

  async fill (inputSelector: string, value: string) {
    await this.page.$eval(inputSelector, (input, value) => {
      if (!(input instanceof HTMLInputElement)) {
        return
      }

      // Set input and ensure 'change' events are triggered in React component
      const nativeInputValueSetter = (Object as any).getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
      ).set

      nativeInputValueSetter.call(input, value)

      input.dispatchEvent(new Event('input', { bubbles: true }))
    }, value)
  }

  async contains (selector: string, indicator?: ISelectIndicator) {
    if (indicator) {
      return await this.page.$eval(selector, indicator)
    }

    return (await this.page.$(selector)) !== null
  }

  async visible (selector: string) {
    return await this.page.evaluate(selector => {
      const element = document.querySelector(selector)

      return element && (element as any).offsetHeight > 0
    }, selector) || false
  }

  async wait (ms = 50) {
    await this.page.waitForTimeout(ms)
  }

  async waitForApi (url: string | IResponseIndicator, timeout = 3000) {
    await this.page.waitForResponse(url, {
      timeout
    })
  }

  async setup () {
    if (!this._browser) {
      this._browser = await launch({
        headless: this.headless
      })
    }
  }

  async setupPage () {
    if (!this._page) {
      this._page = await this.browser.newPage()
    }

    await this._page.goto(this.url)
  }

  async refresh () {
    await this.page.goto(this.url)
  }

  async dispose () {
    await this._browser?.close()
  }
}
