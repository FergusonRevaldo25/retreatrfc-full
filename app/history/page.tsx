import { neon } from "@neondatabase/serverless";
import HistoryContent from "../components/History/HistoryContent";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM site_content WHERE key IN ('history_founding', 'history_paragraph_1', 'history_paragraph_2')`) as unknown as {
    key: string;
    value: string;
  }[];
  const contentMap = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  const founding =
    contentMap["history_founding"] ??
    "Retreat RFC was founded, becoming one of the community's earliest rugby clubs and a home for local players for generations.";
  const paragraph1 =
    contentMap["history_paragraph_1"] ??
    "Over the decades, the club has grown from a small group of local players into a multi-team organisation spanning senior, women's, and veterans rugby. Through it all, the values of the club have stayed the same: community, resilience, and pride in the purple and black.";
  const paragraph2 =
    contentMap["history_paragraph_2"] ??
    "Today, Retreat RFC continues that legacy — welcoming new players, supporting local youth through our junior programme, and building a club that the community can be proud of both on and off the pitch.";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
        Our History
      </h1>
      <HistoryContent
        founding={founding}
        paragraph1={paragraph1}
        paragraph2={paragraph2}
      />
    </div>
  );
}
