import { type RefObject, useRef, useEffect, type MutableRefObject } from 'react'
import { useScroll, useMotionValueEvent, useInView } from 'framer-motion'

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

export interface IInViewScrollParams {
  onInView?: () => void
  onOutView?: () => void
}
export const useInViewScroll = ({ onInView, onOutView }: IInViewScrollParams = {}): [MutableRefObject<any>, boolean] => {
  const ref = useRef(null)
  const isInView = useInView(ref)

  if (onInView || onOutView) {
    useEffect(() => {
      if (isInView && onInView) {
        onInView()
      } else if (!isInView && onOutView) {
        onOutView()
      }
    }, [isInView])
  }

  return [ref, isInView]
}
