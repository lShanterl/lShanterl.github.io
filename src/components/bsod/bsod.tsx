import { useEffect, useState } from 'react'
import './bsod.css'

const DURATION = 2800
const FADE_START = DURATION - 600

export default function Bsod() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading]   = useState(false)

  useEffect(() => {
    const handler = () => {
      if (visible) return
      setVisible(true)
      setFading(false)
      setTimeout(() => setFading(true), FADE_START)
      setTimeout(() => { setVisible(false); setFading(false) }, DURATION)
    }

    window.addEventListener('bsod', handler)
    return () => window.removeEventListener('bsod', handler)
  }, [visible])

  if (!visible) return null

  return (
    <div className={`bsod ${fading ? 'bsod--out' : ''}`}>
      <div className="bsod-face">{':('}</div>
      <div className="bsod-title">
        Your PC ran into a problem and needs to restart.
      </div>
      <div className="bsod-info">
        Stop code: RAGE_CLICK_OVERFLOW<br />
        What failed: user.patience<br />
        Collecting error info...&nbsp;&nbsp;100%
      </div>
      <div className="bsod-footer">
        For more information about this issue and possible fixes, visit<br />
        https://lshanterl.github.io/touch-grass
      </div>
    </div>
  )
}