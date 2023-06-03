import { app } from './config/browser'

const newEmail = `test${Date.now()}@gmail.com`

describe('Auth', () => {
  it('should show errors when login without email or password', async () => {
    await app.page.click('.form__login')

    expect(await app.visible('.form__errors')).toBe(true)
  })

  it('should show register dialog when providing new email', async () => {
    await app.fill('.form__email', newEmail)
    await app.fill('.form__password', 'TestPasword555@')

    expect(await app.visible('.modal')).toBe(false)

    await app.page.click('.form__login')
    await app.wait()

    expect(await app.visible('.modal')).toBe(true)
  })

  it('should allow registering new user', async () => {
    await app.fill('.form__email', newEmail)
    await app.fill('.form__password', 'TestPasword555@')

    await app.page.click('.form__login')
    await app.wait()

    expect(await app.visible('.modal')).toBe(true)
    expect(await app.visible('.header__user__logout')).toBe(false)

    await app.page.click('.modal .dialog__footer .footer__confirm')
    await app.waitForApi('http://localhost:3000/auth/register')

    expect(await app.visible('.modal')).toBe(false)
    expect(await app.visible('.header__user__logout')).toBe(true)
  })

  it('should allow logging out new user', async () => {
    expect(await app.visible('.header__user__logout')).toBe(true)

    await app.page.click('.header__user__logout')
    await app.waitForApi('http://localhost:3000/auth/logout')

    expect(await app.visible('.header__user__logout')).toBe(false)
  })

  it('should allow login with new user', async () => {
    expect(await app.visible('.header__user__logout')).toBe(false)

    await app.fill('.form__email', newEmail)
    await app.fill('.form__password', 'TestPasword555@')

    await app.page.click('.form__login')
    await app.waitForApi('http://localhost:3000/auth/login')

    expect(await app.visible('.header__user__logout')).toBe(true)
  })
})
