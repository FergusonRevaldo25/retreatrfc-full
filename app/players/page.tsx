import PlayersList from "../components/Players/PlayersList";

export const dynamic = "force-dynamic";

export default function PlayersPage() {
  return (
    <div className="relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/players-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
          Meet the Players
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          The players who take the field for Retreat RFC.
        </p>
        <PlayersList />
      </div>
    </div>
  );
}
