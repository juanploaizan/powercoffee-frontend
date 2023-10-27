import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import { Heading } from "@/components/ui/heading";

export const metadata: Metadata = {
  title: "Settings - Powercoffee",
  description: "Manage your coffee shop settings.",
};

export default function SettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { coffeeShopId: string };
}) {
  const sidebarNavItems = [
    {
      title: "Coffee shop",
      href: `/${params.coffeeShopId}/settings`,
    },
    {
      title: "Account",
      href: `/${params.coffeeShopId}/settings/account`,
    },
  ];

  return (
    <>
      <div className="md:hidden">
        <p>Responsive is not implemented yet.</p>
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-start">
            <Heading
              title="Settings"
              description="Manage your coffee shop information and account settings."
            />
          </div>
          <Separator />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
