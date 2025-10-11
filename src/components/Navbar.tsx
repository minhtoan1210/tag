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
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ user, token }: any) {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link href="/" className="text-white block py-2 px-4">
        {t("home")}
      </Link>
      {token && (
        <>
          <Link href="/snippets" className="text-white block py-2 px-4">
            {t("snippets")}
          </Link>
          <Link href={`/profile/${user?.userId}`} className="text-white block py-2 px-4">
            {t("profile")}
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className="w-full border-b border-[#c2c2c2] bg-[#000000] backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-semibold text-white">
          CodeSnippet
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="bg-[#252830] hover:bg-[#252830] cursor-pointer"
            >
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4 mr-2 text-white" />
                <span className="text-white">
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

          <div className="hidden md:flex items-center gap-2">
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

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="bg-[#252830] hover:bg-[#252830] cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#252830] border-t border-[#c2c2c2]">
          <div className="flex flex-col px-4 py-2 gap-2">
            {navLinks}

            {token ? (
              <LogoutButton />
            ) : (
              <>
                <Link href="/login" className="text-white block py-2 px-4 cursor-pointer">
                  {t("login")}
                </Link>
                <Link href="/register" className="text-white block py-2 px-4 cursor-pointer">
                  {t("signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
