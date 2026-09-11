import { neon } from "@neondatabase/serverless";

type StaffMember = {
  id: number;
  name: string;
  role: string;
  category: string;
  photo_url: string | null;
};

function PersonCard({ name, role, photo_url }: StaffMember) {
  return (
    <div className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900">
      <div className="aspect-square bg-black flex items-center justify-center text-gray-500 text-sm border-b border-purple-800 overflow-hidden">
        {photo_url ? (
          <img src={photo_url} alt={name} className="w-full h-full object-cover" />
        ) : (
          "Photo"
        )}
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
    </div>
  );
}

export default async function CoachesList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const staff = (await sql`SELECT * FROM staff ORDER BY category ASC, id ASC`) as unknown as StaffMember[];

  const coaches = staff.filter((s) => s.category === "coach");
  const exco = staff.filter((s) => s.category === "exco");

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-purple-400 font-bold text-xl mb-4">
          Coaching Staff
        </h3>
        {coaches.length === 0 ? (
          <p className="text-gray-500 text-sm">No coaches added yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {coaches.map((c) => (
              <PersonCard key={c.id} {...c} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-purple-400 font-bold text-xl mb-4">
          Executive Committee
        </h3>
        {exco.length === 0 ? (
          <p className="text-gray-500 text-sm">No exco members added yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {exco.map((e) => (
              <PersonCard key={e.id} {...e} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
