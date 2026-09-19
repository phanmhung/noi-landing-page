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
  try {
    return window.localStorage.getItem(LOCALE_KEY) === 'vi' ? 'vi' : 'en'
  } catch {
    return 'en'
  }
}

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(THEME_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Preference persistence is optional; the system preference still works.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function persistPreference(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Some privacy modes deny storage. In-memory preferences remain usable.
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale)
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.lang = locale
    persistPreference(LOCALE_KEY, locale)
  }, [locale])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    persistPreference(THEME_KEY, theme)
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
