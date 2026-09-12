import { neon } from "@neondatabase/serverless";
import SponsorsList from "../components/Sponsors/SponsorsList";
import SponsorContactForm from "../components/Sponsors/SponsorContactForm";
import Banner from "../components/Shared/Banner";

export const dynamic = "force-dynamic";

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT value FROM site_content WHERE key = 'sponsorship_packet_url'`) as unknown as {
    value: string;
  }[];
  const packetUrl = rows[0]?.value || null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      <div>
        <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
          Our Sponsors
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Retreat RFC is proud to be supported by these local businesses and
          partners.
        </p>
        <SponsorsList />
      </div>

      {searchParams?.success === "1" && (
        <div className="max-w-md mx-auto">
          <Banner
            type="success"
            message="Thanks! Your inquiry has been sent — we'll be in touch soon."
          />
        </div>
      )}

      <SponsorContactForm packetUrl={packetUrl} />
    </div>
  );
}
