import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    let visitorId = cookieStore.get("visitor_id")?.value;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      cookieStore.set("visitor_id", visitorId, { maxAge: 60 * 60 * 24 * 365, httpOnly: true, path: '/' });
    }

    // Assign a new unseen ISBN
    const result = await db.execute(`
      SELECT id, isbn FROM isbns WHERE is_viewed = 0 LIMIT 1
    `);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "No more ISBNs available" }, { status: 404 });
    }

    const { id, isbn } = result.rows[0];

    // Mark as viewed and associate with visitor
    const updateResult = await db.execute({
      sql: `UPDATE isbns SET is_viewed = 1, visitor_id = ?, viewed_at = datetime('now') WHERE id = ? AND is_viewed = 0`,
      args: [visitorId, id],
    });

    if (updateResult.rowsAffected === 0) {
      return NextResponse.json({ error: "Conflict while assigning ISBN" }, { status: 409 });
    }

    return NextResponse.json({ isbn, visitorId });
  } catch (error) {
    console.error("Reveal Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
