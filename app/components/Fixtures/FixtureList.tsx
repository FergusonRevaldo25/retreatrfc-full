const fixtures = [
  { date: "2026-09-20", opponent: "Northside Lions", home: true },
  { date: "2026-09-27", opponent: "Coastal Sharks", home: false },
  { date: "2026-10-04", opponent: "Highland Bulls", home: true },
];

export default function FixtureList() {
  return (
    <ul className="space-y-4">
      {fixtures.map((f, i) => (
        <li
          key={i}
          className="flex justify-between items-center border border-purple-800 rounded-md px-6 py-4 bg-neutral-900"
        >
          <div>
            <p className="font-semibold text-white">
              {f.home ? "Retreat RFC vs " : "Retreat RFC @ "}
              {f.opponent}
            </p>
            <p className="text-sm text-gray-400">{f.date}</p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              f.home
                ? "bg-purple-700 text-white"
                : "border border-purple-700 text-purple-400"
            }`}
          >
            {f.home ? "HOME" : "AWAY"}
          </span>
        </li>
      ))}
    </ul>
  );
}
