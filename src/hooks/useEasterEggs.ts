import { useEffect } from 'react'
import { useSecretCode } from './useKonami'
import { showToast } from './useToast'
import { triggerBSOD } from './useBsod'

const CONFIG = {
  RAGE_CLICK: { THRESHOLD: 10, WINDOW_MS: 2000 },
}

const TRIGGER_RESPONSES: Record<string, string> = {
  'hello':       '> hello there, human.',
  'sudo':        '> nice try. permission denied.',
  'hack':        '> accessing mainframe...\n> just kidding.',
  'vim':         '> good luck getting out of here.',
  'git blame':   '> it was definitely not me.',
  'npm install': '> node_modules will take a moment.\n> or a lifetime.',
}

function useRageClick() {
  useEffect(() => {
    let clicks: number[] = []

    const handler = () => {
      const now = Date.now()
      clicks.push(now)
      clicks = clicks.filter(t => now - t < CONFIG.RAGE_CLICK.WINDOW_MS)
      if (clicks.length >= CONFIG.RAGE_CLICK.THRESHOLD) {
        clicks = []
        triggerBSOD()
      }
    }

    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])
}

function useMidnightFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      const isWitchingHour = new Date().getHours() < 6
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      if (!isWitchingHour) return
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 32
      const ctx = canvas.getContext('2d')!
      ctx.font = '26px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('💀', 16, 18)
      link.href = canvas.toDataURL()
    }

    updateFavicon()
    const interval = setInterval(updateFavicon, 60000)
    return () => clearInterval(interval)
  }, [])
}

function useTypeAnywhere() {
  useEffect(() => {
    let buffer = ''
    const keys = Object.keys(TRIGGER_RESPONSES)
    const maxBuffer = Math.max(...keys.map(k => k.length))

    const handler = (e: KeyboardEvent) => {
      const isInput = e.target instanceof HTMLInputElement 
        || e.target instanceof HTMLTextAreaElement
      if (isInput) return

      //basically a sliding window of the n most recent characters
      buffer = (buffer + e.key).slice(-maxBuffer)

      for (const trigger of keys) {
        if (buffer.endsWith(trigger)) {
          showToast(TRIGGER_RESPONSES[trigger])
          buffer = ''
          break
        }
      }
    }

    window.addEventListener('keypress', handler)
    return () => window.removeEventListener('keypress', handler)
  }, [])
}

export function useEasterEggs() {
  useRageClick()
  useMidnightFavicon()
  useTypeAnywhere()

  useSecretCode('rust', () => {
    const isActive = document.body.classList.toggle('rust-mode')
    showToast(`rust mode ${isActive ? 'activated 🦀' : 'deactivated'}`)
  })
}