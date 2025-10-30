import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { LanguageProvider } from '../../../lib/i18n'

jest.mock('next/link')

describe('Header', () => {
  it('renders navigation links without nested <a> tags', () => {
    render(
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    )
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link.querySelector('a')).toBeNull()
    })
  })
})
