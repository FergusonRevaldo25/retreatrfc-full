const ageGroups = [
  { group: "Under 7", details: "Non-contact, skills and fun-based introduction to rugby." },
  { group: "Under 9", details: "Basic contact introduced, focus on fundamentals." },
  { group: "Under 11", details: "Full-contact basics, positional awareness begins." },
  { group: "Under 13", details: "Structured team play and skill development." },
  { group: "Under 15", details: "Competitive league rugby, physical conditioning." },
  { group: "Under 18", details: "High-performance pathway toward senior rugby." },
];

const requirements = [
  "Completed junior registration form",
  "Copy of child's ID or birth certificate",
  "Parent/guardian contact & emergency details",
  "Signed medical/fitness declaration",
];

export default function JuniorInfo() {
  return (
    <div className="space-y-10">
      {/* Age groups */}
      <div>
        <h3 className="text-purple-400 font-bold text-xl mb-4">Age Groups</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {ageGroups.map((age) => (
            <div
              key={age.group}
              className="border border-purple-800 rounded-lg p-5 bg-neutral-900"
            >
              <p className="font-semibold text-white mb-1">{age.group}</p>
              <p className="text-gray-400 text-sm">{age.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subs fee card */}
      <div className="border border-purple-700 rounded-lg p-8 bg-neutral-900 text-center">
        <p className="text-gray-400 uppercase text-sm tracking-wide mb-2">
          Annual Junior Membership Fee
        </p>
        <p className="text-5xl font-extrabold text-purple-500 mb-2">R150</p>
        <p className="text-gray-300 text-sm">
          Covers your child's season membership and club registration.
        </p>
        <a
          href="/register"
          className="inline-block mt-6 bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
        >
          Register / Pay Now
        </a>
      </div>

      {/* Requirements */}
      <div className="border border-purple-800 rounded-lg p-8 bg-neutral-900">
        <h3 className="text-purple-400 font-bold text-xl mb-4">
          What You'll Need to Register
        </h3>
        <ul className="space-y-3">
          {requirements.map((req) => (
            <li key={req} className="flex items-start gap-3 text-gray-300 text-sm">
              <span className="text-purple-500 mt-0.5">✓</span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-gray-400 text-sm">
        Questions about junior rugby? Reach out to us on WhatsApp using the
        button in the corner of the page.
      </p>
    </div>
  );
}
