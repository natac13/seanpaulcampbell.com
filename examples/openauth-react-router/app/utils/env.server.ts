import { z } from 'zod'
const schema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test'] as const),
  VITE_SITE_URL: z.string(),
  VITE_AUTH_URL: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }

  interface ImportMetaEnv extends z.infer<typeof schema> {}
}

export function init() {
  // const parsed = schema.safeParse(process.env)
  const parsed = schema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    VITE_SITE_URL: process.env.VITE_SITE_URL,
    VITE_AUTH_URL: process.env.VITE_AUTH_URL,
  })

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)

    throw new Error('Invalid environment variables')
  }
}

export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    VITE_AUTH_URL: process.env.VITE_AUTH_URL,
    VITE_SITE_URL: process.env.VITE_SITE_URL,
  }
}

type ENV = ReturnType<typeof getEnv>

declare global {
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}
