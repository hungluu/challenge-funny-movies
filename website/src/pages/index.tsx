import React, { type FC } from 'react'
import type { HeadFC } from 'gatsby'
import MediumList from '../media/MediumList'

const IndexPage: FC = () => {
  return (
    <>
      <MediumList />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Funny Videos</title>
