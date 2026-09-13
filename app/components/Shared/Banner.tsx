"use client";

import { useEffect, useState, useRef } from "react";

export default function Banner({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll the banner into view so the person doesn't have to
    // manually scroll up after submitting a long form.
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const styles =
    type === "success"
      ? "bg-green-900 border-green-600 text-green-200"
      : "bg-red-900 border-red-600 text-red-200";

  return (
    <div
      ref={ref}
      className={`border rounded-md px-6 py-4 mb-8 text-center transition-opacity duration-500 ${styles}`}
    >
      {message}
    </div>
  );
}
