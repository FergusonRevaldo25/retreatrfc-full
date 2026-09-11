import CoachesList from "../components/Coaches/CoachesList";

export default function CoachesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Coaches &amp; Exco
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Meet the coaches and committee members who keep Retreat RFC running,
        on and off the field.
      </p>
      <CoachesList />
    </div>
  );
}
