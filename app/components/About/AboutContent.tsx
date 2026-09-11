import { neon } from "@neondatabase/serverless";

export default async function AboutContent() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM site_content WHERE key IN ('about_paragraph_1', 'about_paragraph_2')`) as unknown as {
    key: string;
    value: string;
  }[];
  const contentMap = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  const paragraph1 =
    contentMap["about_paragraph_1"] ??
    "Retreat RFC was founded on the values of community, resilience, and passion for the game. What started as a small group of local players has grown into a club that competes with pride and unites the neighborhood.";
  const paragraph2 =
    contentMap["about_paragraph_2"] ??
    "We believe rugby is more than a sport — it's a way to build character, discipline, and lifelong friendships. Whether you're a player, parent, or supporter, there's a place for you at Retreat RFC.";

  return (
    <div className="space-y-6 text-gray-300 leading-relaxed">
      <p>{paragraph1}</p>
      <p>{paragraph2}</p>
    </div>
  );
}
