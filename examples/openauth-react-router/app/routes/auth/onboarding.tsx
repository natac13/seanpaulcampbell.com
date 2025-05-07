import { type SubmissionResult, getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Form, data, redirect, useActionData, useLoaderData, useSearchParams } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { z } from 'zod'
import { ErrorList, Field } from '../../components/ui/forms'
import { StatusButton } from '../../components/ui/status-button'
import { authSessionStorage } from '../../modules/auth/auth-session-storage.server'
import { handleSignup, requireSessionData } from '../../modules/auth/auth.server'
import * as UserService from '../../modules/users/service.server'
import { useIsPending } from '../../utils/misc'
import type { Route } from './+types/onboarding'

export const OnboardingSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  redirectTo: z.string().optional(),
})

export async function loader({ request }: Route.LoaderArgs) {
  const { email } = await requireOnboardingData(request)
  const authSession = await authSessionStorage.getSession(request.headers.get('cookie'))

  const formError = authSession.get('error')
  const hasError = typeof formError === 'string'

  return data({
    email: email,
    status: 'idle',
    submission: {
      status: hasError ? 'error' : undefined,
      initialValue: {
        email: email,
      },
      error: { '': hasError ? [formError] : [] },
    } as SubmissionResult,
  })
}

export async function action({ request }: Route.ActionArgs) {
  const onboardingData = await requireOnboardingData(request)
  const formData = await request.formData()

  const submission = await parseWithZod(formData, {
    async: true,
    schema: (intent) =>
      OnboardingSchema.superRefine(async (data, ctx) => {
        try {
          const existingUser = await UserService.userByEmail(data.email)
          if (existingUser) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'A user with this email already exists.',
              path: ['email'],
            })
            return
          }
          if (data.email !== onboardingData.email) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Email does not match the email provided.',
              path: ['email'],
            })
            return
          }
        } catch (error) {
          console.error('Error verifying token:', error)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'An error occurred while verifying the token.',
            path: ['email'],
          })
        }
      }).transform(async (data) => {
        if (intent !== null) return { ...data, headers: null }

        const { headers } = await handleSignup({
          email: data.email,
          name: data.name,
          tokens: onboardingData.tokens,
        })
        return { ...data, headers }
      }),
  })

  if (submission.status !== 'success' || !submission.value.headers) {
    return data(
      { result: submission.reply() },
      { status: submission.status === 'error' ? 400 : 200 },
    )
  }

  const { redirectTo, headers } = submission.value

  return redirect(safeRedirect(redirectTo, '/protected'), { headers })
}

export default function OnboardingProviderRoute() {
  const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  const isPending = useIsPending()

  const [form, fields] = useForm({
    id: 'onboarding-form',
    constraint: getZodConstraint(OnboardingSchema),
    lastResult: actionData?.result ?? loaderData.submission,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingSchema })
    },
    shouldRevalidate: 'onBlur',
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className=" flex p-8 flex-col items-center justify-center gap-6 rounded-lg shadow-md w-full max-w-xl bg-card">
        <header className="mb-2 flex flex-col gap-2">
          <h1 className="font-display text-center text-5xl font-semibold text-foreground">
            Create your account
          </h1>
          <p className="text-center text-base font-normal text-muted-foreground">
            Join thousands of users today
          </p>
        </header>

        <div className="space-y-8 w-full">
          <Form
            method="POST"
            autoComplete="off"
            className="flex w-full flex-col items-start gap-1"
            {...getFormProps(form)}
          >
            <HoneypotInputs />
            {redirectTo ? (
              <input {...getInputProps(fields.redirectTo, { type: 'hidden' })} value={redirectTo} />
            ) : null}
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-6">
              <div className="col-span-full md:col-span-full md:col-start-1">
                <Field
                  labelProps={{
                    children: 'Name',
                  }}
                  inputProps={{
                    ...getInputProps(fields.name, {
                      type: 'text',
                    }),
                    autoFocus: true,
                  }}
                  errors={fields.name.errors}
                />
              </div>

              <div className="col-span-full md:col-span-full">
                <Field
                  labelProps={{
                    children: 'Email',
                  }}
                  inputProps={{
                    ...getInputProps(fields.email, { type: 'email' }),
                    className: 'lowercase',
                    autoComplete: 'email',
                    readOnly: true,
                  }}
                  errors={fields.email.errors}
                />
              </div>
            </div>
            <div>
              <ErrorList errors={form.errors} id={form.errorId} />
            </div>
            <div className="mt-8 w-full">
              <StatusButton
                type="submit"
                status={isPending ? 'pending' : (form.status ?? 'idle')}
                className="w-full"
              >
                Create Account
              </StatusButton>
            </div>
          </Form>

          <Form method="POST" action="/logout">
            <p className="text-body-sm text-muted-foreground">
              Want to use a different email?{' '}
              <button type="submit" className="text-body-sm text-muted-foreground hover:underline">
                Sign out
              </button>
            </p>
          </Form>
        </div>
      </div>
    </div>
  )
}

async function requireOnboardingData(request: Request) {
  const sessionData = await requireSessionData(request)
  if (!sessionData.tokens) {
    throw new Error('No tokens found')
  }
  const result = z
    .object({
      email: z.string().email(),
      tokens: z.object({
        access: z.string(),
        refresh: z.string(),
        expiresIn: z.number(),
      }),
    })
    .safeParse({
      email: sessionData.properties.email,
      tokens: sessionData.tokens,
    })
  if (!result.success) {
    console.log('requireOnboardingData: result', result)
    throw redirect('/')
  }
  return result.data
}
