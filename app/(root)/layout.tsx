import api from "@/lib/axios-interceptor";
import { useSession } from "@/lib/user-session";
import { redirect } from "next/navigation";

export default async function SetupPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await useSession();

  if (!user) {
    redirect("api/auth/signin");
  }

  const res = await api.get(`/api/coffee-shops/admin/${user.id}`); // Get the first coffee shop of the user

  if (res.data.id) {
    redirect(`/${res.data.id}`); // Redirect to the coffee shop page
  }

  return <>{children}</>;
}
