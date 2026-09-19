import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../context/PreferencesContext'
import { navItems } from '../data/site'
import { BrandMark } from './BrandMark'

export function Header() {
  const { copy, locale, setLocale, theme, toggleTheme } = usePreferences()
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Nối home">
          <BrandMark />
          <span>Nối</span>
        </a>

        <nav ref={navRef} id="primary-navigation" className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
              {copy.nav[item.labelKey]}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-button locale-button"
            type="button"
            onClick={() => setLocale(locale === 'en' ? 'vi' : 'en')}
            aria-label={copy.controls.language}
          >
            {locale === 'en' ? 'VI' : 'EN'}
          </button>
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={copy.controls.theme}>
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.2A8.8 8.8 0 0 1 8.8 3.5 8.8 8.8 0 1 0 20.5 15.2Z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></svg>
            )}
          </button>
          <a className="button button-small header-cta" href="#get-started">{copy.nav.console}</a>
          <button
            ref={menuButtonRef}
            className="icon-button menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? copy.controls.closeMenu : copy.controls.menu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
