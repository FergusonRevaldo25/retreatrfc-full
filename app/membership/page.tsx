import MembershipInfo from "../components/Membership/MembershipInfo";

export default function MembershipPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Membership
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Join Retreat RFC and become part of the club, on and off the pitch.
      </p>
      <MembershipInfo />
    </div>
  );
}
