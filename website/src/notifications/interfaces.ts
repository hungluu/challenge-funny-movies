export interface INotification {
  id: number
  message: string
  action?: string
}

export interface INotificationStore {
  items: INotification[]

  setup: () => Promise<void>
  callAction: (action: string) => void
}

export interface IMediumNotification {
  id: number
  user_id: string
  name: string
}
