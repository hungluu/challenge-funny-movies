import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { observer, store } from '../config/contexts'
import Medium from './Medium'
import MediumLoader from './MediumLoader'
import MediumForm from './MediumForm'
import { useInfiniteScroll } from '../config/controls/scrolls'

const MediumList: React.FC = () => {
  const { media } = store()
  const [isLoading, setIsLoading] = useState(true)

  useInfiniteScroll({
    onTriggered () {
      if (isLoading || !media.hasMore) {
        return
      }

      setIsLoading(true)
      void media.next().finally(() => { setIsLoading(false) })
    }
  })

  useEffect(() => { // start up
    setIsLoading(true)
    void media.list().finally(() => { setIsLoading(false) })
  }, [])

  return (
    <MediumListContainer>
      <MediumForm />
      {!media.isShareFormOpened && media.items.map(item =>
        <Medium
          key={item.id}
          name={item.name}
          description={item.description}
          url={item.url}
          userId={item.user.email}
          thumbnail={item.thumbnail}
        />
      )}
      {isLoading && [...Array(2)].map((_, idx) => (
        <MediumLoader key={`loader:${idx}`} />
      ))}
      {!media.hasMore && !isLoading && !media.isShareFormOpened && (
        <div className='list__noitems'>Sorry. No more videos.</div>
      )}
      {media.hasMore && (
        <div className='list__infinite_indicator'> Infinite scroll</div>
      )}
    </MediumListContainer>
  )
}

const MediumListContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 1.5rem 0;

  .list__noitems {
    font-size: 1.25rem;
    padding: 1rem 0;
    text-align: center;
    margin-top: 1.5rem;
    color: #aaa;
  }

  .list__infinite_indicator {
    position: fixed;
    text-align: center;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    overflow: hidden;
    bottom: 50%;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0px -3px 5px 0px rgb(0, 102, 153, 0.25);
    transform: rotate(-90deg);
    text-transform: capitalize;
    right: -1.8rem;
    color: #069;

    &::before {
      content: "«";
      margin-right: 0.125rem;
      font-weight: bold;
    }
  }
`

export default observer(MediumList)
