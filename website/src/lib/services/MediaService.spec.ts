import { type IApi } from '../interfaces'
import { MediaService } from './MediaService'

const mockFmApi = {
  get: jest.fn(),
  post: jest.fn()
} as unknown as IApi

describe('MediaService#list', () => {
  const service = new MediaService(mockFmApi)

  it('should list media from api and provide next pagination url', async () => {
    const mockMedia = [{ url: 'test.local' }, { url: 'test2.local' }]
    const mockPagination = { nextUrl: 'api.local/next' }

    jest.spyOn(mockFmApi, 'get').mockResolvedValueOnce({
      data: {
        data: mockMedia,
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
        errors: ['Test Error']
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

describe('MediaService#preview', () => {
  const service = new MediaService(mockFmApi)

  it('should get preview data for media url', async () => {
    const testUrl = 'http://test.local'
    const mockPreview = { name: 'Test' }

    jest.spyOn(mockFmApi, 'get').mockResolvedValueOnce({
      data: { data: mockPreview }
    })

    expect(await service.preview(testUrl)).toEqual(expect.objectContaining({ data: mockPreview }))
    expect(mockFmApi.get).toHaveBeenLastCalledWith('/media/preview?url=' + encodeURIComponent(testUrl))
  })

  it('should capture errors from previewing media', async () => {
    const testUrl = 'http://test.local'

    jest.spyOn(mockFmApi, 'get').mockResolvedValue({
      data: {
        errors: ['Test Error']
      }
    })

    expect(await service.preview('/media/preview?url' + encodeURIComponent(testUrl))).toEqual(expect.objectContaining({
      error: true,
      messages: expect.arrayContaining(['Test Error'])
    }))
  })

  it('should require url to be passed in', async () => {
    expect(await service.preview('')).toEqual(expect.objectContaining({
      error: true
    }))
  })
})

describe('MediaService#share', () => {
  const service = new MediaService(mockFmApi)

  it('should allow sharing new media', async () => {
    const testUrl = 'http://test.local'
    const mockData = { url: testUrl }

    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce({
      data: {
        data: mockData
      }
    })

    expect(await service.share(testUrl)).toEqual(expect.objectContaining({ data: mockData }))
    expect(mockFmApi.post).toHaveBeenLastCalledWith('/media', { url: testUrl })
  })

  it('should capture errors from previewing media', async () => {
    const testUrl = 'http://test.local'

    jest.spyOn(mockFmApi, 'post').mockResolvedValue({
      data: {
        errors: ['Test Error']
      }
    })

    expect(await service.share(testUrl)).toEqual(expect.objectContaining({
      error: true,
      messages: expect.arrayContaining(['Test Error'])
    }))
  })

  it('should require url to be passed in', async () => {
    expect(await service.share('')).toEqual(expect.objectContaining({
      error: true
    }))
  })
})
