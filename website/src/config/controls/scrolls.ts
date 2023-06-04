import type { RefObject } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export interface IInfiniteScrollParams {
  onTriggered: () => void
  onUpdate?: (progress: number) => void
  marginY?: number
  ref?: RefObject<any>
}
export const useInfiniteScroll = ({
  onTriggered,
  onUpdate,
  ref,
  marginY = 0.05
}: IInfiniteScrollParams) => {
  const { scrollYProgress } = ref ? useScroll({ container: ref }) : useScroll()

  useMotionValueEvent(scrollYProgress, 'change', (scrollYProgress) => {
    if (onUpdate) {
      onUpdate(scrollYProgress)
    }

    if (scrollYProgress + marginY >= 1) {
      onTriggered()
    }
  })
}
