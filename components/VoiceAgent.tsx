"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, X, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AGENT_ID = "agent_3601ks09srsnfgmakenr2k7zyve8";

export function VoiceAgent() {
  const [open, setOpen] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    if (document.querySelector('script[data-elevenlabs-convai]')) {
      loadedRef.current = true;
      return;
    }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    s.async = true;
    s.dataset.elevenlabsConvai = "true";
    document.body.appendChild(s);
    loadedRef.current = true;
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI guide" : "Talk to Hank, our AI hunting guide"}
        className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 bg-pine border border-ember/60 hover:border-ember hover:bg-ember/15 text-bone shadow-2xl shadow-pine-deep/80 transition-all"
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-ember" />
        </span>
        {open ? <X size={16} /> : <Headphones size={16} />}
        <span className="font-display tracking-widest text-sm sm:text-base whitespace-nowrap">
          {open ? "CLOSE" : "TALK TO HANK"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full mb-3 left-0 w-[min(360px,calc(100vw-2rem))] bg-pine border border-ember/40 shadow-2xl"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-ember/20 bg-pine-deep">
              <div className="flex items-center gap-2">
                <Mic size={14} className="text-ember" />
                <span className="font-display tracking-widest text-sm">HANK — AI GUIDE</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-mist hover:text-bone p-1"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3 bg-pine">
              <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
              <p className="mt-2 text-xs text-mist/70 px-1">
                Hank is an AI — for booking confirmation, call (989) 551-4551.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
