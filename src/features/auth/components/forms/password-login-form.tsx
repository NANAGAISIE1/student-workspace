"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { loginFormSchema, LoginFormValues } from "../../types/form-types";
import { useRouter } from "next/navigation";

export function PasswordLoginForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      flow: "signIn",
    },
    mode: "onBlur",
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { signingIn } = await signIn("password", values);
      if (signingIn) return router.push("/app");
    } catch (error) {
      console.error(error);
      toast.error("Could not sign in, please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" autoComplete="new-password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Hidden flow field */}
        <FormField
          control={control}
          name="flow"
          render={({ field }) => (
            <input {...field} type="hidden" value={"signIn"} />
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2Icon className="mr-2 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
