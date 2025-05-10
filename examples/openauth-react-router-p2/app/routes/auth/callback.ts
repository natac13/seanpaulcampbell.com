import type { LoaderFunctionArgs } from 'react-router'
import { redirect } from 'react-router'
import { handleAuthCallback } from '../../modules/auth/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const { headers } = await handleAuthCallback(request)

  return redirect('/protected', {
    headers: headers,
  })
}
