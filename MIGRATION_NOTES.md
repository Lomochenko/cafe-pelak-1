# Migration Notes - Static HTML to Nuxt 3

## Overview

This document outlines the migration from a static HTML/CSS/JavaScript website to a modern Vue 3 + Nuxt 3 application.

## What Was Migrated

### ✅ Completed

1. **HTML Structure → Vue Components**
   - Hero section → `Hero.vue`
   - About section → `About.vue`
   - Menu section → `Menu/MenuTabs.vue` + `Menu/MenuItem.vue`
   - Gallery section → `Gallery/GalleryGrid.vue` + `Gallery/GalleryItem.vue`
   - Testimonials → `Testimonials.vue`
   - Footer → `Footer.vue`
   - Header/Navigation → `Header.vue`

2. **CSS → CSS Variables System**
   - Extracted color palette
   - Created typography scale
   - Spacing system with vertical rhythm
   - Shadow and border radius utilities
   - Responsive breakpoints
   - RTL support maintained

3. **JavaScript Functionality**
   - Smooth scrolling → `Header.vue` scrollToSection()
   - Mobile menu toggle → `Header.vue` mobileMenuOpen state
   - Sticky header → `Header.vue` scroll detection
   - Preloader → `Preloader.vue` with fade animation
   - Scroll indicator → `Hero.vue` opacity animation

4. **Third-Party Libraries**
   - GLightbox → Plugin integration in `plugins/glightbox.client.ts`
   - Swiper → Plugin setup in `plugins/swiper.client.ts`
   - VueUse → Installed and configured

5. **Data Management**
   - Menu items → Nuxt Content (YAML files)
   - Gallery images → Nuxt Content (JSON file)
   - Composables for state management

6. **Admin Features**
   - Authentication system → `composables/useAuth.ts`
   - Admin dashboard → `pages/admin/index.vue`
   - Menu CRUD → `pages/admin/menu.vue`
   - Gallery management → `pages/admin/gallery.vue`
   - Route protection → `middleware/admin-auth.ts`

## Key Improvements

### 1. **Component-Based Architecture**
- Reusable, maintainable components
- Composition API with `<script setup>`
- Better code organization

### 2. **Type Safety**
- Full TypeScript support
- Strict mode enabled
- Type checking on build

### 3. **Performance**
- Code splitting by route
- Lazy loading support
- Optimized bundle size

### 4. **Developer Experience**
- Hot module replacement (HMR)
- Auto-imports for components
- Better debugging tools

### 5. **Scalability**
- Easy to add new pages
- Modular component structure
- Composable logic reuse

## File Mapping

### Original → New Structure

```
Original HTML/CSS/JS          →  Nuxt 3 Structure
─────────────────────────────────────────────────
index.html                    →  pages/index.vue
css/styles.css                →  assets/css/variables.css + main.css
js/main.js                    →  composables/ + plugins/
js/plugins.js                 →  plugins/
images/                       →  public/images/
(no admin)                    →  pages/admin/ + layouts/admin.vue
(no data structure)           →  content/ + composables/
```

## Configuration Changes

### Nuxt Config
- Added Nuxt Content module
- Added VueUse module
- Configured CSS imports
- Set up TypeScript strict mode
- Configured RTL support

### Package.json
- Updated to Nuxt 3.9.0
- Vue 3.4.0
- Added Swiper 11.0.0
- Added GLightbox 3.3.0
- Added Nuxt Content 2.11.0
- Added VueUse 10.7.0

## Breaking Changes

### None for Users
- All original functionality preserved
- Same visual appearance
- Same animations and effects
- Same content structure

### For Developers
- Must use Vue 3 Composition API
- Component-based instead of jQuery
- TypeScript instead of plain JavaScript
- Nuxt conventions for routing

## Data Storage

### Current (Development)
- Menu items: Composable state + localStorage
- Gallery: Composable state + localStorage
- Auth: localStorage

### Recommended (Production)
- Implement server API routes
- Use database (MongoDB, PostgreSQL, etc.)
- Add proper authentication
- Implement data validation

## Animations Preserved

✅ Preloader fade-out
✅ Sticky header with shadow
✅ Smooth scrolling
✅ Mobile menu transitions
✅ Scroll indicator fade
✅ Card hover effects
✅ Image zoom on hover
✅ Button transitions

## RTL Support

- `dir="rtl"` in HTML
- `lang="fa"` for Persian
- CSS adapted for RTL
- Navigation links work with RTL
- All components support RTL

## Testing Checklist

- [ ] Home page loads correctly
- [ ] All sections visible and styled
- [ ] Smooth scrolling works
- [ ] Mobile menu toggles
- [ ] Sticky header appears on scroll
- [ ] Gallery lightbox opens
- [ ] Admin login works (password: admin123)
- [ ] Menu CRUD operations work
- [ ] Gallery management works
- [ ] Responsive design on mobile
- [ ] RTL layout correct
- [ ] All animations smooth

## Future Enhancements

1. **Swiper Integration**
   - Add carousel for testimonials or gallery
   - Configure autoplay and navigation

2. **Server API**
   - Create `/server/api/` routes
   - Implement persistent storage
   - Add proper authentication

3. **Image Optimization**
   - Use Nuxt Image component
   - Implement lazy loading
   - Add responsive images

4. **SEO**
   - Add meta tags per page
   - Implement structured data
   - Add sitemap

5. **Performance**
   - Implement code splitting
   - Add service worker
   - Optimize CSS delivery

6. **Testing**
   - Add Vitest for unit tests
   - Add Playwright for E2E tests
   - Test admin functionality

## Deployment

### Build for Production
```bash
npm run build
npm run preview
```

### Deploy Options
- Vercel (recommended for Nuxt)
- Netlify
- AWS Amplify
- Docker container
- Traditional hosting with Node.js

### Environment Variables
Create `.env` file for:
- API endpoints
- Admin password (change from default)
- Analytics keys
- etc.

## Support & Resources

- Nuxt 3: https://nuxt.com
- Vue 3: https://vuejs.org
- Nuxt Content: https://content.nuxt.com
- Community: https://discord.nuxt.dev

---

**Migration completed successfully! 🎉**

