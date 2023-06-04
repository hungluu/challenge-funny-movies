import React from 'react'
import { VideoPlayer } from '../config/controls/media'
import styled from 'styled-components'
import { lg, md } from '../config/controls/responsive'

export interface IMediumProps {
  name: string
  description?: string
  url: string
  userEmail: string
}

const Medium: React.FC<IMediumProps> = ({
  name,
  description,
  url,
  userEmail
}) => (
  <MediumContainer className='medium'>
    <div className='medium__player'>
      <VideoPlayer url={url} />
    </div>
    <div className='medium__info'>
      <h4 className='info__title'>{name}</h4>
      <p className='info__user'>{userEmail}</p>
      <p className='info__description'>{description?.replace(/(?:[\w]+:\/\/)[^ ]+/ig, '')}</p>
    </div>
    {/* <img src={thumbnail} alt={`${name} preview thumbnail`} /> */}
  </MediumContainer>
)

const MediumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.5rem 0;

  .medium__player {
    flex-basis: 100%;

    ${md('flex-basis: 35%; margin-right: 1rem;')}
    ${lg('flex-basis: 35%; margin-right: 1.5rem;')}
  }

  .medium__info {
    flex: 1;
  }

  .info__title {
    margin: 1rem 0 0.5rem 0;

    ${md('margin-top: 0.5rem;')}
  }

  .info__user {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-weight: 200;

    &::before {
      content: 'Shared by:';
      font-weight: 200;
      margin-right: 0.25rem;
      font-weight: normal;
    }

    ${lg('font-size: 1rem')}
  }

  .info__description {
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-weight: 200;

    &::before {
      content: 'Description:';
      display: block;
      font-weight: normal;
      margin-bottom: 0.125rem;
    }

    ${lg('font-size: 1rem')}
  }
`

export default Medium
