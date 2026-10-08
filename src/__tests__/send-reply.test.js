import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import handler from '../../api/send-reply.js'

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function createVercelResponse() {
  return {
    statusCode: 200,
    headers: {},
    payload: null,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
  }
}

describe('secure admin reply API', () => {
  beforeEach(() => {
    vi.stubEnv('SUPABASE_URL', 'https://project.supabase.co')
    vi.stubEnv('SUPABASE_ANON_KEY', 'public-anon-key')
    vi.stubEnv('RESEND_API_KEY', 're_server_secret')
    vi.stubEnv('REPLY_FROM_DOMAIN', 'albenaagroup.com')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('rejects requests without an authenticated admin session', async () => {
    const response = createVercelResponse()

    await handler({ method: 'POST', headers: {}, body: {} }, response)

    expect(response.statusCode).toBe(401)
    expect(response.payload.success).toBe(false)
  })

  it('derives both sender and recipient from verified server data', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(jsonResponse({ id: 'admin-1', email: 'info@albenaagroup.com' }))
      .mockResolvedValueOnce(jsonResponse([{ id: 'admin-1' }]))
      .mockResolvedValueOnce(jsonResponse([{
        id: 42,
        name: 'Real Client',
        email: 'client@example.com',
        message: 'Original inquiry',
      }]))
      .mockResolvedValueOnce(jsonResponse({ id: 'email-1' }))

    vi.stubGlobal('fetch', fetchMock)
    const response = createVercelResponse()

    await handler({
      method: 'POST',
      headers: { authorization: 'Bearer valid-admin-token' },
      body: {
        messageId: 42,
        subject: 'Inquiry response',
        body: 'Hello from the team',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
        from: 'attacker@gmail.com',
        to: 'attacker@example.com',
      },
    }, response)

    expect(response.statusCode).toBe(200)
    expect(response.payload.from).toBe('info@albenaagroup.com')
    expect(response.payload.to).toBe('client@example.com')

    const resendRequest = fetchMock.mock.calls[3]
    const emailPayload = JSON.parse(resendRequest[1].body)
    expect(emailPayload.from).toContain('<info@albenaagroup.com>')
    expect(emailPayload.to).toEqual(['client@example.com'])
    expect(resendRequest[1].headers.Authorization).toBe('Bearer re_server_secret')
  })
})
