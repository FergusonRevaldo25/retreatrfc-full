import { neon } from "@neondatabase/serverless";

async function submitRegistration(formData: FormData) {
  "use server";
  const fullName = formData.get("full_name") as string;
  const category = formData.get("category") as string;
  const idOrDob = formData.get("id_or_dob") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const emergencyContact = formData.get("emergency_contact") as string;
  const notes = formData.get("notes") as string;

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`
    INSERT INTO registrations (full_name, category, id_or_dob, email, phone, emergency_contact, notes)
    VALUES (${fullName}, ${category}, ${idOrDob}, ${email}, ${phone}, ${emergencyContact}, ${notes})
  `;
}

export default function RegistrationForm() {
  return (
    <form
      action={submitRegistration}
      className="bg-neutral-900 border border-purple-800 rounded-lg p-8 space-y-4"
    >
      <input
        type="text"
        name="full_name"
        placeholder="Full name"
        required
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      />

      <select
        name="category"
        required
        defaultValue=""
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      >
        <option value="" disabled>
          Registering for...
        </option>
        <option value="senior">Senior Rugby (R350)</option>
        <option value="junior">Junior Rugby (R150)</option>
      </select>

      <input
        type="text"
        name="id_or_dob"
        placeholder="ID number or Date of Birth"
        required
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone number"
        required
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      />
      <input
        type="text"
        name="emergency_contact"
        placeholder="Emergency contact (name & number)"
        required
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      />
      <textarea
        name="notes"
        placeholder="Anything else we should know? (optional)"
        rows={3}
        className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 transition-colors py-3 rounded-md font-semibold"
      >
        Submit Registration
      </button>
    </form>
  );
}
