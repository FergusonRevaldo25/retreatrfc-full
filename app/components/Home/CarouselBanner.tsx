"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    title: "RETREAT RFC",
    subtitle:
      "Proud. Passionate. Purple and White. Join us on and off the pitch.",
    cta1: { label: "View Fixtures", href: "/fixtures" },
    cta2: { label: "Support Us", href: "/donations" },
  },
  {
    title: "JOIN THE CLUB",
    subtitle:
      "From juniors to seniors, there's a place for you at Retreat RFC.",
    cta1: { label: "Register Now", href: "/register" },
    cta2: { label: "Learn More", href: "/membership" },
  },
  {
    title: "BACK THE TEAM",
    subtitle:
      "Follow every match, support every player, be part of the community.",
    cta1: { label: "View Teams", href: "/teams" },
    cta2: { label: "See Fixtures", href: "/fixtures" },
  },
];

export default function CarouselBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setActive(((index % slides.length) + slides.length) % slides.length);
  };

  return (
    <section className="relative bg-black py-16 overflow-hidden">
      <div
        className="relative max-w-5xl mx-auto h-[380px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {slides.map((slide, i) => {
          let offset = i - active;
          if (offset > slides.length / 2) offset -= slides.length;
          if (offset < -slides.length / 2) offset += slides.length;

          const isActive = offset === 0;
          const translateX = offset * 260;
          const scale = isActive ? 1 : 0.75;
          const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.4;
          const zIndex = 10 - Math.abs(offset);
          const rotateY = offset * -25;

          return (
            <div
              key={i}
              onClick={() => !isActive && goTo(i)}
              className={`absolute w-72 md:w-96 transition-all duration-500 ease-out ${
                !isActive ? "cursor-pointer" : ""
              }`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                opacity,
                zIndex,
              }}
            >
              <div className="bg-gradient-to-br from-purple-900 via-purple-700 to-black border border-purple-500 rounded-2xl p-8 text-center shadow-2xl shadow-black/60">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-gray-200 mb-6">
                  {slide.subtitle}
                </p>
                {isActive && (
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={slide.cta1.href}
                      className="bg-white text-purple-700 hover:bg-gray-100 transition-colors px-5 py-2 rounded-md font-semibold text-sm"
                    >
                      {slide.cta1.label}
                    </a>
                    <a
                      href={slide.cta2.href}
                      className="border border-white text-white hover:bg-white/10 transition-colors px-5 py-2 rounded-md font-semibold text-sm"
                    >
                      {slide.cta2.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrow navigation */}
      <button
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-purple-700 text-white text-2xl transition-colors"
      >
        ‹
      </button>
      <button
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-purple-700 text-white text-2xl transition-colors"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="relative z-10 flex justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === active
                ? "bg-purple-500"
                : "bg-gray-700 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
