"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { alt } from "@/lib/alts";

export function PhotoGrid({ images, columns = 3 }: { images: string[]; columns?: 2 | 3 | 4 }) {
  const gridCols =
    columns === 2 ? "sm:grid-cols-2" :
    columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" :
    "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
      {images.map((src, i) => (
        <motion.figure
          key={src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
          className="group relative aspect-[4/5] overflow-hidden bg-pine"
        >
          <Image
            src={`/images/${src}`}
            alt={alt(src)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-ember/0 group-hover:ring-ember/60 transition" />
        </motion.figure>
      ))}
    </div>
  );
}
