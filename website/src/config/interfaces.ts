import type { PageProps } from 'gatsby'
import type { ReactNode } from 'react'
import type { IAuthStore } from '../auth/interfaces'
import type { IAuthService } from '../lib/interfaces'

export interface IPageProps extends PageProps {}
export interface IProps {
  children: ReactNode
}

export interface IAppStore {
  auth: IAuthStore
}

export interface IAppServices {
  auth: IAuthService
}
