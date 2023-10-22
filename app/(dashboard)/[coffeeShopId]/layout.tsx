import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
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
