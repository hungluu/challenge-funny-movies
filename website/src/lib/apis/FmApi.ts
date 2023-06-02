import axios from 'axios'
import { storageService } from '../storage'
import type { IApi } from '../interfaces'

if (!process.env.API_URL) {
  throw Error('env: API_URL should be set')
}

export const FmApi: IApi = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false
})

FmApi.interceptors.request.use(config => {
  const token = storageService.getItem('__token')

  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})

FmApi.interceptors.response.use(undefined, async error => {
  const response = error.response

  if (!response) {
    return await Promise.reject(error)
  }

  return await Promise.resolve(error.response)
})
