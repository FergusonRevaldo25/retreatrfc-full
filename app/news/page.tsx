import NewsList from "../components/News/NewsList";
import TickerBanner from "../components/Home/TickerBanner";
import ShareButtons from "../components/Shared/ShareButtons";

export const dynamic = "force-dynamic";

// Update this if you get a custom domain later.
const SITE_URL = "https://retreatrfc-full.vercel.app";

export default function NewsPage() {
  return (
    <div>
      <TickerBanner text="REEVA NEWS!!!" />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold text-purple-500">Club News</h1>
          <ShareButtons
            url={`${SITE_URL}/news`}
            text="Check out the latest news from Retreat RFC!"
          />
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          The latest updates, match reports, and announcements from Retreat
          RFC.
        </p>
        <NewsList />
      </div>
      <TickerBanner text="REEVA NEWS!!!" />
    </div>
  );
}
