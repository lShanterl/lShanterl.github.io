import { useEffect, useRef, useState } from 'react'

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    const canUseCursor = window.matchMedia('(pointer:fine)').matches
    setIsEnabled(canUseCursor)

    if(!canUseCursor) return;

    let rafId = 0
    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let initialized = false

    const animate = () => {

      ringX += (mouseX - ringX)
      ringY += (mouseY - ringY)

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }

      rafId = requestAnimationFrame(animate)
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!initialized) {
        ringX = e.clientX
        ringY = e.clientY
        initialized = true
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', moveCursor)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId)
    }
  }, [])
  return { dotRef, ringRef, isEnabled }
}
