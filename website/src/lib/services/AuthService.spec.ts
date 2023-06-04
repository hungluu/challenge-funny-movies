import { type IApi } from '../interfaces'
import { mockStorageService } from '../storage'
import { AuthService } from './AuthService'
import { decodeJwt } from '../apis'

jest.mock('../apis', () => {
  return {
    ...jest.requireActual('../apis'),
    decodeJwt: jest.fn()
  }
})

const mockApis = { decodeJwt }
const mockFmApi = {
  delete: jest.fn(),
  post: jest.fn()
} as unknown as IApi
const mockTokenKey = '__auth_spec_token'
const mockStorage = mockStorageService
const testEmail = 'test@example.local'
const mockValidDecodedToken = {
  email: testEmail,
  exp: Math.floor(Date.now() / 1000) + 3600
}
const mockExpiredDecodedToken = {
  email: testEmail,
  exp: Math.floor(Date.now() / 1000) - 1000
}

describe('AuthService#user', () => {
  const service = new AuthService(mockTokenKey, mockFmApi, mockStorage)

  beforeAll(() => {
    mockStorage.setItem(mockTokenKey, 'test-token')
  })

  it('should allow retrieve current logged in user from saved token', () => {
    jest.spyOn(mockApis, 'decodeJwt').mockReturnValueOnce(mockValidDecodedToken)

    expect(service.user).toEqual(expect.objectContaining({
      email: testEmail
    }))

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
  })

  it('should invalidate logged in user from saved token with expiration', () => {
    jest.spyOn(mockApis, 'decodeJwt').mockReturnValueOnce(mockExpiredDecodedToken)

    expect(service.user).toBeUndefined()

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
  })

  afterAll(() => {
    mockStorage.removeItem(mockTokenKey)
  })
})

describe('AuthService#register', () => {
  const service = new AuthService(mockTokenKey, mockFmApi, mockStorage)
  const testUser = { email: testEmail, password: '' }

  it('should retrieve user from successful registration', async () => {
    const mockApiResult = {
      status: 200,
      headers: {
        authorization: 'Bearer test-token'
      }
    }

    jest.spyOn(mockApis, 'decodeJwt').mockReturnValueOnce(mockValidDecodedToken)
    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce(mockApiResult)

    const result = await service.register(testUser)

    expect(mockFmApi.post).toHaveBeenCalledWith('/auth/register', { user: testUser })
    expect(mockApis.decodeJwt).toHaveBeenCalledWith('test-token')
    expect(result).toEqual(expect.objectContaining({ error: false }))

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
  })

  it('should detect failed registration', async () => {
    const mockApiResult = { status: 400 }

    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce(mockApiResult)

    const result = await service.register(testUser)

    expect(mockFmApi.post).toHaveBeenCalledWith('/auth/register', { user: testUser })
    expect(mockApis.decodeJwt).not.toHaveBeenCalled()
    expect(result).toEqual(expect.objectContaining({ error: true }))

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
  })

  afterAll(() => {
    mockStorage.removeItem(mockTokenKey)
  })
})

describe('AuthService#login', () => {
  const service = new AuthService(mockTokenKey, mockFmApi, mockStorage)
  const testUser = { email: testEmail, password: '' }

  it('should retrieve user from successful login', async () => {
    const mockApiResult = {
      status: 200,
      headers: {
        authorization: 'Bearer test-token'
      }
    }

    jest.spyOn(mockApis, 'decodeJwt').mockReturnValueOnce(mockValidDecodedToken)
    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce(mockApiResult)

    const result = await service.login(testUser)

    expect(mockFmApi.post).toHaveBeenCalledWith('/auth/login', { user: testUser })
    expect(mockApis.decodeJwt).toHaveBeenCalledWith('test-token')
    expect(result).toEqual(expect.objectContaining({ error: false }))

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
  })

  it('should addtionally detect if user email exists', async () => {
    const mockApiResult = {
      status: 401,
      data: {
        errors: [
          'Not found Email.'
        ]
      }
    }

    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce(mockApiResult)

    const result = await service.login(testUser)

    expect(mockFmApi.post).toHaveBeenCalledWith('/auth/login', { user: testUser })
    expect(result).toEqual(expect.objectContaining({ error: true, exists: false }))

    const mockExistsApiResult = {
      status: 401,
      data: {
        error: 'Invalid Email or password'
      }
    }

    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce(mockExistsApiResult)

    const existsResult = await service.login(testUser)

    expect(mockFmApi.post).toHaveBeenCalledWith('/auth/login', { user: testUser })
    expect(existsResult).toEqual(expect.objectContaining({ error: true, exists: true }))
  })

  it('should detect failed login', async () => {
    const mockApiResult = { status: 401 }

    jest.spyOn(mockFmApi, 'post').mockResolvedValueOnce(mockApiResult)

    const result = await service.register(testUser)

    expect(mockFmApi.post).toHaveBeenCalledWith('/auth/login', { user: testUser })
    expect(mockApis.decodeJwt).not.toHaveBeenCalled()
    expect(result).toEqual(expect.objectContaining({ error: true }))

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
  })

  afterAll(() => {
    mockStorage.removeItem(mockTokenKey)
  })
})

describe('AuthService#logout', () => {
  const service = new AuthService(mockTokenKey, mockFmApi, mockStorage)

  it('should logout and clear saved user information', async () => {
    mockStorage.setItem(mockTokenKey, 'test-token')
    jest.spyOn(mockApis, 'decodeJwt').mockReturnValueOnce(mockValidDecodedToken)
    jest.spyOn(mockStorage, 'removeItem').mockImplementation(jest.fn())

    expect(service.user).toEqual(expect.objectContaining({
      email: testEmail
    }))

    await service.logout()

    expect(mockStorage.removeItem).toHaveBeenCalledWith(mockTokenKey)
    expect(service.user).toBeUndefined()

    jest.spyOn(mockApis, 'decodeJwt').mockClear()
    jest.spyOn(mockStorage, 'removeItem').mockClear()
  })
})
