import TeamsList from "../components/Teams/TeamsList";

export default function TeamsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Our Teams
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Retreat RFC fields sides across multiple age groups and levels.
        Here's a look at our squads.
      </p>
      <TeamsList />
    </div>
  );
}
