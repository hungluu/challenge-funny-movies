import React, { useEffect } from 'react'
import NotificationList from '../../notifications/NotificationList'
import { store } from '../contexts'

const PageFooter: React.FC = () => {
  const { notification } = store()

  useEffect(() => {
    if (notification) {
      void notification.setup()
    }
  }, [])

  return (
    <footer className='page-footer'>
      <NotificationList />
    </footer>
  )
}

export default PageFooter
