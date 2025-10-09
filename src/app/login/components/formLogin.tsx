"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("data", data);

      if (!res.ok) {
        toast.error(data.error || "Login failed ");
        setLoading(false);
        return;
      }

      if (!data) {
        console.log("asdsa")
        setLoading(false);
        return;
      }

      toast.success("Login successful!");
      setLoading(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Internal error ");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-400">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-400">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-gray-100 focus:ring-2 focus:ring-[#ffe94e] focus:outline-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-2 cursor-pointer bg-white text-[black] hover:bg-white hover:text-black"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
