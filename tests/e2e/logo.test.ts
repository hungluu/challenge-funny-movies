
import { app } from './config/browser'

describe('Logo', () => {
  it('should be visible', async () => {
    const hasLogo = await app.contains('.navbar__logo', el => el.textContent === 'Funny Movies')

    expect(hasLogo).toBe(true)
  })
})
