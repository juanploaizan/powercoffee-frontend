import { redirect } from "next/navigation";
import { useSession } from "@/lib/user-session";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useSession();

  if (user) {
    redirect("/");
  }

  return <div>{children}</div>;
}
