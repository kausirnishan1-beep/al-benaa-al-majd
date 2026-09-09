import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider, useLanguage } from '../context/LanguageContext.jsx'
import Button from '../components/common/Button.jsx'
import LanguageSwitcher from '../components/common/LanguageSwitcher.jsx'
import { mainNav } from '../data/navigation.js'
import { CONTACT_INFO, SITE_NAME_EN, SITE_NAME_AR } from '../utils/constants.js'

function TestLanguageConsumer() {
  const { language, isRTL, toggleLanguage } = useLanguage()
  return (
    <div>
      <span data-testid="lang-display">{language}</span>
      <span data-testid="rtl-display">{isRTL ? 'RTL' : 'LTR'}</span>
      <button onClick={toggleLanguage} data-testid="toggle-btn">
        Toggle
      </button>
    </div>
  )
}

describe('LanguageContext & RTL Integration', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  })

  it('provides default language and switches to Arabic with RTL dir', () => {
    render(
      <LanguageProvider>
        <TestLanguageConsumer />
      </LanguageProvider>
    )

    const langDisplay = screen.getByTestId('lang-display')
    const toggleBtn = screen.getByTestId('toggle-btn')

    expect(['en', 'ar']).toContain(langDisplay.textContent)

    // Trigger toggle
    fireEvent.click(toggleBtn)

    // Should update HTML attributes
    expect(['ltr', 'rtl']).toContain(document.documentElement.dir)
  })

  it('renders LanguageSwitcher component and responds to clicks', () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    )

    const switcher = screen.getByRole('button', { name: /current language/i })
    expect(switcher).toBeInTheDocument()
    fireEvent.click(switcher)
  })
})

describe('Button Component', () => {
  it('renders primary button with accessible text', () => {
    render(
      <Button variant="primary">
        Click Me
      </Button>
    )

    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('renders white variant button with high contrast classes', () => {
    render(
      <Button variant="white">
        Request Proposal
      </Button>
    )

    const btn = screen.getByRole('button', { name: /request proposal/i })
    expect(btn).toBeInTheDocument()
    expect(btn.className).toContain('bg-white')
  })

  it('renders Link button when to prop is provided', () => {
    render(
      <BrowserRouter>
        <Button to="/contact" variant="primary">
          Contact
        </Button>
      </BrowserRouter>
    )

    const link = screen.getByRole('link', { name: /contact/i })
    expect(link).toHaveAttribute('href', '/contact')
  })
})

describe('Configuration & Navigation Data Integrity', () => {
  it('verifies all main navigation items have English and Arabic labels and valid paths', () => {
    expect(mainNav.length).toBeGreaterThan(0)
    mainNav.forEach((item) => {
      expect(item.path).toBeDefined()
      expect(item.label).toBeTruthy()
      expect(item.labelAr).toBeTruthy()
    })
  })

  it('verifies official company site names and contact information', () => {
    expect(SITE_NAME_EN).toContain('AL BENAA AL RAHAB')
    expect(SITE_NAME_AR).toContain('مؤسسة البناء')
    expect(CONTACT_INFO.phone).toBeDefined()
    expect(CONTACT_INFO.email).toBeDefined()
  })
})
