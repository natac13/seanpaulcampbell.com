import type { SetCookieInit } from '@mjackson/headers'
import { type Tokens, createClient } from '@openauthjs/openauth/client'
import * as OpenAuthError from '@openauthjs/openauth/error'
import type { SubjectSchema } from '@openauthjs/openauth/subject'
import { redirect } from 'react-router'
import { combineHeaders } from '../../utils/misc.server'
import { StateStore } from './store.server'

type FetchLike = NonNullable<Parameters<typeof createClient>['0']['fetch']>

export interface AuthenticatorOption<T extends SubjectSchema = SubjectSchema> {
  /**
   * The redirect URI of the application you registered in the OpenAuth
   * server.
   *
   * This is where the user will be redirected after they authenticate.
   *
   * @example
   * "https://example.com/auth/callback"
   */
  redirectUri: string

  /**
   * The client ID of the application you registered in the OpenAuth server.
   * @example
   * "my-client-id"
   */
  clientId: string

  /**
   * The issuer of the OpenAuth server you want to use.
   * This is where your OpenAuth server is hosted.
   * @example
   * "https://openauth.example.com"
   */
  issuer: string

  /**
   * The name of the cookie used to keep state and code verifier around.
   *
   * The OAuth2 flow requires generating a random state and code verifier, and
   * then checking that the state matches when the user is redirected back to
   * the application. This is done to prevent CSRF attacks.
   *
   * The state and code verifier are stored in a cookie, and this option
   * allows you to customize the name of that cookie if needed.
   * @default "oauth2"
   */
  cookie?: string | (Omit<SetCookieInit, 'value'> & { name: string })

  /**
   * A custom fetch implementation to use when making requests to the OAuth2
   * server. This can be useful when you need to replace the default fetch
   * to use a proxy, for example.
   */
  fetch?: FetchLike

  subjects: T
}

export class Authenticator<T extends SubjectSchema> {
  name = 'openauth'
  #client: ReturnType<typeof createClient>
  #options: AuthenticatorOption<T>
  #subjects: T

  constructor(options: AuthenticatorOption<T>) {
    this.#options = options
    this.#client = createClient({
      clientID: options.clientId,
      issuer: options.issuer,
      fetch: options.fetch,
    })
    this.#subjects = options.subjects
  }

  get #cookieName() {
    if (typeof this.#options.cookie === 'string') {
      return this.#options.cookie || 'oauth2'
    }
    return this.#options.cookie?.name ?? 'oauth2'
  }

  get #cookieOptions() {
    if (typeof this.#options.cookie !== 'object') return {}
    return this.#options.cookie ?? {}
  }

  /**
   * Throws a redirect to the authorization endpoint.
   */
  async authorize(
    _request: Request,
    options?: {
      provider?: string
      redirectUri?: string
      type?: 'login' | 'email-verify'
      headers?: Headers
    },
  ): Promise<void> {
    const { state, verifier, url, redirectUri } = await this.#createAuthorizationURL(options)

    // Create a cookie prefix based on type
    const cookiePrefix = options?.type ? `${this.#cookieName}-${options.type}` : this.#cookieName

    const store = new StateStore()
    store.set(state, verifier, redirectUri)

    const setCookie = store.toSetCookie(cookiePrefix, this.#cookieOptions)

    const headers = new Headers()
    headers.append('Set-Cookie', setCookie.toString())

    throw redirect(url.toString(), { headers: combineHeaders(headers, options?.headers) })
  }

  async exchange(
    request: Request,
    options?: {
      type?: 'login' | 'email-verify'
    },
  ) {
    const url = new URL(request.url)

    const code = url.searchParams.get('code')
    const stateUrl = url.searchParams.get('state')

    // Create a cookie prefix based on type
    const cookiePrefix = options?.type ? `${this.#cookieName}-${options.type}` : this.#cookieName

    const store = StateStore.fromRequest(request, cookiePrefix)

    if (!code) throw new ReferenceError('Missing authorization code.')
    if (!stateUrl) throw new ReferenceError('Missing state in URL.')
    if (!store.state) throw new ReferenceError('Missing state in cookie.')
    if (store.state !== stateUrl) {
      throw new RangeError(`State mismatch. Cookie: ${store.state}, URL: ${stateUrl}`)
    }
    if (!store.codeVerifier) {
      throw new ReferenceError('Missing code verifier in cookie.')
    }

    // Get the redirect URI that was saved during authorization
    const redirectUri = store.redirectUri ?? this.#options.redirectUri

    const result = await this.#client.exchange(code, redirectUri, store.codeVerifier)

    if (result.err) throw result.err

    const cleanCookie = StateStore.cleanCookie(cookiePrefix)
    const headers = new Headers()
    headers.append('Set-Cookie', cleanCookie.toString())

    return {
      tokens: result.tokens,
      headers,
    }
  }

  /**
   * Refreshes the access token using the provided refresh token.
   *
   * @param refresh - The refresh token to use for obtaining a new access token.
   * @param access - An optional access token to validate if it needs to be refreshed.
   * @returns The new tokens obtained after refreshing.
   */
  async refreshToken(refresh: string, access?: string): Promise<Tokens | undefined> {
    const result = await this.#client.refresh(refresh, { access })
    if (result.err) throw result.err
    if (!result.tokens && access) return { access, refresh, expiresIn: 0 }
    if (!access && !result.tokens) throw new Error('No tokens returned')
    return result.tokens
  }

  async verifyToken(token: string, options?: { refresh: string; audience?: string }) {
    const result = await this.#client.verify(this.#subjects, token, {
      ...options,
      issuer: this.#options.issuer,
      fetch: this.#options.fetch as typeof fetch,
    })
    const clone = structuredClone(result)
    return clone
  }

  async #createAuthorizationURL(options?: { provider?: string; redirectUri?: string }) {
    const redirectUri = options?.redirectUri ?? this.#options.redirectUri
    const provider = options?.provider
    const result = await this.#client.authorize(redirectUri, 'code', {
      pkce: true,
      provider: provider,
    })

    const url = new URL(result.url)
    url.searchParams.set('state', result.challenge.state)

    return { ...result.challenge, url, redirectUri }
  }
}

export class OAuth2RequestError extends Error {
  code: string
  description: string | null
  uri: string | null
  state: string | null

  constructor(code: string, description: string | null, uri: string | null, state: string | null) {
    super(`OAuth request error: ${code}`)
    this.code = code
    this.description = description
    this.uri = uri
    this.state = state
  }
}

export { OpenAuthError }
