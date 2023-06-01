import React, { type FunctionComponent, type ReactNode, StrictMode } from 'react'
import ErrorBoundary from './errors/ErrorBoundary'
import PageLayout from './layouts/PageLayout'

import 'normalize.css'
import '../assets/styles/root.css'

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
        <PageLayout>
          {element}
        </PageLayout>
      </ErrorBoundary>
    </StrictMode>
  )
}

export default WrapRootElement
