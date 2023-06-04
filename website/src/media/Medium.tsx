import React, { useState, Suspense, lazy } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { lg, md } from '../config/controls/responsive'
import { useMediumAnimator } from './animations'

const VideoPlayer = lazy(async () => {
  const { VideoPlayer } = await import('../config/controls/videos')

  return {
    default: VideoPlayer
  }
})

export interface IMediumProps {
  name: string
  description?: string
  url?: string
  userId?: string
  thumbnail: string
  className?: string
}

const Medium: React.FC<IMediumProps> = ({
  className,
  name,
  description,
  url,
  thumbnail,
  userId
}) => {
  const [isReady, setIsReady] = useState(false)
  const animator = useMediumAnimator()

  return (
    <MediumContainer className={classnames('medium', className)} ref={animator}>
      <div className={classnames('medium__player', isReady && 'medium__player--ready')}>
        <img src={thumbnail} className='player__thumbnail' />
        {url && (
          <Suspense>
            <VideoPlayer url={url} onReady={() => { setIsReady(true) }} />
          </Suspense>
        )}
      </div>
      <div className='medium__info'>
        <h4 className='info__title'>{name}</h4>
        {userId && (<p className='info__user'>{userId}</p>)}
        {description && (
          <p className='info__description'>{description?.replace(/(?:[\w]+:\/\/)[^ ]+/ig, '')}</p>
        )}
      </div>
    </MediumContainer>
  )
}

const MediumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  padding-bottom: 1.25rem;
  font-size: 1rem;

  .medium__player {
    flex-basis: 100%;
    width: 100%;
    aspect-ratio: 16/9;
    background: #dfdfdf;

    ${md('flex-basis: 35%; margin-right: 1rem;')}
    ${lg('margin-right: 1.5rem;')}

    .player__thumbnail {
      width: 100%;
      display: flex;
      opacity: 0.9;

      &::before {
        content: '';
      }
    }

    .video-player {
      display: none;
    }
  }

  .medium__player--ready {
    .player__thumbnail {
      display: none;
    }

    .video-player {
      display: block;
    }
  }

  .medium__info {
    flex: 1;
  }

  .info__title {
    margin: 0.75rem 0 0.5rem 0;

    ${md('margin-top: 0.5rem;')}
  }

  .info__user {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 0.8em;
    line-height: 1.2rem;
    font-weight: 200;

    &::before {
      content: 'Shared by:';
      font-weight: 200;
      margin-right: 0.25rem;
      font-weight: normal;
    }

    ${lg('font-size: 1em')}
  }

  .info__description {
    margin: 0;
    font-size: 0.8em;
    line-height: 1.2em;
    font-weight: 200;

    &::before {
      content: 'Description:';
      display: block;
      font-weight: normal;
      margin-bottom: 0.125rem;
    }

    ${lg('font-size: 1em')}
  }
`

export default Medium
