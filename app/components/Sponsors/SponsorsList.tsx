const placeholderCount = 6;

export default function SponsorsList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <div
          key={i}
          className="aspect-video rounded-md border border-purple-800 bg-neutral-900 flex items-center justify-center text-gray-500 text-sm"
        >
          Sponsor {i + 1}
        </div>
      ))}
    </div>
  );
}
