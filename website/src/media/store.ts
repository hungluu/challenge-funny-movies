import { type IAppStore } from '../config/interfaces'
import type { IMediaService } from '../lib/interfaces'
import type { IMedium } from '../lib/models'
import type { IMediaStore } from './interfaces'
import { makeAutoObservable } from 'mobx'

export class MediaStore implements IMediaStore {
  items: IMedium[] = []
  listErrors: string[] = []
  private nextUrl = ''

  _isShareFormOpened = false
  sharePreview: Omit<IMedium, 'user'> | null = null
  shareErrors: string[] = []

  constructor (private readonly store: IAppStore, private readonly service: IMediaService) {
    makeAutoObservable(this)
  }

  get isShareFormOpened () {
    return this._isShareFormOpened
  }

  set isShareFormOpened (opened: boolean) {
    this._isShareFormOpened = opened
    this.shareErrors = []
    this.sharePreview = null
  }

  get hasMore () {
    return Boolean(this.nextUrl)
  }

  async list (url = '/media?after=0') {
    const { items, errors } = await this.fetchItems(url)

    this.items = items
    this.listErrors = errors

    return !errors.length
  }

  async next () {
    if (!this.nextUrl) {
      return false
    }

    const { items, errors } = await this.fetchItems(this.nextUrl)

    items.forEach(item => this.items.push(item))
    // this.items = this.items.concat(items)
    this.listErrors = errors

    return !errors.length
  }

  async preview (url: string) {
    this.sharePreview = null
    this.shareErrors = []
    const { data, error, messages, status } = await this.service.preview(url)

    this.checkAuth(status)

    if (!error) {
      this.sharePreview = data || null

      return true
    } else {
      this.shareErrors = messages || []

      return false
    }
  }

  async share (url: string) {
    this.shareErrors = []
    const { data, error, messages, status } = await this.service.share(url)

    this.checkAuth(status)

    if (!error && data) {
      this.items = [data, ...this.items]

      return true
    } else {
      this.shareErrors = messages || []

      return false
    }
  }

  private async fetchItems (url: string) {
    this.listErrors = []
    const { data, nextUrl, error, messages, status } = await this.service.list(url)

    this.checkAuth(status)

    this.nextUrl = nextUrl

    if (!error) {
      return {
        items: data || [],
        errors: []
      }
    } else {
      return {
        items: [],
        errors: messages || []
      }
    }
  }

  private checkAuth (status: number) {
    if (status === 401) {
      console.log('[media:store] authorized')
      void this.store.auth.logout()
    }
  }
}
