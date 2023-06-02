import React from 'react'
import styled from 'styled-components'
import type { IUser } from '../../lib/models'
import { StyledButton } from '../controls/buttons'
import { md } from '../controls/responsive'

interface IPageHeaderUserProps {
  user: IUser
  onLogout?: () => void
}

const PageHeaderUser: React.FC<IPageHeaderUserProps> = ({ user, onLogout }) => (
  <PageHeaderUserContainer>
    <div className='header__user__email'>
      {user.email}
    </div>
    <StyledButton className='header__user__logout' onClick={onLogout}>Logout</StyledButton>
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

    ${md({ content: '"Welcome"' })}
  }

  .header__user__logout {
    font-weight: 200;
  }
`

export default PageHeaderUser
