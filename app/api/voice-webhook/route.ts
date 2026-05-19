import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { saveBooking, emailBooking } from "@/lib/bookings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ElevenLabs post-call webhook receiver.
 * https://elevenlabs.io/docs/conversational-ai/customization/webhooks
 *
 * Verifies HMAC signature when ELEVENLABS_WEBHOOK_SECRET is set.
 * Extracts booking fields from the transcript via heuristic regex.
 */

function verifySig(secret: string, rawBody: string, signatureHeader: string | null): boolean {
  if (!signatureHeader) return false;
  const parts = signatureHeader.split(",").map((s) => s.trim());
  const tPart = parts.find((p) => p.startsWith("t="));
  const v0Part = parts.find((p) => p.startsWith("v0="));
  if (!tPart || !v0Part) return false;
  const t = tPart.slice(2);
  const v0 = v0Part.slice(3);
  const payload = `${t}.${rawBody}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v0));
}

type Turn = { role?: string; message?: string };

function extractField(transcript: string, patterns: RegExp[]): string {
  for (const p of patterns) {
    const m = transcript.match(p);
    if (m && m[1]) return m[1].trim().replace(/\s+/g, " ").slice(0, 200);
  }
  return "";
}

function parseTranscript(transcript: string) {
  // Best-effort heuristic extraction. The agent typically asks in order:
  // name, phone, email, hunt, dates, group size, experience.
  const userLines = transcript;

  const name = extractField(userLines, [
    /my name(?:'s| is)\s+([A-Za-z][A-Za-z .'-]{1,40})/i,
    /(?:i'm|i am)\s+([A-Za-z][A-Za-z .'-]{1,40})/i,
    /this is\s+([A-Za-z][A-Za-z .'-]{1,40})/i,
  ]);

  const phone = extractField(userLines, [
    /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/,
    /(\d{3}[-.\s]\d{3}[-.\s]\d{4})/,
  ]);

  const email = extractField(userLines, [
    /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/,
  ]);

  const hunt = extractField(userLines, [
    /(?:looking to hunt|hunt for|hunting|interested in)\s+(whitetail|wild turkey|turkey|duck|goose|coyote(?:\s*(?:and|&|\/)?\s*fox)?|fox|cottontail|rabbit|crow|deer|charter|fishing)/i,
  ]);

  const dates = extractField(userLines, [
    /(?:dates?|when|date is|date will be|thinking)\s*[:\-]?\s*([A-Za-z0-9 ,/.\-]{4,60})/i,
  ]);

  const groupSize = extractField(userLines, [
    /(\d+)\s+(?:people|hunters|in (?:my|our)?\s*party|of us|guys)/i,
    /(?:group of|party of|just)\s+(\d+)/i,
  ]);

  const experience = extractField(userLines, [
    /(first[- ]?timer|never hunted|new to hunt|beginner|weekend hunter|seasoned|experienced|been hunting (?:for )?\d+ years?)/i,
  ]);

  return { name, phone, email, hunt, dates, groupSize, experience };
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (secret) {
    const sig = request.headers.get("elevenlabs-signature");
    if (!verifySig(secret, rawBody, sig)) {
      return NextResponse.json({ ok: false, error: "invalid signature" }, { status: 401 });
    }
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  // ElevenLabs sends { type, event_timestamp, data: { ... } }
  const data = (payload.data as Record<string, unknown>) ?? payload;

  // Workspace webhooks fire for every convai call across all agents.
  // Only process calls from THIS site's agent.
  const HANK_AGENT_ID = "agent_3601ks09srsnfgmakenr2k7zyve8";
  const agentId =
    (data.agent_id as string | undefined) ??
    ((data.conversation_initiation_client_data as Record<string, unknown> | undefined)?.agent_id as string | undefined);

  if (agentId && agentId !== HANK_AGENT_ID) {
    return NextResponse.json({ ok: true, skipped: "not this agent", agentId });
  }

  const transcript = ((data.transcript as Turn[] | undefined) ?? [])
    .map((t) => `${t.role ?? "?"}: ${t.message ?? ""}`)
    .join("\n");

  // Field extraction
  const extracted = parseTranscript(transcript);

  // Detect partial vs full
  const filledCount = Object.values(extracted).filter(Boolean).length;
  if (filledCount === 0) {
    // Nothing useful captured — store transcript for review but don't email
    await saveBooking({
      source: "voice-partial",
      notes: "Voice call with no extractable booking fields",
      rawTranscript: transcript.slice(0, 8000),
    });
    return NextResponse.json({ ok: true, captured: 0 });
  }

  const booking = await saveBooking({
    source: filledCount >= 3 ? "voice" : "voice-partial",
    ...extracted,
    rawTranscript: transcript.slice(0, 8000),
  });

  const mailResult = await emailBooking(booking);
  return NextResponse.json({ ok: true, id: booking.id, mail: mailResult, captured: filledCount });
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "voice-webhook ready" });
}
