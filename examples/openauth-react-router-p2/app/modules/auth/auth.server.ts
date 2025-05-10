import type { Tokens } from '@openauthjs/openauth/client'
import { redirect } from 'react-router'
import {
  type EmailAccount,
  type OAuthAccount,
  authSubjects,
} from '../../../packages/functions/src/auth/subjects'
import { combineHeaders } from '../../utils/misc.server'
import type { User } from '../users/service.server'
import * as UserService from '../users/service.server'
import {
  AuthSessionController,
  authSessionStorage,
  getSessionDefaultExpiration,
} from './auth-session-storage.server'
import { Authenticator } from './authenticator.server'

export const authenticator = new Authenticator<typeof authSubjects>({
  clientId: 'web',
  redirectUri: `${import.meta.env.VITE_SITE_URL}/auth/callback`,
  issuer: import.meta.env.VITE_AUTH_URL,
  subjects: authSubjects,
})

export async function handleAuthCallback(request: Request) {
  try {
    const { tokens, headers: exchangeHeaders } = await authenticator.exchange(request)
    const verified = await authenticator.verifyToken(tokens.access, { refresh: tokens.refresh })

    if (verified.err) {
      throw redirect('/', {
        headers: combineHeaders(await sessionController.destroySession(request), exchangeHeaders),
      })
    }

    if (verified.subject.type !== 'account') {
      throw new Error('Invalid subject type')
    }

    if (verified.subject.properties.type === 'email') {
      return handleEmailFlow({
        tokens,
        verified: verified.subject.properties,
        exchangeHeaders,
      })
    }

    throw new Error('Invalid subject type')
  } catch (error) {
    if (error instanceof Response) {
      throw error
    }
    console.error('Error handling callback:', error)
    throw redirect('/logout')
  }
}

async function handleEmailFlow({
  tokens,
  verified,
  exchangeHeaders,
}: {
  tokens: Tokens
  verified: EmailAccount
  exchangeHeaders: Headers
}) {
  const user = await UserService.userByEmail(verified.email)

  if (!user) {
    const headers = await sessionController.setSessionData({
      tokens: tokens,
      expires: getSessionDefaultExpiration(),
    })

    throw redirect('/onboarding', {
      headers: combineHeaders(headers, exchangeHeaders),
    })
  }

  const headers = await sessionController.setSessionData({
    tokens: tokens,
    expires: getSessionDefaultExpiration(),
  })

  return {
    user,
    headers: combineHeaders(headers, exchangeHeaders),
  }
}

const sessionController = new AuthSessionController(authSessionStorage)

interface SessionData {
  tokens: Tokens
  properties: EmailAccount | OAuthAccount
  headers: Headers
}

/**
 * Get the session data from the request
 * @param request - The request object
 * @throws redirect to the home page where we can login if there was a token but it was invalid or the subject type is not an account
 * @returns The session data
 */
export async function getSessionData(request: Request) {
  const sessionData = await sessionController.getSessionData(request)
  // if there are no tokens, return undefined
  if (!sessionData.tokens) {
    return undefined
  }

  let headers = new Headers()
  const verified = await authenticator.verifyToken(sessionData.tokens.access, {
    refresh: sessionData.tokens.refresh,
  })
  // if the token is invalid, destroy the session
  // and redirect to the home page where we can login
  if (verified.err || verified.subject.type !== 'account') {
    throw redirect('/', {
      headers: await sessionController.destroySession(request),
    })
  }
  // if there are new tokens from the refreshing, update the session
  if (verified.tokens) {
    sessionData.tokens = verified.tokens
    headers = await sessionController.setSessionData({
      tokens: verified.tokens,
      expires: getSessionDefaultExpiration(),
    })
  }

  return {
    tokens: sessionData.tokens,
    // email: verified.subject.properties.email,
    properties: verified.subject.properties,
    headers,
  }
}

export async function requireSessionData(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const sessionData = await getSessionData(request)
  if (!sessionData) {
    throw redirect(getLoginRedirectUrl(request, redirectTo))
  }
  return sessionData
}

/**
 * Get the session data from the request
 * @param request - The request object
 * @throws redirect to the onboarding page if we have a valid session but no user
 * @returns The session data
 */
export async function getSessionWithUser(request: Request): Promise<
  | {
      sessionData: SessionData
      user: User
    }
  | undefined
> {
  const sessionData = await getSessionData(request)
  if (!sessionData) {
    return undefined
  }
  const user = await UserService.userByEmail(sessionData.properties.email)
  if (!user) {
    throw redirect('/onboarding')
  }

  return {
    sessionData,
    user,
  }
}

export async function requireSessionWithUser(
  request: Request,
  { redirectTo }: { redirectTo?: string | null } = {},
) {
  const sessionData = await requireSessionData(request, { redirectTo })
  const user = await UserService.userByEmail(sessionData.properties.email)
  if (!user) {
    throw redirect('/onboarding')
  }

  return {
    sessionData,
    user,
  }
}

export async function requireAnonymous(request: Request) {
  const sessionData = await getSessionData(request)
  if (sessionData) {
    throw redirect('/')
  }
}

function getLoginRedirectUrl(request: Request, redirectTo?: string | null): string {
  const requestUrl = new URL(request.url)
  const to =
    redirectTo === null ? null : (redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`)
  const params = to ? new URLSearchParams({ redirectTo: to }) : null
  const loginRedirect = ['/login', params?.toString()].filter(Boolean).join('?')
  return loginRedirect
}

export async function handleLogout(
  request: Request,
  {
    redirectTo = '/',
    responseInit,
  }: {
    redirectTo?: string
    responseInit?: ResponseInit
  } = {},
) {
  const headers = await sessionController.destroySession(request)

  throw redirect(redirectTo, {
    ...responseInit,
    headers: combineHeaders(headers, responseInit?.headers),
  })
}

export async function handleSignup({
  email,
  name,
  tokens,
}: { email: string; name: string; tokens: Tokens }) {
  const user = await UserService.signup({ email, name })
  const headers = await sessionController.setSessionData({
    tokens,
    expires: getSessionDefaultExpiration(),
  })
  return { user, headers }
}
