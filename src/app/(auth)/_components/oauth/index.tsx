import { SignInWithGitHub } from "./github";
import { SignInWithGoogle } from "./google";

export function SignInWithOAuth() {
  return (
    <div className="flex flex-col min-[460px]:flex-row w-full gap-2 items-stretch">
      <SignInWithGitHub />
      <SignInWithGoogle />
    </div>
  );
}