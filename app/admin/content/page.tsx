import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

const fields = [
  { key: "about_paragraph_1", label: "About — Paragraph 1" },
  { key: "about_paragraph_2", label: "About — Paragraph 2" },
  { key: "history_founding", label: "History — Founding blurb (1898)" },
  { key: "history_paragraph_1", label: "History — Paragraph 1" },
  { key: "history_paragraph_2", label: "History — Paragraph 2" },
  { key: "membership_intro", label: "Membership — Intro line" },
];

async function saveContent(formData: FormData) {
  "use server";
  const sql = neon(process.env.DATABASE_URL as string);

  for (const field of fields) {
    const value = formData.get(field.key) as string;
    await sql`
      INSERT INTO site_content (key, value, updated_at)
      VALUES (${field.key}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${value}, updated_at = NOW()
    `;
  }

  revalidatePath("/admin/content");
  revalidatePath("/about");
  revalidatePath("/history");
  revalidatePath("/membership");
}

export default async function AdminContentPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM site_content`) as unknown as {
    key: string;
    value: string;
  }[];
  const contentMap = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/content" />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-purple-500 mb-8">
          Edit Site Content
        </h1>
        <form action={saveContent} className="space-y-6">
          {fields.map((field) => (
            <div
              key={field.key}
              className="bg-neutral-900 border border-purple-800 rounded-lg p-6"
            >
              <label className="block text-sm font-semibold text-purple-400 mb-2">
                {field.label}
              </label>
              <textarea
                name={field.key}
                defaultValue={contentMap[field.key] ?? ""}
                rows={4}
                className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-8 py-3 rounded-md font-semibold"
          >
            Save All Changes
          </button>
        </form>
      </div>
    </div>
  );
}
