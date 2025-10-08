import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import RegisterFormPage from "./components/formRegister";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
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
