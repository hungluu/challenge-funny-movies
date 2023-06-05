import { AuthStore } from '../auth/store'
import { AuthService } from '../lib/services/AuthService'
import { MediaService } from '../lib/services/MediaService'
import type { IMediaStore } from '../media/interfaces'
import { MediaStore } from '../media/store'
import { type IMediumNotification } from '../notifications/interfaces'
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

const setupNotifications = async () => {
  const store = appStore.notification

  await store.setup()

  store.on('media:create', (medium: IMediumNotification) => {
    store.items = [
      {
        id: medium.id,
        message: `[${medium.user_id}] shared [${medium.name}]`,
        action: `media:list /media?after=${medium.id}`
      },
      ...store.items
    ]
  })

  store.on('action:media:list', url => {
    if (!url) {
      return
    }

    void appStore.media.list(url)
  })
}

void setupNotifications()
