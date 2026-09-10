import SponsorsList from "../components/Sponsors/SponsorsList";

export default function SponsorsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Our Sponsors
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Retreat RFC is proud to be supported by these local businesses and
        partners. Interested in sponsoring the club?
      </p>
      <SponsorsList />
    </div>
  );
}
