import RegistrationForm from "../components/Register/RegistrationForm";
import Banner from "../components/Shared/Banner";

export const dynamic = "force-dynamic";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { success?: string; error?: string };
}) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Player Registration
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
        Fill out the form below to register as a player at Retreat RFC.
        We'll be in touch to confirm your spot.
      </p>

      {searchParams?.success === "1" && (
        <Banner
          type="success"
          message="Thanks! Your registration has been submitted. We'll be in touch soon."
        />
      )}

      {searchParams?.error === "underage" && (
        <Banner
          type="error"
          message='Based on the date of birth entered, this player appears to be under 18. Please select "Junior Rugby" instead of "Senior Rugby" and submit again.'
        />
      )}

      <RegistrationForm />
    </div>
  );
}
