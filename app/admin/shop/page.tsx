import { neon } from "@neondatabase/serverless";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import AdminNav from "../../components/Admin/AdminNav";

export const dynamic = "force-dynamic";

type ShopItem = {
  id: number;
  name: string;
  price: string;
  photo_url: string | null;
};

async function addItem(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const file = formData.get("photo") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  let photoUrl: string | null = null;
  if (file && file.size > 0) {
    const blob = await put(`shop/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    photoUrl = blob.url;
  }

  await sql`INSERT INTO shop_items (name, price, photo_url) VALUES (${name}, ${price}, ${photoUrl})`;

  revalidatePath("/admin/shop");
  revalidatePath("/shop");
}

async function updateItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const file = formData.get("photo") as File;

  const sql = neon(process.env.DATABASE_URL as string);

  if (file && file.size > 0) {
    const blob = await put(`shop/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    await sql`UPDATE shop_items SET name = ${name}, price = ${price}, photo_url = ${blob.url} WHERE id = ${id}`;
  } else {
    await sql`UPDATE shop_items SET name = ${name}, price = ${price} WHERE id = ${id}`;
  }

  revalidatePath("/admin/shop");
  revalidatePath("/shop");
}

async function deleteItem(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const sql = neon(process.env.DATABASE_URL as string);

  const rows = (await sql`SELECT photo_url FROM shop_items WHERE id = ${id}`) as unknown as { photo_url: string | null }[];
  if (rows[0]?.photo_url) {
    await del(rows[0].photo_url);
  }

  await sql`DELETE FROM shop_items WHERE id = ${id}`;
  revalidatePath("/admin/shop");
  revalidatePath("/shop");
}

export default async function AdminShopPage() {
  const sql = neon(process.env.DATABASE_URL as string);
  const items = (await sql`SELECT * FROM shop_items ORDER BY id ASC`) as unknown as ShopItem[];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav active="/admin/shop" />
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        <h1 className="text-3xl font-bold text-purple-500">Manage Shop</h1>

        <form
          action={addItem}
          className="bg-neutral-900 border border-purple-800 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-lg font-semibold text-purple-400">
            Add Product
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="text"
            name="price"
            placeholder="Price (e.g. R650)"
            required
            className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            className="text-sm text-gray-400"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold"
          >
            Add Product
          </button>
        </form>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900 border border-purple-800 rounded-lg p-6"
            >
              <form action={updateItem} className="space-y-3">
                <input type="hidden" name="id" value={item.id} />
                {item.photo_url && (
                  <img
                    src={item.photo_url}
                    alt={item.name}
                    className="w-full aspect-square object-cover rounded-md border border-purple-800"
                  />
                )}
                <input
                  type="text"
                  name="name"
                  defaultValue={item.name}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <input
                  type="text"
                  name="price"
                  defaultValue={item.price}
                  className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white"
                />
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="text-sm text-gray-400"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 transition-colors px-6 py-2 rounded-md font-semibold text-sm"
                >
                  Save
                </button>
              </form>
              <form action={deleteItem} className="mt-3">
                <input type="hidden" name="id" value={item.id} />
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
