import DonationForm from "../components/Donations/DonationForm";

export default function DonationsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-purple-500 mb-4">
        Support Retreat RFC
      </h1>
      <p className="text-gray-300 mb-10">
        Your donation helps fund equipment, travel, and youth development
        programs for the club.
      </p>
      <DonationForm />
    </div>
  );
}
