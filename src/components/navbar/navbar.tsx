import './nav.css'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = [
  { label: 'about.tsx',    href: '#about',    color: '#61DAFB' },
  { label: 'skills.cpp',   href: '#skills',   color: '#659AD2' },
  { label: 'projects.rs',  href: '#projects', color: '#F74C00' },
  { label: 'contact.py',   href: '#contact',  color: '#FFD43B' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const tabHref = (href: string) =>
    TABS.find(t => t.href === `#${active}`)?.href === href

  return (
    <>
      <nav className="navbar">
        <a className="nav-logo" href="#">
          <span className="nav-logo-dot" />
          ~/shanter
        </a>

        <div className="nav-tabs">
          {TABS.map(tab => (
            <a
              key={tab.href}
              className={`nav-tab${tabHref(tab.href) ? ' active' : ''}`}
              href={tab.href}
            >
              <span className="lang-dot" style={{ background: tab.color }} />
              {tab.label}
            </a>
          ))}
        </div>

        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {TABS.map(tab => (
              <a
                key={tab.href}
                href={tab.href}
                onClick={() => setOpen(false)}
              >
                <span className="lang-dot" style={{ background: tab.color }} />
                {tab.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
