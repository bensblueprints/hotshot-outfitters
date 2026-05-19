"use client";

import { useEffect, useRef } from "react";

export function VideoHero({
  src,
  poster,
  className = "",
  overlayClass = "bg-gradient-to-b from-pine-deep/70 via-pine-deep/60 to-pine-deep",
}: {
  src: string;
  poster?: string;
  className?: string;
  overlayClass?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => v.play().catch(() => {});
    v.addEventListener("canplay", play);
    play();
    return () => v.removeEventListener("canplay", play);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
    </div>
  );
}
