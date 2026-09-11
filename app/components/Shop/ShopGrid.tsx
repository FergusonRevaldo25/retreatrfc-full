import { neon } from "@neondatabase/serverless";

type ShopItem = {
  id: number;
  name: string;
  price: string;
  photo_url: string | null;
};

export default async function ShopGrid() {
  const sql = neon(process.env.DATABASE_URL as string);
  const items = (await sql`SELECT * FROM shop_items ORDER BY id ASC`) as unknown as ShopItem[];

  return (
    <div className="space-y-12">
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">
          No products listed yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900"
            >
              <div className="aspect-square bg-black flex items-center justify-center text-gray-500 text-sm border-b border-purple-800 overflow-hidden">
                {item.photo_url ? (
                  <img
                    src={item.photo_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "Photo"
                )}
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-purple-400 text-sm mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border border-purple-700 rounded-lg p-8 bg-neutral-900 text-center">
        <h3 className="text-purple-400 font-bold text-xl mb-2">
          Want to order?
        </h3>
        <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
          Reach out to us on WhatsApp to place an order or ask about sizing
          and availability.
        </p>
        <a
          href="/donations"
          className="inline-block bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-3 rounded-md font-semibold"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
