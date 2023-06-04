import React, { useEffect, useRef } from 'react'
import Plyr from 'plyr'
import 'plyr/src/sass/plyr.scss'

interface VideoPlayerProps {
  url: string
}
export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className='video-player'>
      <YoutubePlayer id={url.replace(/^[^:/]+[:/]/, '')} />
    </div>
  )
}

interface YoutubePlayerProps {
  id: string
}
export const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ id }) => {
  const video = useRef<HTMLDivElement>(null)
  const player = useRef<Plyr>()

  useEffect(() => {
    if (video.current !== null) {
      player.current = new Plyr(video.current, {
        autoplay: false,
        controls: ['play', 'progress', 'volume', 'mute', 'frameTitle', 'fullscreen'],
        resetOnEnd: true,
        clickToPlay: false,
        settings: [],
        hideControls: false,
        muted: false
      })
    }
  }, [])

  // Watch url changes
  useEffect(() => {
    if (player.current != null) {
      player.current.source = {
        type: 'video',
        sources: [
          {
            src: id,
            provider: 'youtube'
          }
        ]
      }
    }
  }, [id])

  return (
    <div ref={video} id='player' data-plyr-provider='youtube' data-plyr-embed-id={id} />
  )
}
