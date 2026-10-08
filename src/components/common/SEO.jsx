import { useEffect } from 'react'

const configuredBaseUrl = (import.meta.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '')
const BASE_URL = configuredBaseUrl.startsWith('https://')
  ? configuredBaseUrl
  : 'https://albenaagroup.com'
const DEFAULT_IMAGE = '/images/hero/hero-corporate-building.jpg'

/**
 * Lightweight SPA SEO & Open Graph Manager
 * Synchronously injects and updates:
 * - document.title
 * - meta[name="description"]
 * - link[rel="canonical"]
 * - meta[property="og:title"]
 * - meta[property="og:description"]
 * - meta[property="og:url"]
 * - meta[property="og:type"]
 * - meta[property="og:image"]
 * - meta[name="twitter:card"]
 * - meta[name="twitter:title"]
 * - meta[name="twitter:description"]
 */
export default function SEO({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
}) {
  useEffect(() => {
    // 1. Document Title
    const alreadyBranded = /AL BENAA|AL MAJD/i.test(title || '')
    const siteTitle = title
      ? (alreadyBranded ? title : `${title} | AL BENAA & AL MAJD`)
      : 'AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT'
    document.title = siteTitle

    // Helper to update or create meta tags
    const setMetaTag = (attributeName, attributeValue, content) => {
      if (!content) return
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attributeName, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Meta Description
    const metaDescription =
      description ||
      'AL BENAA AL RAHAB CONTRACTING EST. & AL MAJD LINES FOR TRADE & IMPORT - General Construction Contracting, Engineering & International Trade in Saudi Arabia | الإنشاءات والمقاولات والتجارة العامة بالمملكة العربية السعودية'
    setMetaTag('name', 'description', metaDescription)
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow, noarchive' : 'index, follow')

    // 3. Canonical Link
    const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`
    const fullCanonicalUrl = `${BASE_URL}${normalizedPath}`

    let canonicalEl = document.querySelector('link[rel="canonical"]')
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', fullCanonicalUrl)

    // 4. Open Graph Meta Tags
    setMetaTag('property', 'og:title', siteTitle)
    setMetaTag('property', 'og:description', metaDescription)
    setMetaTag('property', 'og:url', fullCanonicalUrl)
    setMetaTag('property', 'og:type', ogType)
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
    setMetaTag('property', 'og:image', fullImageUrl)
    setMetaTag('property', 'og:image:alt', title ? `${title} — AL BENAA & AL MAJD` : 'AL BENAA & AL MAJD')
    setMetaTag('property', 'og:image:width', '750')
    setMetaTag('property', 'og:image:height', '500')
    setMetaTag('property', 'og:site_name', 'AL BENAA & AL MAJD')
    setMetaTag('property', 'og:locale', 'en_SA')
    setMetaTag('property', 'og:locale:alternate', 'ar_SA')

    // 5. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', siteTitle)
    setMetaTag('name', 'twitter:description', metaDescription)
    setMetaTag('name', 'twitter:image', fullImageUrl)
    setMetaTag('name', 'twitter:image:alt', title ? `${title} — AL BENAA & AL MAJD` : 'AL BENAA & AL MAJD')
  }, [title, description, canonicalPath, ogType, ogImage, noIndex])

  return null
}
