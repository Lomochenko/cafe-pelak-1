# Cafe Pelak 1 — Nuxt 3 Application

A modern Vue 3 + Nuxt 3 application for Cafe Pelak, featuring a beautiful responsive design with animations and an admin dashboard.

---

## Features

- Vue 3 with Composition API and `<script setup>` syntax
- Beautiful, responsive design with RTL support (Persian language)
- Smooth animations and transitions (preloader, scroll effects, mobile menu)
- Mobile‑friendly interface with responsive breakpoints
- Image gallery with GLightbox lightbox integration
- Carousel functionality with Swiper
- Admin dashboard for content management (CRUD operations)
- Local authentication for admin access
- Nuxt Content integration for menu and gallery data
- Smooth scrolling and scroll spy navigation
- CSS Variables system for theming and consistency

---

## Tech Stack

| Category        | Technology                         |
|-----------------|------------------------------------|
| Framework       | Nuxt 3.9.0                         |
| UI Framework    | Vue 3.4.0                          |
| Language        | TypeScript 5.3.0                   |
| Styling         | CSS with CSS Variables (no Tailwind) |
| Carousel        | Swiper 11.0.0                      |
| Lightbox        | GLightbox 3.3.0                    |
| Content         | Nuxt Content 2.11.0                |
| Utilities       | VueUse 10.7.0                      |
| Code Quality    | ESLint, Prettier                   |

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- npm

### 2. Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev


### Project Structure

cafe-pelak-1/
├── components/              # Vue components
│   ├── Header.vue           # Sticky header with mobile menu
│   ├── Hero.vue             # Full‑screen hero section
│   ├── About.vue            # About section with features
│   ├── Menu.vue             # Menu wrapper
│   ├── Menu/                # Menu components
│   │   ├── MenuTabs.vue     # Tabbed menu interface
│   │   └── MenuItem.vue     # Individual menu item
│   ├── Gallery.vue          # Gallery wrapper
│   ├── Gallery/             # Gallery components
│   │   ├── GalleryGrid.vue  # Gallery grid layout
│   │   └── GalleryItem.vue  # Gallery item with lightbox
│   ├── Testimonials.vue     # Testimonials section
│   ├── Footer.vue           # Footer with links
│   └── Preloader.vue        # Loading animation
├── pages/                   # Page routes
│   ├── index.vue            # Home page
│   └── admin/               # Admin dashboard
│       ├── login.vue        # Admin login page
│       ├── index.vue        # Dashboard overview
│       ├── menu.vue         # Menu CRUD management
│       └── gallery.vue      # Gallery management
├── layouts/                 # Layout templates
│   ├── default.vue          # Main layout
│   └── admin.vue            # Admin layout with sidebar
├── middleware/              # Route guards
│   └── admin-auth.ts        # Admin authentication guard
├── plugins/                 # Nuxt plugins
│   ├── glightbox.client.ts  # GLightbox initialization
│   └── swiper.client.ts     # Swiper initialization
├── composables/             # Vue composables
│   ├── useAuth.ts           # Authentication logic
│   ├── useMenu.ts           # Menu data management
│   └── useGallery.ts        # Gallery data management
├── content/                 # Content files
│   ├── menu/                # Menu data (YAML)
│   │   ├── signature-blends.yml
│   │   ├── pastries.yml
│   │   └── gourmet-treats.yml
│   └── gallery/             # Gallery data (JSON)
│       └── gallery.json
├── assets/                  # Static assets
│   └── css/                 # Stylesheets
│       ├── variables.css    # CSS variables & theming
│       └── main.css         # Base styles & utilities
├── public/                  # Public files
│   └── images/              # Images and icons
├── nuxt.config.ts           # Nuxt configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── README.md                # This file