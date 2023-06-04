import React from 'react'
import styled from 'styled-components'
import type { IUser } from '../../lib/models'
import { StyledButton } from '../controls/buttons'
import { sm } from '../controls/responsive'

interface IPageHeaderUserProps {
  user: IUser
  onLogout?: () => void
  onShareClick?: () => void
  shareClicked: boolean
}

const PageHeaderUser: React.FC<IPageHeaderUserProps> = ({ user, onLogout, onShareClick, shareClicked }) => (
  <PageHeaderUserContainer>
    <div className='header__user__email'>
      {user.email}
    </div>
    <div className='header__user__btns'>
      <StyledButton
        className='header__user__share'
        variant='share'
        onClick={onShareClick}
        disabled={shareClicked}
      >
        Share a movie
      </StyledButton>
      <StyledButton className='header__user__logout' onClick={onLogout}>Logout</StyledButton>
    </div>
  </PageHeaderUserContainer>
)

const PageHeaderUserContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;

  justify-content: flex-end;

  .header__user__email::before {
    content: '👋';
    margin-right: 0.3rem;
    text-overflow: ellipsis;
    word-break: break-all;
    font-weight: 200;

    ${sm({ content: '"Welcome"' })}
  }

  .header__user__logout {
    font-weight: 200;
  }

  .header__user__btns {
    text-align: right;
    button {
      min-width: 110px;
    }
  }
`

export default PageHeaderUser
