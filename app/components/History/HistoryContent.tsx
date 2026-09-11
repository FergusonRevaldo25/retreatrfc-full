"use client";

import { useEffect, useRef } from "react";

type HistoryContentProps = {
  founding: string;
  paragraph1: string;
  paragraph2: string;
};

export default function HistoryContent({
  founding,
  paragraph1,
  paragraph2,
}: HistoryContentProps) {
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
    <div className="space-y-8 text-gray-300 leading-relaxed">
      {/* History video */}
      <div className="aspect-video border border-purple-700 rounded-lg overflow-hidden bg-neutral-900">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/motive.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-purple-500 font-bold text-3xl">1898</span>
        <p>{founding}</p>
      </div>

      <p>{paragraph1}</p>

      <p>{paragraph2}</p>

      <div className="border-t border-purple-800 pt-6">
        <h3 className="text-purple-400 font-bold text-lg mb-2">
          Club Milestones
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
          <li>1898 — Club founded</li>
          <li>Multiple league titles across senior and development sides</li>
          <li>Expansion into women's rugby</li>
          <li>Ongoing investment in junior and youth development</li>
        </ul>
      </div>
    </div>
  );
}
