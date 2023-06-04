import type { IMediaService } from '../lib/interfaces'
import type { IMedium } from '../lib/models'
import type { IMediaStore } from './interfaces'
import { makeAutoObservable } from 'mobx'

export class MediaStore implements IMediaStore {
  items: IMedium[] = []
  listErrors: string[] = []
  private nextUrl = ''

  constructor (private readonly service: IMediaService) {
    makeAutoObservable(this)
  }

  get hasMore () {
    return Boolean(this.nextUrl)
  }

  async list () {
    return await this.fetchItems('/media?after=0')
  }

  async next () {
    if (!this.nextUrl) {
      return false
    }

    return await this.fetchItems(this.nextUrl)
  }

  private async fetchItems (url: string) {
    this.listErrors = []
    const { data, nextUrl, error, messages } = await this.service.list(url)

    this.nextUrl = nextUrl

    if (!error) {
      this.items = data

      return true
    } else {
      this.listErrors = messages || []

      return false
    }
  }
}
