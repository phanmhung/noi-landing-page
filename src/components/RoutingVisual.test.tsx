import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { PreferencesProvider } from '../context/PreferencesContext'
import { RoutingVisual } from './RoutingVisual'

it('lets the visitor pause and resume the orbital animation', async () => {
  localStorage.clear()
  render(<PreferencesProvider><RoutingVisual /></PreferencesProvider>)
  const visual = screen.getByRole('figure')
  await userEvent.click(screen.getByRole('button', { name: 'Pause animation' }))
  expect(visual).toHaveAttribute('data-paused', 'true')
  await userEvent.click(screen.getByRole('button', { name: 'Resume animation' }))
  expect(visual).toHaveAttribute('data-paused', 'false')
})
