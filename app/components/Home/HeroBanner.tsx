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

  // Play the second video once it slides in
  useEffect(() => {
    if (showIntro && introRef.current) {
      introRef.current.play().catch(() => {
        // Autoplay was blocked by the browser
      });
    }
  }, [showIntro]);

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] w-full overflow-hidden flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Video layers */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First video — plays once, then triggers the slide */}
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

        {/* Second video — slides in, then loops forever */}
        <video
          ref={introRef}
          muted
          loop
          playsInline
          preload="auto"
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
      <div className="relative z-10 mt-32 md:mt-48">
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Proud. Passionate. Purple and White. Join us on and off the pitch.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/fixtures"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
          >
            View Fixtures
          </a>
          <a
            href="/donations"
            className="border border-purple-600 hover:bg-purple-900 transition-colors px-6 py-3 rounded-md font-semibold"
          >
            Support Us
          </a>
        </div>
      </div>
    </section>
  );
}
