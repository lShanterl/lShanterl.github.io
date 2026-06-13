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

const PILL_TAGS = ['C++', 'Rust', 'Embedded', 'Graphics', 'Game Dev']

export default function Hero() {
  const { lines, busy } = useTerminal()
  const [terminalInput, setTerminalInput] = useState('')
  const [customOutputs, setCustomOutputs] = useState<string[]>([])
  const terminalBodyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [lines, customOutputs])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = terminalInput.trim().toLowerCase()
    if (!cmd) return

    let out = `command not found: ${cmd}. Try 'help' or 'clear'.`
    if (cmd === 'help') out = 'Available commands: help, cat resume, clear, matrix, npm install, sudo, git blame'
    if (cmd === 'cat resume') out = 'Opening resume asset link context...'
    if (cmd === 'matrix') out = 'Wake up, Neo... Select alternative files above.'
    if (cmd === 'npm install') out = 'node modules will take a moment ... or a lifetime.'
    if (cmd === 'sudo') out = 'nice try. permission denied.'
    if (cmd === 'git blame') out = 'it was definitely not me.'
    
    if (cmd === 'cat resume') window.open('/resume.pdf', '_blank')

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
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            PORTFOLIO — {new Date().getFullYear()}
          </motion.p>

          <motion.h1
            className="hero-name"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.028, delayChildren: 0.15 } }
            }}
          >
          {"Bartosz Starzyk".split(" ").map((word, wordIdx) => {
            const isLastWord = wordIdx === 1; 
          
            return (
              <span key={wordIdx} style={{ whiteSpace: 'nowrap', display: 'inline-block' }}>
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40, rotateX: -90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                      }
                    }}
                    style={{ display: 'inline-block', transformOrigin: 'bottom center' }}
                  >
                    {ch}
                  </motion.span>
                ))}

                {isLastWord && (
                  <motion.span
                    className="marked"
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 } }
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    .
                  </motion.span>
                )}

                {!isLastWord && '\u00A0'}
              </span>
            );
          })}
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.42 }}
          >
            <strong>Systems & Embedded Developer</strong> from Poland.
            Specializing in embedded systems, graphics programming, and performance-critical software using C++ and Rust.
          </motion.p>

          <motion.div
            className="hero-pills"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.58 } } }}
          >
            {PILL_TAGS.map(tag => (
              <motion.span
                className="hero-pill"
                key={tag}
                variants={{
                  hidden: { opacity: 0, scale: 0.75, y: 10 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 22 } }
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="hero-cta"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.09, delayChildren: 0.72 } } }}
          >
            {[
              { cls: 'btn-primary',   href: '#projects',         label: './view-projects' },
              { cls: 'btn-secondary', href: '/resume.pdf',       label: '↓ download_resume()', target: '_blank' },
              { cls: 'btn-ghost',     href: '#contact',          label: 'get_in_touch()' },
            ].map(btn => (
              <motion.a
                key={btn.label}
                className={btn.cls}
                href={btn.href}
                target={btn.target}
                rel={btn.target ? 'noopener noreferrer' : undefined}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 20 } }
                }}
                whileHover={{ y: -2, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
                whileTap={{ scale: 0.97 }}
              >
                {btn.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-terminal"
          initial={{ opacity: 0, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
        >
          <div className="terminal-bar">
            <div className="terminal-dots">
              <span className="terminal-dot red"    />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green"  />
            </div>
            <span className="terminal-path">~/portfolio/shanter - zsh</span>
          </div>

          <div className="terminal-body" ref={terminalBodyRef}>
            {lines.map((line, i) => (
              <motion.div
                className="t-line"
                key={i}
              >
                {line.kind === 'cmd' ? (
                  <>
                    <span className="t-prompt"><span>shanter</span>@dev&nbsp;~&nbsp;$&nbsp;</span>
                    <span className="t-cmd">{line.text}</span>
                  </>
                ) : (
                  <span className={`t-out${line.success ? ' success' : ''}`}>{line.text}</span>
                )}
              </motion.div>
            ))}

            {customOutputs.map((out, i) => (
              <motion.div
                key={`custom-${i}`}
                className="t-line custom-out"
              >
                {i % 2 === 0 ? (
                  <>
                    <span className="t-prompt"><span>shanter</span>@dev&nbsp;~&nbsp;$&nbsp;</span>
                    <span className="t-cmd">{out.replace(/^shanter@dev ~ \$ /, '')}</span>
                  </>
                ) : (
                  <span className="t-out">{out}</span>
                )}
              </motion.div>
            ))}

            {!busy && (
              <form onSubmit={handleTerminalSubmit} className="t-form-line">
                <span className="t-prompt"><span>shanter</span>@dev&nbsp;~&nbsp;$&nbsp;</span>
                <input
                  type="text"
                  className="t-input"
                  value={terminalInput}
                  onChange={e => setTerminalInput(e.target.value)}
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

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className="scroll-line"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        scroll
      </motion.div>
    </section>
  )
}