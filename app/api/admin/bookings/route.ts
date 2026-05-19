import { NextResponse } from "next/server";
import { listBookings } from "@/lib/bookings";
import { isAuthed } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthed(request.headers.get("cookie"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const bookings = await listBookings(500);
  return NextResponse.json({ ok: true, bookings });
}
