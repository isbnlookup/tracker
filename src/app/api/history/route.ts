import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const visitorId = cookieStore.get("visitor_id")?.value;

    if (!visitorId) {
      return NextResponse.json({ history: [] });
    }

    const result = await db.execute({
      sql: `SELECT isbn, viewed_at FROM isbns WHERE visitor_id = ? ORDER BY viewed_at DESC`,
      args: [visitorId],
    });

    return NextResponse.json({ history: result.rows });
  } catch (error) {
    console.error("History Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
