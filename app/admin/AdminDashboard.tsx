"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCcw, Phone, Mail } from "lucide-react";
import type { Booking } from "@/lib/bookings";

export function AdminDashboard({ initialBookings }: { initialBookings: Booking[] }) {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const r = await fetch("/api/admin/bookings", { cache: "no-store" });
      const data = await r.json();
      if (data.ok) setBookings(data.bookings as Booking[]);
    } finally {
      setRefreshing(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <section className="px-5 lg:px-8 py-12 lg:py-16 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
        <div>
          <div className="text-ember text-xs tracking-[0.4em] font-display mb-2">ADMIN</div>
          <h1 className="font-display text-4xl lg:text-5xl tracking-wider">
            BOOKING <span className="text-ember">REQUESTS.</span>
          </h1>
          <p className="text-mist text-sm mt-2">
            {bookings.length} record{bookings.length === 1 ? "" : "s"} on file
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 border border-ember/40 hover:border-ember hover:bg-ember/10 text-bone font-display tracking-widest text-sm transition"
          >
            <RefreshCcw size={14} className={refreshing ? "animate-spin" : ""} />
            REFRESH
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 border border-bone/20 hover:border-bone/60 text-mist hover:text-bone font-display tracking-widest text-sm transition"
          >
            <LogOut size={14} /> SIGN OUT
          </button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="border border-ember/20 p-10 text-center text-mist">
          No booking requests yet. They&apos;ll show up here as soon as someone submits a form or finishes a call with Hank.
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <article key={b.id} className="border border-ember/20 bg-pine p-5 lg:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={
                        "text-[10px] tracking-widest font-display px-2 py-0.5 " +
                        (b.source === "voice"
                          ? "bg-ember text-bone"
                          : b.source === "voice-partial"
                          ? "bg-ember/30 text-bone"
                          : "bg-pine-deep border border-ember/40 text-ember")
                      }
                    >
                      {b.source.toUpperCase()}
                    </span>
                    <span className="text-xs text-mist">
                      {new Date(b.createdAt).toLocaleString("en-US", {
                        timeZone: "America/Detroit",
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <div className="font-display text-2xl tracking-wider">
                    {b.name || <span className="text-mist italic">(no name)</span>}
                  </div>
                  <div className="text-sm text-mist mt-1 flex flex-wrap gap-3">
                    {b.phone && (
                      <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 text-ember hover:text-bone">
                        <Phone size={12} /> {b.phone}
                      </a>
                    )}
                    {b.email && (
                      <a href={`mailto:${b.email}`} className="inline-flex items-center gap-1 text-ember hover:text-bone">
                        <Mail size={12} /> {b.email}
                      </a>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-sm">
                  <Field label="Hunt" value={b.hunt} />
                  <Field label="Dates" value={b.dates} />
                  <Field label="Group" value={b.groupSize} />
                  <Field label="Experience" value={b.experience} />
                </div>
              </div>
              {b.notes && <div className="mt-3 text-sm text-mist border-t border-ember/10 pt-3">{b.notes}</div>}
              {b.rawTranscript && (
                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-mist hover:text-ember">View call transcript</summary>
                  <pre className="mt-2 whitespace-pre-wrap text-mist/80 bg-pine-deep p-3 border border-ember/10 text-[11px] leading-relaxed">
                    {b.rawTranscript}
                  </pre>
                </details>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-widest text-ember font-display">{label.toUpperCase()}</div>
      <div className="text-bone">{value || <span className="text-mist/50">—</span>}</div>
    </div>
  );
}
