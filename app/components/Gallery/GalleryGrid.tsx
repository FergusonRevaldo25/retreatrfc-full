import { neon } from "@neondatabase/serverless";

type GalleryImage = { id: number; url: string };

export default async function GalleryGrid() {
  const sql = neon(process.env.DATABASE_URL as string);
  const images = (await sql`SELECT * FROM gallery_images ORDER BY created_at DESC`) as unknown as GalleryImage[];

  if (images.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center">
        No photos yet — check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="aspect-square rounded-md overflow-hidden border border-purple-800"
        >
          <img src={img.url} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
