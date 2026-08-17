import { mkdirSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', '..', 'data.db')

const dir = path.dirname(dbPath)
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true })
}

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

db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )
`);

// Insert default map URL if not exists
const stmt = db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`);
stmt.run('mapUrl', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1269.9958256008026!2d50.68774219907292!3d35.95532902991406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8daa98c2f70d27%3A0xbfb13a69f631fa04!2z2qnYp9mE2KfbjCDYqNix2YIg2K_YsdmI24zYtNuM!5e1!3m2!1sfa!2s!4v1786934351744!5m2!1sfa!2s');