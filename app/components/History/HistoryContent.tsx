export default function HistoryContent() {
  return (
    <div className="space-y-8 text-gray-300 leading-relaxed">
      <div className="flex items-center gap-4">
        <span className="text-purple-500 font-bold text-3xl">1898</span>
        <p>
          Retreat RFC was founded, becoming one of the community's earliest
          rugby clubs and a home for local players for generations.
        </p>
      </div>

      <p>
        Over the decades, the club has grown from a small group of local players
        into a multi-team organisation spanning senior, women's, and veterans
        rugby. Through it all, the values of the club have stayed the same:
        community, resilience, and pride in the purple and black.
      </p>

      <p>
        Today, Retreat RFC continues that legacy — welcoming new players,
        supporting local youth through our junior programme, and building a club
        that the community can be proud of both on and off the pitch.
      </p>

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
