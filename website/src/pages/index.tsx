import React, { type FC } from 'react'
import type { HeadFC } from 'gatsby'

const IndexPage: FC = () => {
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
