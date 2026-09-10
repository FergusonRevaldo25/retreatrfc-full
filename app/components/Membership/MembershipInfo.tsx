const requirements = [
  "Completed membership registration form",
  "Copy of ID or birth certificate",
  "Proof of residence",
  "Emergency contact details",
  "Signed medical/fitness declaration",
];

export default function MembershipInfo() {
  return (
    <div className="space-y-10">
      {/* Fee card */}
      <div className="border border-purple-700 rounded-lg p-8 bg-neutral-900 text-center">
        <p className="text-gray-400 uppercase text-sm tracking-wide mb-2">
          Annual Membership Fee
        </p>
        <p className="text-5xl font-extrabold text-purple-500 mb-2">R350</p>
        <p className="text-gray-300 text-sm">
          Covers your season membership and club registration.
        </p>
        <a
          href="/donations"
          className="inline-block mt-6 bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
        >
          Pay / Join Now
        </a>
      </div>

      {/* Requirements */}
      <div className="border border-purple-800 rounded-lg p-8 bg-neutral-900">
        <h3 className="text-purple-400 font-bold text-xl mb-4">
          What You'll Need to Join
        </h3>
        <ul className="space-y-3">
          {requirements.map((req) => (
            <li
              key={req}
              className="flex items-start gap-3 text-gray-300 text-sm"
            >
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-gray-400 text-sm">
        Have questions about joining? Reach out to us on WhatsApp using the
        button in the corner of the page.
      </p>
    </div>
  );
}
