import { neon } from "@neondatabase/serverless";
import Header from "./components/Home/Header";
import HeroBanner from "./components/Home/HeroBanner";
import PlayerSpotlight from "./components/Home/PlayerSpotlight";
import CarouselBanner from "./components/Home/CarouselBanner";
import TickerBanner from "./components/Home/TickerBanner";

export const dynamic = "force-dynamic";

type Spotlight = {
  name: string;
  position: string;
  team: string;
  description: string;
  media_url: string | null;
  media_type: string;
};

export default async function HomePage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const rows = (await sql`SELECT * FROM player_spotlight WHERE id = 1`) as unknown as Spotlight[];

  const spotlight: Spotlight = rows[0] ?? {
    name: "Player Name",
    position: "Position",
    team: "First XV",
    description:
      "Recognised for outstanding performances on the field this month.",
    media_url: null,
    media_type: "video",
  };

  return (
    <div className="bg-black text-white">
      <CarouselBanner />
      <HeroBanner />
      <TickerBanner />
      <PlayerSpotlight
        name={spotlight.name}
        position={spotlight.position}
        team={spotlight.team}
        description={spotlight.description}
        mediaUrl={spotlight.media_url}
        mediaType={spotlight.media_type}
      />
      <TickerBanner />
      <Header />
    </div>
  );
}
