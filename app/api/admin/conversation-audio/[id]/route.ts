import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthed(request.headers.get("cookie"))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id || !/^conv_[A-Za-z0-9]+$/.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid id" }, { status: 400 });
  }

  const key = process.env.XI_API_KEY ?? process.env.ELEVENLABS_API_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, error: "XI_API_KEY missing on server" },
      { status: 500 }
    );
  }

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversations/${id}/audio`,
    { headers: { "xi-api-key": key } }
  );

  if (!upstream.ok) {
    return NextResponse.json(
      { ok: false, error: `ElevenLabs ${upstream.status}` },
      { status: upstream.status }
    );
  }

  const blob = await upstream.arrayBuffer();
  return new Response(blob, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "audio/mpeg",
      "Cache-Control": "private, max-age=300",
    },
  });
}
