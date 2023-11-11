import { Icons } from "@/components/icons";
import { signIn } from "next-auth/react";
import { buttonVariants } from "./ui/button";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className={buttonVariants({ variant: "outline" })}
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Continue with Google
    </button>
  );
}
