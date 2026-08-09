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