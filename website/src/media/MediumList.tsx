import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { observer, store } from '../config/contexts'
import Medium from './Medium'
import MediumLoader from './MediumLoader'

const MediumList: React.FC = () => {
  const { media } = store()
  const [isLoading, setIsLoading] = useState(true)

  // start up
  useEffect(() => {
    setIsLoading(true)
    void media.list().then(() => { setIsLoading(false) })
  }, [])

  return (
    <MediumListContainer>
      {isLoading && [...Array(3)].map((_, idx) => (
        <MediumLoader key={`loader:${idx}`} />
      ))}
      {!isLoading && media.items.map(item =>
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
