import { useEffect, type RefObject } from 'react'

const INK_SELECTOR = [
  'a', 'button', 'input', 'textarea', 'select', 'label',
].join(', ')

export function useInkSpot(dotRef: RefObject<HTMLDivElement | null>, ringRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return

    const listeners: Array<{
      el: HTMLElement
      enter: () => void
      leave: () => void
    }> = []

    document.querySelectorAll<HTMLElement>(INK_SELECTOR).forEach(el => {
      const enter = () => {
        if (dotRef.current) {
          //dotRef.current.classList.add('is-hidden')
          dotRef.current?.classList.add('dot-active')
        }
        if (ringRef.current) {
          ringRef.current.classList.add('ring-active')
        }
        el.classList.add('is-cursor-hovered')
      }

      const leave = () => {
        if (dotRef.current) {
          dotRef.current.classList.remove('dot-active')
        }
        if (ringRef.current) {
          ringRef.current.classList.remove('ring-active')
        }
        el.classList.remove('is-cursor-hovered')
      }

      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      listeners.push({ el, enter, leave })
    })

    return () => {
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [dotRef, ringRef])
}
