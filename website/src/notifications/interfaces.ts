export interface INotification {
  message: string
  action?: string
}

export interface INotificationStore {
  items: INotification[]

  setup: () => Promise<void>
}

export interface IMediumNotification {
  id: number
  user_id: string
  name: string
}
