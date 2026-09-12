import { neon } from "@neondatabase/serverless";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

const cards = [
  {
    href: "/admin/fixtures",
    label: "Fixtures",
    description: "Add matches and enter results",
    countKey: "fixtures",
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    description: "Upload and manage photos",
    countKey: "gallery",
  },
  {
    href: "/admin/teams",
    label: "Teams",
    description: "Edit squads and team photos",
    countKey: "teams",
  },
  {
    href: "/admin/news",
    label: "News",
    description: "Post club updates and articles",
    countKey: "news",
  },
  {
    href: "/admin/content",
    label: "Site Content",
    description: "Edit About, History, Membership text",
    countKey: null,
  },
  {
    href: "/admin/staff",
    label: "Coaches & Exco",
    description: "Manage coaching staff and committee",
    countKey: "staff",
  },
  {
    href: "/admin/shop",
    label: "Shop",
    description: "Manage club merchandise",
    countKey: "shop",
  },
  {
    href: "/admin/sponsors",
    label: "Sponsors",
    description: "Manage sponsorship packet and inquiries",
    countKey: "sponsors",
  },
  {
    href: "/admin/spotlight",
    label: "Player Spotlight",
    description: "Update the homepage Player of the Month",
    countKey: null,
  },
  {
    href: "/admin/announcement",
    label: "Homepage Announcement",
    description: "Edit the news banner between the carousel and hero",
    countKey: null,
  },
  {
    href: "/admin/registrations",
    label: "Registrations",
    description: "View new player sign-ups",
    countKey: "registrations",
  },
];

export default async function AdminDashboardPage() {
  const sql = neon(process.env.DATABASE_URL as string);

  const [fixtures, gallery, teams, news, staff, shop, sponsors, registrations] = await Promise.all([
    sql`SELECT COUNT(*) FROM fixtures`,
    sql`SELECT COUNT(*) FROM gallery_images`,
    sql`SELECT COUNT(*) FROM teams`,
    sql`SELECT COUNT(*) FROM news`,
    sql`SELECT COUNT(*) FROM staff`,
    sql`SELECT COUNT(*) FROM shop_items`,
    sql`SELECT COUNT(*) FROM sponsor_inquiries`,
    sql`SELECT COUNT(*) FROM registrations`,
  ]);

  const counts: Record<string, number> = {
    fixtures: Number(fixtures[0].count),
    gallery: Number(gallery[0].count),
    teams: Number(teams[0].count),
    news: Number(news[0].count),
    staff: Number(staff[0].count),
    shop: Number(shop[0].count),
    sponsors: Number(sponsors[0].count),
    registrations: Number(registrations[0].count),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/dashboard" />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-purple-500 mb-2">
          Welcome back
        </h1>
        <p className="text-gray-400 mb-10">
          Manage everything on the Retreat RFC website from here.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="border border-purple-800 rounded-lg p-6 bg-neutral-900 hover:border-purple-500 hover:bg-neutral-800 transition-colors"
            >
              <h3 className="font-semibold text-white text-lg mb-1">
                {card.label}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {card.description}
              </p>
              {card.countKey && (
                <p className="text-purple-500 text-sm font-semibold">
                  {counts[card.countKey]} item
                  {counts[card.countKey] === 1 ? "" : "s"}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
