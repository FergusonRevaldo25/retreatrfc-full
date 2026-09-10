import GalleryGrid from "../components/Gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Gallery
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Moments from match days, training, and club events. Photos will be
        added here as the season goes on.
      </p>
      <GalleryGrid />
    </div>
  );
}
