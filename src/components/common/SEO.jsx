import { useEffect } from 'react'

const BASE_URL = 'https://albenaa-almajd.com' // or current window location origin fallback
const DEFAULT_IMAGE = '/logo/group-logo.svg'

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
}) {
  useEffect(() => {
    // 1. Document Title
    const siteTitle = title
      ? `${title} | AL BENAA & AL MAJD`
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

    // 3. Canonical Link
    const fullCanonicalUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${canonicalPath}`
      : `${BASE_URL}${canonicalPath}`

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
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`)
    setMetaTag('property', 'og:site_name', 'AL BENAA & AL MAJD')

    // 5. Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', siteTitle)
    setMetaTag('name', 'twitter:description', metaDescription)
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`)
  }, [title, description, canonicalPath, ogType, ogImage])

  return null
}
