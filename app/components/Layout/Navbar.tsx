"use client";

import { useState } from "react";
import Logo from "../Logo/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/fixtures", label: "Fixtures" },
    { href: "/teams", label: "Teams" },
    { href: "/gallery", label: "Gallery" },
    { href: "/history", label: "History" },
    { href: "/membership", label: "Membership" },
    { href: "/sponsors", label: "Sponsors" },
    { href: "/about", label: "About" },
    { href: "/donations", label: "Donations" },
  ];

  return (
    <header className="bg-black border-b border-purple-700 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-wide">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 text-sm font-medium uppercase tracking-wide border-t border-purple-800 pt-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
