"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { CodeInput } from "../ui/code-input";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ResetFormProps } from "../../types/form-types";

const ResetPassWordForm = ({ provider, step }: ResetFormProps) => {
  const router = useRouter();
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        signIn(provider, formData).catch((error) => {
          console.error(error);
          toast.error(
            "Code could not be verified or new password is too short, try again",
          );
          setSubmitting(false);
        });
      }}
    >
      <label htmlFor="email">Code</label>
      <CodeInput />
      <label htmlFor="newPassword">New Password</label>
      <Input
        type="password"
        name="newPassword"
        id="newPassword"
        className="mb-4"
        autoComplete="new-password"
      />
      <input type="hidden" name="flow" value="reset-verification" />
      <input type="hidden" name="email" value={step.email} />
      <Button type="submit" disabled={submitting}>
        {submitting && <Loader2Icon className="ml-2 animate-spin" />}
        Continue
      </Button>
      <Button type="button" variant="link" onClick={() => router.back()}>
        Cancel
      </Button>
    </form>
  );
};

export default ResetPassWordForm;
