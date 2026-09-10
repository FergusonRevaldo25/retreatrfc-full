import FixtureList from "../components/Fixtures/FixtureList";

export default function FixturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
        Fixtures
      </h1>
      <FixtureList />
    </div>
  );
}
