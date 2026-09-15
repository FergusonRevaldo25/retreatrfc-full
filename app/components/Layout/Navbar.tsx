"use client";

import { useState, useRef, useEffect } from "react";
import Logo from "../Logo/Logo";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/fixtures", label: "Fixtures" },
  { href: "/membership", label: "Membership" },
  { href: "/teams", label: "Teams" },
  { href: "/junior", label: "Junior Division" },
];

const moreLinks = [
  { href: "/players", label: "Players" },
  { href: "/news", label: "News" },
  { href: "/shop", label: "Shop" },
  { href: "/donations", label: "Donations" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
  { href: "/history", label: "History" },
  { href: "/about", label: "About" },
];

const allLinks = [...primaryLinks, ...moreLinks];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);

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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/ban.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Full width navbar */}
      <nav className="relative z-10 w-full flex items-center justify-between px-6 lg:px-10 py-4">
        {/* LEFT - Logo */}
        <Logo />

        {/* RIGHT - Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wide">
          {primaryLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}

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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
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

          <li>
            <a
              href="/register"
              className="bg-purple-600 hover:bg-purple-500 transition-colors px-4 py-2 rounded-md font-semibold normal-case tracking-normal text-white"
            >
              Register
            </a>
          </li>
        </ul>

        {/* Mobile button */}
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
