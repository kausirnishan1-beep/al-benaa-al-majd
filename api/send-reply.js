/* eslint-env node */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_SUBJECT_LENGTH = 180
const MAX_BODY_LENGTH = 10000

function getBearerToken(request) {
  const authorization = request.headers.authorization || ''
  return authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
}

function normalizeSupabaseUrl(value) {
  return (value || '').trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

async function readJson(response) {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

function sendError(response, status, message) {
  return response.status(status).json({ success: false, error: message })
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendError(response, 405, 'Method not allowed')
  }

  const supabaseUrl = normalizeSupabaseUrl(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  )
  const supabaseAnonKey = (
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
  ).trim()
  const resendApiKey = (process.env.RESEND_API_KEY || '').trim()
  const allowedDomain = (process.env.REPLY_FROM_DOMAIN || 'albenaagroup.com')
    .trim()
    .toLowerCase()

  if (!supabaseUrl || !supabaseAnonKey || !resendApiKey) {
    return sendError(response, 503, 'Email service is not configured')
  }

  const accessToken = getBearerToken(request)
  if (!accessToken) {
    return sendError(response, 401, 'Admin login required')
  }

  const { messageId, subject, body, requestId } = request.body || {}
  const normalizedSubject = typeof subject === 'string' ? subject.trim() : ''
  const normalizedBody = typeof body === 'string' ? body.trim() : ''

  if (!/^\d+$/.test(String(messageId || ''))) {
    return sendError(response, 400, 'Invalid message')
  }
  if (!normalizedSubject || normalizedSubject.length > MAX_SUBJECT_LENGTH) {
    return sendError(response, 400, `Subject must be 1-${MAX_SUBJECT_LENGTH} characters`)
  }
  if (!normalizedBody || normalizedBody.length > MAX_BODY_LENGTH) {
    return sendError(response, 400, `Reply must be 1-${MAX_BODY_LENGTH} characters`)
  }
  if (!/^[0-9a-f-]{36}$/i.test(String(requestId || ''))) {
    return sendError(response, 400, 'Invalid request identifier')
  }

  const supabaseHeaders = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${accessToken}`,
  }

  try {
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: supabaseHeaders,
    })
    const user = await readJson(userResponse)

    if (!userResponse.ok || !user?.id || !EMAIL_PATTERN.test(user.email || '')) {
      return sendError(response, 401, 'Admin session is invalid or expired')
    }

    const adminResponse = await fetch(
      `${supabaseUrl}/rest/v1/admins?id=eq.${encodeURIComponent(user.id)}&is_active=eq.true&select=id&limit=1`,
      { headers: supabaseHeaders }
    )
    const admins = await readJson(adminResponse)

    if (!adminResponse.ok || !Array.isArray(admins) || admins.length !== 1) {
      return sendError(response, 403, 'This account is not an active administrator')
    }

    const senderEmail = user.email.trim().toLowerCase()
    const senderDomain = senderEmail.split('@')[1]
    if (senderDomain !== allowedDomain) {
      return sendError(
        response,
        403,
        `Admin sender must use the verified ${allowedDomain} domain`
      )
    }

    const messageResponse = await fetch(
      `${supabaseUrl}/rest/v1/contact_messages?id=eq.${encodeURIComponent(messageId)}&select=id,name,email,message&limit=1`,
      { headers: supabaseHeaders }
    )
    const messages = await readJson(messageResponse)
    const clientMessage = Array.isArray(messages) ? messages[0] : null

    if (!messageResponse.ok || !clientMessage) {
      return sendError(response, 404, 'Client message was not found')
    }
    if (!EMAIL_PATTERN.test(clientMessage.email || '')) {
      return sendError(response, 400, 'Client email address is invalid')
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `admin-reply/${messageId}/${requestId}`,
      },
      body: JSON.stringify({
        from: `Al-Benaa & Al-Majd Group <${senderEmail}>`,
        to: [clientMessage.email.trim().toLowerCase()],
        subject: normalizedSubject,
        text: normalizedBody,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#1f2937;white-space:pre-wrap">${escapeHtml(normalizedBody)}</div>`,
      }),
    })
    const emailResult = await readJson(emailResponse)

    if (!emailResponse.ok) {
      console.error('Resend email error:', emailResponse.status, emailResult?.message)
      const configurationError = emailResponse.status === 401 || emailResponse.status === 403
      return sendError(
        response,
        configurationError ? 503 : 502,
        configurationError
          ? 'Sender domain or email service configuration is incomplete'
          : 'Email provider could not send the reply'
      )
    }

    return response.status(200).json({
      success: true,
      emailId: emailResult?.id || null,
      from: senderEmail,
      to: clientMessage.email.trim().toLowerCase(),
    })
  } catch (error) {
    console.error('Send reply function error:', error)
    return sendError(response, 500, 'Could not send the reply')
  }
}
