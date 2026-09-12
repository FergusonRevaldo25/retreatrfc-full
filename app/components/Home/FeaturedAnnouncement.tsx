import { neon } from "@neondatabase/serverless";

type Announcement = {
  headline: string;
  subtext: string;
  image_url: string | null;
};

export default async function FeaturedAnnouncement() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM featured_announcement WHERE id = 1`) as unknown as Announcement[];

  const announcement: Announcement = rows[0] ?? {
    headline: "Retreat RFC Wins Regional Title!",
    subtext:
      "Our First XV brought home the regional championship this weekend after a hard-fought final. Thank you to every player, coach, and supporter who made it happen.",
    image_url: null,
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-6 border border-purple-700 rounded-lg overflow-hidden bg-neutral-900">
        {/* Image */}
        <div className="md:w-2/5 aspect-video md:aspect-auto bg-black flex items-center justify-center text-gray-500 text-sm border-b md:border-b-0 md:border-r border-purple-800">
          {announcement.image_url ? (
            <img
              src={announcement.image_url}
              alt={announcement.headline}
              className="w-full h-full object-cover"
            />
          ) : (
            "News Photo"
          )}
        </div>

        {/* Text */}
        <div className="flex-1 p-8">
          <p className="text-purple-500 uppercase text-xs font-bold tracking-wide mb-2">
            Club Announcement
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {announcement.headline}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {announcement.subtext}
          </p>
        </div>
      </div>
    </section>
  );
}
