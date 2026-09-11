import { neon } from "@neondatabase/serverless";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

export default async function NewsList() {
  const sql = neon(process.env.DATABASE_URL as string);
  const articles = (await sql`SELECT * FROM news ORDER BY created_at DESC`) as unknown as NewsItem[];

  if (articles.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center">
        No news yet — check back soon.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <article
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
          <div className="p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-1">
              {article.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(article.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
              {article.content}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
