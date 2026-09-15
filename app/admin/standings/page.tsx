import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

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

async function addTeam(formData: FormData) {
  "use server";
  const teamName = formData.get("team_name") as string;
  const isUs = formData.get("is_us") === "on";

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`INSERT INTO standings (team_name, is_us) VALUES (${teamName}, ${isUs})`;

  revalidatePath("/admin/standings");
  revalidatePath("/");
}

async function updateStanding(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const played = parseInt(formData.get("played") as string, 10) || 0;
  const won = parseInt(formData.get("won") as string, 10) || 0;
  const drawn = parseInt(formData.get("drawn") as string, 10) || 0;
  const lost = parseInt(formData.get("lost") as string, 10) || 0;
  const points = parseInt(formData.get("points") as string, 10) || 0;

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`UPDATE standings SET played = ${played}, won = ${won}, drawn = ${drawn}, lost = ${lost}, points = ${points} WHERE id = ${id}`;

  revalidatePath("/admin/standings");
  revalidatePath("/");
}

async function deleteTeam(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM standings WHERE id = ${id}`;
  revalidatePath("/admin/standings");
  revalidatePath("/");
}

export default async function AdminStandingsPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const standings = (await sql`SELECT * FROM standings ORDER BY points DESC, id ASC`) as unknown as Standing[];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/standings" />
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-purple-500">
            Manage League Standings
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            This is entered manually and shown on the homepage — update it
            after each round.
          </p>
        </div>

        <form
          action={addTeam}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-purple-400">Add Team</h2>
          <input
            type="text"
            name="team_name"
            placeholder="Team name"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" name="is_us" />
            This is Retreat RFC (highlights this row)
          </label>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            Add Team
          </button>
        </form>

        <div className="space-y-3">
          {standings.map((s) => (
            <div
              key={s.id}
              className={`border rounded-lg p-4 ${
                s.is_us
                  ? "border-purple-500 bg-purple-950/30"
                  : "border-purple-800 bg-neutral-900"
              }`}
            >
              <form
                action={updateStanding}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <input type="hidden" name="id" value={s.id} />
                <span className="font-semibold text-white w-32">
                  {s.team_name}
                </span>
                <label className="text-gray-400">P</label>
                <input
                  type="number"
                  name="played"
                  defaultValue={s.played}
                  className="w-14 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <label className="text-gray-400">W</label>
                <input
                  type="number"
                  name="won"
                  defaultValue={s.won}
                  className="w-14 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <label className="text-gray-400">D</label>
                <input
                  type="number"
                  name="drawn"
                  defaultValue={s.drawn}
                  className="w-14 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <label className="text-gray-400">L</label>
                <input
                  type="number"
                  name="lost"
                  defaultValue={s.lost}
                  className="w-14 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <label className="text-gray-400">Pts</label>
                <input
                  type="number"
                  name="points"
                  defaultValue={s.points}
                  className="w-14 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 transition-colors px-4 py-1 rounded-md font-semibold text-xs"
                >
                  Save
                </button>
              </form>
              <form action={deleteTeam} className="mt-2">
                <input type="hidden" name="id" value={s.id} />
                <button
                  type="submit"
                  className="text-red-400 hover:text-red-300 text-xs font-semibold"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
