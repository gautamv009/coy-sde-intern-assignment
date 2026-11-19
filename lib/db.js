import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "coy.db");

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

// Create the swipes table with user_id support
const swipeColumns = db
  .prepare("PRAGMA table_info(swipes)")
  .all();

const hasUserId = swipeColumns.some(
  (column) => column.name === "user_id"
);

if (!hasUserId) {
  db.exec(`
    ALTER TABLE swipes
    ADD COLUMN user_id INTEGER NOT NULL DEFAULT 1000
  `);
}

// Create matches table
db.exec(`
  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER NOT NULL UNIQUE,
    matched_at TEXT NOT NULL
  );
`);

export default db;