import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

type StaffMember = {
  id: number;
  name: string;
  role: string;
  category: string;
  photo_url: string | null;
};

async function addStaff(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const category = formData.get("category") as string;
  const file = formData.get("photo") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  let photoUrl: string | null = null;
  if (file && file.size > 0) {
    const blob = await put(`staff/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    photoUrl = blob.url;
  }

  await sql`INSERT INTO staff (name, role, category, photo_url) VALUES (${name}, ${role}, ${category}, ${photoUrl})`;

  revalidatePath("/admin/staff");
  revalidatePath("/coaches");
}

async function updateStaff(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const category = formData.get("category") as string;
  const file = formData.get("photo") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  if (file && file.size > 0) {
    const blob = await put(`staff/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    await sql`UPDATE staff SET name = ${name}, role = ${role}, category = ${category}, photo_url = ${blob.url} WHERE id = ${id}`;
  } else {
    await sql`UPDATE staff SET name = ${name}, role = ${role}, category = ${category} WHERE id = ${id}`;
  }

  revalidatePath("/admin/staff");
  revalidatePath("/coaches");
}

async function deleteStaff(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM staff WHERE id = ${id}`;
  revalidatePath("/admin/staff");
  revalidatePath("/coaches");
}

export default async function AdminStaffPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const staff = (await sql`SELECT * FROM staff ORDER BY category ASC, id ASC`) as unknown as StaffMember[];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/staff" />
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-purple-500">
          Manage Coaches &amp; Exco
        </h1>

        <form
          action={addStaff}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-purple-400">
            Add Coach or Exco Member
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="text"
            name="role"
            placeholder="Role (e.g. Head Coach — First XV)"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <select
            name="category"
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          >
            <option value="coach">Coaching Staff</option>
            <option value="exco">Executive Committee</option>
          </select>
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
            Add
          </button>
        </form>

        <div className="space-y-6">
          {staff.map((person) => (
            <div
              key={person.id}
              className="bg-neutral-900 border border-purple-800 rounded-lg p-6"
            >
              <form action={updateStaff} className="space-y-3">
                <input type="hidden" name="id" value={person.id} />
                {person.photo_url && (
                  <img
                    src={person.photo_url}
                    alt={person.name}
                    className="w-32 h-32 object-cover rounded-md border border-purple-800"
                  />
                )}
                <input
                  type="text"
                  name="name"
                  defaultValue={person.name}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <input
                  type="text"
                  name="role"
                  defaultValue={person.role}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <select
                  name="category"
                  defaultValue={person.category}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                >
                  <option value="coach">Coaching Staff</option>
                  <option value="exco">Executive Committee</option>
                </select>
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
              <form action={deleteStaff} className="mt-3">
                <input type="hidden" name="id" value={person.id} />
                <button
                  type="submit"
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
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
