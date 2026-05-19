import { NextResponse } from "next/server";
import { buildLogoutCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.append("Set-Cookie", buildLogoutCookie());
  return res;
}
