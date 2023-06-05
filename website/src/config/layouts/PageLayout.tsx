import React from 'react'
import type { IProps } from '../interfaces'
import classnames from 'classnames'
import PageHeader from './PageHeader'
import styled from 'styled-components'
import { lg } from '../controls/responsive'
import PageFooter from './PageFooter'

const PageLayout: React.FC<IProps> = ({ children }) => {
  const pageConstructorName = (children as any).type?.name || ''
  const pageClassName: string = pageConstructorName.replace(/Page$/, '')
    .replace(/([A-Z\d])/g, '-$1')
    .toLowerCase()
    .slice(1)

  return (
    <PageLayoutContainer className={classnames('layout layout--page', pageClassName && `layout--page__${pageClassName}`)}>
      <PageHeader />
      <main className='page-main' role='main'>
        {children}
      </main>
      <PageFooter />
    </PageLayoutContainer>
  )
}

const PageLayoutContainer = styled.div`
  .navbar__container {
    margin: 0 auto;
    width: 100%;
    max-width: 992px;

    padding: 0 1rem;
    ${lg('padding: 0')}
  }

  .page-main {
    margin: 0 auto;
    width: 100%;
    max-width: 992px;

    padding: 0 1rem;
    ${lg('padding: 0')}
  }
`

export default PageLayout
