# seanpaulcampbell.com

Website built for seanpaulcampbell.com

Built with [next.js](https://nextjs.org)

Hosted on [AWS](https://aws.amazon.com)


## Structure

```
.
├── aws                               # aws cloudformation stack files
│   ├── alert.yml
│   ├── certificate.yml
│   ├── deployment.yml
│   ├── viewerRequest.yml
│   ├── website.yml
│   └── zone-cert.yml
├── components                        # react components
│   ├── Copyright.tsx
│   ├── DateFormatter.tsx
│   ├── Footer.tsx
│   ├── HideOnScroll.tsx
│   ├── Layout.tsx
│   ├── Narbar.tsx
│   ├── PostBody.tsx
│   ├── ScrollTop.tsx
│   └── SEO.tsx
├── lib                               # helper functions
│   ├── markdownToHtml.ts
│   └── posts.ts
├── next.config.js
├── next-env.d.ts
├── package.json
├── pages                             # website pages
│   ├── about.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── posts                         # dynamic routes for posts
│       └── [slug].tsx
├── _posts                            # markdown post files
│   └── about.md
├── README.md
├── serverless                        # serverless functions ie viewerRequest
│   ├── serverless.ts
│   ├── viewerRequest.ts
│   └── webpack.config.js
├── site-config.ts
├── src                               # other files needed for site
│   └── theme.tsx
├── tsconfig.json
└── yarn.lock
```
