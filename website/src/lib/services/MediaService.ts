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
      const { media: data, pagination, message } = response.data
      const errorMessages: string[] = message ? [message] : []
      let error = false

      if (!data || errorMessages.length > 0) {
        error = true
      }

      return {
        data,
        error,
        nextUrl: pagination?.nextUrl || '',
        messages: errorMessages
      }
    } catch (err: any) {
      return { data: [], nextUrl: '', error: true, messages: [err.message] }
    }
  }
}
