"use client";

import { useEffect, useRef } from "react";

export default function PlayerSpotlight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was blocked by the browser
      });
    }
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video box */}
        <div className="md:w-1/3 aspect-square border border-purple-700 rounded-lg overflow-hidden bg-neutral-900">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          >
            <source src="/blip.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Info box */}
        <div className="flex-1 border border-purple-700 rounded-lg bg-neutral-900 p-8">
          <p className="text-purple-500 uppercase text-xs font-bold tracking-wide mb-2">
            Player of the Month
          </p>
          <h3 className="text-2xl font-bold text-white mb-1">Player Name</h3>
          <p className="text-gray-400 text-sm mb-4">Position · First XV</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Recognised for outstanding performances on the field this month —
            leading by example both in training and on match day. Update this
            section each month to celebrate a standout player.
          </p>
        </div>
      </div>
    </section>
  );
}
