# Quick Start Guide - Cafe Pelak 1

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📍 Key URLs

- **Home Page**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Admin Login**: `http://localhost:3000/admin/login`

## 🔐 Admin Access

**Password**: `admin123`

## 📋 Main Sections

### Home Page
- **Hero**: Full-screen introduction with scroll indicator
- **About**: Cafe information with feature cards
- **Menu**: Tabbed menu with categories (Signature Blends, Pastries, Gourmet Treats)
- **Gallery**: Image gallery with lightbox
- **Testimonials**: Customer reviews
- **Footer**: Contact and links

### Admin Dashboard
- **Dashboard**: Overview of content statistics
- **Menu Items**: CRUD operations for menu items
- **Gallery**: Manage gallery images

## 🎨 Customization

### Change Admin Password
Edit `composables/useAuth.ts`:
```typescript
const ADMIN_PASSWORD = 'your-new-password'
```

### Update Menu Items
Edit files in `content/menu/`:
- `signature-blends.yml`
- `pastries.yml`
- `gourmet-treats.yml`

### Update Gallery
Edit `content/gallery/gallery.json`

### Customize Colors
Edit `assets/css/variables.css` - CSS variables section

## 🛠️ Available Commands

```bash
# Development
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

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 600px - 767px
- **Small Mobile**: Below 600px

## 🌐 RTL Support

The application is configured for RTL (Right-to-Left) layout:
- Persian language support
- RTL CSS layout
- Proper text direction

## 📦 Project Structure

```
cafe-pelak-1/
├── components/      # Vue components
├── pages/          # Page routes
├── layouts/        # Layout templates
├── middleware/     # Route guards
├── plugins/        # Nuxt plugins
├── composables/    # Vue composables
├── content/        # Content files (menu, gallery)
├── assets/         # CSS and static assets
├── public/         # Public files (images)
└── nuxt.config.ts  # Nuxt configuration
```

## 🐛 Troubleshooting

### Dev server won't start
```bash
# Clear cache and reinstall
rm -rf node_modules .nuxt
npm install
npm run dev
```

### Images not loading
- Ensure images are in `public/images/` directory
- Check image paths in components

### Admin login not working
- Verify password in `composables/useAuth.ts`
- Check browser console for errors
- Clear localStorage if needed

## 📚 Documentation

- [Nuxt 3 Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [Nuxt Content](https://content.nuxt.com)
- [Swiper Documentation](https://swiperjs.com)
- [GLightbox Documentation](https://biati-digital.github.io/glightbox/)

## 🎯 Next Steps

1. Test all features in development
2. Customize content (menu, gallery, text)
3. Update admin password
4. Build for production: `npm run build`
5. Deploy to your hosting platform

## 💡 Tips

- Use the admin dashboard to manage content
- All data is stored in localStorage (local development only)
- For production, implement server-side storage
- Images should be optimized before deployment
- Test on mobile devices for responsive design

---

**Happy coding! 🎉**

