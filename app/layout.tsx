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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
