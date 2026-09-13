import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Retreat RFC Admin",
  manifest: "/admin-manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RFC Admin",
  },
  icons: {
    apple: "/admin-apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
