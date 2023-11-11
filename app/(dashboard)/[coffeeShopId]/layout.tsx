import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import api from "@/lib/axios-interceptor";
import { loginIsRequiredServer } from "@/lib/auth";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { coffeeShopId: string };
}) {
  await loginIsRequiredServer();

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
