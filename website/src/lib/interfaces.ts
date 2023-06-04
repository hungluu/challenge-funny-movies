import type { AxiosInstance } from 'axios'
import type { IMedium, IUser } from './models'

export type IApi = AxiosInstance
export type IStorageService = Pick<WindowLocalStorage['localStorage'], 'getItem' | 'setItem' | 'removeItem'>

export interface IApiResult {
  error: boolean
  messages?: string[]
}

export interface ILoginApiResult extends IApiResult {
  exists: boolean
}

export interface IAuthService {
  user?: IUser

  login: (user: IUser) => Promise<ILoginApiResult>
  register: (user: IUser) => Promise<IApiResult>
  logout: () => Promise<IApiResult>
}

export interface IDataApiResult<TData> extends IApiResult {
  data: TData
}

export interface IPaginatedDataApiResult<TData> extends IApiResult {
  data: TData[]
  nextUrl: string
}

export interface IMediaService {
  list: (url?: string) => Promise<IPaginatedDataApiResult<IMedium>>
}
