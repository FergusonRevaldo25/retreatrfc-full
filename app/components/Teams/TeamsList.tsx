import { neon } from "@neondatabase/serverless";

type Team = {
  id: number;
  name: string;
  description: string | null;
  photo_url: string | null;
};

export default async function TeamsList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const teams = (await sql`SELECT * FROM teams ORDER BY id ASC`) as unknown as Team[];

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {teams.map((team) => (
        <div
          key={team.id}
          className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900"
        >
          <div className="aspect-video bg-black flex items-center justify-center text-gray-500 text-sm border-b border-purple-800 overflow-hidden">
            {team.photo_url ? (
              <img
                src={team.photo_url}
                alt={team.name}
                className="w-full h-full object-cover"
              />
            ) : (
              "Team Photo"
            )}
          </div>
          <div className="p-6">
            <h3 className="text-purple-400 font-bold text-xl mb-2">
              {team.name}
            </h3>
            <p className="text-gray-300 text-sm">{team.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
