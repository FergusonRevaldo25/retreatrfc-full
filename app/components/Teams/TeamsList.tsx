const teams = [
  {
    name: "First XV",
    description: "Our senior men's team competing in the top local league.",
  },
  {
    name: "Second XV",
    description: "Development squad building depth and match experience.",
  },
  {
    name: "Women's Team",
    description: "Competitive women's side, open to new players every season.",
  },
  {
    name: "Golden Oldies",
    description: "Social and veterans rugby for former players staying active.",
  },
];

export default function TeamsList() {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {teams.map((team) => (
        <div
          key={team.name}
          className="border border-purple-800 rounded-lg p-6 bg-neutral-900"
        >
          <h3 className="text-purple-400 font-bold text-xl mb-2">
            {team.name}
          </h3>
          <p className="text-gray-300 text-sm">{team.description}</p>
        </div>
      ))}
    </div>
  );
}
