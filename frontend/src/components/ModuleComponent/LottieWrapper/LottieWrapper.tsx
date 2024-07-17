import React, { useEffect, useRef } from 'react'
import { useLottie, LottieOptions } from 'lottie-react'

interface LottieWrapperProps extends Omit<LottieOptions, 'animationData'> {
  animationData: any
  className?: string
  speed?: number
}

export function LottieWrapper({
  animationData,
  style,
  className,
  loop = true,
  autoplay = true,
  speed = 1,
  ...props
}: LottieWrapperProps): JSX.Element {
  const options: LottieOptions = {
    animationData,
    loop,
    autoplay,
    ...props
  }

  const { View, setSpeed } = useLottie(options, style)

  useEffect(() => {
    setSpeed(speed)
  }, [speed, setSpeed])

  return <div className={className}>{View}</div>
}
