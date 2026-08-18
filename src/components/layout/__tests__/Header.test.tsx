import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { LanguageProvider } from '../../../lib/i18n'
import { CartProvider } from '../../../contexts/CartContext'

jest.mock('next/link')

describe('Header', () => {
  it('renders navigation links without nested <a> tags', () => {
    render(
      <LanguageProvider>
        <CartProvider>
          <Header />
        </CartProvider>
      </LanguageProvider>
    )
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link.querySelector('a')).toBeNull()
    })
  })
})
