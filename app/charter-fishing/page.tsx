import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Ship, Compass, Sun, Calendar } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PhotoGrid } from "@/components/PhotoGrid";
import { JsonLd } from "@/components/JsonLd";
import { BookingForm } from "@/components/BookingForm";
import { alt, huntImages } from "@/lib/alts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lake Huron Charter Fishing | Port Hope, Michigan | Hotshot Outfitters",
  description:
    "Lake Huron charter fishing out of Port Hope, Michigan with Hotshot Outfitters. Walleye, salmon, trout and more along Michigan's Thumb in Huron County. Book your charter today.",
  alternates: { canonical: `${site.url}/charter-fishing` },
};

export default function CharterFishing() {
  const images = huntImages("michigan-charter-fishing-lake-huron", 10);

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Lake Huron Charter Fishing",
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phone1,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "Place", name: "Lake Huron" },
      { "@type": "AdministrativeArea", name: "Huron County, Michigan" },
    ],
    description:
      "Guided charter fishing on Lake Huron out of Port Hope, Michigan. Seasonal trips on Michigan's Thumb.",
  };

  return (
    <>
      <JsonLd data={service} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <Image
          src={`/images/${images[0]}`}
          alt={alt(images[0])}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 animate-slowzoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/70 via-pine-deep/60 to-pine-deep" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-4">
              LAKE HURON · MICHIGAN&apos;S THUMB
            </div>
            <h1 className="font-display text-6xl lg:text-8xl tracking-wider leading-[0.95] max-w-4xl">
              CHARTER FISHING<br />
              <span className="text-ember">ON LAKE HURON.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist leading-relaxed">
              Once the ice gives up the lake, Hotshot Outfitters runs guided charter trips
              out of Port Hope, Michigan — chasing the big-water fish that make Lake Huron
              one of the Great Lakes&apos; best-kept secrets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8 space-y-5 text-mist text-lg leading-relaxed">
          <Reveal>
            <p>
              Lake Huron sits right outside our front door. Port Hope is a working
              fishing town tucked into the eastern shore of Michigan&apos;s Thumb — the kind
              of place where the lake decides what kind of day you&apos;re having. When the
              ice melts and the bays open back up, Hotshot Outfitters trades blinds for
              the boat and runs guided charter fishing trips on Huron.
            </p>
            <p>
              We&apos;re a full-service Michigan charter fishing operation: gear&apos;s on
              board, rods are rigged, electronics are dialed in. You bring a license, a
              cooler, and whatever luck you packed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-12 lg:py-16 bg-pine border-y border-ember/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
              ON THE WATER
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-wider mb-10">
              LAKE HURON <span className="text-ember">FISH STORIES.</span>
            </h2>
          </Reveal>
          <PhotoGrid images={images} columns={4} />
        </div>
      </section>

      {/* Details */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Calendar, title: "Season", body: "Charter trips run once the ice clears Lake Huron — typically spring through late fall. Call for current openings." },
            { icon: Ship, title: "Full-Service Boat", body: "Rods, reels, tackle, electronics, bait — all on board. You bring a license and what you want to wear." },
            { icon: Compass, title: "Lake Huron Waters", body: "Departing from the Port Hope area on Michigan's Thumb. Open-water trolling and structure fishing depending on the bite." },
            { icon: Sun, title: "Group Trips", body: "Couples, buddy trips, family runs — call us with your group size and we'll size the day to it." },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="border-l-2 border-ember pl-5">
                <b.icon className="text-ember mb-3" size={26} />
                <div className="font-display text-2xl tracking-widest mb-2">{b.title.toUpperCase()}</div>
                <p className="text-mist text-sm leading-relaxed">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Booking form */}
      <BookingForm
        defaultHunt="Charter Fishing"
        page="/charter-fishing"
        title="BOOK A LAKE HURON DAY."
        kicker="MICHIGAN CHARTER FISHING"
      />

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-ember/10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wider mb-6">
              CALL TO LOCK IN YOUR DATES.
            </h2>
            <p className="text-mist text-lg max-w-2xl mx-auto mb-8">
              Charter dates fill quickly once the lake opens. Call to lock in.
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
