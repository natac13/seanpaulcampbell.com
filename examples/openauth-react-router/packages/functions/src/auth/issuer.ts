import { issuer } from '@openauthjs/openauth'
import { CodeProvider } from '@openauthjs/openauth/provider/code'
import { CodeUI } from '@openauthjs/openauth/ui/code'
import { handle } from 'hono/aws-lambda'
import { authSubjects } from './subjects'

const app = issuer({
  subjects: authSubjects,
  allow: async () => true,
  providers: {
    email: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log('send code: ', email, code)
        },
      }),
    ),
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
