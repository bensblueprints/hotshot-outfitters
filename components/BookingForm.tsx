"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { hunts, site } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "error";

export function BookingForm({
  defaultHunt,
  page,
  title = "REQUEST A BOOKING.",
  kicker = "BOOK YOUR HUNT",
}: {
  defaultHunt?: string;
  page: string;
  title?: string;
  kicker?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      email: data.get("email"),
      hunt: data.get("hunt"),
      dates: data.get("dates"),
      groupSize: data.get("groupSize"),
      experience: data.get("experience"),
      notes: data.get("notes"),
      page,
      _gotcha: data.get("_gotcha"),
    };

    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await r.json();
      if (!r.ok || !json.ok) {
        throw new Error(json.error ?? "Submission failed");
      }
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError((err as Error).message);
    }
  }

  return (
    <section className="relative py-20 lg:py-28 border-t border-ember/10 bg-pine">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
            {kicker}
          </div>
          <h2 className="font-display text-4xl lg:text-5xl tracking-wider mb-3">
            {title}
          </h2>
          <p className="text-mist text-base leading-relaxed mb-8 max-w-xl">
            Let us know what you&apos;re after. The guide will call you back the
            same day with available dates and what to expect.
          </p>
        </motion.div>

        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-ember/40 bg-pine-deep p-8 flex items-start gap-4"
          >
            <CheckCircle2 className="text-ember shrink-0 mt-0.5" size={26} />
            <div>
              <div className="font-display text-2xl tracking-wider mb-2">
                REQUEST RECEIVED.
              </div>
              <p className="text-mist text-sm leading-relaxed">
                We&apos;ve got your details and the guide will be in touch
                today. If you want to skip ahead, give us a call at{" "}
                <a className="text-ember underline" href={`tel:${site.phone1Tel}`}>
                  {site.phone1}
                </a>
                .
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <Field label="Your name" name="name" required />
            <Field label="Phone" name="phone" type="tel" required />

            <Field label="Email" name="email" type="email" className="sm:col-span-2" />

            <SelectField label="Which hunt" name="hunt" defaultValue={defaultHunt}>
              <option value="">Select a hunt...</option>
              {hunts.map((h) => (
                <option key={h.slug} value={h.title}>
                  {h.title}
                </option>
              ))}
              <option value="Charter Fishing">Charter Fishing (Lake Huron)</option>
              <option value="Not sure">Not sure yet</option>
            </SelectField>

            <Field label="Preferred dates" name="dates" placeholder="e.g. mid-November or specific dates" />

            <Field label="Group size" name="groupSize" type="number" min="1" max="20" placeholder="How many in your party" />

            <SelectField label="Hunting experience" name="experience">
              <option value="">Pick one...</option>
              <option>First-timer</option>
              <option>Weekend hunter</option>
              <option>Seasoned</option>
            </SelectField>

            <TextareaField
              label="Anything else we should know?"
              name="notes"
              className="sm:col-span-2"
              placeholder="Specific game wanted, mobility considerations, lodging needs, etc."
            />

            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-7 py-4 bg-ember hover:bg-ember-deep disabled:opacity-60 text-bone font-display text-lg tracking-widest transition"
              >
                {status === "submitting" ? "SENDING…" : "REQUEST BOOKING →"}
              </button>
              <a
                href={`tel:${site.phone1Tel}`}
                className="inline-flex items-center gap-2 px-5 py-3 border border-bone/30 hover:border-ember hover:bg-ember/10 text-bone font-display tracking-widest text-sm transition"
              >
                <Phone size={14} /> OR CALL {site.phone1}
              </a>
            </div>

            {error && (
              <div className="sm:col-span-2 flex items-start gap-2 text-blaze text-sm">
                <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
              </div>
            )}

            <p className="sm:col-span-2 text-xs text-mist/70 leading-relaxed">
              We&apos;ll get back to you the same day. Your info goes straight to the
              outfitter — no spam list, no resale.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  className = "",
  placeholder,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[11px] tracking-[0.25em] text-mist font-display">
        {label.toUpperCase()}
        {required && <span className="text-ember"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className="px-3 py-3 bg-pine-deep border border-ember/20 focus:border-ember focus:outline-none text-bone placeholder:text-mist/40"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  defaultValue,
  className = "",
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[11px] tracking-[0.25em] text-mist font-display">
        {label.toUpperCase()}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="px-3 py-3 bg-pine-deep border border-ember/20 focus:border-ember focus:outline-none text-bone"
      >
        {children}
      </select>
    </label>
  );
}

function TextareaField({
  label,
  name,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[11px] tracking-[0.25em] text-mist font-display">
        {label.toUpperCase()}
      </span>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        className="px-3 py-3 bg-pine-deep border border-ember/20 focus:border-ember focus:outline-none text-bone placeholder:text-mist/40 resize-none"
      />
    </label>
  );
}
