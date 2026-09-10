export default function HeroBanner() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] w-full overflow-hidden flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/retreat.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          RETREAT <span className="text-purple-500">RFC</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
          Proud. Passionate. Purple and Black. Join us on and off the pitch.
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
