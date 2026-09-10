import HistoryContent from "../components/History/HistoryContent";

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-purple-500 mb-8 text-center">
        Our History
      </h1>
      <HistoryContent />
    </div>
  );
}
