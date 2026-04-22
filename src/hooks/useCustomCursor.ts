import { useEffect, useRef } from 'react'

const NORMAL_LERP_FACTOR = 0.5
const HOVER_LERP_FACTOR = 0.7

export function useCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return

    let rafId = 0
    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let initialized = false

    const animate = () => {
      const lerpFactor = ringRef.current?.classList.contains('ring-active')
        ? HOVER_LERP_FACTOR
        : NORMAL_LERP_FACTOR

      ringX += (mouseX - ringX) * lerpFactor
      ringY += (mouseY - ringY) * lerpFactor

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

  return { dotRef, ringRef }
}
