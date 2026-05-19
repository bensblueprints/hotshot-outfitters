import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PhotoGrid } from "@/components/PhotoGrid";
import { JsonLd } from "@/components/JsonLd";
import { VideoHero } from "@/components/VideoHero";
import { BookingForm } from "@/components/BookingForm";
import { alt, huntImages } from "@/lib/alts";
import { hunts, site } from "@/lib/site";
import { getHuntContent } from "@/lib/content";

export function generateStaticParams() {
  return hunts.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hunt = hunts.find((h) => h.slug === slug);
  if (!hunt) return {};
  const content = await getHuntContent(slug);

  const title = content?.title ?? `${hunt.species} Hunting in Michigan | Hotshot Outfitters`;
  const description =
    content?.description ??
    `Guided ${hunt.species} hunting in Michigan with Hotshot Outfitters — Port Hope, Huron County, Michigan's Thumb. 20+ years of guided hunts in Michigan.`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/hunts/${slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: `/images/${hunt.imagePrefix}-01.webp`, width: 1200, height: 630 }],
      type: "article",
    },
  };
}

export default async function HuntDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hunt = hunts.find((h) => h.slug === slug);
  if (!hunt) notFound();

  const content = await getHuntContent(slug);
  const images = huntImages(hunt.imagePrefix, hunt.imageCount);
  const heroImage = images[0];

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${hunt.species} Hunting in Michigan | Guided Hunts with Hotshot Outfitters`,
    description: content?.description ?? `Guided ${hunt.species} hunting in Michigan with Hotshot Outfitters.`,
    image: `${site.url}/images/${heroImage}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/hunts/${slug}`,
    about: `${hunt.species} hunting in Michigan`,
  };

  return (
    <>
      <JsonLd data={article} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        {hunt.video ? (
          <VideoHero
            src={hunt.video}
            poster={`/images/${heroImage}`}
            overlayClass="bg-gradient-to-b from-pine-deep/70 via-pine-deep/65 to-pine-deep"
          />
        ) : (
          <Image
            src={`/images/${heroImage}`}
            alt={alt(heroImage)}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
        {!hunt.video && (
          <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/70 via-pine-deep/70 to-pine-deep" />
        )}
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <Link
              href="/hunts"
              className="text-ember text-xs tracking-[0.4em] font-display inline-flex items-center gap-2 hover:text-bone transition mb-5"
            >
              ← ALL MICHIGAN HUNTS
            </Link>
            <h1 className="font-display text-6xl lg:text-8xl tracking-wider leading-[0.95]">
              {hunt.title.toUpperCase()}<br />
              <span className="text-ember">HUNTING IN MICHIGAN.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist leading-relaxed">{hunt.short}</p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-mist">
              <MapPin size={12} className="text-ember" />
              PORT HOPE · HURON COUNTY · MICHIGAN&apos;S THUMB
            </div>
          </Reveal>
        </div>
      </section>

      {/* Long-form SEO content */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          {content?.html ? (
            <article
              className="hunt-prose"
              dangerouslySetInnerHTML={{ __html: content.html }}
            />
          ) : (
            <p className="text-mist">
              Full details on this Michigan hunt are coming soon. Call{" "}
              <a className="text-ember underline" href={`tel:${site.phone1Tel}`}>
                {site.phone1}
              </a>{" "}
              to book.
            </p>
          )}
        </div>
      </section>

      {/* Photo gallery */}
      {images.length > 1 && (
        <section className="py-16 lg:py-24 bg-pine border-y border-ember/10">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
                FROM THE FIELD
              </div>
              <h2 className="font-display text-4xl lg:text-5xl tracking-wider mb-10">
                {hunt.title.toUpperCase()} <span className="text-ember">— MICHIGAN.</span>
              </h2>
            </Reveal>
            <PhotoGrid images={images} columns={3} />
          </div>
        </section>
      )}

      {/* Booking form */}
      <BookingForm
        defaultHunt={hunt.title}
        page={`/hunts/${slug}`}
        title={`BOOK YOUR ${hunt.title.toUpperCase()} HUNT.`}
        kicker={`MICHIGAN ${hunt.species.toUpperCase()} HUNT`}
      />

      {/* Other hunts */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
              MORE MICHIGAN HUNTS
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-wider mb-10">
              KEEP EXPLORING.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {hunts.filter(h => h.slug !== slug).map((h) => (
              <Link
                key={h.slug}
                href={`/hunts/${h.slug}`}
                className="group relative block aspect-square overflow-hidden"
              >
                <Image
                  src={`/images/${h.imagePrefix}-01.webp`}
                  alt={alt(`${h.imagePrefix}-01.webp`)}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="font-display text-lg tracking-wider text-bone group-hover:text-ember transition leading-tight">
                    {h.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-ember/10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wider mb-6">
              BOOK YOUR {hunt.title.toUpperCase()} HUNT.
            </h2>
            <p className="text-mist text-lg max-w-2xl mx-auto mb-8">
              Call or text — we&apos;ll walk you through dates, what&apos;s in season,
              and what to bring. Real conversation, no web forms.
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
