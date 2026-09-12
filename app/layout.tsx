import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/Layout/SiteChrome";

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
        {/* Site-wide background image */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: "url('/abstract.jpg')" }}
        />
        {/* Dark overlay so text stays readable everywhere */}
        <div className="fixed inset-0 bg-black/80 -z-10" />

        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
