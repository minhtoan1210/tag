"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function Navbar({ user, token }: any) {
  const { t, i18n } = useTranslation();
  return (
    <header className="w-full border-b border-[#c2c2c2] bg-[#000000] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-semibold text-white">
          CodeSnippet
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-white">
            {t("home")}
          </Link>
          {token && (
            <>
              <Link href="/snippets" className="text-white">
                {t("snippets")}
              </Link>
              <Link href={`/profile/${user?.userId}`} className="text-white">
                {t("profile")}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="bg-[#252830] hover:bg-[#252830] cursor-pointer"
            >
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4 mr-2 text-[white]" />
                <span className="text-[white]">
                  {i18n.language === "vi" ? "Tiếng Việt" : "English"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => i18n.changeLanguage("vi")}>
                Tiếng Việt
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => i18n.changeLanguage("en")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {token ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild size="sm" className="bg-[#47CF73]">
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button asChild size="sm" className="bg-[#252830]">
                <Link href="/register">{t("signup")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
