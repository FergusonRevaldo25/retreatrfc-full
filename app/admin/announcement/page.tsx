import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

async function saveAnnouncement(formData: FormData) {
  "use server";
  const headline = formData.get("headline") as string;
  const subtext = formData.get("subtext") as string;
  const file = formData.get("image") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  if (file && file.size > 0) {
    const blob = await put(`announcement/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    await sql`
      UPDATE featured_announcement
      SET headline = ${headline}, subtext = ${subtext}, image_url = ${blob.url}
      WHERE id = 1
    `;
  } else {
    await sql`
      UPDATE featured_announcement
      SET headline = ${headline}, subtext = ${subtext}
      WHERE id = 1
    `;
  }

  revalidatePath("/admin/announcement");
  revalidatePath("/");
}

export default async function AdminAnnouncementPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM featured_announcement WHERE id = 1`) as unknown as {
    headline: string;
    subtext: string;
    image_url: string | null;
  }[];
  const announcement = rows[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/announcement" />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-purple-500 mb-2">
          Homepage Announcement
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          This is the highlighted news banner shown between the carousel and
          the hero video on your homepage.
        </p>

        <form
          action={saveAnnouncement}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          {announcement?.image_url && (
            <img
              src={announcement.image_url}
              alt=""
              className="w-full max-w-xs aspect-video object-cover rounded-md border border-purple-800"
            />
          )}
          <input
            type="text"
            name="headline"
            placeholder="Headline"
            defaultValue={announcement?.headline}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <textarea
            name="subtext"
            placeholder="Details"
            rows={4}
            defaultValue={announcement?.subtext}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Photo (optional — leave blank to keep current)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
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
