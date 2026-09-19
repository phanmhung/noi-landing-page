import { usePreferences } from '../context/PreferencesContext'
import { navItems } from '../data/site'
import { BrandMark } from './BrandMark'

export function Footer() {
  const { copy } = usePreferences()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#top"><BrandMark /><span>Nối</span></a>
          <p className="footer-note">{copy.footer.note}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navItems.map((item) => <a key={item.id} href={`#${item.id}`}>{copy.nav[item.labelKey]}</a>)}
        </nav>
      </div>
      <div className="container footer-bottom">
        <div>
          <a href="https://github.com/QuantumNous/new-api" target="_blank" rel="noreferrer">{copy.footer.attribution}</a>
          <p>{copy.footer.original}</p>
        </div>
        <p>© 2026 Nối</p>
      </div>
    </footer>
  )
}
