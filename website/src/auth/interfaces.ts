import type { IUser } from '../lib/models'

export interface IAuthStore {
  user?: IUser
  logout: () => void
}
