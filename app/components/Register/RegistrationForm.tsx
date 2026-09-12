import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { sendEmailNotification } from "../../lib/notifications";

function calculateAge(dob: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

async function submitRegistration(formData: FormData) {
  "use server";
  const fullName = formData.get("full_name") as string;
  const category = formData.get("category") as string;
  const idNumber = formData.get("id_number") as string;
  const dateOfBirth = formData.get("date_of_birth") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const emergencyContact = formData.get("emergency_contact") as string;
  const notes = formData.get("notes") as string;

  const dob = new Date(dateOfBirth);
  const age = calculateAge(dob);

  if (category === "senior" && age < 18) {
    redirect("/register?error=underage");
  }

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`
    INSERT INTO registrations (full_name, category, id_number, date_of_birth, email, phone, emergency_contact, notes)
    VALUES (${fullName}, ${category}, ${idNumber}, ${dateOfBirth}, ${email}, ${phone}, ${emergencyContact}, ${notes})
  `;

  await sendEmailNotification(
    `New Registration: ${fullName}`,
    `
      <p><strong>Category:</strong> ${category === "senior" ? "Senior (R350)" : "Junior (R150)"}</p>
      <p><strong>ID Number:</strong> ${idNumber || "Not provided"}</p>
      <p><strong>Date of Birth:</strong> ${dateOfBirth} (Age: ${age})</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Emergency Contact:</strong> ${emergencyContact}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
    `
  );

  redirect("/register?success=1");
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

      <div>
        <label className="text-sm text-gray-400 block mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          name="date_of_birth"
          required
          className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
        />
      </div>

      <input
        type="text"
        name="id_number"
        placeholder="ID number (optional)"
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
