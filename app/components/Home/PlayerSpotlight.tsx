"use client";

import { useEffect, useRef } from "react";

type PlayerSpotlightProps = {
  name: string;
  position: string;
  team: string;
  description: string;
  mediaUrl: string | null;
  mediaType: string;
};

export default function PlayerSpotlight({
  name,
  position,
  team,
  description,
  mediaUrl,
  mediaType,
}: PlayerSpotlightProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was blocked by the browser
      });
    }
  }, [mediaUrl]);

  const isVideo = mediaType === "video";
  const src = mediaUrl || "/blip.mp4";

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Media box */}
        <div className="md:w-1/3 aspect-square border border-purple-700 rounded-lg overflow-hidden bg-neutral-900">
          {isVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src={src} type="video/mp4" />
            </video>
          ) : (
            <img src={src} alt={name} className="w-full h-full object-cover" />
          )}
        </div>

        {/* Info box */}
        <div className="flex-1 border border-purple-700 rounded-lg bg-neutral-900 p-8">
          <p className="text-purple-500 uppercase text-xs font-bold tracking-wide mb-2">
            Player of the Month
          </p>
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">
            {position} · {team}
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
