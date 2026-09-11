import { neon } from "@neondatabase/serverless";
import MembershipInfo from "../components/Membership/MembershipInfo";

export const dynamic = "force-dynamic";

export default async function MembershipPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM site_content WHERE key = 'membership_intro'`) as unknown as {
    key: string;
    value: string;
  }[];
  const intro =
    rows[0]?.value ??
    "Join Retreat RFC and become part of the club, on and off the pitch.";

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Membership
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        {intro}
      </p>
      <MembershipInfo />
    </div>
  );
}
