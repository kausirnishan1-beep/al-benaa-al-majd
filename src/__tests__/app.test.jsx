import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import { mainNav } from '../data/navigation.js'
import { CONTACT_INFO, SITE_NAME_EN, SITE_NAME_AR } from '../utils/constants.js'
import SEO from '../components/common/SEO.jsx'
import { buildGoogleMapsDirectionsUrl, buildGoogleMapsEmbedUrl, normalizeAddress } from '../utils/maps.js'

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

describe('SEO metadata', () => {
  it('sets a clean branded title, canonical URL, social image, and noindex when requested', async () => {
    render(
      <SEO
        title="Projects | AL BENAA & AL MAJD"
        description="Project portfolio"
        canonicalPath="/projects"
        noIndex
      />
    )

    await waitFor(() => {
      expect(document.title).toBe('Projects | AL BENAA & AL MAJD')
    })

    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://albenaagroup.com/projects'
    )
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow, noarchive'
    )
    expect(document.querySelector('meta[property="og:image"]')?.content).toContain(
      '/images/hero/hero-corporate-building.jpg'
    )
  })
})

describe('Google Maps links', () => {
  it('generates an embed URL from the saved headquarters address', () => {
    const url = buildGoogleMapsEmbedUrl(' King Fahd Road,  Riyadh ')

    expect(url).toBe('https://www.google.com/maps?q=King%20Fahd%20Road%2C%20Riyadh&output=embed')
  })

  it('generates a directions URL that supports Arabic addresses', () => {
    const address = normalizeAddress('  طريق الملك فهد،   الرياض  ')
    const url = buildGoogleMapsDirectionsUrl(address)

    expect(url).toContain('https://www.google.com/maps/dir/?api=1&destination=')
    expect(decodeURIComponent(url)).toContain('طريق الملك فهد، الرياض')
  })
})
