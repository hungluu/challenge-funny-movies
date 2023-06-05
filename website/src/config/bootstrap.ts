import { AuthStore } from '../auth/store'
import { AuthService } from '../lib/services/AuthService'
import { MediaService } from '../lib/services/MediaService'
import type { IMediaStore } from '../media/interfaces'
import { MediaStore } from '../media/store'
import { NotificationStore } from '../notifications/store'
import type { IAppServices, IAppStore } from './interfaces'

export const appServices: IAppServices = {
  auth: new AuthService(),
  media: new MediaService()
}

export class AppStore implements IAppStore {
  auth = new AuthStore(appServices.auth, appServices.auth.user)
  media: IMediaStore = new MediaStore(this, appServices.media)
  notification = new NotificationStore()
}

export const appStore = new AppStore()

// Bind notification events
