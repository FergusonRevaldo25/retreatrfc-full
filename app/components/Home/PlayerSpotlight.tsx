export default function PlayerSpotlight() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="border border-purple-700 rounded-lg bg-neutral-900 overflow-hidden md:flex">
        <div className="md:w-1/3 aspect-square md:aspect-auto bg-black flex items-center justify-center text-gray-500 text-sm border-b md:border-b-0 md:border-r border-purple-800">
          Player Photo
        </div>
        <div className="p-8 flex-1">
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
