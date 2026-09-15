import { neon } from "@neondatabase/serverless";
import ShareButtons from "../Shared/ShareButtons";

export const dynamic = "force-dynamic";

// Update this if you get a custom domain later.
const SITE_URL = "https://retreatrfc-full.vercel.app";

type Fixture = {
  id: number;
  match_date: string;
  match_time: string | null;
  opponent: string;
  is_home: boolean;
  home_score: number | null;
  away_score: number | null;
  highlight_url: string | null;
};

function resultBadge(f: Fixture) {
  if (f.home_score === null || f.away_score === null) return null;
  if (f.home_score > f.away_score)
    return { label: "WON", color: "bg-green-700 text-white" };
  if (f.home_score < f.away_score)
    return { label: "LOST", color: "bg-red-800 text-white" };
  return { label: "DRAW", color: "bg-gray-600 text-white" };
}

export default async function FixtureList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const fixtures = (await sql`SELECT * FROM fixtures ORDER BY match_date ASC`) as unknown as Fixture[];

  if (fixtures.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center">
        No fixtures scheduled yet — check back soon.
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
            className="border border-purple-800 rounded-md px-6 py-4 bg-neutral-900"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="font-semibold text-white">
                  {f.is_home ? "Retreat RFC vs " : "Retreat RFC @ "}
                  {f.opponent}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(f.match_date).toLocaleDateString()}
                  {f.match_time && ` · ${f.match_time.slice(0, 5)}`}
                  {result && (
                    <span className="ml-2 text-gray-300">
                      {f.home_score} - {f.away_score}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
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
              </div>
            </div>

            {(f.highlight_url || result) && (
              <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-purple-800">
                {f.highlight_url ? (
                  <a
                    href={f.highlight_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                  >
                    ▶ Watch Highlights
                  </a>
                ) : (
                  <span />
                )}
                {result && (
                  <ShareButtons
                    url={`${SITE_URL}/fixtures`}
                    text={`Retreat RFC ${result.label} ${f.home_score}-${f.away_score} vs ${f.opponent}!`}
                  />
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
