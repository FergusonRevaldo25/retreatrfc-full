"use client";

import { useEffect, useState } from "react";

export default function Banner({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const styles =
    type === "success"
      ? "bg-green-900 border-green-600 text-green-200"
      : "bg-red-900 border-red-600 text-red-200";

  return (
    <div
      className={`border rounded-md px-6 py-4 mb-8 text-center transition-opacity duration-500 ${styles}`}
    >
      {message}
    </div>
  );
}
