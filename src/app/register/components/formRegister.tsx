"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function RegisterFormPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to register");
        return;
      }
      toast.success("Registered successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-400">
          {t("register_page.email")}
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-400">
          {t("register_page.password")}
        </Label>
        <Input
          id="password"
          type="password"
          placeholder={t("register_page.password")}
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-400">
         {t("register_page.confirm_password")}
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder={t("register_page.confirm_password")}
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-2 cursor-pointer bg-[white] text-[#000] hover:bg-[white]"
      >
        {t("register_page.register")}
      </Button>
    </form>
  );
}
