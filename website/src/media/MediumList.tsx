import React, { useEffect } from 'react'
import Medium from './Medium'
import styled from 'styled-components'
import { observer, store } from '../config/contexts'

const MediumList: React.FC = () => {
  const { media } = store()

  // start up
  useEffect(() => { void media.list() }, [])

  return (
    <MediumListContainer>
      {media.items.map(item =>
        <Medium
          key={item.id}
          name={item.name}
          description={item.description}
          url={item.url}
          userId={item.user.email}
          thumbnail={item.thumbnail}
        />
      )}
    </MediumListContainer>
  )
}

const MediumListContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1.5rem 0;
`

export default observer(MediumList)
