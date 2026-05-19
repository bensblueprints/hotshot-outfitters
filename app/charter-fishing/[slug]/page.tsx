import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { PhotoGrid } from "@/components/PhotoGrid";
import { JsonLd } from "@/components/JsonLd";
import { VideoHero } from "@/components/VideoHero";
import { BookingForm } from "@/components/BookingForm";
import { alt, huntImages } from "@/lib/alts";
import { charters, site } from "@/lib/site";
import { getFishingContent } from "@/lib/content";

export function generateStaticParams() {
  return charters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const charter = charters.find((c) => c.slug === slug);
  if (!charter) return {};
  const content = await getFishingContent(slug);

  const title = content?.title ?? `${charter.species} Fishing Charters in Michigan | Hotshot Outfitters`;
  const description =
    content?.description ??
    `Guided ${charter.species.toLowerCase()} fishing charters on Lake Huron out of Port Hope, Michigan with Hotshot Outfitters.`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/charter-fishing/${slug}` },
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/images/${charter.imagePrefix}-${String(charter.imageIndex).padStart(2, "0")}.webp`,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
  };
}

export default async function CharterDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const charter = charters.find((c) => c.slug === slug);
  if (!charter) notFound();

  const content = await getFishingContent(slug);
  const allFishingImages = huntImages("michigan-charter-fishing-lake-huron", 10);
  const heroImage =
    allFishingImages[(charter.imageIndex - 1) % allFishingImages.length] ?? allFishingImages[0];
  const galleryImages = allFishingImages.slice(0, 6);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${charter.species} Fishing Charters in Michigan | Hotshot Outfitters`,
    description: content?.description ?? "",
    image: `${site.url}/images/${heroImage}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/charter-fishing/${slug}`,
    about: `${charter.species} fishing on Lake Huron, Michigan`,
  };

  return (
    <>
      <JsonLd data={article} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <Image
          src={`/images/${heroImage}`}
          alt={alt(heroImage)}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50 animate-slowzoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pine-deep/70 via-pine-deep/60 to-pine-deep" />
        <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
          <Reveal>
            <Link
              href="/charter-fishing"
              className="text-ember text-xs tracking-[0.4em] font-display inline-flex items-center gap-2 hover:text-bone transition mb-5"
            >
              ← ALL CHARTER FISHING
            </Link>
            <h1 className="font-display text-6xl lg:text-8xl tracking-wider leading-[0.95]">
              {charter.title.toUpperCase()}<br />
              <span className="text-ember">CHARTER FISHING.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist leading-relaxed">{charter.short}</p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs tracking-[0.3em] text-mist">
              <MapPin size={12} className="text-ember" />
              PORT HOPE · LAKE HURON · MICHIGAN&apos;S THUMB
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
              Full details coming soon. Call{" "}
              <a className="text-ember underline" href={`tel:${site.phone1Tel}`}>
                {site.phone1}
              </a>{" "}
              to book.
            </p>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24 bg-pine border-y border-ember/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="text-ember text-xs tracking-[0.4em] font-display mb-3">
              ON THE WATER
            </div>
            <h2 className="font-display text-4xl lg:text-5xl tracking-wider mb-10">
              LAKE HURON <span className="text-ember">— {charter.title.toUpperCase()}.</span>
            </h2>
          </Reveal>
          <PhotoGrid images={galleryImages} columns={3} />
        </div>
      </section>

      {/* Booking form */}
      <BookingForm
        defaultHunt={`${charter.title} Charter Fishing`}
        page={`/charter-fishing/${slug}`}
        title={`BOOK YOUR ${charter.title.toUpperCase()} DAY.`}
        kicker={`LAKE HURON ${charter.species.toUpperCase()}`}
      />

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-ember/10">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-5xl lg:text-7xl tracking-wider mb-6">
              CALL TO LOCK IN A DATE.
            </h2>
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
