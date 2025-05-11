import { MailIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { FacebookIcon } from '../../components/icons/facebook'
import { GithubIcon } from '../../components/icons/github'
import { GoogleIcon } from '../../components/icons/google'
import { TwitchIcon } from '../../components/icons/twitch'
import { TwitterIcon } from '../../components/icons/twitter'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'

export default function AuthenticationSelect() {
  const providers = useProviders()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Select Authentication</CardTitle>
          <CardDescription>
            Choose a method to authenticate your account. You can also use an existing account if
            you have one.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full grid gap-4">
          {Object.entries(providers).map(([key, type]) => {
            const Icon = ProviderIcons[key as keyof typeof ProviderIcons]
            const url = new URL(`${key}/authorize`, import.meta.env.VITE_AUTH_URL)
            return (
              <Button asChild variant="outline" className="relative w-full" key={key}>
                <a href={url.toString()}>
                  {Icon && <Icon className="size-5 " />}
                  Continue with {DISPLAY[type as keyof typeof DISPLAY] || (type as string)}
                </a>
              </Button>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}

function useProviders() {
  const [searchParams] = useSearchParams()
  const providers = searchParams.get('providers')
  if (!providers) {
    throw new Response('No providers found', { status: 400 })
  }
  const parsedProviders = parseProviders(providers)
  return parsedProviders
}

function parseProviders(providers: string) {
  try {
    return JSON.parse(providers) as Record<string, string>
  } catch {
    throw new Response('Invalid providers', { status: 400 })
  }
}
const DISPLAY: Record<string, string> = {
  twitch: 'Twitch',
  google: 'Google',
  github: 'GitHub',
  x: 'X',
  facebook: 'Facebook',
  code: 'Email',
} as const

const ProviderIcons: Record<string, React.ComponentType<React.ComponentProps<'svg'>>> = {
  twitch: TwitchIcon,
  google: GoogleIcon,
  github: GithubIcon,
  x: TwitterIcon,
  facebook: FacebookIcon,
  code: MailIcon,
} as const
