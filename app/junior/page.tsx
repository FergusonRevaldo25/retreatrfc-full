import JuniorInfo from "../components/Junior/JuniorInfo";
import JuniorTeamsList from "../components/Junior/JuniorTeamsList";
import JuniorFixturesList from "../components/Junior/JuniorFixturesList";

export const dynamic = "force-dynamic";

export default function JuniorPage() {
  return (
    <div>
      {/* Hero-style header */}
      <div className="relative bg-gradient-to-br from-purple-900 via-black to-black py-20 px-6 text-center overflow-hidden">
        <div className="relative z-10">
          <p className="text-purple-400 uppercase tracking-widest text-sm font-bold mb-3">
            Retreat RFC
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Junior <span className="text-purple-500">Division</span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            Building the next generation of Retreat RFC — skills, teamwork,
            and a love for the game, from Under 7 to Under 18.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Junior Teams */}
        <div>
          <h2 className="text-3xl font-bold text-purple-500 mb-2 text-center">
            Our Junior Teams
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Meet the squads competing across every junior age group.
          </p>
          <JuniorTeamsList />
        </div>

        {/* Junior Fixtures */}
        <div>
          <h2 className="text-3xl font-bold text-purple-500 mb-2 text-center">
            Junior Fixtures
          </h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            Match days and kickoff times for all age groups.
          </p>
          <JuniorFixturesList />
        </div>

        {/* Age groups, subs fee, requirements */}
        <JuniorInfo />
      </div>
    </div>
  );
}
