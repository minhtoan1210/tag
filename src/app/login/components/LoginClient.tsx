"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import FormLogin from "./formLogin";
import Link from "next/link";

export default function LoginClient() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151515]">
      <Card className="w-full max-w-sm shadow-lg bg-[#1b1b1b] rounded-2xl border border-[#2a2a2a] p-6 space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-[white]">
            {t("login_page.sign_in")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-400">
          {t("login_page.account")}
          <Link href="/register" className="underline text-[white] ml-2">
            {t("login_page.sign_up")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
