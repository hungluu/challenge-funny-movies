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
      const { media: data, pagination, errors: messages } = response.data

      return {
        error: !data || messages?.length > 0,
        nextUrl: pagination?.nextUrl || '',
        data,
        messages
      }
    } catch (err: any) {
      return { data: [], nextUrl: '', error: true, messages: [err.message] }
    }
  }

  async preview (url: string) {
    try {
      if (!url) {
        throw Error('MediaService.preview url should be provided')
      }

      const response = await this.api.get('/media/preview?url=' + encodeURIComponent(url))
      const { preview: data, errors: messages } = response.data

      return {
        error: !data || messages?.length > 0,
        data,
        messages
      }
    } catch (err: any) {
      return { data: undefined, error: true, messages: [err.message] }
    }
  }
}
