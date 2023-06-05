import type { ICableApi, ICableApiSub } from '../lib/interfaces'
import { EventEmitter } from 'eventemitter3'
import type { INotification, INotificationStore } from './interfaces'
import { action, makeObservable, observable } from 'mobx'

export class NotificationStore extends EventEmitter implements INotificationStore {
  items: INotification[] = []

  private api?: ICableApi
  private sub?: ICableApiSub
  private isLoadingApi = false

  constructor () {
    super()

    makeObservable(this, {
      items: observable,
      onMessage: action,
      callAction: action
    })
  }

  async setup () {
    if (this.isLoadingApi) {
      return
    }

    if (
      !this.api &&
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
        received: data => { this.onMessage(data) }
      })
    }
  }

  onMessage (message: any) {
    const type = message?.type
    const data = message?.data

    if (!type || !data) {
      return
    }

    this.emit(type, data)
  }

  callAction (action: string) {
    const [type, param] = action.split(' ')

    if (!type || !param) {
      return
    }

    this.emit(`action:${type}`, param)
  }
}
