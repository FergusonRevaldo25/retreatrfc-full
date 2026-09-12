import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  created_at: string;
};

async function uploadPacket(formData: FormData) {
  "use server";
  const file = formData.get("packet") as File;
  if (!file || file.size === 0) return;

  const blob = await put(`sponsors/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`
    INSERT INTO site_content (key, value, updated_at)
    VALUES ('sponsorship_packet_url', ${blob.url}, NOW())
    ON CONFLICT (key) DO UPDATE SET value = ${blob.url}, updated_at = NOW()
  `;

  revalidatePath("/admin/sponsors");
  revalidatePath("/sponsors");
}

async function deleteInquiry(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM sponsor_inquiries WHERE id = ${id}`;
  revalidatePath("/admin/sponsors");
}

export default async function AdminSponsorsPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const inquiries = (await sql`SELECT * FROM sponsor_inquiries ORDER BY created_at DESC`) as unknown as Inquiry[];
  const packetRows = (await sql`SELECT value FROM site_content WHERE key = 'sponsorship_packet_url'`) as unknown as {
    value: string;
  }[];
  const packetUrl = packetRows[0]?.value || null;

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/sponsors" />
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-purple-500">
          Manage Sponsors
        </h1>

        <div className="bg-neutral-900 border border-purple-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-purple-400 mb-4">
            Sponsorship Packet (PDF)
          </h2>
          {packetUrl && (
            <p className="text-sm text-gray-400 mb-4">
              Current file:{" "}
              <a
                href={packetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 underline"
              >
                View current packet
              </a>
            </p>
          )}
          <form
            action={uploadPacket}
            className="flex flex-wrap items-center gap-4"
          >
            <input
              type="file"
              name="packet"
              accept="application/pdf"
              required
              className="text-sm text-gray-400"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold text-sm"
            >
              Upload / Replace
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-purple-400 mb-4">
            Sponsor Inquiries
          </h2>
          <div className="space-y-3">
            {inquiries.length === 0 && (
              <p className="text-gray-500 text-sm">No inquiries yet.</p>
            )}
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="border border-purple-800 rounded-md p-4 bg-neutral-900"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white">{inq.name}</p>
                    <p className="text-sm text-gray-400">
                      {inq.email} {inq.phone && `• ${inq.phone}`}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <form action={deleteInquiry}>
                    <input type="hidden" name="id" value={inq.id} />
                    <button
                      type="submit"
                      className="text-red-400 hover:text-red-300 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </form>
                </div>
                {inq.message && (
                  <p className="text-gray-300 text-sm mt-2">{inq.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
