import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),

  route('login', 'routes/auth/login.ts'),
  route('logout', 'routes/auth/logout.ts'),
  route('onboarding', 'routes/auth/onboarding.tsx'),

  ...prefix('auth', [route('callback', './routes/auth/callback.ts')]),

  route('protected', 'routes/protected.tsx'),
] satisfies RouteConfig
