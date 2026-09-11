import AboutContent from "../components/About/AboutContent";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
        About Us
      </h1>
      <AboutContent />
    </div>
  );
}
