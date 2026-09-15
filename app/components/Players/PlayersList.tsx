import { neon } from "@neondatabase/serverless";
import Image from "next/image";

type Player = {
  id: number;
  name: string;
  position: string | null;
  team: string | null;
  jersey_number: number | null;
  photo_url: string | null;
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(" ");
  const first = parts[0] ?? "";
  const rest = parts.slice(1).join(" ");
  return { first, rest: rest || first };
}

export default async function PlayersList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const players =
    (await sql`SELECT * FROM players ORDER BY id ASC`) as unknown as Player[];

  if (players.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center">
        Player profiles coming soon.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {players.map((player) => {
        const { first, rest } = splitName(player.name);
        return (
          <a
            key={player.id}
            href={`/players/${player.id}`}
            className="relative flex items-center justify-between overflow-visible rounded-lg border border-purple-800 bg-gradient-to-r from-black via-purple-950 to-black h-32 md:h-40 group hover:border-purple-500 transition-colors"
          >
            {/* Diagonal accent stripes */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute -left-6 top-0 h-full w-16 bg-white/10 -skew-x-12" />
              <div className="absolute -left-2 top-0 h-full w-10 bg-purple-600/40 -skew-x-12" />
            </div>

            {/* Name */}
            <div className="relative z-10 pl-8 md:pl-14">
              <p
                className="text-2xl md:text-4xl font-extrabold uppercase leading-none"
                style={{
                  WebkitTextStroke: "1.5px white",
                  color: "transparent",
                }}
              >
                {first}
              </p>
              <p className="text-2xl md:text-4xl font-extrabold uppercase text-purple-400 leading-none mt-1">
                {rest}
              </p>
              {(player.jersey_number || player.position) && (
                <p className="text-xs text-gray-400 mt-2">
                  {player.jersey_number && `#${player.jersey_number} `}
                  {player.position}
                </p>
              )}
              {player.team && (
                <p className="text-xs text-purple-300 mt-1">{player.team}</p>
              )}
            </div>

            {/* Photo */}
            <div className="relative z-10 h-full flex items-end justify-end pr-4 md:pr-10 shrink-0">
              {player.photo_url ? (
                <Image
                  src={player.photo_url}
                  alt={player.name}
                  width={400}
                  height={400}
                  quality={90}
                  className="absolute bottom-0 right-4 md:right-10 h-[135%] w-auto max-w-none object-contain z-20 pointer-events-none"
                />
              ) : (
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-neutral-800 flex items-center justify-center text-gray-500 text-xs">
                  Photo
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}
