import { useNavigation, useSearchParams } from 'react-router'
import { Card, CardContent, CardFooter } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { StatusButton } from '../../components/ui/status-button'

export default function EmailAuthRoute() {
  const [searchParams] = useSearchParams()
  const error = searchParams.get('error')
  const isPending = useNavigation().state !== 'idle'

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <form
            method="post"
            className="grid gap-4"
            action={`${import.meta.env.VITE_AUTH_URL}/email/authorize`}
          >
            {error === 'invalid_claim' && <FormAlert message={'Invalid email address'} />}
            <input type="hidden" name="action" value="request" />
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                autoFocus
                autoComplete="email"
                placeholder="Email address"
              />
            </div>
            <StatusButton type="submit" status={isPending ? 'pending' : error ? 'error' : 'idle'}>
              Continue
            </StatusButton>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            We&apos;ll send you a code to your email address
          </p>
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
