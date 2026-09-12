import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

type Registration = {
  id: number;
  full_name: string;
  category: string;
  id_or_dob: string;
  email: string;
  phone: string;
  emergency_contact: string;
  notes: string | null;
  created_at: string;
};

async function deleteRegistration(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM registrations WHERE id = ${id}`;
  revalidatePath("/admin/registrations");
}

export default async function AdminRegistrationsPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const registrations = (await sql`SELECT * FROM registrations ORDER BY created_at DESC`) as unknown as Registration[];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/registrations" />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-purple-500 mb-8">
          Player Registrations
        </h1>

        <div className="space-y-4">
          {registrations.length === 0 && (
            <p className="text-gray-500 text-sm">No registrations yet.</p>
          )}
          {registrations.map((r) => (
            <div
              key={r.id}
              className="border border-purple-800 rounded-lg p-6 bg-neutral-900"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-white text-lg">
                    {r.full_name}
                  </p>
                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full font-semibold mt-1 ${
                      r.category === "senior"
                        ? "bg-purple-700"
                        : "bg-purple-900 border border-purple-700"
                    }`}
                  >
                    {r.category === "senior" ? "Senior" : "Junior"}
                  </span>
                </div>
                <form action={deleteRegistration}>
                  <input type="hidden" name="id" value={r.id} />
                  <button
                    type="submit"
                    className="text-red-400 hover:text-red-300 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </form>
              </div>
              <div className="text-sm text-gray-300 space-y-1 mt-3">
                <p>ID/DOB: {r.id_or_dob}</p>
                <p>Email: {r.email}</p>
                <p>Phone: {r.phone}</p>
                <p>Emergency contact: {r.emergency_contact}</p>
                {r.notes && <p>Notes: {r.notes}</p>}
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(r.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
