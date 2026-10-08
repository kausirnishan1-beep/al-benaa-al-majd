import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import { mainNav } from '../data/navigation.js'
import { CONTACT_INFO, SITE_NAME_EN, SITE_NAME_AR } from '../utils/constants.js'
import { buildGmailComposeUrl } from '../utils/email.js'

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

describe('Admin Gmail reply links', () => {
  it('targets the authenticated admin account and the client recipient', () => {
    const url = buildGmailComposeUrl({
      accountEmail: 'info@albenaagroup.com',
      to: 'client@example.com',
      subject: 'Inquiry Response',
      body: 'Hello client',
    })

    expect(url).toContain('/mail/u/info%40albenaagroup.com/')
    expect(url).toContain('authuser=info%40albenaagroup.com')
    expect(url).toContain('to=client%40example.com')
    expect(url).toContain('su=Inquiry+Response')
    expect(url).toContain('body=Hello+client')
  })

  it('does not create a compose link for an invalid sender or recipient', () => {
    expect(buildGmailComposeUrl({
      accountEmail: 'not-an-email',
      to: 'client@example.com',
      subject: 'Reply',
    })).toBeNull()
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
