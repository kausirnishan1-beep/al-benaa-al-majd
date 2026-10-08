import { CONTACT_INFO } from './constants.js'

export function normalizeAddress(value) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : ''
}

export function getHeadquartersAddress(contact = {}) {
  return (
    normalizeAddress(contact.addressEn) ||
    normalizeAddress(contact.addressAr) ||
    normalizeAddress(CONTACT_INFO.addressEn)
  )
}

export function buildGoogleMapsEmbedUrl(address) {
  const destination = normalizeAddress(address)
  return destination
    ? `https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`
    : ''
}

export function buildGoogleMapsDirectionsUrl(address) {
  const destination = normalizeAddress(address)
  return destination
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
    : ''
}
