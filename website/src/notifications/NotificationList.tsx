import React, { Fragment } from 'react'
import { observer, store } from '../config/contexts'
import styled from 'styled-components'
import { StyledButton } from '../config/controls/buttons'
import { motion } from 'framer-motion'

const NotificationList: React.FC = () => {
  const { notification } = store()
  const items = notification.items.slice(0, 10)

  return (
    <NotificationListContainer className='notification-list'>
      <ul className='list__items'>
        {items.map((item, idx) => {
          const { template, tokens } = renderMessage(item.message)

          return (
            <motion.li
              key={idx}
              className='list__item'
              exit={{ opacity: 0, x: 0 }}
              initial={{ opacity: 1, x: 0 }}
              transition={{ duration: 6, ease: 'easeInOut' }}
              animate={{
                opacity: [1, 1, 1, 0.8, 0],
                x: [0, 0, 0, 0, 100],
                transitionEnd: {
                  display: 'none'
                }
              }}
            >
              <div className='item__message'>
                {template.map((m, idx) => {
                  const token = tokens[idx]
                  let tokenMessage = ''

                  if (token) {
                    const maxTokenLength = 25

                    tokenMessage = token?.replace(/@[^@\s]+/, '')

                    if (tokenMessage?.length > maxTokenLength) {
                      tokenMessage = tokenMessage.substring(0, maxTokenLength - 3) + '...'
                    }
                  }

                  return (
                    <Fragment key={idx}>
                      <span> {m} </span>
                      {token && <span className='item__token' title={token}>{tokenMessage}</span>}
                    </Fragment>
                  )
                })}
              </div>
              <StyledButton title='view details' className='item__view' variant='transparent'>ᐅ</StyledButton>
            </motion.li>
          )
        })}
      </ul>
    </NotificationListContainer>
  )
}

const NotificationListContainer = styled.section`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 1rem;
  width: 100%;
  max-width: 450px;

  .list__items {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden;
  }

  .list__item {
    padding: 0.5rem;
    padding-right: 2rem;
    background: #8c94ff;
    color: #fafafa;
    font-weight: 200;
    box-shadow: 0 1px 5px 2px #33333333;
    margin-bottom: 0.5rem;

    width: 100%;
    position: relative;
  }

  .item__message {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      margin: 0 0.125rem;
    }
  }

  .item__token {
    text-decoration: underline;
    text-decoration-style: dotted;
    font-weight: normal;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 auto;
  }

  .item__view {
    font-weight: 200;
    width: 40px;
    padding: 0 0.125rem;
    min-width: initial;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      font-weight: bold;
    }
  }
`

const renderMessage = (message: string) => {
  const tokens: string[] = []
  const template = message.replace(/\[([^[\]]+)\]/g, (_, token) => {
    tokens.push(token)

    return ':&'
  })

  return {
    template: template.replace(/user/i, '👤').split(/\s*:&\s*/),
    tokens
  }
}

export default observer(NotificationList)
