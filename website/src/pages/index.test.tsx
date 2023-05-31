import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import IndexPage from '.'

describe('IndexPage', () => {
  it('should says hello', () => {
    const { container } = render(<IndexPage />)

    expect(container.querySelector('main')).toHaveTextContent(/hello world/i)
  })
})
