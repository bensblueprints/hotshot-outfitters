"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr(data.error ?? "Sign-in failed");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setErr("Network error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <label className="text-xs tracking-[0.3em] text-mist font-display">PASSWORD</label>
      <input
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-3 py-3 bg-pine-deep border border-ember/30 focus:border-ember focus:outline-none text-bone"
      />
      {err && <div className="text-sm text-blaze">{err}</div>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 px-5 py-3 bg-ember hover:bg-ember-deep disabled:opacity-60 text-bone font-display tracking-widest transition"
      >
        {submitting ? "SIGNING IN…" : "SIGN IN"}
      </button>
    </form>
  );
}
