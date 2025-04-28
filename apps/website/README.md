# Sean Paul Campbell Blog

A personal blog built with Astro to document coding adventures, learning experiences, and interesting technologies.

## Features

- ✨ Clean, minimalist design focused on content
- 📝 Markdown content collections for easy blog post management
- 🖼️ Support for images and rich media in posts
- 🏷️ Tag-based organization for posts
- 🔄 Fast and responsive interface

## Getting Started

### Running the blog locally

```bash
# Navigate to the website directory
cd apps/website

# Install dependencies (if not already done at the root)
bun install

# Start the development server
bun run dev
```

The site will be available at `http://localhost:4321` (or the port shown in your terminal).

## Adding Content

### Creating a new blog post

1. Create a new Markdown file in `src/content/blog/` with a descriptive filename (e.g., `my-new-post.md`)
2. Add the required frontmatter at the top of the file:

```md
---
title: "Your Post Title"
description: "A brief description of your post"
publishDate: 2023-11-15
tags: ["tag1", "tag2"]
draft: false # Set to true to hide from production
image:
  src: "/path/to/image.jpg" # Optional
  alt: "Image description"
---

# Your post content here

Write your content using Markdown...
```

3. Write your post content below the frontmatter using Markdown syntax

### Adding images

Place images in the `public` directory or import them directly in your Markdown files.

## Customization

### Styling

The blog uses Tailwind CSS for styling. Main styles can be found in:

- `src/styles/global.css` - Global styles and Tailwind imports
- Component-specific styles within each component

### Layout

- Main layout structure is in `src/layouts/Layout.astro`
- Page templates are in `src/pages/`

## Deployment

This blog is configured to deploy using SST (Serverless Stack Toolkit) to AWS.

```bash
# Deploy to development
bun run dev

# Deploy to production
bun run build
```

## License

MIT

```sh
bun create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `bun install`         | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
