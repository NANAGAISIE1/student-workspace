"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@convex/api";
import { useQuery } from "convex/react";

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  flow: z.literal("signUp"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegistrationFormProps {
  onSuccess: (email: string) => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { signIn } = useAuthActions();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      flow: "signUp",
    },
    mode: "onBlur",
  });

  const { handleSubmit, control, formState } = form;
  const { isSubmitting } = formState;

  const existingEmail = useQuery(api.user.query.emailExists, {
    email: form.getValues("email"),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      if (existingEmail) {
        form.setError("email", {
          type: "manual",
          message: "Email already exists",
        });
        return;
      }
      await signIn("password", values);
      onSuccess(values.email);
    } catch (error) {
      console.error(error);
      toast.error("Could not sign up, please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          render={({ field }) => <input {...field} type="hidden" />}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2Icon className="mr-2 animate-spin" />}
          Sign up
        </Button>
      </form>
    </Form>
  );
}
