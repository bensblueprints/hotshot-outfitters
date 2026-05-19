"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { VoiceAgent } from "@/components/VoiceAgent";
import { site } from "@/lib/site";

/**
 * Layout:
 *  - Phone "CALL US" button: bottom-right (desktop) / bottom-right (mobile)
 *  - Voice agent (widget): bottom-left on desktop, raised 80px above the bottom so the phone
 *    button at right doesn't visually clash; on mobile it's bottom-left at the same offset.
 *  - "TALK TO HANK" label sits *above* the voice widget (handled by VoiceAgent component).
 *  - Voice widget IS the button — single click opens the call flow with no intermediate popover.
 */
export function FloatingActions() {
  return (
    <>
      {/* Phone call button — bottom-right on every viewport */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed right-4 z-40"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
      >
        <a
          href={`tel:${site.phone1Tel}`}
          aria-label={`Call ${site.phone1}`}
          className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 bg-ember hover:bg-ember-deep text-bone shadow-2xl shadow-pine-deep/80 transition-all"
        >
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-bone opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-bone" />
          </span>
          <Phone size={16} />
          <span className="font-display tracking-widest text-sm sm:text-base whitespace-nowrap">
            CALL US
          </span>
        </a>
      </motion.div>

      {/* Voice agent — bottom-left, raised 80px above the phone button so there's no overlap */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="fixed left-4 z-40"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 80px)" }}
      >
        <VoiceAgent />
      </motion.div>
    </>
  );
}
