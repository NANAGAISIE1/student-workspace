"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./schemas";
import { z } from "zod";
import { ErrorType } from "./register-form";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function LoginForm() {
  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmitLoginForm(values: z.infer<typeof loginFormSchema>) {
    try {
      const data = await login(values);
      console.log(data);
    } catch (error) {
      loginForm.setError("password", {
        message: (error as ErrorType).message,
      });
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmitLoginForm)}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                href={"/forgot-password"}
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => signIn("google")}
            >
              Login with Google
            </Button>
            <Button
              type="submit"
              className="w-full"
              disabled={loginForm.formState.isLoading}
            >
              {loginForm.formState.isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p className="!mt-0">Logging you in</p>
                </>
              ) : (
                <p className="!mt-0">Login</p>
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/register"} className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
