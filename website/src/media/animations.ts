import { useAnimate, stagger } from 'framer-motion'
import { useEffect } from 'react'

const mediumStaggerItem = stagger(0.1, { startDelay: 0.3 })

export const useMediumAnimator = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => { // startup
    void animate('.medium__player', { opacity: [0, 1] }, { duration: 0.4 })
    void animate('.medium__info', { opacity: [0, 1] }, { duration: 0.4 })
    void animate('.info__title,.info__user,.info__description', { opacity: [0, 1], x: [-20, 0] }, {
      duration: 0.2,
      delay: mediumStaggerItem || 0
    })
  }, [])

  return scope
}
