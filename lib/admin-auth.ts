import crypto from "node:crypto";

const COOKIE_NAME = "hsoadmin";
const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "change-me-in-env-vars";
}

function sign(token: string): string {
  const secret = getSecret();
  const hmac = crypto.createHmac("sha256", secret).update(token).digest("hex");
  return `${token}.${hmac}`;
}

function verifySignedToken(signed: string): { ok: true; ts: number } | { ok: false } {
  const idx = signed.lastIndexOf(".");
  if (idx <= 0) return { ok: false };
  const token = signed.slice(0, idx);
  const sig = signed.slice(idx + 1);
  const expected = crypto
    .createHmac("sha256", getSecret())
    .update(token)
    .digest("hex");
  if (sig.length !== expected.length) return { ok: false };
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return { ok: false };
  const ts = Number(token);
  if (!Number.isFinite(ts)) return { ok: false };
  const ageSec = (Date.now() - ts) / 1000;
  if (ageSec < 0 || ageSec > MAX_AGE_SECONDS) return { ok: false };
  return { ok: true, ts };
}

export function checkPassword(password: string): boolean {
  const expected = getSecret();
  if (!expected || expected.length === 0) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function buildLoginCookie(): string {
  const token = Date.now().toString();
  const signed = sign(token);
  const attrs = [
    `${COOKIE_NAME}=${encodeURIComponent(signed)}`,
    "Path=/",
    `Max-Age=${MAX_AGE_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ];
  return attrs.join("; ");
}

export function buildLogoutCookie(): string {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

export function isAuthed(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const pairs = cookieHeader.split(";").map((s) => s.trim());
  for (const p of pairs) {
    const eq = p.indexOf("=");
    if (eq <= 0) continue;
    const k = p.slice(0, eq);
    if (k !== COOKIE_NAME) continue;
    const raw = decodeURIComponent(p.slice(eq + 1));
    return verifySignedToken(raw).ok;
  }
  return false;
}
