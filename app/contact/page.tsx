import type { Metadata } from "next";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { alt } from "@/lib/alts";

export const metadata: Metadata = {
  title: "Contact Hotshot Outfitters | Book a Michigan Guided Hunt or Charter",
  description:
    "Contact Hotshot Outfitters to book a guided Michigan hunting trip or Lake Huron charter fishing day. Call (989) 551-4551 or (989) 670-4336. Port Hope, Michigan.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function Contact() {
  const contactPoint = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    telephone: [site.phone1, site.phone2],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    url: `${site.url}/contact`,
  };

  return (
    <>
      <JsonLd data={contactPoint} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <Image
          src="/images/michigan-hunting-whitetail-deer-michigan-12.webp"
          alt={alt("michigan-hunting-whitetail-deer-michigan-12.webp")}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/70 via-pine-deep/70 to-pine-deep" />
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-4">
              CONTACT US
            </div>
            <h1 className="font-display text-6xl lg:text-8xl tracking-wider leading-[0.95]">
              PICK UP <br /><span className="text-ember">THE PHONE.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist leading-relaxed">
              No web forms. No bots. Two numbers, one outfitter, and someone on the
              other end who&apos;s probably standing in a corn field right now.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="border border-ember/30 p-8 bg-pine h-full">
              <Phone className="text-ember mb-4" size={28} />
              <div className="text-ember text-xs tracking-[0.4em] font-display mb-2">CALL OR TEXT</div>
              <a
                href={`tel:${site.phone1Tel}`}
                className="block font-display text-4xl tracking-wider text-bone hover:text-ember transition mb-2"
              >
                {site.phone1}
              </a>
              <a
                href={`tel:${site.phone2Tel}`}
                className="block font-display text-3xl tracking-wider text-mist hover:text-ember transition"
              >
                {site.phone2}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-ember/30 p-8 bg-pine h-full">
              <MapPin className="text-ember mb-4" size={28} />
              <div className="text-ember text-xs tracking-[0.4em] font-display mb-2">VISIT</div>
              <div className="font-display text-2xl tracking-wider text-bone leading-snug">
                {site.address.street}<br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </div>
              <div className="mt-4 text-mist text-sm">
                Huron County · Michigan&apos;s Thumb · on the Lake Huron shoreline.
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-ember hover:text-bone transition font-display tracking-widest text-sm"
              >
                OPEN IN MAPS →
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-5xl px-5 lg:px-8 mt-8">
          <Reveal>
            <div className="border border-ember/30 p-8 bg-pine">
              <Clock className="text-ember mb-4" size={26} />
              <div className="text-ember text-xs tracking-[0.4em] font-display mb-2">WHEN TO REACH US</div>
              <p className="text-mist text-base leading-relaxed">
                If we don&apos;t pick up, we&apos;re probably in the woods or on the lake.
                Leave a message or shoot a text — we&apos;ll get back to you the same
                day. Best chance of catching us in person: early morning before legal
                shooting light or late afternoon after the hunt.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-24 border-t border-ember/10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider mb-6">
              READY WHEN YOU ARE.
            </h2>
            <a
              href={`tel:${site.phone1Tel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-ember hover:bg-ember-deep text-bone font-display text-xl tracking-widest transition"
            >
              <Phone size={18} /> CALL {site.phone1}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
