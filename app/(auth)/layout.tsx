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

  return (
    <div className="flex items-center justify-center h-full w-full">
      {children}
    </div>
  );
}
