"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hunts, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [huntsOpen, setHuntsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-pine-deep/85 backdrop-blur-md border-b border-ember/20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/hotshot-outfitters-logo.webp"
            alt="Hotshot Outfitters — Michigan guided hunting and Lake Huron charter fishing"
            width={48}
            height={48}
            className="h-10 w-auto"
            priority
          />
          <span className="font-display text-2xl tracking-wider text-bone group-hover:text-ember transition-colors">
            Hotshot <span className="text-ember">Outfitters</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm tracking-wide hover:text-ember transition">HOME</Link>
          <div
            className="relative"
            onMouseEnter={() => setHuntsOpen(true)}
            onMouseLeave={() => setHuntsOpen(false)}
          >
            <Link
              href="/hunts"
              className="flex items-center gap-1 text-sm tracking-wide hover:text-ember transition"
            >
              GUIDED HUNTS <ChevronDown size={14} />
            </Link>
            <AnimatePresence>
              {huntsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64"
                >
                  <div className="bg-pine border border-ember/30 rounded-sm shadow-2xl py-2">
                    <Link
                      href="/hunts"
                      className="block px-5 py-2.5 text-sm tracking-wide hover:bg-ember hover:text-bone transition border-b border-ember/10"
                    >
                      ALL GUIDED HUNTS →
                    </Link>
                    {hunts.map((h) => (
                      <Link
                        key={h.slug}
                        href={`/hunts/${h.slug}`}
                        className="block px-5 py-2 text-sm tracking-wide text-mist hover:bg-ember hover:text-bone transition"
                      >
                        {h.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/charter-fishing" className="text-sm tracking-wide hover:text-ember transition">
            CHARTER FISHING
          </Link>
          <Link href="/about" className="text-sm tracking-wide hover:text-ember transition">ABOUT</Link>
          <Link href="/contact" className="text-sm tracking-wide hover:text-ember transition">CONTACT</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${site.phone1Tel}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-ember hover:bg-ember-deep text-bone font-display text-lg tracking-wider transition"
          >
            <Phone size={16} /> BOOK NOW
          </a>
        </div>

        <button
          className="lg:hidden text-bone p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-pine border-t border-ember/20"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              <Link href="/" onClick={() => setOpen(false)} className="py-2 text-bone tracking-wide">HOME</Link>
              <Link href="/hunts" onClick={() => setOpen(false)} className="py-2 text-bone tracking-wide">GUIDED HUNTS</Link>
              {hunts.map((h) => (
                <Link
                  key={h.slug}
                  href={`/hunts/${h.slug}`}
                  onClick={() => setOpen(false)}
                  className={cn("py-1.5 pl-4 text-sm text-mist tracking-wide")}
                >
                  → {h.title}
                </Link>
              ))}
              <Link href="/charter-fishing" onClick={() => setOpen(false)} className="py-2 text-bone tracking-wide">CHARTER FISHING</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="py-2 text-bone tracking-wide">ABOUT</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="py-2 text-bone tracking-wide">CONTACT</Link>
              <a
                href={`tel:${site.phone1Tel}`}
                className="mt-3 flex items-center justify-center gap-2 px-5 py-3 bg-ember text-bone font-display text-lg tracking-wider"
              >
                <Phone size={16} /> {site.phone1}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
