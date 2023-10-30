import { Metadata } from "next";
import ResetPasswordForm from "./components/reset-password-form";
import axios from "axios";
import { API_URL } from "@/app/config";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Powercoffee - Reset Password",
  description: "Reset your password",
};

async function validateToken(token: string) {
  try {
    await axios.get(`${API_URL}/api/users/reset-password/` + token);
    return true;
  } catch (err) {
    return false;
  }
}

export default async function ResetPasswordPage({
  params,
}: {
  params: { resetToken: string };
}) {
  const isValid = await validateToken(params.resetToken);

  if (!isValid) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">
            Invalid reset password link
          </h1>
          <p className="text-gray-500 mb-4">
            The link you provided has been used, is invalid, or has expired.
          </p>
          <Link
            href="/api/auth/signin"
            className={buttonVariants({ variant: "outline" })}
          >
            Go to the main page <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <ResetPasswordForm resetToken={params.resetToken} />
      </div>
    );
  }
}
