import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),

  route('login', 'routes/auth/login.ts'),
  route('logout', 'routes/auth/logout.ts'),
  route('onboarding', 'routes/auth/onboarding.tsx'),

  ...prefix('auth', [
    // route('select', './routes/auth/select.tsx'),
    route('callback', './routes/auth/callback.ts'),
    // route('email', './routes/auth/email.tsx'),
    // route('code', './routes/auth/code.tsx'),
    // route('verify', './routes/auth/verify.tsx'),
  ]),

  route('protected', 'routes/protected.tsx'),
] satisfies RouteConfig
