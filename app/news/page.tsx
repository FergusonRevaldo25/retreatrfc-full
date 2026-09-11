import NewsList from "../components/News/NewsList";

export const dynamic = "force-dynamic";

export default function NewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Club News
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        The latest updates, match reports, and announcements from Retreat RFC.
      </p>
      <NewsList />
    </div>
  );
}
