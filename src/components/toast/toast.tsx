import { useState, useEffect, useCallback, useRef } from 'react'
import './toast.css'

export default function Toast() {
  const [message, setMessage]   = useState<string | null>(null)
  const [visible, setVisible]   = useState(false)
  const [leaving, setLeaving]   = useState(false)
  const activeRef               = useRef(false)

  const dismiss = useCallback(() => {
    setLeaving(true)
    setTimeout(() => {
      setLeaving(false)
      setVisible(false)
      setMessage(null)
      activeRef.current = false
    }, 500)
  }, [])

  useEffect(() => {
    const handler = (e: Event) => {
      if (activeRef.current) return
      const text = (e as CustomEvent<string>).detail
      if (!text) return

      activeRef.current = true
      setMessage(text)
      setVisible(true)
      setLeaving(false)

      setTimeout(dismiss, 2600)
    }

    window.addEventListener('toast', handler)
    return () => window.removeEventListener('toast', handler)
  }, [dismiss])

  if (!visible || !message) return null

  return (
    <div className={`toast`}>
      {message}
    </div>
  )
}