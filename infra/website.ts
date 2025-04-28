export const website = new sst.aws.Astro('Website', {
  path: 'apps/website',
  buildCommand: 'bun run build',
})

// export const website = new sst.aws.StaticSite('Website', {
//   path: 'apps/website',
//   build: {
//     command: 'bun run build',
//     output: 'dist',
//   },

// })
