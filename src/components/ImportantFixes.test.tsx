import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { PreferencesProvider } from '../context/PreferencesContext'
import { CallToAction } from './CallToAction'
import { Header } from './Header'

function TestProviders({ children }: { children: React.ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>
}

describe('important interaction fixes', () => {
  beforeEach(() => localStorage.clear())

  it('moves focus into an opened mobile menu and returns it on Escape', async () => {
    render(<TestProviders><Header /></TestProviders>)

    const menuButton = screen.getByRole('button', { name: 'Open navigation' })
    await userEvent.click(menuButton)
    expect(screen.getByRole('link', { name: 'Models' })).toHaveFocus()

    await userEvent.keyboard('{Escape}')
    expect(menuButton).toHaveFocus()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('sends the demonstration CTA to the working API example', () => {
    render(<TestProviders><CallToAction /></TestProviders>)

    expect(screen.getByRole('link', { name: 'View API example' })).toHaveAttribute('href', '#docs')
  })
})
