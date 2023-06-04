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

  constructor (private readonly service: IMediaService) {
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

  async list () {
    const { items, errors } = await this.fetchItems('/media?after=0')

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
    const { data, error, messages } = await this.service.preview(url)

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
    const { data, error, messages } = await this.service.share(url)

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
    const { data, nextUrl, error, messages } = await this.service.list(url)

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
}
