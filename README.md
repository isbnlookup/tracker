# ISBN Code Vault

A modern, fast, and secure web application built to distribute unique ISBN codes to visitors. Designed to ensure that **each ISBN is dealt exactly once**, ensuring no duplications or conflicts occur between unique visitors.

Built with **Next.js 14**, styled with **Tailwind CSS**, and powered by a highly-available **Turso SQLite database**.

## 🌟 Features

- **Unique Code Distribution**: Uses transactions and atomic queries to guarantee an ISBN is assigned once.
- **Visitor Tracking**: Automatically assigns unique cookie-based UUIDs to remember visitor history seamlessly across sessions.
- **History Log**: Keeps a ledger of the specific codes assigned to a given visitor along with the timestamps they were revealed.
- **Modern UI**: Clean, responsive, and mobile-friendly interface designed with the `#0883c3` brand color scheme.
- **1-Click Copy**: Convenient tap-to-copy feature utilizing the native Clipboard API for quick usage.
- **Database Seeding Engine**: Includes an efficient Node.js seeding script capable of batch-migrating thousands of textbook ISBN codes from a raw text file straight into Turso.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript / React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [@heroicons/react](https://heroicons.com/)
- **Database**: [Turso](https://turso.tech/) (Edge SQLite)
- **Database Client**: `@libsql/client`

---

## 📦 Local Setup & Installation

### 1. Requirements

- Node.js `v18+`
- A [Turso](https://turso.tech/) Account
- An existing `.txt` file populated with ISBNs (one per line).

### 2. Configuration

Create a `.env` file in the root of the project with your Turso credentials:

```bash
TURSO_DATABASE_URL="libsql://your-db-name.turso.io"
TURSO_AUTH_TOKEN="your-database-auth-token"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Seed the Database

Update your raw text file path inside the `scripts/seed.js` if necessary. Run the seeder to batch insert all unique codes into your database table (`isbns`).

```bash
node scripts/seed.js
```

### 5. Start the Development Server

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000) to start dispensing codes.

---

## 🏛 Database Schema

The Turso SQLite database relies on a straightforward, efficient table designed to avoid race conditions.

```sql
CREATE TABLE IF NOT EXISTS isbns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  isbn TEXT UNIQUE,
  is_viewed INTEGER DEFAULT 0,
  visitor_id TEXT,
  viewed_at DATETIME
);
```

To assign an ISBN safely, atomic constraints (`AND is_viewed = 0`) are utilized ensuring zero overlap:

```sql
UPDATE isbns 
SET is_viewed = 1, visitor_id = ?, viewed_at = datetime('now') 
WHERE id = ? AND is_viewed = 0
```

---

## 🎨 Theme Customization

The primary brand color used throughout the UI is `#0883c3`. If you ever need to change the identity of the application, do a global find-and-replace for `#0883c3` within `src/app/page.tsx` or abstract it out as a Tailwind configuration variable.

## 📄 License

This project is tailored meant for internal distribution and usage. Ensure your usage of the distributed ISBNs adheres to proper copyright/publishing rights.
