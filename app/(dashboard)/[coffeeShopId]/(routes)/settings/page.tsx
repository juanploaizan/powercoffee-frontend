import api from "@/lib/axios-interceptor";
import { useSession } from "@/lib/user-session";
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";

async function SettingsPage({ params }: { params: { coffeeShopId: string } }) {
  const user = await useSession();

  if (!user) {
    redirect("api/auth/signin");
  }

  const res = await api.get(`/api/coffee-shops/${params.coffeeShopId}`);
  const coffeeShop = res.data;

  if (!coffeeShop) {
    redirect("/");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={coffeeShop} />
      </div>
    </div>
  );
}

export default SettingsPage;
