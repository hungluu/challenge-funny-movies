import React from 'react'
import styled from 'styled-components'
import CompactAuthForm from '../../auth/CompactAuthForm'

const PageHeader = () => (
  <header>
    <Navbar className='page-navbar'>
      <div className='navbar__container'>
        <h1 className='navbar__logo'>
          Funny Movies
        </h1>

        <CompactAuthForm />
      </div>
    </Navbar>
  </header>
)

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;

  .navbar__container {
    margin: 0 auto;
    width: 100%;
    max-width: 992px;

    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 1rem;

    box-shadow: 0 1px 1px -1px #000000fa;
  }

  .form {
    margin-left: auto;
    flex-grow: 0;
    flex-shrink: 0;
  }
`

export default PageHeader
