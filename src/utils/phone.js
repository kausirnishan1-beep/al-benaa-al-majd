/**
 * Formats raw phone input to standard international digits suitable for WhatsApp links
 */
export function formatWhatsAppNumber(phone) {
  if (!phone) return ''
  let clean = phone.toString().replace(/[^0-9]/g, '')

  // 1. Strip international calling prefix '00'
  if (clean.startsWith('00')) {
    clean = clean.slice(2)
  }

  // 2. If Saudi local format (e.g. 0501234567 -> 966501234567)
  if (clean.startsWith('05') && clean.length === 10) {
    clean = '966' + clean.slice(1)
  } else if (clean.startsWith('5') && clean.length === 9) {
    clean = '966' + clean
  }
  // 3. If Bangladesh local format (e.g. 01712345678 -> 8801712345678)
  else if (clean.startsWith('01') && clean.length === 11) {
    clean = '880' + clean.slice(1)
  }
  // 4. Strip any accidental leading zeros
  else if (clean.startsWith('0')) {
    clean = clean.replace(/^0+/, '')
  }

  return clean
}
