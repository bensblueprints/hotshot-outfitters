import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { saveBooking, emailBooking } from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Turn = { role?: string; message?: string };

function extract(transcript: string, patterns: RegExp[]): string {
  for (const p of patterns) {
    const m = transcript.match(p);
    if (m && m[1]) return m[1].trim().replace(/\s+/g, " ").slice(0, 200);
  }
  return "";
}

function parseTranscript(transcript: string) {
  const name = extract(transcript, [
    /my name(?:'s| is)\s+([A-Za-z][A-Za-z .'-]{1,40})/i,
    /(?:i'm|i am)\s+([A-Za-z][A-Za-z .'-]{1,40})/i,
    /(?:^|\n)user:\s*([A-Z][a-z]+)\.?\s*$/m,
  ]);
  const phone = extract(transcript, [
    /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
  ]);
  const email = extract(transcript, [
    /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/,
  ]);
  const hunt = extract(transcript, [
    /(whitetail|wild turkey|turkey|duck|goose|coyote(?:\s*(?:and|&|\/)?\s*fox)?|fox|cottontail|rabbit|crow|charter|fishing)/i,
  ]);
  const dates = extract(transcript, [
    /(next month|this week|next week|in (?:the )?(?:fall|spring|winter|summer))/i,
    /(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/,
    /(november|december|october|september|january|february|march|april|may|june|july|august)\s*\d*/i,
  ]);
  const groupSize = extract(transcript, [
    /(\d+)\s+(?:people|hunters|in (?:my|our)?\s*party|of us|guys)/i,
    /just me and my (\w+)/i,
  ]);
  const experience = extract(transcript, [
    /(first[- ]?timer|never hunted|beginner|weekend hunter|seasoned|experienced)/i,
  ]);
  return { name, phone, email, hunt, dates, groupSize, experience };
}

export async function POST(request: Request) {
  if (!isAuthed(request.headers.get("cookie"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const conversationId = String(body.conversationId ?? "");
  if (!/^conv_[A-Za-z0-9]+$/.test(conversationId)) {
    return NextResponse.json({ ok: false, error: "Bad conversationId" }, { status: 400 });
  }

  const key = process.env.XI_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "XI_API_KEY not set on server" }, { status: 500 });
  }

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
    { headers: { "xi-api-key": key } }
  );
  if (!upstream.ok) {
    const text = await upstream.text();
    return NextResponse.json({ ok: false, error: `ElevenLabs ${upstream.status}`, detail: text }, { status: 502 });
  }
  const conv = await upstream.json();

  const turns = (conv.transcript ?? []) as Turn[];
  const transcript = turns
    .map((t) => `${t.role ?? "?"}: ${t.message ?? ""}`)
    .join("\n");

  const userOnly = turns
    .filter((t) => t.role === "user")
    .map((t) => `user: ${t.message ?? ""}`)
    .join("\n");

  const extracted = parseTranscript(userOnly);
  const filledCount = Object.values(extracted).filter(Boolean).length;

  const booking = await saveBooking({
    source: filledCount >= 3 ? "voice" : "voice-partial",
    ...extracted,
    rawTranscript: transcript.slice(0, 12000),
    conversationId,
    agentId: conv.agent_id,
    callDurationSecs: conv.metadata?.call_duration_secs ?? conv.call_duration_secs,
    callSummary: conv.analysis?.transcript_summary,
    notes: String((body.notes as string) ?? ""),
    page: "/admin/import-call",
  });

  const mail = await emailBooking(booking);
  return NextResponse.json({ ok: true, id: booking.id, captured: filledCount, mail });
}
