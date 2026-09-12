"use client";

import { useState } from "react";
import { logout } from "./actions";

const sections = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/fixtures", label: "Fixtures" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/teams", label: "Teams" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/content", label: "Site Content" },
  { href: "/admin/staff", label: "Coaches & Exco" },
  { href: "/admin/shop", label: "Shop" },
  { href: "/admin/sponsors", label: "Sponsors" },
  { href: "/admin/spotlight", label: "Player Spotlight" },
  { href: "/admin/announcement", label: "Homepage Announcement" },
  { href: "/admin/registrations", label: "Registrations" },
];

export default function AdminNav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 border-b border-purple-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <span className="text-purple-500 font-bold text-sm whitespace-nowrap">
          RETREAT RFC ADMIN
        </span>

        {/* Desktop links */}
        <div className="hidden lg:flex flex-wrap gap-1">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className={`text-sm px-3 py-2 rounded-md transition-colors whitespace-nowrap ${
                active === s.href
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-black hover:text-purple-400"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap"
          >
            View Website ↗
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap"
            >
              Log Out
            </button>
          </form>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle admin menu"
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
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-6 pb-4 border-t border-purple-800 pt-3">
          <div className="flex flex-col gap-1 mb-4">
            {sections.map((s) => (
              <a
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className={`text-sm px-3 py-2 rounded-md transition-colors ${
                  active === s.href
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-black hover:text-purple-400"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-purple-800 pt-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Website ↗
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
