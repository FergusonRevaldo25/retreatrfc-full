import JuniorInfo from "../components/Junior/JuniorInfo";

export default function JuniorPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Junior Division
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Retreat RFC's junior section gives kids of all ages a place to learn
        rugby, build friendships, and grow as players in a safe, supportive
        environment.
      </p>
      <JuniorInfo />
    </div>
  );
}
