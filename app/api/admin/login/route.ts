import { NextResponse } from "next/server";
import { checkPassword, buildLoginCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const password = String(body.password ?? "");
  if (!password) {
    return NextResponse.json({ ok: false, error: "Password required" }, { status: 400 });
  }
  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", buildLoginCookie());
  return res;
}
