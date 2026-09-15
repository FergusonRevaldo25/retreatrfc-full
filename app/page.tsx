import { neon } from "@neondatabase/serverless";
import Header from "./components/Home/Header";
import HeroBanner from "./components/Home/HeroBanner";
import PlayerSpotlight from "./components/Home/PlayerSpotlight";
import CarouselBanner from "./components/Home/CarouselBanner";
import TickerBanner from "./components/Home/TickerBanner";
import LatestNews from "./components/Home/LatestNews";
import FeaturedAnnouncement from "./components/Home/FeaturedAnnouncement";
import NextMatchCountdown from "./components/Home/NextMatchCountdown";
import StandingsTable from "./components/Home/StandingsTable";

export const dynamic = "force-dynamic";

type Spotlight = {
  name: string;
  position: string;
  team: string;
  description: string;
  media_url: string | null;
  media_type: string;
};

type NextFixture = {
  match_date: string;
  match_time: string | null;
  opponent: string;
  is_home: boolean;
};

export default async function HomePage() {
  const sql = neon(process.env.DATABASE_URL as string);

  const spotlightRows = (await sql`SELECT * FROM player_spotlight WHERE id = 1`) as unknown as Spotlight[];
  const spotlight: Spotlight = spotlightRows[0] ?? {
    name: "Player Name",
    position: "Position",
    team: "First XV",
    description:
      "Recognised for outstanding performances on the field this month.",
    media_url: null,
    media_type: "video",
  };

  const nextFixtureRows = (await sql`
    SELECT match_date, match_time, opponent, is_home FROM fixtures
    WHERE match_date >= CURRENT_DATE
    ORDER BY match_date ASC
    LIMIT 1
  `) as unknown as NextFixture[];
  const nextFixture = nextFixtureRows[0];

  return (
    <div>
      <CarouselBanner />
      <TickerBanner text="REEVA NEWS!!!" />
      <FeaturedAnnouncement />
      <TickerBanner text="REEVA NEWS!!!" />
      <HeroBanner />
      <TickerBanner />

      {nextFixture && (
        <NextMatchCountdown
          matchDate={nextFixture.match_date}
          matchTime={nextFixture.match_time}
          opponent={nextFixture.opponent}
          isHome={nextFixture.is_home}
        />
      )}

      <StandingsTable />

      <PlayerSpotlight
        name={spotlight.name}
        position={spotlight.position}
        team={spotlight.team}
        description={spotlight.description}
        mediaUrl={spotlight.media_url}
        mediaType={spotlight.media_type}
      />
      <TickerBanner />
      <LatestNews />
      <Header />
    </div>
  );
}
