import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Layout/Navbar";

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
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-black border-t border-purple-700 text-center py-6 text-sm text-gray-400">
          © {new Date().getFullYear()} Retreat RFC. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
