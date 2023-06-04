import { AuthStore } from '../auth/store'
import { AuthService } from '../lib/services/AuthService'
import { MediaService } from '../lib/services/MediaService'
import { MediaStore } from '../media/store'
import type { IAppServices, IAppStore } from './interfaces'

export const appServices: IAppServices = {
  auth: new AuthService(),
  media: new MediaService()
}

export class AppStore implements IAppStore {
  auth = new AuthStore(appServices.auth, appServices.auth.user)
  media = new MediaStore(appServices.media)
}

export const appStore = new AppStore()
