import { action, makeObservable, observable } from 'mobx'
import type { IUser } from '../lib/models'
import type { IAuthStore } from './interfaces'
import type { IAuthService } from '../lib/interfaces'

export class AuthStore implements IAuthStore {
  user?: IUser

  constructor (private readonly service: IAuthService, user?: IUser) {
    this.user = user
    makeObservable(this, {
      user: observable,
      logout: action
    })
  }

  async logout () {
    await this.service.logout()
    this.user = undefined
  }
}
