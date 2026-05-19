"use client";

import { useEffect } from "react";

const AGENT_ID = "agent_3601ks09srsnfgmakenr2k7zyve8";

/**
 * Mounts the ElevenLabs ConvAI widget exactly once for the page lifetime.
 * The widget itself renders its own button + UI — we just need the script
 * loaded and the custom element in the DOM. The widget is hidden from this
 * component's render and positioned by global styles in app/globals.css so it
 * sits in the bottom-left, 80px above the bottom edge.
 */
export function VoiceAgent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.querySelector('script[data-elevenlabs-convai]')) return;
    const s = document.createElement("script");
    s.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    s.async = true;
    s.dataset.elevenlabsConvai = "true";
    document.body.appendChild(s);
  }, []);

  return (
    <div className="hsg-voice-mount" data-voice-mount>
      <div className="hsg-voice-label">TALK TO HANK</div>
      <elevenlabs-convai agent-id={AGENT_ID}></elevenlabs-convai>
    </div>
  );
}
