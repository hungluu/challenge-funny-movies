import React, { useEffect } from 'react'
import { observer, store } from '../config/contexts'
import styled from 'styled-components'

const NotificationList: React.FC = () => {
  const { notification } = store()

  useEffect(() => { // startup
    notification.subscribe()
  })

  return (
    <NotificationListContainer className='notification-list'>
      <ul className='list__items'>
        {notification.items.map((item, idx) => (
          <li key={idx} className='list__item'>{item.message}</li>
        ))}
      </ul>
    </NotificationListContainer>
  )
}

const NotificationListContainer = styled.section`

`

export default observer(NotificationList)
