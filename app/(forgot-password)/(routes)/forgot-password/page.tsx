import { Metadata } from "next";
import ForgotPasswordForm from "./components/forgot-password-form";

export const metadata: Metadata = {
  title: "Powercoffee - Forgot Password",
  description: "Forgot your password?",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ForgotPasswordForm />
    </div>
  );
}
