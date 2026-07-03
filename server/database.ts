import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '..', '..', 'data.db')

export const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL DEFAULT 0,
    category TEXT NOT NULL
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL DEFAULT '📦',
    description TEXT NOT NULL DEFAULT ''
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    src TEXT NOT NULL,
    thumb TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT ''
  )
`)

const countStmt = db.prepare('SELECT COUNT(*) as c FROM menu_items')
if (countStmt.get().c === 0) {
  const insertMenu = db.prepare(
    'INSERT INTO menu_items (name, description, price, category) VALUES (?, ?, ?, ?)'
  )
  const insertCat = db.prepare(
    'INSERT OR IGNORE INTO categories (name, icon, description) VALUES (?, ?, ?)'
  )
  const insertGallery = db.prepare(
    'INSERT INTO gallery_images (src, thumb, alt) VALUES (?, ?, ?)'
  )

  const tx = db.transaction(() => {
    insertMenu.run('Lounge Elegance Espresso', 'Rich and full-bodied espresso with a smooth finish', 3.5, 'Signature Blends')
    insertMenu.run('Velvet Mocha Delight', 'Silky mocha infused with premium chocolate and espresso', 4.25, 'Signature Blends')
    insertMenu.run('Butter Croissant', 'Flaky French croissant with layers of butter', 3.0, 'Pastries')
    insertMenu.run('Chocolate Cake', 'Rich chocolate cake with ganache frosting', 4.5, 'Gourmet Treats')
    insertCat.run('Signature Blends', '☕', 'Premium coffee blends')
    insertCat.run('Pastries', '🥐', 'Fresh baked pastries')
    insertCat.run('Gourmet Treats', '🍫', 'Sweet delicacies')
    insertGallery.run('/images/gallery/gallery-01.jpg', '/images/gallery/gallery-01.jpg', 'Cafe interior with cozy seating')
    insertGallery.run('/images/gallery/gallery-02.jpg', '/images/gallery/gallery-02.jpg', 'Expert barista preparing coffee')
    insertGallery.run('/images/gallery/gallery-03.jpg', '/images/gallery/gallery-03.jpg', 'Warm cafe ambiance with lighting')
    insertGallery.run('/images/gallery/gallery-04.jpg', '/images/gallery/gallery-04.jpg', 'Fresh pastries display')
    insertGallery.run('/images/gallery/gallery-05.jpg', '/images/gallery/gallery-05.jpg', 'Comfortable seating area')
    insertGallery.run('/images/gallery/gallery-06.jpg', '/images/gallery/gallery-06.jpg', 'Perfectly crafted coffee cup')
  })
  tx()
}
