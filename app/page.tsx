import Header from "./components/Home/Header";
import HeroBanner from "./components/Home/HeroBanner";

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <HeroBanner />
      <Header />
    </div>
  );
}
