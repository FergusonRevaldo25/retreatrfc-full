"use client";

import { useState } from "react";

export default function FileUploadInput({
  name,
  required,
}: {
  name: string;
  required?: boolean;
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <label className="flex items-center gap-2 border-2 border-dashed border-purple-700 rounded-lg px-6 py-4 cursor-pointer hover:bg-black transition-colors">
      <span className="text-2xl text-purple-500 leading-none">+</span>
      <span
        className={`text-sm ${fileName ? "text-purple-400 font-medium" : "text-gray-400"}`}
      >
        {fileName ?? "Choose Photo"}
      </span>
      <input
        type="file"
        name={name}
        accept="image/*"
        required={required}
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
    </label>
  );
}
