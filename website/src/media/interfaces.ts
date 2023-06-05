import type { IMedium } from '../lib/models'

export interface IMediaStore {
  items: IMedium[]
  listErrors: string[]
  hasMore: boolean
  list: (url?: string) => Promise<boolean>
  next: () => Promise<boolean>

  isShareFormOpened: boolean
  shareErrors: string[]
  sharePreview: Omit<IMedium, 'user'> | null
  preview: (url: string) => Promise<boolean>
  share: (url: string) => Promise<boolean>
}
