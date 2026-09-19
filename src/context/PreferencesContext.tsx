import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { messages } from '../i18n/content'
import type { Locale, SiteMessages, Theme } from '../i18n/types'

const LOCALE_KEY = 'noi-locale'
const THEME_KEY = 'noi-theme'

export interface PreferencesValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  theme: Theme
  toggleTheme: () => void
  copy: SiteMessages
}

const PreferencesContext = createContext<PreferencesValue | null>(null)

function readLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  return window.localStorage.getItem(LOCALE_KEY) === 'vi' ? 'vi' : 'en'
}

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale)
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const value = useMemo<PreferencesValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      theme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
      copy: messages[locale],
    }),
    [locale, theme],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences(): PreferencesValue {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error('usePreferences must be used within PreferencesProvider')
  return context
}
