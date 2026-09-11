const coaches = [
  { name: "Head Coach", role: "Head Coach — First XV" },
  { name: "Assistant Coach", role: "Assistant Coach — First XV" },
  { name: "Junior Coach", role: "Head Coach — Junior Division" },
];

const exco = [
  { name: "Chairman", role: "Club Chairman" },
  { name: "Vice Chairman", role: "Vice Chairman" },
  { name: "Treasurer", role: "Treasurer" },
  { name: "Secretary", role: "Club Secretary" },
];

function PersonCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900">
      <div className="aspect-square bg-black flex items-center justify-center text-gray-500 text-sm border-b border-purple-800">
        Photo
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
  );
}

export default function CoachesList() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-purple-400 font-bold text-xl mb-4">Coaching Staff</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {coaches.map((c) => (
            <PersonCard key={c.name} name={c.name} role={c.role} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-purple-400 font-bold text-xl mb-4">Executive Committee</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {exco.map((e) => (
            <PersonCard key={e.name} name={e.name} role={e.role} />
          ))}
        </div>
      </div>
    </div>
  );
}
