import { authenticator, requireAnonymous } from '../../modules/auth/auth.server'
import type { Route } from './+types/login'

export async function loader({ request }: Route.LoaderArgs) {
  await requireAnonymous(request)

  throw await authenticator.authorize(request)
}
