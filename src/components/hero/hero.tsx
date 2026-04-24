import './hero.css'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type TLine =
  | { kind: 'cmd';  text: string }
  | { kind: 'out';  text: string; success?: boolean }

const SCRIPT: TLine[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'Bartosz Starzyk - systems & embedded dev, PL' },
  { kind: 'cmd', text: 'git push origin main --force' },
  { kind: 'out', text: 'Everything up-to-date (There will be consequences)', },
  { kind: 'cmd', text: 'ls ./hardware' },
  { kind: 'out', text: 'Raspberry-Pi-Pico/  ESP32/  broken_breadboards/' },
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
          t = setTimeout(tick, 20 + Math.random() * 100)
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
          t = setTimeout(tick, 220)
        }
      } else {
        setLines(prev => [
          ...prev,
          { kind: 'out', text: current.text, done: true, success: current.success },
        ])
        char.current = 0
        idx.current++
        t = setTimeout(tick, 650)
      }
    }

    t = setTimeout(tick, 800)
    return () => clearTimeout(t)
  }, [])

  return { lines, busy }
}

export default function Hero() {
  const { lines } = useTerminal()

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
            Shanter<span className="marked">.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <strong>Systems & Embedded Developer</strong> from Poland. 
            I architect high-performance solutions in C++ and Rust, focusing on the volatile space where hardware meets software. 
            From OpenGL renderers to medical-grade deployments I thrive <em>below </em> the abstraction layer, where the bugs are weirder and the performance actually matters.
          </motion.p>

          <motion.div
            className="hero-pills"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {['C++', 'Rust', 'Embedded', 'Game Dev'].map(tag => (
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
            <a className="btn-ghost"   href="#contact">get_in_touch()</a>
            {/* <span className="cta-note">// No garbage collector was used here</span> */}
          </motion.div>
        </div>

        <motion.div
          className="hero-terminal"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="terminal-bar">
            <span className="terminal-dot red"    />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green"  />
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
