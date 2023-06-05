import React, { type ReactNode, StrictMode } from 'react'
import ErrorBoundary from './errors/ErrorBoundary'
import PageLayout from './layouts/PageLayout'

import { ServicesContext, StoreContext } from './contexts'
import { appStore, appServices } from './bootstrap'

import { GlobalStyles } from './wrapGlobalStyles'

// Instantiating store in `wrapRootElement` handler ensures:
//  - there is fresh store for each SSR page
//  - it will be called only once in browser, when React mounts
interface IWrapRootElementProps {
  element: ReactNode
}
export const wrapRootElement: React.FC<IWrapRootElementProps> = ({ element }) => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <StoreContext.Provider value={appStore}>
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

export const wrapPageElement: React.FC<IWrapRootElementProps> = ({ element }) => (
  <>
    <GlobalStyles />
    {element}
  </>
)
