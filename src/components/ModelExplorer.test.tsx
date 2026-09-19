import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { PreferencesProvider } from '../context/PreferencesContext'
import { models } from '../data/models'
import { ModelExplorer } from './ModelExplorer'

function TestProviders({ children }: { children: React.ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>
}

describe('ModelExplorer', () => {
  beforeEach(() => localStorage.clear())

  it('filters cards and resets from the empty state', async () => {
    const { rerender } = render(
      <TestProviders>
        <ModelExplorer models={models} />
      </TestProviders>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Fast response' }))
    expect(screen.getAllByRole('article')).toHaveLength(2)

    rerender(
      <TestProviders>
        <ModelExplorer models={[]} />
      </TestProviders>,
    )
    expect(screen.getByText('No models match this view yet.')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Show all models' }))
    expect(screen.getByRole('button', { name: 'All models' })).toHaveAttribute('aria-pressed', 'true')
  })
})
