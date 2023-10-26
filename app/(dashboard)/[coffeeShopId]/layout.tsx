import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useSession } from "@/lib/user-session";
import api from "@/lib/axios-interceptor";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { coffeeShopId: string };
}) {
  const user = await useSession();

  if (!user) {
    redirect("api/auth/signin");
  }

  try {
    await api.get(`/api/users/${user.id}`);
  } catch (error) {
    redirect(`/api/auth/signout`);
  }

  try {
    await api.get(`/api/coffee-shops/${params.coffeeShopId}`);
  } catch (error) {
    redirect(`/`);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
