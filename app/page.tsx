import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Compass, Crosshair, Ship, Award } from "lucide-react";
import { CategoryTile } from "@/components/CategoryTile";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { VideoHero } from "@/components/VideoHero";
import { alt } from "@/lib/alts";
import { hunts, site } from "@/lib/site";

export default function Home() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction"],
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone1,
    image: `${site.url}/images/michigan-guided-hunting-hero-tile.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "State", name: "Michigan" },
      { "@type": "AdministrativeArea", name: "Huron County, Michigan" },
      { "@type": "Place", name: "Michigan's Thumb" },
      { "@type": "Place", name: "Lake Huron" },
    ],
    priceRange: "$$",
    sameAs: [site.url],
  };

  return (
    <>
      <JsonLd data={localBusiness} />

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden grain">
        <VideoHero
          src="/videos/hero-montage.mp4"
          poster="/images/michigan-hunting-whitetail-deer-michigan-08.webp"
          overlayClass="bg-gradient-to-t from-pine-deep via-pine-deep/60 to-pine-deep/30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pine-deep/80 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl w-full px-5 lg:px-8 pb-20 lg:pb-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-ember" />
              <span className="text-ember text-xs tracking-[0.4em] font-display">
                PORT HOPE · HURON COUNTY · MICHIGAN
              </span>
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider text-bone leading-[0.92] text-shadow-strong">
              MICHIGAN GUIDED HUNTS<br />
              <span className="text-ember">LAKE HURON CHARTERS.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-mist leading-relaxed text-shadow-strong">
              Twenty-plus years guiding hunters and anglers across Michigan&apos;s Thumb.
              Whitetail, turkey, waterfowl, predator, small-game — and big-water charters
              when the ice gives up Lake Huron.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${site.phone1Tel}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ember hover:bg-ember-deep text-bone font-display text-xl tracking-widest transition"
              >
                <Phone size={18} /> {site.phone1}
              </a>
              <Link
                href="/hunts"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/40 hover:border-ember hover:bg-ember/10 text-bone font-display text-xl tracking-widest transition"
              >
                BROWSE HUNTS
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 hidden lg:flex flex-col items-end text-xs text-mist tracking-widest">
          <div className="h-12 w-px bg-mist/40 mb-2" />
          SCROLL
        </div>
      </section>

      {/* TWO CATEGORY TILES */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
              <div>
                <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
                  PICK YOUR ADVENTURE
                </div>
                <h2 className="font-display text-5xl lg:text-6xl tracking-wider">
                  TWO WAYS TO ROLL.
                </h2>
              </div>
              <p className="max-w-md text-mist text-base leading-relaxed">
                Hotshot Outfitters runs full-service guided hunts year-round and Lake Huron
                charter trips once the ice opens up. Same outfit. Same standards.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            <CategoryTile
              index={0}
              href="/hunts"
              title="GUIDED HUNTS"
              kicker="YEAR-ROUND"
              image="michigan-guided-hunting-hero-tile.webp"
            />
            <CategoryTile
              index={1}
              href="/charter-fishing"
              title="CHARTER FISHING"
              kicker="LAKE HURON · SEASONAL"
              image="michigan-charter-fishing-hero-tile.webp"
            />
          </div>
        </div>
      </section>

      {/* HUNT LINEUP STRIP */}
      <section className="relative py-20 lg:py-28 border-t border-ember/10 bg-pine">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
              THE LINEUP
            </div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider mb-10">
              SEVEN MICHIGAN HUNTS.<br /><span className="text-ember">ONE OUTFITTER.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hunts.map((h, i) => (
              <Reveal key={h.slug} delay={i * 0.06}>
                <Link
                  href={`/hunts/${h.slug}`}
                  className="group relative block aspect-square overflow-hidden"
                >
                  <Image
                    src={`/images/${h.imagePrefix}-01.webp`}
                    alt={alt(`${h.imagePrefix}-01.webp`)}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/30 to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-bone/0 group-hover:ring-ember transition" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="font-display text-2xl tracking-wider text-bone group-hover:text-ember transition">
                      {h.title}
                    </div>
                    <div className="text-mist text-xs leading-snug mt-1 line-clamp-2">
                      {h.short}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div className="mt-10 flex justify-center">
              <Link
                href="/hunts"
                className="inline-flex items-center gap-3 px-7 py-4 border border-bone/40 hover:border-ember hover:bg-ember/10 font-display text-xl tracking-widest transition"
              >
                ALL MICHIGAN HUNTS <span className="text-ember">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-3 gap-10">
          {[
            { icon: Award, label: "20+ YEARS", text: "Two decades guiding hunters and anglers across Michigan's Thumb. The dirt knows us." },
            { icon: Compass, label: "FULL-SERVICE", text: "Stand placement, decoy spreads, calls, retrieves. You bring the license — we bring everything else." },
            { icon: Crosshair, label: "REAL HUNTS", text: "Working farms, hardwood lots, marsh edges. No high-fence operations, no shortcuts." },
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

      {/* ABOUT SLIVER */}
      <section className="relative py-20 lg:py-32 bg-pine border-y border-ember/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/michigan-hunting-charter-fishing-outfitter-about.webp"
                alt={alt("michigan-hunting-charter-fishing-outfitter-about.webp")}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-ember/30" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-4">
              WHO WE ARE
            </div>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider mb-6">
              MICHIGAN OUTFIT.<br /><span className="text-ember">MICHIGAN BONES.</span>
            </h2>
            <div className="space-y-4 text-mist text-base leading-relaxed">
              <p>
                Hotshot Outfitters is a family-built guiding business out of Port Hope,
                Michigan — right on the Lake Huron shoreline in the heart of Michigan&apos;s
                Thumb. We&apos;ve been chasing whitetail, turkey, waterfowl, predator and
                small-game across this stretch of farm-and-woodlot country for more than
                two decades.
              </p>
              <p>
                When the lake softens up, we trade the blinds for the boat and run charter
                fishing trips on Huron. Same outfit. Same eye for putting clients on game.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-3 font-display text-lg tracking-widest text-ember hover:text-bone transition"
            >
              MORE ABOUT US <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image
          src="/images/michigan-hunting-canada-goose-michigan-04.webp"
          alt={alt("michigan-hunting-canada-goose-michigan-04.webp")}
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep via-pine-deep/85 to-pine-deep" />
        <div className="relative mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-5">
              BOOK YOUR MICHIGAN HUNT
            </div>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wider mb-8">
              READY TO ROLL?
            </h2>
            <p className="text-mist text-lg max-w-2xl mx-auto mb-10">
              Call or text — we&apos;ll talk you through what&apos;s in season, what&apos;s flying,
              and what dates we have left. No web forms, no robot. Just pick up the phone.
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
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/40 hover:border-ember hover:bg-ember/10 text-bone font-display text-xl tracking-widest transition"
              >
                <Phone size={18} /> {site.phone2}
              </a>
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
