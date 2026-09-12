import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";
import { sendEmailNotification } from "../../lib/notifications";

async function submitInquiry(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`INSERT INTO sponsor_inquiries (name, email, phone, message) VALUES (${name}, ${email}, ${phone}, ${message})`;

  await sendEmailNotification(
    `New Sponsor Inquiry: ${name}`,
    `
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong> ${message || "None"}</p>
    `
  );

  redirect("/sponsors?success=1");
}

export default function SponsorContactForm({
  packetUrl,
}: {
  packetUrl: string | null;
}) {
  return (
    <div className="border border-purple-700 rounded-lg p-8 bg-neutral-900 space-y-8">
      <div className="text-center">
        <h3 className="text-purple-400 font-bold text-xl mb-2">
          Become a Sponsor
        </h3>
        <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
          Support Retreat RFC and get your brand in front of our players,
          families, and community.
        </p>
        {packetUrl && (
          <a
            href={packetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
          >
            Download Sponsorship Packet
          </a>
        )}
      </div>

      <form
        action={submitInquiry}
        className="space-y-4 max-w-md mx-auto text-left"
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
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
          placeholder="Phone (optional)"
          className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
        />
        <textarea
          name="message"
          placeholder="Tell us about your interest in sponsoring"
          rows={4}
          className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
        >
          Send Inquiry
        </button>
      </form>
    </div>
  );
}
