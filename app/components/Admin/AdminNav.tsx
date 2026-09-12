async function logout() {
  "use server";
  const { cookies } = await import("next/headers");
  const { redirect } = await import("next/navigation");
  cookies().delete("admin_auth");
  redirect("/admin");
}

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
  { href: "/admin/registrations", label: "Registrations" },
];

export default function AdminNav({ active }: { active?: string }) {
  return (
    <nav className="bg-neutral-900 border-b border-purple-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
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
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-gray-400 hover:text-white transition-colors whitespace-nowrap"
          >
            Log Out
          </button>
        </form>
      </div>
    </nav>
  );
}
