import { Link } from 'gatsby'
import React, { type FunctionComponent } from 'react'
import ErrorLayout from '../../config/layouts/ErrorLayout'

// markup
const UnhandledErrorPage: FunctionComponent = () => {
  return (
    <ErrorLayout>
      <main className='error-page--unhandled'>
        <h1 className='unhandled__title'>Something went wrong</h1>
        <div className='unhandled__message'>
          <p>No worries, it has been reported to our team and will be fixed soon.</p>
          <Link to='/'>Go Back</Link>
        </div>
      </main>
    </ErrorLayout>
  )
}

export default UnhandledErrorPage
