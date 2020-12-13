# seanpaulcampbell.com


## Structure

```
.
├─ api
│  └─ index.js             # fetch posts, load configs, parse .md files etc
├─ _includes
│  ├─ footer.js            # footer component
│  └─ header.js            # header component
├─ _layouts
│  ├─ default.js           # default layout for static pages like index, about
│  └─ post.js              # post layout inherts from the default layout
├─ pages
│  ├─ index.js             # homepage
|  └─ posts                # posts will be available on the route /posts/
|     └─ [slug].js       # dynamic page to build posts
└─ _posts
   ├─ welcome-to-nextjs.md
   └─ style-guide-101.md
```
