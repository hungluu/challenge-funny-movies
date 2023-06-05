import type { ICableApi, ICableApiSub } from '../lib/interfaces'
import { EventEmitter } from 'eventemitter3'
import type { INotification, INotificationStore } from './interfaces'

export class NotificationStore extends EventEmitter implements INotificationStore {
  items: INotification[] = []
  private api?: ICableApi
  private sub?: ICableApiSub
  private isLoadingApi = false

  async subscribe () {
    if (
      !this.api &&
      !this.isLoadingApi &&
      typeof window !== 'undefined' // @rails/actioncable has reference errors on SSR
    ) {
      this.isLoadingApi = true
      const { FmCableApi } = await import('../lib/apis/FmCableApi')

      this.api = FmCableApi
      this.isLoadingApi = false
    }

    if (!this.sub) {
      this.sub = this.api?.subscriptions.create({
        channel: 'MediaChannel'
      }, {
        connected: () => { console.info('[notification] connected') },
        disconnected: () => { console.info('[notification] disconnected') },
        received: (data) => { this.onMessage(data) }
      })
    }
  }

  private onMessage (message: any) {
    const type = message?.type
    const data = message?.data

    if (!type || !data) {
      return
    }

    console.log(message)

    this.emit(type, data, this)
  }
}
