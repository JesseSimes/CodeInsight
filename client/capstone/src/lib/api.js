/*
 * Thin wrappers around the existing CodeInsight auth API.
 * Endpoints, methods, headers and payloads are unchanged from the original
 * pages: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me.
 * The base URL defaults to the address the original code used.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, { status = 0, network = false } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.network = network
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Could not reach the CodeInsight server. Check that it is running and try again.', { network: true })
  }

  const result = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(result?.message || `Request failed (${response.status})`, { status: response.status })
  }
  return result
}

// Response: { message, data: { user: { id, name, email }, token } }
export const registerUser = ({ name, email, password }) =>
  request('/api/auth/register', { method: 'POST', body: { name, email, password } })

// Response: { message, data: { user: { id, name, email }, token } }
export const loginUser = ({ email, password }) =>
  request('/api/auth/login', { method: 'POST', body: { email, password } })

// Response: { message, user: { id, name, email, iat } }
export const fetchCurrentUser = (token) => request('/api/auth/me', { token })
