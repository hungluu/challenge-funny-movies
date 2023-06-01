import React from 'react'
import styled from 'styled-components'

const PageHeader = () => (
  <header>
    <Navbar className='page-navbar'>
      <div className='navbar__container'>
        <h1 className='navbar__logo'>
          Funny Movies
        </h1>
      </div>
    </Navbar>
  </header>
)

const Navbar = styled.nav`
  .navbar__container {
    margin: 0 auto;
    width: 100%;
    max-width: 992px;
  }
`

export default PageHeader
