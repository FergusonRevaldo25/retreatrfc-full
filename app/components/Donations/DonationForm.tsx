"use client";

import { useState } from "react";

export default function DonationForm() {
  const [amount, setAmount] = useState(50);

  return (
    <form className="bg-neutral-900 border border-purple-800 rounded-lg p-8 space-y-6 text-left">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Donation Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={1}
          className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Jane Doe"
          className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 transition-colors py-3 rounded-md font-semibold"
      >
        Donate R{amount}
      </button>
    </form>
  );
}
