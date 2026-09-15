import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

type Player = {
  id: number;
  name: string;
  position: string | null;
  team: string | null;
  jersey_number: number | null;
  bio: string | null;
  photo_url: string | null;
};

async function addPlayer(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const team = formData.get("team") as string;
  const jerseyRaw = formData.get("jersey_number") as string;
  const bio = formData.get("bio") as string;
  const file = formData.get("photo") as File;

  const jerseyNumber = jerseyRaw === "" ? null : parseInt(jerseyRaw, 10);

  const sql = neon(process.env.DATABASE_URL as string);

  let photoUrl: string | null = null;
  if (file && file.size > 0) {
    const blob = await put(`players/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    photoUrl = blob.url;
  }

  await sql`INSERT INTO players (name, position, team, jersey_number, bio, photo_url) VALUES (${name}, ${position}, ${team}, ${jerseyNumber}, ${bio}, ${photoUrl})`;

  revalidatePath("/admin/players");
  revalidatePath("/players");
}

async function updatePlayer(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const team = formData.get("team") as string;
  const jerseyRaw = formData.get("jersey_number") as string;
  const bio = formData.get("bio") as string;
  const file = formData.get("photo") as File;

  const jerseyNumber = jerseyRaw === "" ? null : parseInt(jerseyRaw, 10);

  const sql = neon(process.env.DATABASE_URL as string);

  if (file && file.size > 0) {
    const blob = await put(`players/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    await sql`UPDATE players SET name = ${name}, position = ${position}, team = ${team}, jersey_number = ${jerseyNumber}, bio = ${bio}, photo_url = ${blob.url} WHERE id = ${id}`;
  } else {
    await sql`UPDATE players SET name = ${name}, position = ${position}, team = ${team}, jersey_number = ${jerseyNumber}, bio = ${bio} WHERE id = ${id}`;
  }

  revalidatePath("/admin/players");
  revalidatePath("/players");
}

async function deletePlayer(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM players WHERE id = ${id}`;
  revalidatePath("/admin/players");
  revalidatePath("/players");
}

export default async function AdminPlayersPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const players = (await sql`SELECT * FROM players ORDER BY id ASC`) as unknown as Player[];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/players" />
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-purple-500">
          Manage Player Profiles
        </h1>

        <form
          action={addPlayer}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-purple-400">
            Add Player
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Player name"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <div className="grid sm:grid-cols-3 gap-3">
            <input
              type="text"
              name="position"
              placeholder="Position"
              className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
            />
            <input
              type="text"
              name="team"
              placeholder="Team (e.g. First XV)"
              className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
            />
            <input
              type="number"
              name="jersey_number"
              placeholder="Jersey #"
              className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
            />
          </div>
          <textarea
            name="bio"
            placeholder="Short bio"
            rows={3}
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="text-sm text-gray-400"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            Add Player
          </button>
        </form>

        <div className="space-y-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-neutral-900 border border-purple-800 rounded-lg p-6"
            >
              <form action={updatePlayer} className="space-y-3">
                <input type="hidden" name="id" value={player.id} />
                {player.photo_url && (
                  <img
                    src={player.photo_url}
                    alt={player.name}
                    className="w-32 h-32 object-cover rounded-md border border-purple-800"
                  />
                )}
                <input
                  type="text"
                  name="name"
                  defaultValue={player.name}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="position"
                    defaultValue={player.position ?? ""}
                    placeholder="Position"
                    className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                  />
                  <input
                    type="text"
                    name="team"
                    defaultValue={player.team ?? ""}
                    placeholder="Team"
                    className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                  />
                  <input
                    type="number"
                    name="jersey_number"
                    defaultValue={player.jersey_number ?? ""}
                    placeholder="Jersey #"
                    className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                  />
                </div>
                <textarea
                  name="bio"
                  defaultValue={player.bio ?? ""}
                  rows={3}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="text-sm text-gray-400"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold text-sm"
                >
                  Save
                </button>
              </form>
              <form action={deletePlayer} className="mt-3">
                <input type="hidden" name="id" value={player.id} />
                <button
                  type="submit"
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Delete Player
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
