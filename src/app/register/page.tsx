import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import RegisterFormPage from "./components/formRegister";

export const metadata = {
  title: "Register - SnippetShare",
  description:
    "Tạo tài khoản mới trên SnippetShare để chia sẻ và xem code nhanh chóng.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151515]">
      <Card className="w-full max-w-sm shadow-lg text-card-foreground flex flex-col gap-6 bg-[#1b1b1b] rounded-2xl border border-[#2a2a2a] p-6 space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold text-[white]">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterFormPage />
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground">
          Already have an account?
          <Link href="/login" className="text-primary underline ml-1">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
