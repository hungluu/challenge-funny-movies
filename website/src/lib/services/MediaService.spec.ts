import { type IApi } from '../interfaces'
import { MediaService } from './MediaService'

const mockFmApi = {
  get: jest.fn()
} as unknown as IApi

describe('MediaService#list', () => {
  const service = new MediaService(mockFmApi)

  it('should list media from api and provide next pagination url', async () => {
    const mockMedia = [{ url: 'test.local' }, { url: 'test2.local' }]
    const mockPagination = { nextUrl: 'api.local/next' }

    jest.spyOn(mockFmApi, 'get').mockResolvedValueOnce({
      data: {
        media: mockMedia,
        pagination: mockPagination
      }
    })

    expect(await service.list()).toEqual(expect.objectContaining({
      data: expect.arrayContaining(mockMedia),
      nextUrl: mockPagination.nextUrl
    }))
  })

  it('should capture errors from listing media', async () => {
    jest.spyOn(mockFmApi, 'get').mockResolvedValueOnce({
      data: {
        message: 'Test Error'
      }
    })

    expect(await service.list()).toEqual(expect.objectContaining({
      error: true,
      messages: expect.arrayContaining(['Test Error'])
    }))
  })

  it('should allow passing custom media listing url (e.g next url)', async () => {
    await service.list('/media?after=100')

    expect(mockFmApi.get).toHaveBeenCalledWith('/media?after=100')
  })

  it('should prevent calling list from non-media urls', async () => {
    expect(await service.list('/hello')).toEqual(expect.objectContaining({
      error: true
    }))
  })
})
