"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../Logo/Logo";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/teams", label: "Teams" },
  { href: "/gallery", label: "Gallery" },
];

const moreLinks = [
  { href: "/history", label: "History" },
  { href: "/membership", label: "Membership" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/about", label: "About" },
  { href: "/donations", label: "Donations" },
  { href: "/junior", label: "Junior Division" },
  { href: "/coaches", label: "Coaches & Exco" },
  { href: "/shop", label: "Shop" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

  // Close the "More" dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative border-b border-purple-700 sticky top-0 z-50">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/ban.jpg')" }}
      />
      {/* Dark overlay so logo/links stay readable */}
      <div className="absolute inset-0 bg-black/80" />

      <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium uppercase tracking-wide">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-purple-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}

          {/* More dropdown */}
          <li className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="hover:text-purple-400 transition-colors flex items-center gap-1"
            >
              More
              <svg
                className={`w-3 h-3 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {moreOpen && (
              <ul className="absolute right-0 mt-3 w-52 bg-neutral-900 border border-purple-700 rounded-lg py-2 shadow-lg shadow-black/50">
                {moreLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-purple-900/40 hover:text-purple-400 transition-colors normal-case tracking-normal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Register button — styled distinctly from the plain nav links */}
          <li>
            <a
              href="/register"
              className="bg-purple-600 hover:bg-purple-500 transition-colors px-4 py-2 rounded-md font-semibold normal-case tracking-normal text-white"
            >
              Register
            </a>
          </li>
        </ul>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="relative z-10 md:hidden px-6 pb-6 border-t border-purple-800 pt-4">
          <ul className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wide mb-4">
            {allLinks.map((link) => (
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
          <a
            href="/register"
            onClick={() => setOpen(false)}
            className="block text-center bg-purple-600 hover:bg-purple-500 transition-colors px-4 py-3 rounded-md font-semibold text-white"
          >
            Register
          </a>
        </div>
      )}
    </header>
  );
}
