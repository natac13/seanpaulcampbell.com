import type { Tokens } from '@openauthjs/openauth/client'
import { type SessionStorage, createCookieSessionStorage } from 'react-router'

interface SessionData {
  tokens: Tokens
  expires?: Date
}

type SessionFlashData = {
  error: string
}

const AUTH_SESSION_KEY = 'en_session'

export const authSessionStorage = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: AUTH_SESSION_KEY,
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: ['secret'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export function getSessionDefaultExpiration() {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
}

// we have to do this because every time you commit the session you overwrite it
// so we store the expiration time in the cookie and reset it every time we commit
const originalCommitSession = authSessionStorage.commitSession

Object.defineProperty(authSessionStorage, 'commitSession', {
  value: async function commitSession(...args: Parameters<typeof originalCommitSession>) {
    const [session, options] = args
    if (options?.expires) {
      session.set('expires', options.expires)
    }
    if (options?.maxAge) {
      session.set('expires', new Date(Date.now() + options.maxAge * 1000))
    }
    const expires = session.has('expires') ? new Date(session.get('expires') as Date) : undefined
    const setCookieHeader = await originalCommitSession(session, {
      ...options,
      expires,
    })
    return setCookieHeader
  },
})

export class AuthSessionController {
  #sessionStorage: SessionStorage<SessionData, SessionFlashData>

  constructor(sessionStorage: SessionStorage<SessionData, SessionFlashData>) {
    this.#sessionStorage = sessionStorage
  }

  get sessionStorage() {
    return this.#sessionStorage
  }

  async getSession(request: Request) {
    return this.#sessionStorage.getSession(request.headers.get('Cookie'))
  }

  async getSessionData(request: Request): Promise<Partial<SessionData>> {
    const session = await this.getSession(request)
    const tokens = session.get('tokens')
    const expires = session.get('expires')

    return {
      tokens,
      expires,
    }
  }

  async setSessionData(data: SessionData) {
    const session = await this.#sessionStorage.getSession()
    session.set('tokens', data.tokens)
    if (data.expires) {
      session.set('expires', data.expires)
    }
    const headers = new Headers()
    headers.append('Set-Cookie', await this.#sessionStorage.commitSession(session))
    return headers
  }

  async destroySession(request: Request) {
    const session = await this.getSession(request)
    const headers = new Headers()
    headers.append('Set-Cookie', await this.#sessionStorage.destroySession(session))
    return headers
  }
}
