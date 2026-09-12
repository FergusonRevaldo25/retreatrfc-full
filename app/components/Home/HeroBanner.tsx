"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroBanner() {
  const [showIntro, setShowIntro] = useState(false);
  const retreatRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLVideoElement>(null);

  // Play the first video on mount
  useEffect(() => {
    const video = retreatRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was blocked by the browser
      });
    }
  }, []);

  // Handle transitions and play requests when the active video changes
  useEffect(() => {
    if (showIntro && introRef.current) {
      introRef.current.currentTime = 0; // Reset to start
      introRef.current.play().catch(() => {});
    } else if (!showIntro && retreatRef.current) {
      retreatRef.current.currentTime = 0; // Reset to start
      retreatRef.current.play().catch(() => {});
    }
  }, [showIntro]);

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] w-full overflow-hidden flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Video layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First video — plays once, then triggers the transition to Video 2 */}
        <video
          ref={retreatRef}
          muted
          playsInline
          preload="auto"
          onEnded={() => setShowIntro(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-in-out ${
            showIntro ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <source src="/retreat.mp4" type="video/mp4" />
        </video>

        {/* Second video — slides in, plays once, then triggers the transition back to Video 1 */}
        <video
          ref={introRef}
          muted
          playsInline
          preload="auto"
          onEnded={() => setShowIntro(false)} // Sets state back to false to loop Video 1 again
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-in-out ${
            showIntro ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
    </section>
  );
}
