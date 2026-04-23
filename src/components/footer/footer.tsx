import { showToast } from '../../hooks/useToast'
import './footer.css'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const onClickEmail = () => {
  navigator.clipboard.writeText('barteksta00@gmail.com')
    .then(() => showToast('> Email copied to clipboard, good choice!'))
}

function useLocalTime() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/Warsaw',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <motion.div
          className="footer-sig"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-sig-name">
            Bartosz <span className="marked">Starzyk</span>
          </div>
          <div className="footer-sig-sub">
            status: <span>● available</span>
          </div>
          <div className="footer-sig-time">
            local time: <span>{useLocalTime()}</span>
          </div>
        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="footer-link-row">
            <a href="#about">about</a>
            <span className="footer-link-separator">·</span>
            <a href="#skills">skills</a>
            <span className="footer-link-separator">·</span>
            <a href="#projects">projects</a>
          </div>
        </motion.div>

        <motion.div
          className="footer-socials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a className="social-btn" href="https://github.com/lShanterl" target="_blank" rel="noreferrer">
            <GitHubIcon /> GitHub
          </a>
          <a className="social-btn" onClick={onClickEmail}>
            <MailIcon /> Email
          </a>
          <a className="social-btn" href="https://www.linkedin.com/in/shanterbs/" target="_blank" rel="noreferrer">
            <LinkedInIcon /> LinkedIn
          </a>
        </motion.div>
      </div>

      <div className="footer-bottom">
          <span>
          <span className="kw">const</span>
          {' year = '}
          <span className="str">{year}</span>
          {'  © Bartosz Starzyk'}
          </span>
        <span>
          built with React + Framer Motion + some love
        </span>
      </div>
      
    </footer>
  )
}
