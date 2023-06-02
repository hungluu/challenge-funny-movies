import type { AxiosInstance } from 'axios'
import type { IUser } from './models'

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
