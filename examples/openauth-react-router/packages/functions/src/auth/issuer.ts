import { issuer } from '@openauthjs/openauth'
import { CodeProvider } from '@openauthjs/openauth/provider/code'
import { CodeUI } from '@openauthjs/openauth/ui/code'
import { handle } from 'hono/aws-lambda'
import { z } from 'zod'
import { authSubjects } from './subjects'

interface GitHubEmail {
  email: string
  primary: boolean
  verified: boolean
  visibility: string | null
}
interface GitHubUser {
  login: string
  id: string | number
  name: string | undefined
  avatar_url: string | undefined
}

interface GoogleProviderResponse {
  sub: string
  name: string | undefined
  given_name: string | undefined
  family_name: string | undefined
  picture: string | undefined
  email: string
  email_verified: boolean
}

const app = issuer({
  subjects: authSubjects,
  // storage,
  // remove once we set the url
  allow: async () => true,
  // select: async (providers) => {
  //   const redirectUrl = new URL(`${process.env.AUTH_FRONTEND_URL}/auth/select`)
  //   redirectUrl.searchParams.set('providers', JSON.stringify(providers))
  //   return Response.redirect(redirectUrl.toString(), 302)
  // },
  providers: {
    email: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log('send code: ', email, code)
        },
      }),
    ),
    // email: CodeProvider({
    //   length: 6,
    //   async request(req, state, form, error) {
    //     console.log('Request', req, state, form, error)

    //     const params = new URLSearchParams()
    //     if (error) {
    //       params.set('error', error.type)
    //     }
    //     if (state.type === 'start') {
    //       return Response.redirect(
    //         `${process.env.AUTH_FRONTEND_URL}/auth/email?${params.toString()}`,
    //         302,
    //       )
    //     }
    //     if (state.type === 'code') {
    //       return Response.redirect(
    //         `${process.env.AUTH_FRONTEND_URL}/auth/code?${params.toString()}`,
    //         302,
    //       )
    //     }

    //     return new Response('ok')
    //   },
    //   async sendCode(claims, code) {
    //     const email = z.string().email().parse(claims.email)
    //     if (process.env.NODE_ENV !== 'production') {
    //       console.log('send code: ', email, code)
    //     }
    //     // await emailService.sendLoginCodeEmail({ code, email })
    //     console.log('send code: ', email, code)
    //   },
    // }),
    // github: GithubProvider({
    //   clientID: Resource.GITHUB_CLIENT_ID.value,
    //   clientSecret: Resource.GITHUB_CLIENT_SECRET.value,
    //   scopes: ['read:user', 'user:email'],
    // }),
    // google: GoogleProvider({
    //   clientID: Resource.GOOGLE_CLIENT_ID.value,
    //   clientSecret: Resource.GOOGLE_CLIENT_SECRET.value,
    //   scopes: ['openid', 'email', 'profile'],
    // }),
  },
  success: async (ctx, value) => {
    console.log('Success', JSON.stringify(value))
    if (value.provider === 'email') {
      const email = value.claims.email
      if (!email) {
        throw new Error('No email found')
      }

      return ctx.subject('account', { type: 'email', email }, { subject: email })
    }

    // if (value.provider === 'github') {
    //   const access = value.tokenset.access
    //   const userResponse = await fetch('https://api.github.com/user', {
    //     headers: {
    //       Authorization: `Bearer ${access}`,
    //       Accept: 'application/vnd.github.v3+json',
    //       'X-GitHub-Api-Version': '2022-11-28',
    //     },
    //   })
    //   const user = (await userResponse.json()) as GitHubUser
    //   if (!user) {
    //     throw new Error('No user found')
    //   }

    //   const emailResponse = await fetch('https://api.github.com/user/emails', {
    //     headers: {
    //       Authorization: `Bearer ${access}`,
    //       Accept: 'application/vnd.github.v3+json',
    //       'X-GitHub-Api-Version': '2022-11-28',
    //     },
    //   })
    //   const emails = (await emailResponse.json()) as GitHubEmail[]
    //   const primary = emails.find((email) => email.primary)
    //   if (!primary?.verified) {
    //     throw new Error('Email not verified')
    //   }

    //   return ctx.subject(
    //     'account',
    //     {
    //       type: 'oauth',
    //       id: typeof user.id === 'number' ? user.id.toString() : user.id,
    //       email: primary.email,
    //       name: user.name,
    //       imageUrl: user.avatar_url,
    //       provider: 'github',
    //     },
    //     { subject: primary.email },
    //   )
    // }

    // if (value.provider === 'google') {
    //   const access = value.tokenset.access
    //   const userResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    //     headers: {
    //       Authorization: `Bearer ${access}`,
    //       Accept: 'application/json',
    //     },
    //   })

    //   const user = (await userResponse.json()) as GoogleProviderResponse
    //   if (!user) {
    //     throw new Error('No user found')
    //   }
    //   if (!user.email_verified) {
    //     throw new Error('Email not verified')
    //   }
    //   return ctx.subject('account', {
    //     type: 'oauth',
    //     id: user.sub,
    //     email: user.email,
    //     name: user.name,
    //     imageUrl: user.picture,
    //     provider: 'google',
    //   })
    // }

    throw new Error('Invalid provider')
  },
})

export const handler = handle(app)
