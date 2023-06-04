import type { IMedium } from '../lib/models'

export interface IMediaStore {
  items: IMedium[]
  listErrors: string[]
  hasMore: boolean
  list: () => Promise<boolean>
  next: () => Promise<boolean>

  postErrors: string[]
  postPreview: Omit<IMedium, 'user'> | null
  preview: (url: string) => Promise<boolean>
}
