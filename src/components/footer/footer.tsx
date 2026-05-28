import './footer.css'

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
      <div className="footer-inner">

        <span className="footer-name">
          Bartosz <span className="marked">Starzyk</span>
        </span>

        <nav className="footer-nav" aria-label="Footer navigation">
          {NAV.map(({ label, href }, _) => (
            <a key={label} className="footer-nav-link" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <span className="footer-copy">
          <span className="kw">const</span>
          {' year = '}
          <span className="str">{year}</span>
          {'  © Bartosz Starzyk'}
        </span>

      </div>
    </footer>
  )
}