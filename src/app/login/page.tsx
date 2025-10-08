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
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-semibold">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormLogin />
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary underline ml-1">
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
