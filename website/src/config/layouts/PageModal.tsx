import React from 'react'
import styled from 'styled-components'
import { type IProps } from '../interfaces'
import { StyledButton } from '../controls/buttons'
import classNames from 'classnames'

export interface IPageModalProps extends IProps {
  title: string
  confirmText?: string
  onConfirm?: () => void
  visible?: boolean
  toggle?: () => void
}

const PageModal: React.FC<IPageModalProps> = ({ title, visible, toggle, onConfirm, confirmText, children }) => {
  return (
    <PageModalContainer className={classNames('modal', !visible && 'modal--hidden')}>
      <div className='modal__dialog' role='dialog'>
        <header className='dialog__header'>
          <h3 className='header__title'>{title}</h3>
          {toggle && (
            <button
              className='header__toggle'
              title='Hide this dialog'
              aria-label='Hide this dialog'
              onClick={() => { toggle() }}
            >✕
            </button>
          )}
        </header>
        <section className='dialog__contents'>
          {children}
        </section>
        <footer className='dialog__footer'>
          <StyledButton
            className='footer__confirm'
            variant='primary'
            onClick={onConfirm}
          >
            {confirmText || 'Confirm'}
          </StyledButton>
        </footer>
      </div>
    </PageModalContainer>
  )
}

// container / backdrop
const PageModalContainer = styled.div`
  position: fixed;
  background: #000000AA;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  flex-direction: column;

  &.modal--hidden {
    display: none;
  }

  .modal__dialog {
    background: #FEFEFE;
    width: 45%;
    margin: auto;
    min-width: 20rem;
    max-width: 90%;

    display: flex;
    flex-direction: column;
  }

  .dialog__header {
    display: flex;
    padding: 0.75rem 1rem;
  }

  .header__title {
    margin: 0;
  }

  .header__toggle {
    background: transparent;
    border: none;
    font-weight: bold;

    flex: 0 0 25px;
    margin-left: auto;
    color: #666;

    &:hover {
      color: #333;
      cursor: pointer;
    }
  }

  .dialog__contents {
    padding: 0.75rem 1rem;
  }

  .dialog__footer {
    background: #F8F8F8;
    padding: 0.75rem 1rem;

    text-align: right;
  }
`

export default PageModal
