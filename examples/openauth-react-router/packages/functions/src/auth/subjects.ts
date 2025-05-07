import { createSubjects } from '@openauthjs/openauth/subject'
import { z } from 'zod'

const EmailAccount = z.object({
  type: z.literal('email'),
  email: z.string(),
})
export type EmailAccount = z.infer<typeof EmailAccount>

const AccountSchema = z.discriminatedUnion('type', [EmailAccount])
export type Account = z.infer<typeof AccountSchema>

export const authSubjects = createSubjects({
  account: AccountSchema,
})
