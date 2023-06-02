import type { AxiosInstance } from 'axios'
import type { IUser } from './models'

export type IApi = AxiosInstance
export type IStorageService = Pick<WindowLocalStorage['localStorage'], 'getItem' | 'setItem' | 'removeItem'>

export interface IAuthService {
  user?: IUser

  login: (user: IUser) => Promise<boolean>
  register: (user: IUser) => Promise<boolean>
  logout: () => Promise<boolean>
}
