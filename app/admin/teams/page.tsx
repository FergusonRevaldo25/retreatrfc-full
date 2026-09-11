import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

type Team = {
  id: number;
  name: string;
  description: string | null;
  photo_url: string | null;
};

async function addTeam(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const file = formData.get("photo") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  let photoUrl: string | null = null;
  if (file && file.size > 0) {
    const blob = await put(`teams/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    photoUrl = blob.url;
  }

  await sql`INSERT INTO teams (name, description, photo_url) VALUES (${name}, ${description}, ${photoUrl})`;

  revalidatePath("/admin/teams");
  revalidatePath("/teams");
}

async function updateTeam(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const file = formData.get("photo") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  if (file && file.size > 0) {
    const blob = await put(`teams/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    await sql`UPDATE teams SET name = ${name}, description = ${description}, photo_url = ${blob.url} WHERE id = ${id}`;
  } else {
    await sql`UPDATE teams SET name = ${name}, description = ${description} WHERE id = ${id}`;
  }

  revalidatePath("/admin/teams");
  revalidatePath("/teams");
}

async function deleteTeam(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM teams WHERE id = ${id}`;
  revalidatePath("/admin/teams");
  revalidatePath("/teams");
}

export default async function AdminTeamsPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const teams = (await sql`SELECT * FROM teams ORDER BY id ASC`) as unknown as Team[];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-purple-500">Manage Teams</h1>

        {/* Add new team */}
        <form
          action={addTeam}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-purple-400">Add Team</h2>
          <input
            type="text"
            name="name"
            placeholder="Team name"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={2}
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
            Add Team
          </button>
        </form>

        {/* Existing teams */}
        <div className="space-y-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-neutral-900 border border-purple-800 rounded-lg p-6"
            >
              <form action={updateTeam} className="space-y-3">
                <input type="hidden" name="id" value={team.id} />
                {team.photo_url && (
                  <img
                    src={team.photo_url}
                    alt={team.name}
                    className="w-full max-w-xs aspect-video object-cover rounded-md border border-purple-800"
                  />
                )}
                <input
                  type="text"
                  name="name"
                  defaultValue={team.name}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <textarea
                  name="description"
                  defaultValue={team.description ?? ""}
                  rows={2}
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
              <form action={deleteTeam} className="mt-3">
                <input type="hidden" name="id" value={team.id} />
                <button
                  type="submit"
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Delete Team
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
