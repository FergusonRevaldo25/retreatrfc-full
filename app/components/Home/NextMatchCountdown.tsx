"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function NextMatchCountdown({
  matchDate,
  matchTime,
  opponent,
  isHome,
}: {
  matchDate: string | Date;
  matchTime: string | null;
  opponent: string;
  isHome: boolean;
}) {
  const dateOnly =
    matchDate instanceof Date
      ? matchDate.toISOString().split("T")[0]
      : String(matchDate).split("T")[0];
  const timeOnly = matchTime ? matchTime.slice(0, 5) : "15:00";
  const target = new Date(`${dateOnly}T${timeOnly}:00`);
  const isValid = !isNaN(target.getTime());

  const [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    if (!isValid) return;
    setTimeLeft(getTimeLeft(target));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateOnly, timeOnly, isValid]);

  if (!isValid || !timeLeft) return null;

  // Destructure right after the guard so TypeScript keeps the narrowed,
  // non-null type all the way through the JSX below.
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <div className="border border-purple-700 rounded-xl bg-neutral-900 p-8 text-center">
        <p className="text-purple-400 uppercase text-xs font-bold tracking-widest mb-2">
          Next Match
        </p>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
          {isHome ? "Retreat RFC vs " : "Retreat RFC @ "}
          {opponent}
        </h3>
        <div className="flex justify-center gap-4 md:gap-8">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Mins", value: minutes },
            { label: "Secs", value: seconds },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-extrabold text-purple-500 tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-400 uppercase tracking-wide mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
