import type { Metadata } from "next";
import "./globals.css";
import Logo from "./components/Logo/Logo";

export const metadata: Metadata = {
  title: "Retreat RFC",
  description: "Official website of Retreat RFC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col">
        <header className="bg-black border-b border-purple-700 sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <Logo />
            <ul className="flex gap-6 text-sm font-medium uppercase tracking-wide">
              <li><a href="/" className="hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="/fixtures" className="hover:text-purple-400 transition-colors">Fixtures</a></li>
              <li><a href="/about" className="hover:text-purple-400 transition-colors">About</a></li>
              <li><a href="/donations" className="hover:text-purple-400 transition-colors">Donations</a></li>
            </ul>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-black border-t border-purple-700 text-center py-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Retreat RFC. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
