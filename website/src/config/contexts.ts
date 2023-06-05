import { createContext, useContext } from 'react'
import type { IAppServices, IAppStore } from './interfaces'
import { appStore, appServices } from './bootstrap'

export { observer } from 'mobx-react-lite'

export const StoreContext = createContext<IAppStore>(appStore)
export const store = () => useContext(StoreContext)

export const ServicesContext = createContext<IAppServices>(appServices)
export const services = () => useContext(ServicesContext)
