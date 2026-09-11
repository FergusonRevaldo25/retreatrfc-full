import { neon } from "@neondatabase/serverless";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

async function addNews(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const file = formData.get("image") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  let imageUrl: string | null = null;
  if (file && file.size > 0) {
    const blob = await put(`news/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    imageUrl = blob.url;
  }

  await sql`INSERT INTO news (title, content, image_url) VALUES (${title}, ${content}, ${imageUrl})`;

  revalidatePath("/admin/news");
  revalidatePath("/news");
}

async function deleteNews(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const imageUrl = formData.get("image_url") as string;

  if (imageUrl) {
    await del(imageUrl);
  }

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM news WHERE id = ${id}`;

  revalidatePath("/admin/news");
  revalidatePath("/news");
}

export default async function AdminNewsPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const articles = (await sql`SELECT * FROM news ORDER BY created_at DESC`) as unknown as NewsItem[];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-purple-500">Manage News</h1>

        {/* Add article */}
        <form
          action={addNews}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-purple-400">
            Post an Article
          </h2>
          <input
            type="text"
            name="title"
            placeholder="Headline"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <textarea
            name="content"
            placeholder="Write the article..."
            rows={5}
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <div>
            <label className="text-sm text-gray-400 block mb-1">
              Photo (optional)
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="text-sm text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            Post Article
          </button>
        </form>

        {/* Existing articles */}
        <div className="space-y-4">
          {articles.length === 0 && (
            <p className="text-gray-500 text-sm">No articles posted yet.</p>
          )}
          {articles.map((article) => (
            <div
              key={article.id}
              className="border border-purple-800 rounded-lg p-6 bg-neutral-900"
            >
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full max-w-sm aspect-video object-cover rounded-md border border-purple-800 mb-4"
                />
              )}
              <h3 className="font-semibold text-white text-lg">
                {article.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">
                {article.content}
              </p>
              <form action={deleteNews} className="mt-4">
                <input type="hidden" name="id" value={article.id} />
                <input
                  type="hidden"
                  name="image_url"
                  value={article.image_url ?? ""}
                />
                <button
                  type="submit"
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Delete
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
