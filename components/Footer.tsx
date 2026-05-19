import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { site, hunts } from "@/lib/site";

// Michigan-state + species SEO link row (per Ben — important for search)
const seoLinks: { label: string; href: string }[] = [
  { label: "Michigan Whitetail Deer Hunting", href: "/hunts/whitetail-deer" },
  { label: "Michigan Wild Turkey Hunting", href: "/hunts/wild-turkey" },
  { label: "Michigan Duck Hunting", href: "/hunts/duck" },
  { label: "Michigan Goose Hunting", href: "/hunts/goose" },
  { label: "Michigan Coyote Hunting", href: "/hunts/coyote-fox" },
  { label: "Michigan Fox Hunting", href: "/hunts/coyote-fox" },
  { label: "Michigan Cottontail Rabbit Hunting", href: "/hunts/cottontail-rabbit" },
  { label: "Michigan Rabbit Hunting", href: "/hunts/cottontail-rabbit" },
  { label: "Michigan Crow Hunting", href: "/hunts/crow" },
  { label: "Michigan Charter Fishing", href: "/charter-fishing" },
  { label: "Lake Huron Charter Fishing", href: "/charter-fishing" },
  { label: "Lake Huron Walleye Fishing", href: "/charter-fishing" },
  { label: "Lake Huron Salmon Fishing", href: "/charter-fishing" },
  { label: "Michigan Hunting Guide", href: "/hunts" },
  { label: "Port Hope Michigan Hunting Guide", href: "/about" },
  { label: "Huron County Michigan Hunting", href: "/hunts" },
  { label: "Michigan's Thumb Hunting Outfitter", href: "/hunts" },
];

export function Footer() {
  return (
    <footer className="relative bg-pine border-t border-ember/30 pt-16 pb-8 mt-24">
      <div className="absolute top-0 inset-x-0 hairline" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-wider mb-3">
            HOTSHOT <span className="text-ember">OUTFITTERS</span>
          </div>
          <p className="text-mist text-sm leading-relaxed max-w-md">
            {site.description}
          </p>
          <div className="mt-6 flex flex-col gap-2 text-sm">
            <a href={`tel:${site.phone1Tel}`} className="flex items-center gap-2 text-bone hover:text-ember transition">
              <Phone size={14} className="text-ember" /> {site.phone1}
            </a>
            <a href={`tel:${site.phone2Tel}`} className="flex items-center gap-2 text-bone hover:text-ember transition">
              <Phone size={14} className="text-ember" /> {site.phone2}
            </a>
            <div className="flex items-start gap-2 text-mist">
              <MapPin size={14} className="text-ember mt-1 shrink-0" />
              <span>{site.address.street}<br />{site.address.city}, {site.address.state} {site.address.zip}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="font-display text-lg tracking-widest text-ember mb-4">GUIDED HUNTS</div>
          <ul className="space-y-2 text-sm">
            {hunts.map((h) => (
              <li key={h.slug}>
                <Link href={`/hunts/${h.slug}`} className="text-mist hover:text-bone transition">
                  {h.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-lg tracking-widest text-ember mb-4">EXPLORE</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/charter-fishing" className="text-mist hover:text-bone transition">Charter Fishing</Link></li>
            <li><Link href="/about" className="text-mist hover:text-bone transition">About Us</Link></li>
            <li><Link href="/contact" className="text-mist hover:text-bone transition">Contact</Link></li>
            <li><Link href="/hunts" className="text-mist hover:text-bone transition">All Hunts</Link></li>
          </ul>
        </div>
      </div>

      {/* SEO link strip — Michigan + species + hunting */}
      <div className="mt-14 pt-8 border-t border-ember/15 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="font-display text-xs tracking-[0.4em] text-ember mb-4">
          MICHIGAN HUNTING &amp; CHARTER FISHING
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[12px] text-mist/80">
          {seoLinks.map((l, i) => (
            <span key={i} className="inline-flex items-center">
              <Link href={l.href} className="hover:text-ember transition">
                {l.label}
              </Link>
              {i < seoLinks.length - 1 && <span className="ml-3 text-ember/40">·</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-ember/15 mx-auto max-w-7xl px-5 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-mist">
        <div>© {new Date().getFullYear()} Hotshot Outfitters — Port Hope, Michigan. All rights reserved.</div>
        <div className="flex items-center gap-4 tracking-wide">
          <Link href="/admin/login" className="hover:text-ember transition text-mist/70">
            Admin
          </Link>
          <span className="hidden md:inline text-mist/40">·</span>
          <a
            href="https://advancedmarketing.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ember transition"
          >
            Designed and developed by <span className="text-ember">Advanced Marketing Co.</span> — hunting guides and fishing charters, websites, and marketing.
          </a>
        </div>
      </div>
    </footer>
  );
}
