"use client";

import { useState } from "react";

export default function ShareButtons({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400">Share:</span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 transition-colors"
      >
        <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white">
          <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.396.63 4.712 1.827 6.75L4 29l7.42-1.798a11.94 11.94 0 0 0 4.581.916h.005c6.627 0 12-5.373 12-12.001C28.006 8.373 22.633 3 16.001 3zm0 21.6h-.004a9.55 9.55 0 0 1-4.87-1.334l-.35-.208-3.63.88.968-3.54-.228-.363a9.56 9.56 0 0 1-1.474-5.034c0-5.29 4.307-9.598 9.598-9.598 2.564 0 4.973.999 6.786 2.813a9.53 9.53 0 0 1 2.812 6.79c-.001 5.29-4.308 9.594-9.608 9.594z" />
        </svg>
      </a>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      </a>
      <button
        onClick={copyLink}
        className="text-xs text-purple-400 hover:text-purple-300 transition-colors border border-purple-700 rounded-full px-3 py-1.5"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
