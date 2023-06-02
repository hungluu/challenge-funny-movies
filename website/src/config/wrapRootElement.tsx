import React, { type FunctionComponent, type ReactNode, StrictMode } from 'react'
import ErrorBoundary from './errors/ErrorBoundary'
import PageLayout from './layouts/PageLayout'

import 'normalize.css'
import '../assets/styles/root.css'
import { ServicesContext, StoreContext } from './contexts'
import { AppStore, appServices } from './bootstrap'

// Instantiating store in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
interface IWrapRootElementProps {
  element: ReactNode
}
const WrapRootElement: FunctionComponent<IWrapRootElementProps> = ({ element }) => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <StoreContext.Provider value={new AppStore()}>
          <ServicesContext.Provider value={appServices}>
            <PageLayout>
              {element}
            </PageLayout>
          </ServicesContext.Provider>
        </StoreContext.Provider>
      </ErrorBoundary>
    </StrictMode>
  )
}

export default WrapRootElement
