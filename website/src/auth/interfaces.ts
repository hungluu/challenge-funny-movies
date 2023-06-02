import type { IUser } from '../lib/models'

export type ILoginResult = 'success' | 'failed' | 'not exists'

export interface IAuthStore {
  user?: IUser
  errors: string[]

  logout: () => Promise<void>
  login: (email: string, password: string) => Promise<ILoginResult>
  register: (email: string, password: string) => Promise<boolean>
}
