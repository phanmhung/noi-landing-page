import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PreferencesProvider } from '../context/PreferencesContext'
import { models } from '../data/models'
import { BrandMark } from './BrandMark'
import { Footer } from './Footer'

describe('Nối brand and pricing', () => {
  it('uses the Font Awesome link as the brand symbol', () => {
    const { container } = render(<BrandMark />)
    expect(container.querySelector('svg[data-icon="link"]')).toBeInTheDocument()
  })

  it('presents every sample model price in VND', () => {
    const prices = models.flatMap(model => [model.inputPrice, model.outputPrice])
    expect(prices.every(price => price.endsWith('₫'))).toBe(true)
    expect(prices.some(price => price.includes('¥'))).toBe(false)
  })

  it('keeps the footer concise', () => {
    render(<PreferencesProvider><Footer /></PreferencesProvider>)
    expect(screen.getByText('© 2026 Nối')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(5)
  })
})
