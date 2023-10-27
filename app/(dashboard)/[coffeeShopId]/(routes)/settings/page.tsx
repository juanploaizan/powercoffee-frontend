import { Separator } from "@/components/ui/separator";
import { CoffeeShopSettingsPage } from "./coffee-shop-form";
import api from "@/lib/axios-interceptor";
import { redirect } from "next/navigation";

export default async function SettingsCoffeeShopPage({
  params,
}: {
  params: { coffeeShopId: string };
}) {
  const res = await api.get(`/api/coffee-shops/${params.coffeeShopId}`);
  const coffeeShop = res.data;

  if (!coffeeShop) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Coffee shop</h3>
        <p className="text-sm text-muted-foreground">
          This is the information of the current coffee shop.
        </p>
      </div>
      <Separator />
      <CoffeeShopSettingsPage initialData={coffeeShop} />
    </div>
  );
}
