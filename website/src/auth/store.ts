import { makeAutoObservable } from 'mobx'
import type { IUser } from '../lib/models'
import type { IAuthStore, ILoginResult } from './interfaces'
import type { IAuthService } from '../lib/interfaces'

export class AuthStore implements IAuthStore {
  errors: string[] = []
  user?: IUser

  constructor (private readonly service: IAuthService, user?: IUser) {
    this.user = user

    makeAutoObservable(this)
  }

  async logout () {
    await this.service.logout()
    this.user = undefined
  }

  async login (email: string, password: string): Promise<ILoginResult> {
    this.errors = []

    if (!email || !password) {
      this.errors.push('please provide credentials')

      return 'failed'
    }

    if (!emailRegex.test(email)) { // TODO: for demo only, should have validation lib
      this.errors.push('invalid email format')

      return 'failed'
    }

    const result = await this.service.login({
      email,
      password
    })

    if (!result.error) {
      this.user = this.service.user

      return 'success'
    }

    if (!result.exists) {
      this.errors.push('invalid email')

      return 'not exists'
    } else {
      this.errors.push('invalid password')

      return 'failed'
    }
  }

  async register (email: string, password: string) {
    this.errors = []

    if (!email || !password) {
      this.errors.push('please provide credentials')

      return false
    }

    if (!emailRegex.test(email)) { // TODO: for demo only, should have validation lib
      this.errors.push('invalid email format')

      return false
    }

    const result = await this.service.register({
      email,
      password
    })

    if (!result.error) {
      this.user = this.service.user

      return true // registed and logged in
    }

    this.errors = result.messages?.map(m => m.toLowerCase()) || []

    return false
  }
}

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
