const placeholderCount = 8;

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: placeholderCount }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-md border border-purple-800 bg-neutral-900 flex items-center justify-center text-gray-500 text-sm"
        >
          Photo {i + 1}
        </div>
      ))}
    </div>
  );
}
