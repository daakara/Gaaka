import { render, screen } from '@testing-library/react'
import Footer from '../Footer'
import { LanguageProvider } from '../../../lib/i18n'

jest.mock('next/link')

describe('Footer', () => {
  it('renders navigation links without nested <a> tags', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    )
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link.querySelector('a')).toBeNull()
    })
  })
})
