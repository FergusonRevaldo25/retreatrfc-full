import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

async function addFixture(formData: FormData) {
  "use server";
  const sql = neon(process.env.DATABASE_URL as string);
  const matchDate = formData.get("match_date") as string;
  const matchTime = formData.get("match_time") as string;
  const opponent = formData.get("opponent") as string;
  const ageGroup = formData.get("age_group") as string;
  const isHome = formData.get("is_home") === "on";

  await sql`INSERT INTO junior_fixtures (match_date, match_time, opponent, age_group, is_home) VALUES (${matchDate}, ${matchTime || null}, ${opponent}, ${ageGroup}, ${isHome})`;

  revalidatePath("/admin/junior-fixtures");
  revalidatePath("/junior");
}

async function updateScore(formData: FormData) {
  "use server";
  const sql = neon(process.env.DATABASE_URL as string);
  const id = formData.get("id") as string;
  const homeScoreRaw = formData.get("home_score") as string;
  const awayScoreRaw = formData.get("away_score") as string;

  const homeScore = homeScoreRaw === "" ? null : parseInt(homeScoreRaw, 10);
  const awayScore = awayScoreRaw === "" ? null : parseInt(awayScoreRaw, 10);

  await sql`UPDATE junior_fixtures SET home_score = ${homeScore}, away_score = ${awayScore} WHERE id = ${id}`;

  revalidatePath("/admin/junior-fixtures");
  revalidatePath("/junior");
}

async function deleteFixture(formData: FormData) {
  "use server";
  const sql = neon(process.env.DATABASE_URL as string);
  const id = formData.get("id") as string;

  await sql`DELETE FROM junior_fixtures WHERE id = ${id}`;

  revalidatePath("/admin/junior-fixtures");
  revalidatePath("/junior");
}

type JuniorFixture = {
  id: number;
  match_date: string;
  match_time: string | null;
  opponent: string;
  age_group: string | null;
  is_home: boolean;
  home_score: number | null;
  away_score: number | null;
};

export default async function AdminJuniorFixturesPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const fixtures = (await sql`SELECT * FROM junior_fixtures ORDER BY match_date ASC`) as unknown as JuniorFixture[];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/junior-fixtures" />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-purple-500 mb-8">
          Manage Junior Fixtures
        </h1>

        <form
          action={addFixture}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4 mb-10"
        >
          <h2 className="text-lg font-semibold text-purple-400">
            Add Junior Fixture
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="date"
              name="match_date"
              required
              className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
            />
            <input
              type="time"
              name="match_time"
              className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
            />
          </div>
          <input
            type="text"
            name="opponent"
            placeholder="Opponent name"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="text"
            name="age_group"
            placeholder="Age group (e.g. U11)"
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" name="is_home" defaultChecked />
            Home game
          </label>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            Add Fixture
          </button>
        </form>

        <div className="space-y-4">
          {fixtures.length === 0 && (
            <p className="text-gray-500 text-sm">No junior fixtures yet.</p>
          )}
          {fixtures.map((f) => (
            <div
              key={f.id}
              className="border border-purple-800 rounded-md px-6 py-4 bg-neutral-900"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold">
                    {f.age_group && (
                      <span className="text-purple-400 mr-2">
                        [{f.age_group}]
                      </span>
                    )}
                    {f.is_home ? "vs " : "@ "}
                    {f.opponent}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(f.match_date).toLocaleDateString()}
                    {f.match_time && ` at ${f.match_time.slice(0, 5)}`}
                  </p>
                </div>
                <form action={deleteFixture}>
                  <input type="hidden" name="id" value={f.id} />
                  <button
                    type="submit"
                    className="text-red-400 hover:text-red-300 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </form>
              </div>

              <form
                action={updateScore}
                className="flex flex-wrap items-center gap-2 text-sm"
              >
                <input type="hidden" name="id" value={f.id} />
                <span className="text-gray-400">Us:</span>
                <input
                  type="number"
                  name="home_score"
                  defaultValue={f.home_score ?? ""}
                  placeholder="-"
                  className="w-16 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <span className="text-gray-400">Opponent:</span>
                <input
                  type="number"
                  name="away_score"
                  defaultValue={f.away_score ?? ""}
                  placeholder="-"
                  className="w-16 bg-black border border-purple-700 rounded-md px-2 py-1 text-white"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 transition-colors px-4 py-1 rounded-md font-semibold text-xs"
                >
                  Save Score
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
