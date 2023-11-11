import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  const user = session?.user;
  console.log("user in auth layout", user);

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      {children}
    </div>
  );
}
