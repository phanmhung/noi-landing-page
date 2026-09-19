import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PreferencesProvider, usePreferences } from './PreferencesContext'

function PreferenceProbe() {
  const { locale, setLocale } = usePreferences()

  return (
    <>
      <span>{locale}</span>
      <button type="button" onClick={() => setLocale('vi')}>
        Vietnamese
      </button>
    </>
  )
}

describe('PreferencesProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'en'
    delete document.documentElement.dataset.theme
  })

  afterEach(() => vi.restoreAllMocks())

  it('switches locale, persists it, and updates the document language', async () => {
    render(
      <PreferencesProvider>
        <PreferenceProbe />
      </PreferencesProvider>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Vietnamese' }))

    expect(screen.getByText('vi')).toBeInTheDocument()
    expect(localStorage.getItem('noi-locale')).toBe('vi')
    expect(document.documentElement.lang).toBe('vi')
  })

  it('falls back to English for an invalid stored locale', () => {
    localStorage.setItem('noi-locale', 'invalid')

    render(
      <PreferencesProvider>
        <PreferenceProbe />
      </PreferencesProvider>,
    )

    expect(screen.getByText('en')).toBeInTheDocument()
  })

  it('keeps preferences usable when browser storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage denied', 'SecurityError')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage denied', 'SecurityError')
    })

    render(
      <PreferencesProvider>
        <PreferenceProbe />
      </PreferencesProvider>,
    )

    expect(screen.getByText('en')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Vietnamese' }))
    expect(screen.getByText('vi')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('vi')
  })
})
