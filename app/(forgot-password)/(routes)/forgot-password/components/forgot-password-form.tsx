"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Icons } from "@/components/Icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyCaptcha } from "@/ServerActions";

const formSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(50, "Please enter a valid email address")
    .min(5, "Please enter a valid email address"),
});

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<string | null>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true);
    const isValid = await verifyCaptcha(captcha!);
    if (!isValid) {
      toast.error("Please verify you are not a robot");
      setTimeout(() => setDisabled(false), 1500);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/api/users/forgot-password", values);
      const message =
        response.status === 200 ? "Password reset email sent!" : "Error";
      router.push("/signin");
      toast.success(message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your user account's email address and we will send you a
          password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading || disabled}
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={setCaptcha}
            />

            <Button disabled={loading || disabled} type="submit">
              {loading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send password reset email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
