// Server-side in-memory store — shared across all requests on the same server process
// In production, replace with a real database (SQLite, PostgreSQL, etc.)

export const store = {
  menuItems: [
    { id: 1, name: 'Lounge Elegance Espresso', description: 'Rich and full-bodied espresso with a smooth finish', price: 3.5, category: 'Signature Blends' },
    { id: 2, name: 'Velvet Mocha Delight', description: 'Silky mocha infused with premium chocolate and espresso', price: 4.25, category: 'Signature Blends' },
    { id: 3, name: 'Butter Croissant', description: 'Flaky French croissant with layers of butter', price: 3.0, category: 'Pastries' },
    { id: 4, name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache frosting', price: 4.5, category: 'Gourmet Treats' },
  ],
  categories: [
    { id: 1, name: 'Signature Blends', icon: '☕', description: 'Premium coffee blends' },
    { id: 2, name: 'Pastries', icon: '🥐', description: 'Fresh baked pastries' },
    { id: 3, name: 'Gourmet Treats', icon: '🍫', description: 'Sweet delicacies' },
  ],
  galleryImages: [
    { id: 1, src: '/images/gallery/gallery-01.jpg', thumb: '/images/gallery/gallery-01.jpg', alt: 'Cafe interior with cozy seating' },
    { id: 2, src: '/images/gallery/gallery-02.jpg', thumb: '/images/gallery/gallery-02.jpg', alt: 'Expert barista preparing coffee' },
    { id: 3, src: '/images/gallery/gallery-03.jpg', thumb: '/images/gallery/gallery-03.jpg', alt: 'Warm cafe ambiance with lighting' },
    { id: 4, src: '/images/gallery/gallery-04.jpg', thumb: '/images/gallery/gallery-04.jpg', alt: 'Fresh pastries display' },
    { id: 5, src: '/images/gallery/gallery-05.jpg', thumb: '/images/gallery/gallery-05.jpg', alt: 'Comfortable seating area' },
    { id: 6, src: '/images/gallery/gallery-06.jpg', thumb: '/images/gallery/gallery-06.jpg', alt: 'Perfectly crafted coffee cup' },
  ],
  nextMenuId: 5,
  nextCategoryId: 4,
  nextGalleryId: 7,
}
