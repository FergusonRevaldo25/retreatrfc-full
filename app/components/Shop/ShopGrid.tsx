const products = [
  { name: "Player Jersey", price: "R650" },
  { name: "Supporter Jersey", price: "R450" },
  { name: "Cap", price: "R150" },
  { name: "Bucket Hat", price: "R180" },
  { name: "Beanie", price: "R150" },
  { name: "Jacket", price: "R750" },
  { name: "Tracksuit", price: "R900" },
  { name: "Training Tee", price: "R250" },
];

export default function ShopGrid() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.name}
            className="border border-purple-800 rounded-lg overflow-hidden bg-neutral-900"
          >
            <div className="aspect-square bg-black flex items-center justify-center text-gray-500 text-sm border-b border-purple-800">
              Photo
            </div>
            <div className="p-4 text-center">
              <p className="font-semibold text-white">{product.name}</p>
              <p className="text-purple-400 text-sm mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

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
