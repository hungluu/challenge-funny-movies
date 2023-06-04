import { decodeJwt, FmApi } from '../apis'
import type { IUser } from '../models'
import { storageService } from '../storage'
import type { IStorageService, IAuthService, IApi } from '../interfaces'

export class AuthService implements IAuthService {
  private readonly tokenKey: string
  private _user?: IUser
  private _expiredAt = 0

  constructor (
    tokenKey = '__token',
    private readonly api: IApi = FmApi,
    private readonly storage: IStorageService = storageService
  ) {
    this.tokenKey = tokenKey || '__token'
  }

  get user (): IUser | undefined {
    if (this._user && this._expiredAt && this._expiredAt < now()) {
      return this._user
    }

    const token = this.storage.getItem(this.tokenKey)

    this.parseToken(token)

    return this._user
  }

  async register (user: IUser) {
    try {
      const response = await this.api.post('/auth/register', {
        user
      })
      let isLoggedIn = false

      if (response?.status === 200) {
        this.setToken(response.headers.authorization)
        isLoggedIn = Boolean(this.user)
      }

      return { error: !isLoggedIn, messages: response.data?.errors || [] }
    } catch (err: any) {
      return { error: true, messages: [err.message] }
    }
  }

  async login (user: IUser) {
    let isLoggedIn = false
    let exists = false

    try {
      const response = await this.api.post('/auth/login', {
        user
      })
      const errorMessages: string[] = response.data?.errors || []

      if (response?.status === 200) {
        this.setToken(response.headers.authorization)
        isLoggedIn = Boolean(this.user)
        exists = isLoggedIn
      } else {
        exists = !errorMessages.some(message => /not found/i.test(message))
      }

      return { error: !isLoggedIn, exists, messages: errorMessages }
    } catch (err: any) {
      return { error: true, exists, messages: [err.message] }
    }
  }

  async logout () {
    try {
      this._user = undefined
      this._expiredAt = 0
      this.setToken()
      await this.api.delete('/auth/logout')

      return { error: false }
    } catch (err: any) {
      return { error: true, messages: [err.message] }
    }
  }

  private setToken (token?: string) {
    if (!token) {
      this.storage.removeItem(this.tokenKey)
    } else {
      this.storage.setItem(this.tokenKey, token.replace('Bearer ', ''))
    }
  }

  private parseToken (token?: string | null) {
    if (!token) {
      this._user = undefined
      this._expiredAt = 0

      return
    }

    const data = decodeJwt(token)

    if (!data?.exp || !data.email || data.exp < now()) {
      this._user = undefined
      this._expiredAt = 0

      return
    }

    this._user = { email: data.email }
    this._expiredAt = data.exp
  }
}

const now = () => Math.floor(Date.now() / 1000)
