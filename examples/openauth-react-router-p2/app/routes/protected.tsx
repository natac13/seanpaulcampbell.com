import { requireSessionWithUser } from '../modules/auth/auth.server'
import type { Route } from './+types/protected'

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireSessionWithUser(request)

  return { user }
}

export default function Protected({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Protected</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  )
}
