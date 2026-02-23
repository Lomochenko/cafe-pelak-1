# Cafe Pelak 1 - Nuxt 3 Application

A modern Vue 3 + Nuxt 3 application for Cafe Pelak, featuring a beautiful responsive design with animations and an admin dashboard.

## ✅ Migration Complete!

The static HTML/CSS/JS website has been successfully migrated to a modern Vue 3 + Nuxt 3 application with all original features preserved.

## Features

- ✨ Vue 3 with Composition API and `<script setup>` syntax
- 🎨 Beautiful, responsive design with RTL support (Persian language)
- 🎬 Smooth animations and transitions (preloader, scroll effects, mobile menu)
- 📱 Mobile-friendly interface with responsive breakpoints
- 🖼️ Image gallery with GLightbox lightbox integration
- 🎠 Carousel functionality with Swiper (ready to integrate)
- 📊 Admin dashboard for content management (CRUD operations)
- 🔐 Local authentication for admin access (password: admin123)
- 📝 Nuxt Content integration for menu and gallery data
- 🎯 Smooth scrolling and scroll spy navigation
- 🌙 CSS Variables system for theming and consistency

## Tech Stack

- **Framework**: Nuxt 3.9.0
- **UI Framework**: Vue 3.4.0
- **Language**: TypeScript 5.3.0
- **Styling**: CSS with CSS Variables (no Tailwind)
- **Carousel**: Swiper 11.0.0
- **Lightbox**: GLightbox 3.3.0
- **Content**: Nuxt Content 2.11.0
- **Utilities**: VueUse 10.7.0
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

The development server will start at `http://localhost:3000`

## Project Structure

```
├── components/              # Vue components
│   ├── Header.vue          # Sticky header with mobile menu
│   ├── Hero.vue            # Full-screen hero section
│   ├── About.vue           # About section with features
│   ├── Menu.vue            # Menu wrapper
│   ├── Menu/
│   │   ├── MenuTabs.vue    # Tabbed menu interface
│   │   └── MenuItem.vue    # Individual menu item
│   ├── Gallery.vue         # Gallery wrapper
│   ├── Gallery/
│   │   ├── GalleryGrid.vue # Gallery grid layout
│   │   └── GalleryItem.vue # Individual gallery item with lightbox
│   ├── Testimonials.vue    # Testimonials section
│   ├── Footer.vue          # Footer with links
│   └── Preloader.vue       # Loading animation
├── pages/                   # Page components
│   ├── index.vue           # Home page
│   └── admin/              # Admin dashboard
│       ├── login.vue       # Admin login page
│       ├── index.vue       # Dashboard overview
│       ├── menu.vue        # Menu CRUD management
│       └── gallery.vue     # Gallery management
├── layouts/                 # Layout components
│   ├── default.vue         # Main layout
│   └── admin.vue           # Admin layout with sidebar
├── middleware/              # Route middleware
│   └── admin-auth.ts       # Admin authentication guard
├── plugins/                 # Nuxt plugins
│   ├── glightbox.client.ts # GLightbox initialization
│   └── swiper.client.ts    # Swiper initialization
├── composables/             # Vue composables
│   ├── useAuth.ts          # Authentication logic
│   ├── useMenu.ts          # Menu data management
│   └── useGallery.ts       # Gallery data management
├── content/                 # Nuxt Content files
│   ├── menu/               # Menu data (YAML)
│   │   ├── signature-blends.yml
│   │   ├── pastries.yml
│   │   └── gourmet-treats.yml
│   └── gallery/            # Gallery data (JSON)
│       └── gallery.json
├── assets/                  # Static assets
│   └── css/                # Stylesheets
│       ├── variables.css   # CSS variables and theming
│       └── main.css        # Base styles and utilities
├── public/                  # Public files
│   └── images/             # Images and icons
├── nuxt.config.ts          # Nuxt configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── README.md               # This file
```

## Admin Dashboard

Access the admin dashboard at `/admin`

### Login Credentials
- **Password**: `admin123`

### Features

- **Dashboard**: Overview of menu items and gallery images
- **Menu Management**: Add, edit, and delete menu items with categories
- **Gallery Management**: Add and delete gallery images
- **Local Authentication**: Simple password-based authentication using localStorage

## Key Features Implemented

### 1. **Component Architecture**
- Reusable Vue 3 components with Composition API
- `<script setup>` syntax for cleaner code
- Proper component composition and nesting

### 2. **Animations & Effects**
- Preloader with fade-out animation
- Sticky header with scroll detection
- Smooth scrolling navigation
- Mobile menu transitions
- Hover effects on cards and buttons
- Scroll indicator in hero section

### 3. **Responsive Design**
- Mobile-first approach
- Breakpoints: 768px, 600px, 400px
- RTL support for Persian language
- Flexible grid layouts

### 4. **Data Management**
- Nuxt Content for menu and gallery data
- Composables for state management
- CRUD operations for admin dashboard
- localStorage for authentication

### 5. **Admin Dashboard**
- Protected routes with middleware
- Menu item management interface
- Gallery image management
- Dashboard overview with statistics
- Responsive admin layout

### 6. **CSS System**
- CSS Variables for theming
- Color palette (primary, secondary, neutral, semantic)
- Typography scale with responsive sizing
- Spacing system (vertical spacing units)
- Shadow and border radius utilities
- Easing functions for animations

## Development Notes

### RTL Support
The application is configured for RTL (Right-to-Left) layout to support Persian language:
- `dir="rtl"` in HTML
- `lang="fa"` for Persian
- CSS is adapted for RTL layout

### Authentication
Admin authentication uses localStorage for local development:
- Password stored in `composables/useAuth.ts`
- Change password in production
- Middleware protects admin routes

### Styling Approach
- No Tailwind CSS - using custom CSS with variables
- Maintains exact visual appearance from original design
- Responsive typography with multiplier system
- Consistent spacing and sizing

## Next Steps (Optional Enhancements)

1. **Swiper Integration**: Integrate Swiper for carousel functionality if needed
2. **Server API**: Create server routes for persistent data storage
3. **Image Optimization**: Optimize images for production
4. **SEO**: Add meta tags and structured data
5. **Performance**: Implement code splitting and lazy loading
6. **Testing**: Add unit and integration tests
7. **Deployment**: Deploy to Vercel, Netlify, or your preferred hosting

## License

© 2025 Cafe Pelak. All rights reserved.

