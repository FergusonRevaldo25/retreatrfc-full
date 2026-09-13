import { neon } from "@neondatabase/serverless";

type JuniorFixture = {
  id: number;
  match_date: string;
  match_time: string | null;
  opponent: string;
  age_group: string | null;
  is_home: boolean;
  home_score: number | null;
  away_score: number | null;
};

function resultBadge(f: JuniorFixture) {
  if (f.home_score === null || f.away_score === null) return null;
  if (f.home_score > f.away_score)
    return { label: "WON", color: "bg-green-700 text-white" };
  if (f.home_score < f.away_score)
    return { label: "LOST", color: "bg-red-800 text-white" };
  return { label: "DRAW", color: "bg-gray-600 text-white" };
}

export default async function JuniorFixturesList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const fixtures = (await sql`SELECT * FROM junior_fixtures ORDER BY match_date ASC`) as unknown as JuniorFixture[];

  if (fixtures.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center">
        No junior fixtures scheduled yet — check back soon.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {fixtures.map((f) => {
        const result = resultBadge(f);
        return (
          <li
            key={f.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border border-purple-800 rounded-lg px-6 py-4 bg-neutral-900"
          >
            <div>
              <p className="font-semibold text-white">
                {f.age_group && (
                  <span className="text-purple-400 mr-2 text-sm">
                    [{f.age_group}]
                  </span>
                )}
                {f.is_home ? "vs " : "@ "}
                {f.opponent}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(f.match_date).toLocaleDateString(undefined, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
                {f.match_time && ` · ${f.match_time.slice(0, 5)}`}
                {result && (
                  <span className="ml-2 text-gray-300">
                    {f.home_score} - {f.away_score}
                  </span>
                )}
              </p>
            </div>
            {result ? (
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold w-fit ${result.color}`}
              >
                {result.label}
              </span>
            ) : (
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold w-fit ${
                  f.is_home
                    ? "bg-purple-700 text-white"
                    : "border border-purple-700 text-purple-400"
                }`}
              >
                {f.is_home ? "HOME" : "AWAY"}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
