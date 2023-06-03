import { AuthStore } from '../auth/store'
import { AuthService } from '../lib/services/AuthService'
import type { IAppStore } from './interfaces'

export const appServices = {
  auth: new AuthService()
}

export class AppStore implements IAppStore {
  auth = new AuthStore(appServices.auth, appServices.auth.user)
}

export const appStore = new AppStore()
