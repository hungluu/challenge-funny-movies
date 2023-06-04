import axios from 'axios'
import { storageService } from '../storage'
import type { IApi } from '../interfaces'

if (!process.env.API_URL) {
  throw Error('env: API_URL should be set')
}

export const FmApi: IApi = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json'
  }
})

FmApi.interceptors.request.use(config => {
  const token = storageService.getItem('__token')

  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }

  return config
})

FmApi.interceptors.response.use(undefined, async err => {
  const response = err.response

  if (!response) {
    return await Promise.reject(err)
  }

  if (response.status === 401) {
    storageService.removeItem('__token')
  }

  const data = response.data
  const { message, error, errors } = data
  let responseErrors: string[] = []

  if (errors?.length) {
    responseErrors = errors
  } else if (errors) { // validation error object
    Object.keys(errors).forEach(field => {
      errors[field]?.forEach((message: string) => {
        responseErrors.push(`${field}: ${message}`)
      })
    })
  } else if (error) {
    responseErrors = [error]
  } else if (message) {
    responseErrors = [message]
  }

  response.data = {
    ...data,
    errors: responseErrors
  }

  return await Promise.resolve(response)
})
