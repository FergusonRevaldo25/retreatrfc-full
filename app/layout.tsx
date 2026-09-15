import type { Metadata } from "next";
import { neon } from "@neondatabase/serverless";
import "./globals.css";
import SiteChrome from "./components/Layout/SiteChrome";

export const metadata: Metadata = {
  title: "Retreat RFC",
  description: "Official website of Retreat RFC",
};

type Fixture = {
  id: number;
  match_date: string | Date;
  match_time: string | null;
  opponent: string;
  is_home: boolean;
};

async function getNextFixture(): Promise<Fixture | null> {
  const sql = neon(process.env.DATABASE_URL as string);
  const fixtures = (await sql`
    SELECT * FROM fixtures
    WHERE match_date >= CURRENT_DATE - INTERVAL '1 day'
    ORDER BY match_date ASC
  `) as unknown as Fixture[];

  const now = Date.now();

  for (const f of fixtures) {
    const dateOnly =
      f.match_date instanceof Date
        ? (f.match_date as Date).toISOString().split("T")[0]
        : String(f.match_date).split("T")[0];
    const timeOnly = f.match_time ? f.match_time.slice(0, 5) : "15:00";
    const target = new Date(`${dateOnly}T${timeOnly}:00`);

    if (!isNaN(target.getTime()) && target.getTime() > now) {
      return f;
    }
  }

  return null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextFixture = await getNextFixture();

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        {/* Site-wide background image */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/abstract.jpg')" }}
        />
        {/* Dark overlay so text stays readable everywhere */}
        <div className="fixed inset-0 bg-black/80 -z-10" />

        <SiteChrome nextFixture={nextFixture}>{children}</SiteChrome>
      </body>
    </html>
  );
}
