export default function TickerBanner({ text = "REEVAS" }: { text?: string }) {
  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="bg-black border-y border-purple-700 overflow-hidden py-2">
      <div className="flex w-max animate-marquee">
        {/* First set */}
        {items.map((i) => (
          <span
            key={`a-${i}`}
            className="mx-8 text-purple-500 font-bold tracking-widest text-lg whitespace-nowrap"
          >
            {text}
          </span>
        ))}
        {/* Duplicate set — required for a seamless loop */}
        {items.map((i) => (
          <span
            key={`b-${i}`}
            className="mx-8 text-purple-500 font-bold tracking-widest text-lg whitespace-nowrap"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
