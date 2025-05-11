import { Cookie, SetCookie, type SetCookieInit } from '@mjackson/headers'

/**
 * This class stores all necessary information for the OAuth flow.
 * It follows the same pattern as the OpenAuth SPA implementation.
 */
export class StateStore {
  state: string | undefined
  codeVerifier: string | undefined
  redirectUri: string | undefined

  constructor(state?: string, codeVerifier?: string, redirectUri?: string) {
    this.state = state
    this.codeVerifier = codeVerifier
    this.redirectUri = redirectUri
  }

  /**
   * Set the state, code verifier, and redirect URI
   */
  set(state: string, verifier?: string, redirectUri?: string) {
    this.state = state
    this.codeVerifier = verifier
    this.redirectUri = redirectUri
  }

  /**
   * Check if the store has a specific state
   */
  has(checkState?: string) {
    if (!this.state) return false
    return checkState ? this.state === checkState : true
  }

  /**
   * Get the code verifier for the current state
   */
  get(checkState: string) {
    if (checkState === this.state) {
      return this.codeVerifier
    }
    return undefined
  }

  /**
   * Get the redirect URI that was used for this auth flow
   */
  getRedirectUri() {
    return this.redirectUri
  }

  toString() {
    if (!this.state) return ''
    if (!this.codeVerifier) return ''

    const params = new URLSearchParams()

    params.set('state', this.state)
    params.set('codeVerifier', this.codeVerifier)
    if (this.redirectUri) {
      params.set('redirectUri', this.redirectUri)
    }

    return params.toString()
  }

  /**
   * Convert the store to cookie for storage
   */
  toSetCookie(cookieName = 'oauth2', options: Omit<SetCookieInit, 'value'> = {}) {
    return new SetCookie({
      value: this.toString(),
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      maxAge: 60 * 5, // 5 minutes
      path: '/',
      sameSite: 'Lax',
      ...options,
      name: cookieName,
    })
  }

  /**
   * Create a new instance from a Request object
   */
  static fromRequest(request: Request, cookieName = 'oauth2') {
    const cookie = new Cookie(request.headers.get('cookie') ?? '')
    const cookieValue = cookie.get(cookieName)

    if (!cookieValue) {
      return new StateStore()
    }

    const params = new URLSearchParams(cookieValue)
    const state = params.get('state') || undefined
    const verifier = params.get('codeVerifier') || undefined
    const redirectUri = params.get('redirectUri') || undefined

    return new StateStore(state, verifier, redirectUri)
  }

  static cleanCookie(cookieName = 'oauth2') {
    return new SetCookie({
      value: '',
      maxAge: 0,
      httpOnly: true,
      expires: new Date(0),
      path: '/',
      sameSite: 'Lax',
      name: cookieName,
    })
  }
}
