import type { PageProps } from 'gatsby'
import type { ReactNode } from 'react'
import type { IAuthStore } from '../auth/interfaces'
import type { IAuthService, IMediaService } from '../lib/interfaces'
import type { IMediaStore } from '../media/interfaces'
import type { INotificationStore } from '../notifications/interfaces'

export interface IPageProps extends PageProps {}
export interface IProps {
  children: ReactNode
}

export interface IAppStore {
  auth: IAuthStore
  media: IMediaStore
  notification: INotificationStore
}

export interface IAppServices {
  auth: IAuthService
  media: IMediaService
}
