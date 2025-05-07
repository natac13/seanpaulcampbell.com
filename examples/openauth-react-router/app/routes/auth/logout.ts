import { handleLogout } from '../../modules/auth/auth.server'
import type { Route } from './+types/logout'

export async function loader({ request }: Route.LoaderArgs) {
  return handleLogout(request)
}

export async function action({ request }: Route.ActionArgs) {
  return handleLogout(request)
}
