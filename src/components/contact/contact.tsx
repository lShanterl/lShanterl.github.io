import './contact.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { fadeUp } from '../../utils/animations'
import { showToast } from '../../hooks/useToast'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

function useLocalTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Warsaw',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

type FormState = 'idle' | 'sending' | 'sent' | 'error'

interface FormFields {
  name: string
  email: string
  message: string
}

const SUCCESS_LINES = [
  '> connecting to shanter@dev...',
  '> authenticating...',
  '> message queued ✓',
  '> transmission complete.',
  '> expect a reply within 24h.',
]

function SuccessTerminal() {
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const tick = () => {
      if (i < SUCCESS_LINES.length) {
        setVisibleLines(prev => [...prev, SUCCESS_LINES[i]])
        i++
        setTimeout(tick, i === 1 ? 120 : 200 + Math.random() * 120)
      }
    }
    setTimeout(tick, 100)
  }, [])

  return (
    <motion.div
      className="contact-success-terminal"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="cst-header">
        <div className="cst-dots-row">
          <span className="cst-dot" />
          <span className="cst-dot" />
          <span className="cst-dot" />
        </div>
        <span className="cst-title">~/portfolio/contact - zsh</span>
      </div>
      <div className="cst-body">
        {visibleLines.map((line, i) => (
          <motion.p
            key={i}
            className={`cst-line${i === visibleLines.length - 1 && visibleLines.length < SUCCESS_LINES.length ? ' cst-line--typing' : ''}`}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
          >
            {line}
          </motion.p>
        ))}
        {visibleLines.length === SUCCESS_LINES.length && (
          <motion.p
            className="cst-line cst-line--ready"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            shanter@dev $&nbsp;<span className="cst-cursor" />
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' })
  const [formState, setFormState] = useState<FormState>('idle')
  const [emailCopied, setEmailCopied] = useState(false)
  const localTime = useLocalTime()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.name || !fields.email || !fields.message) return
    setFormState('sending')

    try {
      const res = await fetch('https://formspree.io/f/mzdwylpg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        setFormState('sent')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const copyEmail = () => {
    if (!navigator.clipboard) {
      showToast('Copying fallback un-supported by client browser environment.')
      return
    }
    navigator.clipboard.writeText('barteksta00@gmail.com')
      .then(() => {
        setEmailCopied(true)
        showToast('> Email copied to clipboard, good choice!')
        setTimeout(() => setEmailCopied(false), 2500)
      })
  }

  const isDisabled = formState === 'sending' || formState === 'sent'

  return (
    <section className="contact section-wrapper" id="contact">
      <motion.div className="section-centered-header" {...fadeUp(0)}>
        <p className="section-tag">contact.py — class ContactForm</p>
        <h2 className="section-display-title">
          Get in <span className="marked">Touch</span>
        </h2>
      </motion.div>

      <div className="contact-layout">
        <motion.div className="contact-form-panel" {...fadeUp(0.1)}>
          <div className="cfp-header">
            <span className="cfp-comment">/** send_message.rs **/</span>
          </div>

          <AnimatePresence mode="wait">
            {formState === 'sent' ? (
              <SuccessTerminal key="success" />
            ) : (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              >
                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-name">
                    <span className="cf-prompt">$</span> name
                  </label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className="cf-input"
                    placeholder="Your Name"
                    value={fields.name}
                    onChange={handleChange}
                    disabled={isDisabled}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-email">
                    <span className="cf-prompt">$</span> email
                  </label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className="cf-input"
                    placeholder="recruiter@company.io"
                    value={fields.email}
                    onChange={handleChange}
                    disabled={isDisabled}
                    required
                  />
                </div>

                <div className="cf-field cf-field--tall">
                  <label className="cf-label" htmlFor="cf-message">
                    <span className="cf-prompt">$</span> message
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    className="cf-input cf-textarea"
                    placeholder="Hey, I came across your portfolio..."
                    value={fields.message}
                    onChange={handleChange}
                    disabled={isDisabled}
                    required
                    rows={5}
                  />
                </div>

                <div className="cf-actions-row">
                  <motion.button
                    type="submit"
                    className={`cf-submit${formState === 'sending' ? ' cf-submit--loading' : ''}${formState === 'error' ? ' cf-submit--error' : ''}`}
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { scale: 1.01 } : {}}
                    whileTap={!isDisabled ? { scale: 0.99 } : {}}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {formState === 'sending' && <span className="cf-spinner" />}
                    {formState === 'error'
                      ? '✗ failed — retry'
                      : formState === 'sending'
                      ? 'transmitting...'
                      : './send_message'}
                    {formState === 'idle' && <span className="cf-arrow">↗</span>}
                  </motion.button>

                  {formState === 'error' && (
                    <motion.p
                      className="cf-error-hint"
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      Something went wrong. Email me directly instead.
                    </motion.p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="contact-info-panel" {...fadeUp(0.2)}>
          <div className="cip-block">
            <span className="cip-comment">/** current_status **/</span>
            <div className="cip-status-row">
              <span className="cip-status-dot" />
              <span className="cip-status-text">available for work</span>
            </div>
            <div className="cip-meta-row">
              <span className="cip-meta-key">location</span>
              <span className="cip-meta-val">Katowice, PL</span>
            </div>
            <div className="cip-meta-row">
              <span className="cip-meta-key">local_time</span>
              <span className="cip-meta-val cip-mono">{localTime}</span>
            </div>
            <div className="cip-meta-row">
              <span className="cip-meta-key">response_sla</span>
              <span className="cip-meta-val">{'< 24h'}</span>
            </div>
          </div>

          <div className="cip-block">
            <span className="cip-comment">/** open_to **/</span>
            <div className="cip-pill-row">
              {['Embedded roles', 'Interesting opportunities', 'Systems dev', 'Game engine work', 'Remote / hybrid'].map(tag => (
                <span className="cip-pill" key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="cip-block">
            <span className="cip-comment">/** direct_line **/</span>
            <button className="cip-email-row" onClick={copyEmail} type="button">
              <span className="cip-email-addr">barteksta00@gmail.com</span>
              <motion.span
                className="cip-copy-icon"
                animate={emailCopied ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                {emailCopied ? <CheckIcon /> : <CopyIcon />}
              </motion.span>
            </button>
          </div>

          <div className="cip-block">
            <span className="cip-comment">/** find_me_at **/</span>
            <div className="cip-social-list">
              <a className="cip-social-btn" href="https://github.com/lShanterl" target="_blank" rel="noreferrer">
                <GitHubIcon />
                <div className="csb-text">
                  <span className="csb-label">GitHub</span>
                  <span className="csb-sub">lShanterl</span>
                </div>
                <span className="csb-arrow">↗</span>
              </a>
              <a className="cip-social-btn" href="https://www.linkedin.com/in/shanterbs/" target="_blank" rel="noreferrer">
                <LinkedInIcon />
                <div className="csb-text">
                  <span className="csb-label">LinkedIn</span>
                  <span className="csb-sub">shanterbs</span>
                </div>
                <span className="csb-arrow">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}