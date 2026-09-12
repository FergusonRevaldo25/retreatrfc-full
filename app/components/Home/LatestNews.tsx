import { neon } from "@neondatabase/serverless";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default async function LatestNews() {
  const sql = neon(process.env.DATABASE_URL as string);
  const articles = (await sql`SELECT * FROM news ORDER BY created_at DESC LIMIT 3`) as unknown as NewsItem[];

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-500">Latest News</h2>
        <a
          href="/news"
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-semibold"
        >
          View All News →
        </a>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full aspect-video object-cover"
              />
            )}
            <div className="p-5">
              <h3 className="font-semibold text-white text-lg mb-1">
                {article.title}
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-400 text-sm line-clamp-3">
                {article.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
