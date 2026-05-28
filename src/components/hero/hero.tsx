import './hero.css'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type TLine =
  | { kind: 'cmd';  text: string }
  | { kind: 'out';  text: string; success?: boolean }

const SCRIPT: TLine[] = [
  { kind: 'cmd', text: 'perf stat renderer' },
  { kind: 'out', text: 'Frame time reduced from 18.4ms → 5.2ms' },
  { kind: 'cmd', text: 'cargo build --release' },
  { kind: 'out', text: 'Binary size: 412KB' },
  { kind: 'cmd', text: 'system status' },
  { kind: 'out', text: 'ESP32 telemetry pipeline active' },
  { kind: 'cmd', text: 'echo $STATUS' },
  { kind: 'out', text: '[✓] Open to new opportunities', success: true },
]

type VisLine = { kind: TLine['kind']; text: string; done: boolean; success?: boolean }

function useTerminal() {
  const [lines, setLines] = useState<VisLine[]>([])
  const [busy, setBusy]   = useState(true)
  const idx  = useRef(0)
  const char = useRef(0)

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = SCRIPT[idx.current]
      if (!current) { setBusy(false); return }

      if (current.kind === 'cmd') {
        char.current++
        setLines(prev => {
          const upd  = current.text.slice(0, char.current)
          const last = prev[prev.length - 1]
          if (last?.kind === 'cmd' && !last.done)
            return [...prev.slice(0, -1), { kind: 'cmd', text: upd, done: false }]
          return [...prev, { kind: 'cmd', text: upd, done: false }]
        })

        if (char.current < current.text.length) {
          t = setTimeout(tick, 15 + Math.random() * 50)
        } else {
          setLines(prev => {
            const last = prev[prev.length - 1];
            if (last?.kind === 'cmd') {
              return [...prev.slice(0, -1), { ...last, text: current.text, done: true }];
            }
            return prev;
          });
          char.current = 0
          idx.current++
          t = setTimeout(tick, 150)
        }
      } else {
        setLines(prev => [
          ...prev,
          { kind: 'out', text: current.text, done: true, success: current.success },
        ])
        char.current = 0
        idx.current++
        t = setTimeout(tick, 400)
      }
    }

    t = setTimeout(tick, 500)
    return () => clearTimeout(t)
  }, [])

  return { lines, busy }
}

export default function Hero() {
  const { lines, busy } = useTerminal()
  const [terminalInput, setTerminalInput] = useState('')
  const [customOutputs, setCustomOutputs] = useState<string[]>([])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = terminalInput.trim().toLowerCase()
    if (!cmd) return

    let out = `command not found: ${cmd}. Try 'help' or 'clear'.`
    if (cmd === 'help') out = 'Available commands: help, cat resume, clear, matrix'
    if (cmd === 'cat resume') out = 'Opening resume asset link context...'
    if (cmd === 'matrix') out = 'Wake up, Neo... Select alternative files above.'
    
    if (cmd === 'cat resume') {
      window.open('/resume.pdf', '_blank')
    }

    if (cmd === 'clear') {
      setCustomOutputs([])
    } else {
      setCustomOutputs(prev => [...prev, `shanter@dev ~ $ ${terminalInput}`, out])
    }
    setTerminalInput('')
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-blob-1" />
      <div className="hero-blob-2" />

      <div className="hero-inner">
        <div className="hero-text">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            PORTFOLIO — {new Date().getFullYear()}
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bartosz Starzyk<span className="marked">.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <strong>Systems & Embedded Developer</strong> from Poland.
            Specializing in embedded systems, graphics programming, and performance-critical software using C++ and Rust.
          </motion.p>

          <motion.div
            className="hero-pills"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {['C++', 'Rust', 'Embedded', 'Graphics', 'Game Dev'].map(tag => (
              <span className="hero-pill" key={tag}>{tag}</span>
            ))}
          </motion.div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <a className="btn-primary" href="#projects">./view-projects</a>
            <a className="btn-secondary" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <span className="resume-icon">↓</span> download_resume()
            </a>
            <a className="btn-ghost" href="#contact">get_in_touch()</a>
          </motion.div>
        </div>

        <motion.div
          className="hero-terminal"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="terminal-dot red"    />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green"  />
            </div>
            <span className="terminal-path">~/portfolio/shanter - zsh</span>
          </div>

          <div className="terminal-body">
            {lines.map((line, i) => (
              <div className="t-line" key={i}>
                {line.kind === 'cmd' ? (
                  <>
                    <span className="t-prompt">
                      <span>shanter</span>@dev&nbsp;~&nbsp;$&nbsp;
                    </span>
                    <span className="t-cmd">{line.text}</span>
                  </>
                ) : (
                  <span className={`t-out${line.success ? ' success' : ''}`}>
                    {line.text}
                  </span>
                )}
              </div>
            ))}

            {customOutputs.map((out, i) => (
              <div key={i} className="t-line custom-out">
                <span className="t-out">{out}</span>
              </div>
            ))}

            {!busy && (
              <form onSubmit={handleTerminalSubmit} className="t-form-line">
                <span className="t-prompt">
                  <span>shanter</span>@dev&nbsp;~&nbsp;$&nbsp;
                </span>
                <input
                  type="text"
                  className="t-input"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="type 'help'..."
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll">
        <span className="scroll-line" />
        scroll
      </div>
    </section>
  )
}