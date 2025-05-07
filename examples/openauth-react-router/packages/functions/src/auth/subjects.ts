import { createSubjects } from '@openauthjs/openauth/subject'
import { z } from 'zod'

const EmailAccount = z.object({
  type: z.literal('email'),
  email: z.string(),
})

const OAuthAccount = z.object({
  type: z.literal('oauth'),
  id: z.string(),
  email: z.string(),
  imageUrl: z.string().optional(),
  name: z.string().optional(),
  provider: z.string(),
})
export type EmailAccount = z.infer<typeof EmailAccount>
export type OAuthAccount = z.infer<typeof OAuthAccount>
export type Account = EmailAccount | OAuthAccount

const AccountSchema = z.discriminatedUnion('type', [EmailAccount, OAuthAccount])

export const authSubjects = createSubjects({
  account: AccountSchema,
})
