import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";
import jwt from "jsonwebtoken";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user: any = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      console.error("Invalid or expired token:", err);
    }
  }

  return (
    <header className="w-full border-b border-[#c2c2c2] bg-[#000000] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-semibold text-[white]">
          🚀 Snippet
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="text-[white]">
            Home
          </Link>
          {token && (
            <>
              <Link href="/snippets" className="text-[white]">
                Code Snippets
              </Link>
              <Link href={`/profile/${user?.userId}`} className="text-[white]">
                Profile
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {token ? (
            <LogoutButton />
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="bg-[#47CF73]"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="bg-[#252830]">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
