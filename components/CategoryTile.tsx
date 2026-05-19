"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { alt } from "@/lib/alts";

export function CategoryTile({
  href,
  title,
  kicker,
  image,
  index,
}: {
  href: string;
  title: string;
  kicker: string;
  image: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={href}
        className="group relative block aspect-[4/5] md:aspect-[3/4] overflow-hidden"
      >
        <Image
          src={`/images/${image}`}
          alt={alt(image)}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/40 to-transparent" />
        <div className="absolute inset-0 ring-1 ring-inset ring-bone/0 group-hover:ring-ember transition" />

        <div className="absolute inset-x-0 bottom-0 p-7 md:p-10 flex items-end justify-between">
          <div>
            <div className="text-ember text-xs tracking-[0.3em] font-display mb-3">
              {kicker}
            </div>
            <h3 className="font-display text-4xl md:text-5xl tracking-wider text-bone text-shadow-strong">
              {title}
            </h3>
          </div>
          <div className="shrink-0 h-12 w-12 md:h-14 md:w-14 rounded-full border border-bone/40 flex items-center justify-center group-hover:bg-ember group-hover:border-ember transition">
            <ArrowUpRight className="text-bone" size={22} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
