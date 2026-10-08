const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmailAddress(value) {
  return EMAIL_PATTERN.test(String(value || '').trim())
}

export function buildGmailComposeUrl({ accountEmail, to, subject, body = '' }) {
  const sender = String(accountEmail || '').trim().toLowerCase()
  const recipient = String(to || '').trim().toLowerCase()

  if (!isValidEmailAddress(sender) || !isValidEmailAddress(recipient)) return null

  const params = new URLSearchParams({
    authuser: sender,
    view: 'cm',
    fs: '1',
    to: recipient,
    su: subject,
  })

  if (body) params.set('body', body)

  // Gmail uses /u/<account>/ to select a specific signed-in Google account.
  // If that account is not currently signed in, Gmail prompts for it instead
  // of silently composing from whichever personal account is active.
  return `https://mail.google.com/mail/u/${encodeURIComponent(sender)}/?${params.toString()}`
}
