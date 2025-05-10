import { Loader2Icon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigation, useSearchParams } from 'react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { OTPField } from '../../components/ui/forms'

export default function CodeAuthRoute() {
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')
  const resend = searchParams.get('resend')
  const claims = useClaims()
  const isPending = useNavigation().state !== 'idle'

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickAway() {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const el = wrapperRef.current
    if (!el) return
    el.addEventListener('click', handleClickAway)

    return () => {
      el.removeEventListener('click', handleClickAway)
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Enter pin code</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            ref={formRef}
            method="post"
            action={`${import.meta.env.VITE_AUTH_URL}/email/authorize`}
            className="grid gap-4"
          >
            {error === 'invalid_code' && <FormAlert message={'Invalid code'} />}
            <FormMessage message={`${resend ? 'Code resent' : 'Code sent'} to ${claims?.email}`} />
            <input type="hidden" name="action" value="verify" />
            <OTPField
              className="place-self-center"
              ref={inputRef}
              inputProps={{
                type: 'text',
                className: 'uppercase',
                name: 'code',
                required: true,
                autoComplete: 'one-time-code',
                autoFocus: true,
                onComplete: () => {
                  if (!formRef.current) return
                  formRef.current.submit()
                },
              }}
            />
            {isPending ? (
              <div className="flex items-center justify-center">
                <Loader2Icon className="animate-spin size-8" />
              </div>
            ) : null}
          </form>
        </CardContent>
        <CardFooter>
          <form
            method="post"
            action={`${import.meta.env.VITE_AUTH_URL}/email/authorize`}
            className="w-full"
          >
            {Object.entries(claims).map(([key, value]) => (
              <input
                key={key}
                type="hidden"
                name={key}
                value={value as string}
                className="hidden"
              />
            ))}
            <input type="hidden" name="action" value="resend" />
            <p className="text-sm text-muted-foreground text-center w-full">
              Did not receive a code?{' '}
              <button type="submit" className="text-primary hover:underline">
                Resend code
              </button>
            </p>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

function FormAlert({ message }: { message: string }) {
  return (
    <div
      data-component="alert"
      className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4"
    >
      {message}
    </div>
  )
}

function FormMessage({ message }: { message: string }) {
  return (
    <div
      data-component="alert"
      className="bg-green-100 text-center text-green-700 border border-green-300 rounded p-4 mb-4"
    >
      {message}
    </div>
  )
}

function useClaims() {
  const [searchParams] = useSearchParams()
  const claims = searchParams.get('claims')
  try {
    return claims ? JSON.parse(claims) : null
  } catch {
    return null
  }
}
