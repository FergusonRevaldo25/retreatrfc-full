import { neon } from "@neondatabase/serverless";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

type GalleryImage = { id: number; url: string };

async function uploadImage(formData: FormData) {
  "use server";
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return;

  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`INSERT INTO gallery_images (url) VALUES (${blob.url})`;

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

async function deleteImage(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const url = formData.get("url") as string;

  await del(url);

  const sql = neon(process.env.DATABASE_URL as string);
  await sql`DELETE FROM gallery_images WHERE id = ${id}`;

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export default async function AdminGalleryPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const images = (await sql`SELECT * FROM gallery_images ORDER BY created_at DESC`) as unknown as GalleryImage[];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-500 mb-8">
          Manage Gallery
        </h1>

        {/* Upload form */}
        <form
          action={uploadImage}
          className="mb-10 flex flex-wrap items-center gap-4 bg-neutral-900 border border-purple-800 rounded-lg p-6"
        >
          <label className="flex items-center gap-2 border-2 border-dashed border-purple-700 rounded-lg px-6 py-4 cursor-pointer hover:bg-black transition-colors">
            <span className="text-2xl text-purple-500 leading-none">+</span>
            <span className="text-sm text-gray-400">Choose Photo</span>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
          >
            Upload
          </button>
        </form>

        {/* Existing photos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.length === 0 && (
            <p className="text-gray-500 text-sm col-span-full">
              No photos uploaded yet.
            </p>
          )}
          {images.map((img) => (
            <div
              key={img.id}
              className="relative aspect-square rounded-md overflow-hidden border border-purple-800"
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
              <form action={deleteImage} className="absolute top-2 right-2">
                <input type="hidden" name="id" value={img.id} />
                <input type="hidden" name="url" value={img.url} />
                <button
                  type="submit"
                  className="bg-black/70 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors"
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
