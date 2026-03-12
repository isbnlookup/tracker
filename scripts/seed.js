const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

async function seed() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN in .env");
    process.exit(1);
  }

  const db = createClient({
    url,
    authToken,
  });

  console.log("Creating table...");
  await db.execute(`
    CREATE TABLE IF NOT EXISTS isbns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      isbn TEXT UNIQUE,
      is_viewed INTEGER DEFAULT 0,
      visitor_id TEXT,
      viewed_at DATETIME
    );
  `);

  console.log("Reading file...");
  const filePath = path.join(__dirname, "../../isbn.txt");
  let fileContent;
  try {
    fileContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("File isbn.txt not found at", filePath);
    process.exit(1);
  }

  const lines = fileContent.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);

  // remove duplicates just in case
  const uniqueIsbns = [...new Set(lines)];
  console.log(`Found ${uniqueIsbns.length} unique ISBNs to insert.`);

  // Insert in batches
  const BATCH_SIZE = 500;
  let inserted = 0;

  for (let i = 0; i < uniqueIsbns.length; i += BATCH_SIZE) {
    const batch = uniqueIsbns.slice(i, i + BATCH_SIZE);
    
    const placeholders = batch.map(() => "(?)").join(", ");
    const args = batch;

    try {
      await db.execute({
        sql: `INSERT OR IGNORE INTO isbns (isbn) VALUES ${placeholders}`,
        args,
      });
      inserted += batch.length;
      console.log(`Inserted ${inserted} / ${uniqueIsbns.length}`);
    } catch (err) {
      console.error("Batch insert failed", err);
    }
  }

  console.log("Seeding complete!");
}

seed();
