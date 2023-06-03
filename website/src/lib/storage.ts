import { type IStorageService } from './interfaces'

const storage = new Map<string, string>()

export const mockStorageService = {
  getItem: storage.get.bind(storage) as IStorageService['getItem'],
  setItem: storage.set.bind(storage),
  removeItem: storage.delete.bind(storage)
}

let _storageService: IStorageService = mockStorageService

if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
  _storageService = {
    getItem: localStorage.getItem.bind(localStorage),
    setItem: localStorage.setItem.bind(localStorage),
    removeItem: localStorage.removeItem.bind(localStorage)
  }
}

export const storageService = _storageService
