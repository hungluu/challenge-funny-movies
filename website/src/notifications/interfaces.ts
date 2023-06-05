export interface INotification {
  message: string
  actionUrl?: string
}

export interface INotificationStore {
  items: INotification[]

  subscribe: () => Promise<void>
}
