import { authConfig } from "@/lib/auth";
import api from "@/lib/axios-interceptor";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function SetupPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  const user = session?.user;

  if (!user) {
    redirect("api/auth/signin");
  }

  try {
    await api.get(`/api/users/${user.id}`);
  } catch (error) {
    redirect(`/api/auth/signout`);
  }

  const res = await api.get(`/api/coffee-shops/admin/${user.id}`); // Get the first coffee shop of the user

  if (res.data.id) {
    redirect(`/${res.data.id}`); // Redirect to the coffee shop page
  }

  return <>{children}</>;
}
