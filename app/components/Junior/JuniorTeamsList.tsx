import { neon } from "@neondatabase/serverless";

type JuniorTeam = {
  id: number;
  name: string;
  age_group: string | null;
  description: string | null;
  photo_url: string | null;
};

export default async function JuniorTeamsList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const teams = (await sql`SELECT * FROM junior_teams ORDER BY id ASC`) as unknown as JuniorTeam[];

  if (teams.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center">
        Junior teams coming soon.
      </p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {teams.map((team) => (
        <div
          key={team.id}
          className="group border border-purple-800 rounded-xl overflow-hidden bg-neutral-900 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-900/40 transition-all"
        >
          <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-sm overflow-hidden">
            {team.photo_url ? (
              <img
                src={team.photo_url}
                alt={team.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              "Team Photo"
            )}
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-bold text-lg">{team.name}</h3>
              {team.age_group && (
                <span className="text-xs bg-purple-700 text-white px-2 py-0.5 rounded-full font-semibold">
                  {team.age_group}
                </span>
              )}
            </div>
            {team.description && (
              <p className="text-gray-400 text-sm">{team.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
