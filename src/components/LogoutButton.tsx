"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function LogoutButton() {
  const router = useRouter();
  const {t} = useTranslation()

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} size="sm" className="cursor-pointer">
      {t("logout")}
    </Button>
  );
}
 