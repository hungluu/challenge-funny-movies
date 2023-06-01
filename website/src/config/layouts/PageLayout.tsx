import React from 'react'
import type { IProps } from '../interfaces'
import classnames from 'classnames'
import PageHeader from './PageHeader'
import PageModal from './PageModal'

const PageLayout: React.FC<IProps> = ({ children }) => {
  const pageConstructorName = (children as any).type?.name || ''
  const pageClassName: string = pageConstructorName.replace(/Page$/, '')
    .replace(/([A-Z\d])/g, '-$1')
    .toLowerCase()
    .slice(1)

  return (
    <div className={classnames('layout layout--page', pageClassName && `layout--page__${pageClassName}`)}>
      <PageHeader />
      <main className='page-main' role='main'>
        {children}
      </main>
      <PageModal title='Register' visibled>
        Do you want to register new account with this email address ...?
      </PageModal>
    </div>
  )
}

export default PageLayout
