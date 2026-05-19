import { NextResponse } from "next/server";
import { saveBooking, emailBooking } from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const required = ["name", "phone"] as const;
  for (const k of required) {
    if (!body[k] || typeof body[k] !== "string" || !(body[k] as string).trim()) {
      return NextResponse.json({ ok: false, error: `Missing field: ${k}` }, { status: 400 });
    }
  }

  // very simple honeypot
  if (body._gotcha && String(body._gotcha).length > 0) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  const booking = await saveBooking({
    source: "form",
    name: String(body.name ?? ""),
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    hunt: String(body.hunt ?? ""),
    dates: String(body.dates ?? ""),
    groupSize: String(body.groupSize ?? ""),
    experience: String(body.experience ?? ""),
    notes: String(body.notes ?? ""),
    page: String(body.page ?? ""),
  });

  const mailResult = await emailBooking(booking);

  return NextResponse.json({ ok: true, id: booking.id, mail: mailResult });
}
