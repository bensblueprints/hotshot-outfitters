import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { alt } from "@/lib/alts";
import { hunts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guided Hunts in Michigan | Whitetail, Turkey, Waterfowl, Predator & Small Game",
  description:
    "Hotshot Outfitters runs guided hunts across Michigan's Thumb — whitetail deer, wild turkey, duck, goose, coyote & fox, cottontail rabbit, and crow. Full-service outfitter in Port Hope, Michigan.",
  alternates: { canonical: `${site.url}/hunts` },
};

export default function HuntsHub() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guided Hunts in Michigan",
    itemListElement: hunts.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${h.species} Hunting in Michigan`,
      url: `${site.url}/hunts/${h.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />

      {/* Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <Image
          src="/images/michigan-hunting-whitetail-deer-michigan-04.webp"
          alt={alt("michigan-hunting-whitetail-deer-michigan-04.webp")}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/80 via-pine-deep/70 to-pine-deep" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-4">
              MICHIGAN GUIDED HUNTS
            </div>
            <h1 className="font-display text-6xl lg:text-8xl tracking-wider leading-[0.95] max-w-4xl">
              GUIDED HUNTS IN<br /><span className="text-ember">MICHIGAN&apos;S THUMB.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist leading-relaxed">
              Seven hunts. One outfitter. Twenty-plus years of dirt time across Huron County.
              Pick your game — we&apos;ll handle the rest.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Hunts grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hunts.map((h, i) => (
              <Reveal key={h.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/hunts/${h.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src={`/images/${h.imagePrefix}-${h.slug === "crow" ? "01" : "02"}.webp`}
                    alt={alt(`${h.imagePrefix}-${h.slug === "crow" ? "01" : "02"}.webp`)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/40 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-bone/0 group-hover:ring-ember transition" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <div className="text-ember text-[10px] tracking-[0.4em] font-display mb-2">
                      GUIDED HUNT
                    </div>
                    <h2 className="font-display text-4xl tracking-wider text-bone group-hover:text-ember transition text-shadow-strong">
                      {h.title}
                    </h2>
                    <p className="mt-2 text-mist text-sm leading-snug">{h.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-ember/10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider mb-6">
              NOT SURE WHICH HUNT?
            </h2>
            <p className="text-mist text-lg max-w-2xl mx-auto mb-8">
              Call us. We&apos;ll talk through what&apos;s in season, what&apos;s on the move,
              and which Michigan hunt fits the dates you&apos;ve got open.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`tel:${site.phone1Tel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ember hover:bg-ember-deep text-bone font-display text-xl tracking-widest transition"
              >
                <Phone size={18} /> {site.phone1}
              </a>
              <a
                href={`tel:${site.phone2Tel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/40 hover:border-ember hover:bg-ember/10 font-display text-xl tracking-widest transition"
              >
                <Phone size={18} /> {site.phone2}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
