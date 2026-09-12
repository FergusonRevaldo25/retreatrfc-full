import RegistrationForm from "../components/Register/RegistrationForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-4 text-center">
        Player Registration
      </h1>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        Fill out the form below to register as a player at Retreat RFC.
        We'll be in touch to confirm your spot.
      </p>
      <RegistrationForm />
    </div>
  );
}
