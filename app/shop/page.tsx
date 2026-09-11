import ShopGrid from "../components/Shop/ShopGrid";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Club Shop
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Gear up in purple and black. Player kits, supporter jerseys, and more.
      </p>
      <ShopGrid />
    </div>
  );
}
