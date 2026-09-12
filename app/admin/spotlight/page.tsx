import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

async function saveSpotlight(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const team = formData.get("team") as string;
  const description = formData.get("description") as string;
  const file = formData.get("media") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  if (file && file.size > 0) {
    const mediaType = file.type.startsWith("video") ? "video" : "image";
    const blob = await put(`spotlight/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    await sql`
      UPDATE player_spotlight
      SET name = ${name}, position = ${position}, team = ${team}, description = ${description}, media_url = ${blob.url}, media_type = ${mediaType}
      WHERE id = 1
    `;
  } else {
    await sql`
      UPDATE player_spotlight
      SET name = ${name}, position = ${position}, team = ${team}, description = ${description}
      WHERE id = 1
    `;
  }

  revalidatePath("/admin/spotlight");
  revalidatePath("/");
}

export default async function AdminSpotlightPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM player_spotlight WHERE id = 1`) as unknown as {
    name: string;
    position: string;
    team: string;
    description: string;
    media_url: string | null;
    media_type: string;
  }[];
  const spotlight = rows[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/spotlight" />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-purple-500 mb-8">
          Player of the Month
        </h1>

        <form
          action={saveSpotlight}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          {spotlight?.media_url && (
            <div className="w-40 aspect-square rounded-md overflow-hidden border border-purple-800">
              {spotlight.media_type === "video" ? (
                <video
                  src={spotlight.media_url}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={spotlight.media_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
          <input
            type="text"
            name="name"
            placeholder="Player name"
            defaultValue={spotlight?.name}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            defaultValue={spotlight?.position}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="text"
            name="team"
            placeholder="Team (e.g. First XV)"
            defaultValue={spotlight?.team}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            defaultValue={spotlight?.description}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Photo or Video (optional — leave blank to keep current)
            </label>
            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              className="text-sm text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
