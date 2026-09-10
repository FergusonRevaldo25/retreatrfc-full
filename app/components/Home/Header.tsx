export default function Header() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
      <div className="border border-purple-800 rounded-lg p-6">
        <h3 className="text-purple-400 font-bold text-xl mb-2">Our Team</h3>
        <p className="text-gray-300 text-sm">
          Meet the players and staff driving Retreat RFC forward this season.
        </p>
      </div>
      <div className="border border-purple-800 rounded-lg p-6">
        <h3 className="text-purple-400 font-bold text-xl mb-2">Latest News</h3>
        <p className="text-gray-300 text-sm">
          Stay up to date with match results, announcements, and club events.
        </p>
      </div>
      <div className="border border-purple-800 rounded-lg p-6">
        <h3 className="text-purple-400 font-bold text-xl mb-2">Get Involved</h3>
        <p className="text-gray-300 text-sm">
          From sponsorships to volunteering, find out how to support the club.
        </p>
      </div>
    </section>
  );
}
