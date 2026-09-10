const placeholderCount = 6;

export default function SponsorsList() {
  return (
    <div className="space-y-12">
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

      <div className="border border-purple-700 rounded-lg p-8 bg-neutral-900 text-center">
        <h3 className="text-purple-400 font-bold text-xl mb-2">
          Become a Sponsor
        </h3>
        <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
          Support Retreat RFC and get your brand in front of our players,
          families, and community. Reach out to discuss sponsorship packages.
        </p>
        <a
          href="/donations"
          className="inline-block bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
}
