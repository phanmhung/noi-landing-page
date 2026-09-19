import { StableText } from './StableText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
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
              <StableText text={copy.nav[item.labelKey]} />
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
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} aria-hidden="true" />
          </button>
          <a className="button button-small header-cta" href="#get-started"><StableText text={copy.nav.console} /></a>
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
