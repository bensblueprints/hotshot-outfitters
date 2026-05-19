import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Award, Compass, Crosshair } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { alt } from "@/lib/alts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Hotshot Outfitters | Michigan Hunting & Charter Fishing Guides",
  description:
    "Hotshot Outfitters is a Port Hope, Michigan guiding outfit with 20+ years of experience running guided hunts and Lake Huron charter fishing trips across Huron County and Michigan's Thumb.",
  alternates: { canonical: `${site.url}/about` },
};

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <Image
          src="/images/michigan-hunting-charter-fishing-outfitter-about.webp"
          alt={alt("michigan-hunting-charter-fishing-outfitter-about.webp")}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/70 via-pine-deep/65 to-pine-deep" />
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-4">
              ABOUT HOTSHOT OUTFITTERS
            </div>
            <h1 className="font-display text-6xl lg:text-8xl tracking-wider leading-[0.95]">
              MICHIGAN OUTFIT.<br />
              <span className="text-ember">MICHIGAN BONES.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 space-y-6 text-mist text-lg leading-relaxed">
          <Reveal>
            <p>
              Hotshot Outfitters is based in Port Hope, Michigan — a working town on the
              Lake Huron shoreline, deep in the heart of Michigan&apos;s Thumb. We run
              full-service guided hunts year-round and Lake Huron charter fishing trips
              once the ice clears the bays.
            </p>
            <p>
              We&apos;ve been doing this for more than twenty years. That&apos;s not a
              marketing line. That&apos;s the actual number of seasons we&apos;ve walked
              these woodlots, sat these blinds, set these decoy spreads, and ran these
              waters. The dirt knows us. The lake knows us. And when you book with us,
              you get the benefit of every one of those seasons.
            </p>
            <h2 className="font-display text-4xl tracking-wider text-bone pt-4">
              WHAT WE GUIDE.
            </h2>
            <p>
              Whitetail deer, wild turkey, duck, goose, coyote and fox, cottontail
              rabbit, and crow — across the fields, marsh edges, and hardwood lots of
              Huron County, Michigan. When Lake Huron opens up, we run charter fishing
              trips out of the Port Hope area. Same outfit. Same standards.
            </p>
            <h2 className="font-display text-4xl tracking-wider text-bone pt-4">
              HOW WE WORK.
            </h2>
            <p>
              Full-service. We handle stand placement, calling, decoying, retrieves,
              boat, electronics, gear — all of it. You bring a valid Michigan hunting or
              fishing license, weather-appropriate clothing, and your own personal
              equipment if you prefer it.
            </p>
            <p>
              We don&apos;t run a high-fence operation. These are real Michigan hunts on
              real Michigan ground. Some days the woods cooperate. Some days they
              don&apos;t. Twenty-plus years has taught us that the only thing we can
              promise is that we&apos;ll put you in the best spot we&apos;ve got and work
              as hard as you do to make it happen.
            </p>
            <h2 className="font-display text-4xl tracking-wider text-bone pt-4">
              WHERE WE HUNT.
            </h2>
            <p>
              Michigan&apos;s Thumb is a stretch of the state that gets quietly overlooked
              by hunters chasing the big-name destinations up north. We think that&apos;s
              a mistake. The combination of working farms, river-bottom hardwoods, marsh
              edges along Lake Huron, and the sheer amount of private ground we&apos;ve
              built relationships with over twenty years makes Huron County one of the
              best-kept secrets in the Great Lakes. We hunt it every season because
              there&apos;s no place we&apos;d rather be.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values strip */}
      <section className="py-16 lg:py-20 bg-pine border-y border-ember/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-3 gap-10">
          {[
            { icon: Award, label: "20+ YEARS", text: "Two decades guiding Michigan hunts and Lake Huron trips. Experience that earns itself." },
            { icon: Compass, label: "MICHIGAN-BORN", text: "Port Hope, Huron County, the Thumb. We don't just hunt here — we live here." },
            { icon: Crosshair, label: "REAL HUNTS", text: "Working farms, woodlots, marsh edges. No high-fence shortcuts." },
          ].map((v, i) => (
            <Reveal key={v.label} delay={i * 0.1}>
              <div className="border-l-2 border-ember pl-6">
                <v.icon size={28} className="text-ember mb-4" />
                <div className="font-display text-3xl tracking-widest mb-3">{v.label}</div>
                <p className="text-mist text-sm leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wider mb-6">
              LET&apos;S TALK.
            </h2>
            <p className="text-mist text-lg max-w-2xl mx-auto mb-8">
              Easiest way to get a feel for the outfit is to pick up the phone. We&apos;ll
              answer your questions and tell you straight whether we&apos;re the right fit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`tel:${site.phone1Tel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ember hover:bg-ember-deep text-bone font-display text-xl tracking-widest transition"
              >
                <Phone size={18} /> {site.phone1}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/40 hover:border-ember hover:bg-ember/10 font-display text-xl tracking-widest transition"
              >
                CONTACT US
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-mist">
              <MapPin size={14} className="text-ember" />
              {site.address.street} · {site.address.city}, {site.address.state} {site.address.zip}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
