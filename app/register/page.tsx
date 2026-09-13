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

      {/* Privacy notice */}
      <div className="border border-purple-800 rounded-lg bg-neutral-900 p-6 mb-8 text-sm text-gray-300 space-y-2">
        <h2 className="text-purple-400 font-semibold text-base mb-2">
          How we use your information
        </h2>
        <p>
          The information you submit here (name, ID number or date of
          birth, contact details, and emergency contact) is used only for
          Retreat RFC club registration and administration — confirming
          your spot, contacting you about matches and training, and safety
          purposes. It is accessible only to club administrators and is not
          shared with third parties.
        </p>
        <p>
          <strong className="text-white">
            If you are registering a player under 18,
          </strong>{" "}
          this form must be completed by a parent or legal guardian on
          their behalf.
        </p>
      </div>

      <RegistrationForm />
    </div>
  );
}
