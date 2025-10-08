import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <header className="w-full border-b bg-[#000000] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-semibold text-[white]">
          🚀 Snippet
        </Link>

        {/* Menu links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="text-[white]">Home</Link>
          {token && (
            <>
              <Link href="/snippets" className="text-[white]">Snippets</Link>
              <Link href="/about" className="text-[white]">About</Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {token ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="bg-[#47CF73]"> 
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
