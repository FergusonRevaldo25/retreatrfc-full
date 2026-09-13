import TeamsList from "../components/Teams/TeamsList";
import CoachesList from "../components/Coaches/CoachesList";

export const dynamic = "force-dynamic";

export default function TeamsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <div>
        <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
          Our Teams
        </h1>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Retreat RFC fields sides across multiple age groups and levels.
          Here's a look at our squads.
        </p>
        <TeamsList />
      </div>

      <div>
        <h2 className="text-3xl font-bold text-purple-500 mb-4 text-center">
          Coaches &amp; Exco
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
          Meet the coaches and committee members who keep Retreat RFC
          running, on and off the field.
        </p>
        <CoachesList />
      </div>
    </div>
  );
}
