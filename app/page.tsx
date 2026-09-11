import Header from "./components/Home/Header";
import HeroBanner from "./components/Home/HeroBanner";
import PlayerSpotlight from "./components/Home/PlayerSpotlight";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <HeroBanner />
      <PlayerSpotlight />
      <Header />
    </div>
  );
}
