export interface IUser {
  email: string
  password?: string
}

export interface IMedium {
  id: number
  url: string
  name: string
  description: string
  thumbnail: string
  user: {
    email: string
  }
}
