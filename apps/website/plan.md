# Blog Website Development Plan

## Phase 1: Restructure & Basic Content

- [x] ~~**Create About Page:** Add a new file `apps/website/src/pages/about.astro` with some placeholder content.~~ (Exists and updated)
- [x] ~~**Update Home Page:** Modify `apps/website/src/pages/index.astro` to query and display the list of blog posts from `apps/website/src/content/blog/`.~~ (Done)
- [x] ~~**Refine Blog Post Layout:** Ensure `apps/website/src/pages/blog/[slug].astro` presents posts clearly.~~ (Exists)
- [x] ~~**Basic Navigation:** Update the site header/navigation to include links to Home (Blog List) and About.~~ (Done)
- [x] ~~**Enhanced Blog Features:** Add tag filtering, search functionality, and pagination to the blog index page.~~ (Done with vanilla JS)
- [x] ~~**React Enhancements:** Refactor filtering, search, and pagination to use React with URL search params for better state management.~~ (Done)
- [x] ~~**Architecture Improvements:** Separate landing page from blog browsing functionality. Make home page static with recent posts, and blog page use SSR with server-side filtering.~~ (Done)

## Phase 2: Styling & Polish ("Good Enough" Pass)

- [ ] **Typography & Spacing:** Review and adjust `apps/website/src/styles/global.css` and component styles for readability and visual rhythm.
- [ ] **Component Styling:** Tweak the appearance of key components (header, footer, blog post cards/previews) for better visual hierarchy.
- [x] ~~**Sharing Functionality:** Fix share buttons on blog posts to properly share content on social media platforms.~~ (Done)
- [x] ~~**Reading Time Estimation:** Add an estimated reading time calculation for blog posts.~~ (Done)
- [x] ~~**Dark Mode Support:** Implement a dark mode toggle in the navigation that persists user preference.~~ (Done)
- [x] ~~**SEO Optimization:** Improve SEO metadata with proper default images for social sharing and optimize Head components.~~ (Done)
- [ ] **Responsiveness Check:** Ensure the layout works reasonably well on different screen sizes.
- [x] ~~**Performance:** Add cache control headers to the blog page to improve performance.~~ (Done)

## Phase 3: Additional Features

- [x] ~~**Favicon** Make a favicon from the avatar I have~~ (Done with script)
- [ ] **RSS Feed** Add an RSS feed for the blog
- [ ] **Analytics** Add Google Analytics to the site
- [ ] **Sitemap** Add a sitemap to the site
- [ ] **Contact Form** Add a contact form to the site
- [ ] **SEO Optimizations** Add SEO optimizations to the site
- [ ] **Performance Optimizations** Add performance optimizations to the site

## Phase 4: Content Creation

- [ ] **Write!** Focus on getting your ideas down.
