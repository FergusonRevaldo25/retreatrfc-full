import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function login(formData: FormData) {
  "use server";
  const password = formData.get("password");

  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set("admin_auth", process.env.ADMIN_PASSWORD as string, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    redirect("/admin/dashboard");
  }

  redirect("/admin?error=1");
}

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <form
        action={login}
        className="bg-neutral-900 border border-purple-700 rounded-lg p-8 w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-purple-500 text-center mb-2">
          Admin Login
        </h1>
        {searchParams?.error && (
          <p className="text-red-400 text-sm text-center">
            Incorrect password
          </p>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full bg-black border border-purple-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 transition-colors py-3 rounded-md font-semibold text-white"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
