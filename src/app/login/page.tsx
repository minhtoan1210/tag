import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import FormLogin from "./components/formLogin";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-lg bg-[#1b1b1b] rounded-2xl border border-[#2a2a2a] p-6 space-y-4">
        <CardHeader >
          <CardTitle className="text-2xl text-center font-semibold text-[white]">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="underline text-[white] ml-2">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
