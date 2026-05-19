import { getStore } from "@netlify/blobs";
import { Resend } from "resend";

export type BookingSource = "form" | "voice" | "voice-partial";

export interface Booking {
  id: string;
  source: BookingSource;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  hunt: string;
  dates: string;
  groupSize: string;
  experience: string;
  notes: string;
  page: string;
  rawTranscript?: string;
  conversationId?: string;
  agentId?: string;
  callDurationSecs?: number;
  callSummary?: string;
}

function newId() {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${t}-${r}`;
}

function bookingsStore() {
  return getStore({ name: "bookings", consistency: "strong" });
}

export async function saveBooking(input: Partial<Booking> & { source: BookingSource; page?: string }): Promise<Booking> {
  const booking: Booking = {
    id: newId(),
    source: input.source,
    createdAt: new Date().toISOString(),
    name: (input.name ?? "").trim(),
    phone: (input.phone ?? "").trim(),
    email: (input.email ?? "").trim(),
    hunt: (input.hunt ?? "").trim(),
    dates: (input.dates ?? "").trim(),
    groupSize: (input.groupSize ?? "").trim(),
    experience: (input.experience ?? "").trim(),
    notes: (input.notes ?? "").trim(),
    page: input.page ?? "",
    rawTranscript: input.rawTranscript,
    conversationId: input.conversationId,
    agentId: input.agentId,
    callDurationSecs: input.callDurationSecs,
    callSummary: input.callSummary,
  };

  const store = bookingsStore();
  // primary record
  await store.setJSON(booking.id, booking);
  // index entry sorted reverse-chronologically by id prefix (base36 timestamp sorts)
  await store.setJSON(`idx/${booking.id}`, { id: booking.id, createdAt: booking.createdAt, name: booking.name, hunt: booking.hunt });

  return booking;
}

export async function listBookings(limit = 200): Promise<Booking[]> {
  const store = bookingsStore();
  // list all keys NOT under idx/
  const { blobs } = await store.list();
  const keys = blobs
    .map((b) => b.key)
    .filter((k) => !k.startsWith("idx/"))
    .sort()
    .reverse()
    .slice(0, limit);

  const results: Booking[] = [];
  for (const k of keys) {
    const b = await store.get(k, { type: "json" });
    if (b) results.push(b as Booking);
  }
  return results;
}

export async function getBooking(id: string): Promise<Booking | null> {
  const store = bookingsStore();
  const b = await store.get(id, { type: "json" });
  return (b as Booking) ?? null;
}

const ADMIN_RECIPIENT =
  process.env.BOOKING_NOTIFY_EMAIL ?? "ben@advancedmarketing.co";
const FROM_ADDRESS =
  process.env.BOOKING_FROM_EMAIL ?? "Hotshot Outfitters <bookings@advancedmarketing.co>";

export async function emailBooking(booking: Booking): Promise<{ sent: boolean; reason?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { sent: false, reason: "no RESEND_API_KEY set" };
  }
  try {
    const resend = new Resend(key);
    const subject =
      booking.source === "voice"
        ? `New voice-agent booking lead — ${booking.name || "unknown"} (${booking.hunt || "?"})`
        : `New booking request — ${booking.name || "unknown"} (${booking.hunt || "?"})`;

    const lines = [
      `Source: ${booking.source}`,
      `When: ${booking.createdAt}`,
      ``,
      `Name: ${booking.name}`,
      `Phone: ${booking.phone}`,
      `Email: ${booking.email}`,
      `Hunt: ${booking.hunt}`,
      `Dates: ${booking.dates}`,
      `Group size: ${booking.groupSize}`,
      `Experience: ${booking.experience}`,
      booking.notes ? `Notes: ${booking.notes}` : "",
      booking.page ? `Submitted from: ${booking.page}` : "",
      ``,
      booking.rawTranscript ? `--- Voice call transcript ---\n${booking.rawTranscript}` : "",
    ].filter(Boolean);

    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_RECIPIENT,
      replyTo: booking.email || undefined,
      subject,
      text: lines.join("\n"),
    });
    return { sent: true };
  } catch (e) {
    return { sent: false, reason: (e as Error).message };
  }
}
