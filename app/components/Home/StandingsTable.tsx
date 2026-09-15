import { neon } from "@neondatabase/serverless";

type Standing = {
  id: number;
  team_name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  is_us: boolean;
};

export default async function StandingsTable() {
  const sql = neon(process.env.DATABASE_URL as string);
  const standings = (await sql`SELECT * FROM standings ORDER BY points DESC, id ASC`) as unknown as Standing[];

  if (standings.length === 0) return null;

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-purple-500 mb-6 text-center">
        League Standings
      </h2>
      <div className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-purple-800">
              <th className="text-left px-4 py-3">Team</th>
              <th className="px-2 py-3">P</th>
              <th className="px-2 py-3">W</th>
              <th className="px-2 py-3">D</th>
              <th className="px-2 py-3">L</th>
              <th className="px-2 py-3">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s) => (
              <tr
                key={s.id}
                className={`border-b border-purple-900 last:border-0 ${
                  s.is_us ? "bg-purple-900/30" : ""
                }`}
              >
                <td
                  className={`text-left px-4 py-3 font-semibold ${
                    s.is_us ? "text-purple-400" : "text-white"
                  }`}
                >
                  {s.team_name}
                </td>
                <td className="text-center px-2 py-3 text-gray-300">
                  {s.played}
                </td>
                <td className="text-center px-2 py-3 text-gray-300">
                  {s.won}
                </td>
                <td className="text-center px-2 py-3 text-gray-300">
                  {s.drawn}
                </td>
                <td className="text-center px-2 py-3 text-gray-300">
                  {s.lost}
                </td>
                <td className="text-center px-2 py-3 font-bold text-white">
                  {s.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
