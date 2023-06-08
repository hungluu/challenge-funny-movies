import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'

export const usePageHeaderAnimator = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => { // startup
    void animate('.navbar__right', { x: [50, 0], opacity: [0, 1] }, { duration: 1 })
  }, [])

  return scope
}
