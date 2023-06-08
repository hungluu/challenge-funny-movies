import React from 'react'
import styled from 'styled-components'
import CompactAuthForm from '../../auth/CompactAuthForm'
import { observer, store } from '../contexts'
import PageHeaderUser from './PageHeaderUser'
import { usePageHeaderAnimator } from './animations'

const PageHeader = () => {
  const { auth, media } = store()
  const animator = usePageHeaderAnimator()

  return (
    <header ref={animator}>
      <Navbar className='page-navbar'>
        <div className='navbar__container'>
          <h1 className='navbar__logo'>
            <a href='/'>Funny Movies</a>
          </h1>

          <section className='navbar__right'>
            {auth.user && (
              <PageHeaderUser
                user={auth.user}
                onLogout={() => { void auth.logout() }}
                onShareClick={() => { media.isShareFormOpened = true }}
                shareClicked={media.isShareFormOpened}
              />)}
            {!auth.user && (<CompactAuthForm />)}
          </section>
        </div>
      </Navbar>
    </header>
  )
}

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;

  .navbar__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 1px 1px -1px #000000fa;
    overflow: hidden;
    position: relative;
  }

  .navbar__logo {
    flex-grow: 1;
    flex-basis: 200px;
    margin-right: 1.5rem;

    // text effect
    background: #CA4246;
    background-color: #CA4246;
    background: conic-gradient(
      #CA4246 16.666%,
      #E16541 16.666%,
      #E16541 33.333%,
      #F18F43 33.333%,
      #F18F43 50%,
      #8B9862 50%,
      #8B9862 66.666%,
      #476098 66.666%,
      #476098 83.333%,
      #A7489B 83.333%);
    background-size: 5rem;
    background-repeat: repeat;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .navbar__right {
    margin-left: auto;
    flex-grow: 0;
    flex-shrink: 1;
    opacity: 0;
  }
`

export default observer(PageHeader)
