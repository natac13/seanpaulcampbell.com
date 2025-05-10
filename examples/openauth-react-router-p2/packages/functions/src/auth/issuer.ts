import { issuer } from '@openauthjs/openauth'
import { UnknownStateError } from '@openauthjs/openauth/error'
import { CodeProvider } from '@openauthjs/openauth/provider/code'
import { handle } from 'hono/aws-lambda'
import { authSubjects } from './subjects'

const app = issuer({
  subjects: authSubjects,
  allow: async () => true,
  providers: {
    email: CodeProvider({
      length: 6,
      sendCode: async (email, code) => {
        console.log('send code: ', email, code)
      },
      async request(_req, state, _form, error) {
        const params = new URLSearchParams()
        // we pass the error to the frontend with a query param
        if (error) {
          params.set('error', error.type)
        }
        if (state.type === 'start') {
          return Response.redirect(
            `${process.env.AUTH_FRONTEND_URL}/auth/email?${params.toString()}`,
            302,
          )
        }
        if (state.type === 'code') {
          params.set('claims', JSON.stringify(state.claims))
          if (state.resend) {
            params.set('resend', 'true')
          }
          return Response.redirect(
            `${process.env.AUTH_FRONTEND_URL}/auth/code?${params.toString()}`,
            302,
          )
        }

        // OpenAuth throws a UnknownStateError here, so we just mimic it
        throw new UnknownStateError()
      },
    }),
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

    throw new Error('Invalid provider')
  },
})

export const handler = handle(app)
