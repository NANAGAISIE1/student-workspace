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
import { z } from "zod";
import { signupFormSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";

export type ErrorType = {
  message: string;
};

export function SignupForm() {
  const route = useRouter();
  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  async function onSubmitSignupForm(values: z.infer<typeof signupFormSchema>) {
    const [data, error] = await register(values);

    if (error) {
      if (error.code === "CONFLICT") {
        signupForm.setError("email", {
          message: error.data,
        });
        return;
      }
    }

    // User created now show input form for email verification
    // If data, show verification input form
    route.push("/login");
  }
  return (
    <Card className="mx-auto max-w-sm">
      <Form {...signupForm}>
        <form onSubmit={signupForm.handleSubmit(onSubmitSignupForm)}>
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
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
                control={signupForm.control}
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
            </div>
          </CardContent>
          <CardFooter className="w-full flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  <p className="!mt-0">Creating account</p>
                </>
              ) : (
                <p>Create account</p>
              )}
            </Button>
            <Button variant="outline" type="button" className="w-full">
              Sign up with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href={"/login"} className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
