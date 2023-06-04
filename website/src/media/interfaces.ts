import type { IMedium } from '../lib/models'

export interface IMediaStore {
  items: IMedium[]
  listErrors: string[]
  hasMore: boolean

  list: () => Promise<boolean>
  next: () => Promise<boolean>
}
