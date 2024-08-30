"use client";

import { Button } from "@/ui/components/common/ui/button";
import { Input } from "@/ui/components/common/ui/input";
import { Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/common/ui/form";
import { usePasswordLogin } from "@/ui/hooks/use-password-login";

export function PasswordLoginForm() {
  const { form, onSubmit, isSubmitting } = usePasswordLogin();
  const { control, handleSubmit } = form;

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
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          Sign in
          {isSubmitting && <Loader2Icon className="ml-2 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
