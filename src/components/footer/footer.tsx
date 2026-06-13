import './footer.css'
import { motion } from 'framer-motion'

const NAV = [
  { label: 'about',    href: '#about'    },
  { label: 'skills',   href: '#skills'   },
  { label: 'projects', href: '#projects' },
  { label: 'contact',  href: '#contact'  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="footer-name"
          whileHover={{ color: 'var(--purple-light)', transition: { duration: 0.2 } }}
        >
          Bartosz <span className="marked">Starzyk</span>
        </motion.span>

        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV.map(({ label, href }, i) => (
            <motion.a
              key={label}
              className="footer-nav-link"
              href={href}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 + 0.1 }}
              whileHover={{ y: -1, transition: { type: 'spring', stiffness: 500, damping: 25 } }}
            >
              {label}
            </motion.a>
          ))}
        </nav>

        <motion.span
          className="footer-copy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="kw">const</span>
          {' year = '}
          <span className="str">{year}</span>
          {'  © Bartosz Starzyk'}
        </motion.span>
      </motion.div>
    </footer>
  )
}