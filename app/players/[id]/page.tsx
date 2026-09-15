import { neon } from "@neondatabase/serverless";
import { notFound } from "next/navigation";
import ShareButtons from "../../components/Shared/ShareButtons";

export const dynamic = "force-dynamic";

// Update this if you get a custom domain later.
const SITE_URL = "https://retreatrfc-full.vercel.app";

type Player = {
  id: number;
  name: string;
  position: string | null;
  team: string | null;
  jersey_number: number | null;
  bio: string | null;
  photo_url: string | null;
};

export default async function PlayerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM players WHERE id = ${params.id}`) as unknown as Player[];
  const player = rows[0];

  if (!player) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="border border-purple-700 rounded-xl overflow-hidden bg-neutral-900">
        <div className="aspect-square bg-black flex items-center justify-center text-gray-500">
          {player.photo_url ? (
            <img
              src={player.photo_url}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            "Photo"
          )}
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-2">
            {player.jersey_number && (
              <span className="text-3xl font-extrabold text-purple-500">
                #{player.jersey_number}
              </span>
            )}
            <h1 className="text-2xl font-bold text-white">{player.name}</h1>
          </div>
          <div className="flex gap-2 mb-4">
            {player.position && (
              <span className="text-xs bg-purple-700 text-white px-3 py-1 rounded-full font-semibold">
                {player.position}
              </span>
            )}
            {player.team && (
              <span className="text-xs border border-purple-700 text-purple-400 px-3 py-1 rounded-full font-semibold">
                {player.team}
              </span>
            )}
          </div>
          {player.bio && (
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {player.bio}
            </p>
          )}
          <ShareButtons
            url={`${SITE_URL}/players/${player.id}`}
            text={`Check out ${player.name}'s profile on the Retreat RFC website!`}
          />
        </div>
      </div>
    </div>
  );
}
