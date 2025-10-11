"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import RegisterFormPage from "./formRegister";
import { useTranslation } from "react-i18next";

export default function RegisterClient() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151515]">
      <Card className="w-full max-w-sm shadow-lg text-card-foreground flex flex-col gap-6 bg-[#1b1b1b] rounded-2xl border border-[#2a2a2a] p-6 space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-[white]">
            {t("register_page.title_form")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterFormPage />
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground">
          {t("register_page.already_account")}
          <Link href="/login" className="text-primary underline ml-1">
            {t("register_page.sign_in")}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
