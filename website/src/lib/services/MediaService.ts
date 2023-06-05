import { FmApi } from '../apis'
import type { IApi, IMediaService } from '../interfaces'

export class MediaService implements IMediaService {
  constructor (private readonly api: IApi = FmApi) {}

  async list (url = '/media?after=0') {
    try {
      if (!/^\/media/.test(url)) {
        throw Error('MediaService.list url should start with /media')
      }

      const response = await this.api.get(url)
      const { data, pagination, errors: messages } = response.data

      return {
        error: !data || messages?.length > 0,
        status: response.status,
        nextUrl: pagination?.next_url || '',
        data,
        messages
      }
    } catch (err: any) {
      return { status: 0, data: [], nextUrl: '', error: true, messages: [err.message] }
    }
  }

  async preview (url: string) {
    try {
      if (!url) {
        throw Error('preview url should be provided')
      }

      const response = await this.api.get('/media/preview?url=' + encodeURIComponent(url))
      const { data, errors: messages } = response.data

      return {
        error: !data || messages?.length > 0,
        status: response.status,
        data,
        messages
      }
    } catch (err: any) {
      return { status: 0, data: undefined, error: true, messages: [err.message] }
    }
  }

  async share (url: string) {
    try {
      if (!url) {
        throw Error('MediaService.share url should be provided')
      }

      const response = await this.api.post('/media', { url })
      const { data, errors: messages } = response.data

      return {
        error: !data || messages?.length > 0,
        status: response.status,
        data,
        messages
      }
    } catch (err: any) {
      return { status: 0, data: undefined, error: true, messages: [err.message] }
    }
  }
}
