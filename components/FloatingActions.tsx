"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { VoiceAgent } from "@/components/VoiceAgent";
import { site } from "@/lib/site";

export function FloatingActions() {
  return (
    <>
      {/* Desktop: voice agent bottom-left, phone bottom-right */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="fixed left-4 bottom-4 z-40"
        >
          <VoiceAgent />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="fixed right-4 bottom-4 z-40"
        >
          <a
            href={`tel:${site.phone1Tel}`}
            aria-label={`Call ${site.phone1}`}
            className="group relative flex items-center gap-3 px-5 py-3.5 bg-ember hover:bg-ember-deep text-bone shadow-2xl shadow-pine-deep/80 transition-all"
          >
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-bone opacity-60 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-bone" />
            </span>
            <Phone size={16} />
            <span className="font-display tracking-widest text-base whitespace-nowrap">
              CALL US
            </span>
          </a>
        </motion.div>
      </div>

      {/* Mobile: stacked bottom-right — phone ABOVE voice agent (per Ben) */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="fixed right-3 z-40 flex flex-col items-end gap-2"
          style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
        >
          <a
            href={`tel:${site.phone1Tel}`}
            aria-label={`Call ${site.phone1}`}
            className="flex items-center gap-2 px-4 py-3 bg-ember text-bone shadow-2xl shadow-pine-deep/80"
          >
            <Phone size={16} />
            <span className="font-display tracking-widest text-sm">CALL</span>
          </a>
          <VoiceAgent />
        </motion.div>
      </div>
    </>
  );
}
